import { Convert as convert, RawAddress as address } from '../../core/format';
import * as SecretLockTransactionBufferPackage from '../../infrastructure/buffers/SecretLockTransactionBuffer';
import { VerifiableTransaction } from '../../infrastructure/builders/VerifiableTransaction';
import SecretLockTransactionSchema from '../../infrastructure/schemas/SecretLockTransactionSchema';
import { TransactionType } from '../../model/transaction/TransactionType';

import {flatbuffers} from 'flatbuffers';

const {
    SecretLockTransactionBuffer,
} = SecretLockTransactionBufferPackage.default.Buffers;

export default class SecretLockTransaction extends VerifiableTransaction {
    constructor(bytes:any) {
        super(bytes, SecretLockTransactionSchema);
    }
}

// tslint:disable-next-line:max-classes-per-file
export class Builder {
    maxFee: any;
    version: any;
    type: any;
    deadline: any;
    mosaicId: any;
    mosaicAmount: any;
    duration: any;
    hashAlgorithm: any;
    secret: any;
    recipient: any;
    constructor() {
        this.maxFee = [0, 0];
        this.type = TransactionType.SECRET_LOCK;
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

    addMosaicId(mosaicId:any) {
        this.mosaicId = mosaicId;
        return this;
    }

    addMosaicAmount(mosaicAmount:any) {
        this.mosaicAmount = mosaicAmount;
        return this;
    }

    addDuration(duration:any) {
        this.duration = duration;
        return this;
    }

    addHashAlgorithm(hashAlgorithm:any) {
        this.hashAlgorithm = hashAlgorithm;
        return this;
    }

    addSecret(secret:any) {
        this.secret = secret;
        return this;
    }

    addRecipient(recipient:any) {
        this.recipient = address.stringToAddress(recipient);
        return this;
    }

    build() {
        const builder = new flatbuffers.Builder(1);

        // Create vectors
        const signatureVector = SecretLockTransactionBuffer
            .createSignatureVector(builder, Array(...Array(64)).map(Number.prototype.valueOf, 0));
        const signerVector = SecretLockTransactionBuffer.createSignerVector(builder, Array(...Array(32)).map(Number.prototype.valueOf, 0));
        const deadlineVector = SecretLockTransactionBuffer.createDeadlineVector(builder, this.deadline);
        const feeVector = SecretLockTransactionBuffer.createFeeVector(builder, this.maxFee);
        const mosaicIdVector = SecretLockTransactionBuffer.createMosaicIdVector(builder, this.mosaicId);
        const mosaicAmountVector = SecretLockTransactionBuffer.createMosaicAmountVector(builder, this.mosaicAmount);
        const durationVector = SecretLockTransactionBuffer.createDurationVector(builder, this.duration);
        const byteSecret = convert.hexToUint8(64 > this.secret.length ? this.secret + '0'.repeat(64 - this.secret.length) : this.secret);
        const secretVector = SecretLockTransactionBuffer.createSecretVector(builder, byteSecret);
        const recipientVector = SecretLockTransactionBuffer.createRecipientVector(builder, this.recipient);

        SecretLockTransactionBuffer.startSecretLockTransactionBuffer(builder);
        SecretLockTransactionBuffer.addSize(builder, 202);
        SecretLockTransactionBuffer.addSignature(builder, signatureVector);
        SecretLockTransactionBuffer.addSigner(builder, signerVector);
        SecretLockTransactionBuffer.addVersion(builder, this.version);
        SecretLockTransactionBuffer.addType(builder, this.type);
        SecretLockTransactionBuffer.addFee(builder, feeVector);
        SecretLockTransactionBuffer.addDeadline(builder, deadlineVector);
        SecretLockTransactionBuffer.addMosaicId(builder, mosaicIdVector);
        SecretLockTransactionBuffer.addMosaicAmount(builder, mosaicAmountVector);
        SecretLockTransactionBuffer.addDuration(builder, durationVector);
        SecretLockTransactionBuffer.addHashAlgorithm(builder, this.hashAlgorithm);
        SecretLockTransactionBuffer.addSecret(builder, secretVector);
        SecretLockTransactionBuffer.addRecipient(builder, recipientVector);

        const codedSecretLock = SecretLockTransactionBuffer.endSecretLockTransactionBuffer(builder);
        builder.finish(codedSecretLock);

        const bytes = builder.asUint8Array();
        return new SecretLockTransaction(bytes);
    }
}
