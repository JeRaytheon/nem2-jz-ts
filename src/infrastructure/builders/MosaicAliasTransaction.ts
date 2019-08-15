import { TransactionType } from '../../model/transaction/TransactionType';
import MosaicAliasTransactionBufferPackage from '../buffers/MosaicAliasTransactionBuffer';
import MosaicAliasTransactionSchema from '../schemas/MosaicAliasTransactionSchema';
import { VerifiableTransaction } from './VerifiableTransaction';

const {
    MosaicAliasTransactionBuffer,
} = MosaicAliasTransactionBufferPackage.Buffers;

import {flatbuffers} from 'flatbuffers';

/**
 * @module transactions/MosaicAliasTransaction
 */
export default class MosaicAliasTransaction extends VerifiableTransaction {
    constructor(bytes:any) {
        super(bytes, MosaicAliasTransactionSchema);
    }
}

// tslint:disable-next-line:max-classes-per-file
export class Builder {
    maxFee: any;
    version: any;
    type: any;
    deadline: any;
    mosaicId: any;
    actionType: any;
    namespaceId: any;
    constructor() {
        this.maxFee = [0, 0];
        this.type = TransactionType.MOSAIC_ALIAS;
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

    addActionType(actionType:any) {
        this.actionType = actionType;
        return this;
    }

    addNamespaceId(namespaceId:any) {
        this.namespaceId = namespaceId;
        return this;
    }

    addMosaicId(mosaicId:any) {
        this.mosaicId = mosaicId;
        return this;
    }

    build() {
        const builder = new flatbuffers.Builder(1);

        // Create vectors
        const signatureVector = MosaicAliasTransactionBuffer
            .createSignatureVector(builder, Array(...Array(64)).map(Number.prototype.valueOf, 0));
        const signerVector = MosaicAliasTransactionBuffer
            .createSignerVector(builder, Array(...Array(32)).map(Number.prototype.valueOf, 0));
        const deadlineVector = MosaicAliasTransactionBuffer
            .createDeadlineVector(builder, this.deadline);
        const feeVector = MosaicAliasTransactionBuffer
            .createFeeVector(builder, this.maxFee);
        const namespaceIdVector = MosaicAliasTransactionBuffer
            .createNamespaceIdVector(builder, this.namespaceId);
        const mosaicIdVector = MosaicAliasTransactionBuffer
            .createMosaicIdVector(builder, this.mosaicId);

        MosaicAliasTransactionBuffer.startMosaicAliasTransactionBuffer(builder);
        MosaicAliasTransactionBuffer.addSize(builder, 137);
        MosaicAliasTransactionBuffer.addSignature(builder, signatureVector);
        MosaicAliasTransactionBuffer.addSigner(builder, signerVector);
        MosaicAliasTransactionBuffer.addVersion(builder, this.version);
        MosaicAliasTransactionBuffer.addType(builder, this.type);
        MosaicAliasTransactionBuffer.addFee(builder, feeVector);
        MosaicAliasTransactionBuffer.addDeadline(builder, deadlineVector);
        MosaicAliasTransactionBuffer.addActionType(builder, this.actionType);
        MosaicAliasTransactionBuffer.addNamespaceId(builder, namespaceIdVector);
        MosaicAliasTransactionBuffer.addMosaicId(builder, mosaicIdVector);

        // Calculate size
        const codedMosaicChangeSupply = MosaicAliasTransactionBuffer.endMosaicAliasTransactionBuffer(builder);
        builder.finish(codedMosaicChangeSupply);

        const bytes = builder.asUint8Array();

        return new MosaicAliasTransaction(bytes);
    }
}
