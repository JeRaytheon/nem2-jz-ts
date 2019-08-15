import { Convert as convert, RawAddress as address} from '../../core/format';
import * as TransferTransactionBufferPackage from '../../infrastructure/buffers/TransferTransactionBuffer';
import { VerifiableTransaction } from '../../infrastructure/builders/VerifiableTransaction';
import TransferTransactionSchema from '../../infrastructure/schemas/TransferTransactionSchema';
import { TransactionType } from '../../model/transaction/TransactionType';

import {flatbuffers} from 'flatbuffers';

const {
    TransferTransactionBuffer,
    MessageBuffer,
    MosaicBuffer,
} = TransferTransactionBufferPackage.default.Buffers;

export default class TransferTransaction extends VerifiableTransaction {
    constructor(bytes:any) {
        super(bytes, TransferTransactionSchema);
    }
}

// tslint:disable-next-line:max-classes-per-file
export class Builder {
    maxFee: any;
    version: any;
    type: any;
    deadline: any;
    recipient: any;
    message: any;
    mosaics: any;
    constructor() {
        this.maxFee = [0, 0];
        this.type = TransactionType.TRANSFER;
    }

    addFee(maxFee:any) {
        this.maxFee = maxFee;
        return this;
    }

    addVersion(version:any) {
        this.version = version;
        return this;
    }

    addType(type:any) {
        this.type = type;
        return this;
    }

    addDeadline(deadline:any) {
        this.deadline = deadline;
        return this;
    }

    addRecipient(recipient:any) {
        if (/^[0-9a-fA-F]{16}$/.test(recipient)) {
            // received hexadecimal notation of namespaceId (alias)
            this.recipient = address.aliasToRecipient(convert.hexToUint8(recipient));
        } else {
            // received recipient address
            this.recipient = address.stringToAddress(recipient);
        }
        return this;
    }

    addMessage(message:any) {
        this.message = message;
        return this;
    }

    addMosaics(mosaics:any) {
        this.mosaics = mosaics.sort((a:any, b:any) => {
            if (Number(a.id[1]) > b.id[1]) { return 1; } else if (a.id[1] < b.id[1]) { return -1; }
            return 0;
        });
        return this;
    }

    build() {
        const builder = new flatbuffers.Builder(1);
        // Constants

        // Create message
        const bytePayload = convert.hexToUint8(convert.utf8ToHex(this.message.payload));
        const payload = MessageBuffer.createPayloadVector(builder, bytePayload);
        MessageBuffer.startMessageBuffer(builder);
        MessageBuffer.addType(builder, this.message.type);
        MessageBuffer.addPayload(builder, payload);
        const message = MessageBuffer.endMessageBuffer(builder);

        // Create mosaics
        const mosaics: any = [];
        this.mosaics.forEach((mosaic:any) => {
            const id = MosaicBuffer.createIdVector(builder, mosaic.id);
            const amount = MosaicBuffer.createAmountVector(builder, mosaic.amount);
            MosaicBuffer.startMosaicBuffer(builder);
            MosaicBuffer.addId(builder, id);
            MosaicBuffer.addAmount(builder, amount);
            mosaics.push(MosaicBuffer.endMosaicBuffer(builder));
        });

        // Create vectors
        const signatureVector = TransferTransactionBuffer
            .createSignatureVector(builder, Array(...Array(64)).map(Number.prototype.valueOf, 0));
        const signerVector = TransferTransactionBuffer.createSignerVector(builder, Array(...Array(32)).map(Number.prototype.valueOf, 0));
        const deadlineVector = TransferTransactionBuffer.createDeadlineVector(builder, this.deadline);
        const feeVector = TransferTransactionBuffer.createFeeVector(builder, this.maxFee);
        const recipientVector = TransferTransactionBuffer.createRecipientVector(builder, this.recipient);
        const mosaicsVector = TransferTransactionBuffer.createMosaicsVector(builder, mosaics);

        TransferTransactionBuffer.startTransferTransactionBuffer(builder);
        TransferTransactionBuffer.addSize(builder, 149 + (16 * this.mosaics.length) + bytePayload.length);
        TransferTransactionBuffer.addSignature(builder, signatureVector);
        TransferTransactionBuffer.addSigner(builder, signerVector);
        TransferTransactionBuffer.addVersion(builder, this.version);
        TransferTransactionBuffer.addType(builder, this.type);
        TransferTransactionBuffer.addFee(builder, feeVector);
        TransferTransactionBuffer.addDeadline(builder, deadlineVector);
        TransferTransactionBuffer.addRecipient(builder, recipientVector);
        TransferTransactionBuffer.addNumMosaics(builder, this.mosaics.length);
        TransferTransactionBuffer.addMessageSize(builder, bytePayload.length + 1);
        TransferTransactionBuffer.addMessage(builder, message);
        TransferTransactionBuffer.addMosaics(builder, mosaicsVector);

        // Calculate size

        const codedTransfer = TransferTransactionBuffer.endTransferTransactionBuffer(builder);
        builder.finish(codedTransfer);

        const bytes = builder.asUint8Array();
        return new TransferTransaction(bytes);
    }
}
