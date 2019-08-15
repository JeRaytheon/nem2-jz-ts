import { TransactionType } from '../../model/transaction/TransactionType';
import MosaicSupplyChangeTransactionBufferPackage from '../buffers/MosaicSupplyChangeTransactionBuffer';
import MosaicSupplyChangeTransactionSchema from '../schemas/MosaicSupplyChangeTransactionSchema';
import { VerifiableTransaction } from './VerifiableTransaction';

const {
    MosaicSupplyChangeTransactionBuffer,
} = MosaicSupplyChangeTransactionBufferPackage.Buffers;

import {flatbuffers} from 'flatbuffers';

/**
 * @module transactions/MosaicSupplyChangeTransaction
 */
export default class MosaicSupplyChangeTransaction extends VerifiableTransaction {
    constructor(bytes:any) {
        super(bytes, MosaicSupplyChangeTransactionSchema);
    }
}
// tslint:disable-next-line:max-classes-per-file
export class Builder {
    maxFee: any;
    version: any;
    type: any;
    deadline: any;
    mosaicId: any;
    direction: any;
    delta: any;
    constructor() {
        this.maxFee = [0, 0];
        this.type = TransactionType.MOSAIC_SUPPLY_CHANGE;
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

    addDirection(direction:any) {
        this.direction = direction;
        return this;
    }

    addDelta(delta:any) {
        this.delta = delta;
        return this;
    }

    build() {
        const builder = new flatbuffers.Builder(1);

        // Create vectors
        const signatureVector = MosaicSupplyChangeTransactionBuffer
            .createSignatureVector(builder, Array(...Array(64)).map(Number.prototype.valueOf, 0));
        const signerVector = MosaicSupplyChangeTransactionBuffer
            .createSignerVector(builder, Array(...Array(32)).map(Number.prototype.valueOf, 0));
        const deadlineVector = MosaicSupplyChangeTransactionBuffer
            .createDeadlineVector(builder, this.deadline);
        const feeVector = MosaicSupplyChangeTransactionBuffer
            .createFeeVector(builder, this.maxFee);
        const mosaicIdVector = MosaicSupplyChangeTransactionBuffer
            .createFeeVector(builder, this.mosaicId);
        const deltaVector = MosaicSupplyChangeTransactionBuffer
            .createFeeVector(builder, this.delta);

        MosaicSupplyChangeTransactionBuffer.startMosaicSupplyChangeTransactionBuffer(builder);
        MosaicSupplyChangeTransactionBuffer.addSize(builder, 137);
        MosaicSupplyChangeTransactionBuffer.addSignature(builder, signatureVector);
        MosaicSupplyChangeTransactionBuffer.addSigner(builder, signerVector);
        MosaicSupplyChangeTransactionBuffer.addVersion(builder, this.version);
        MosaicSupplyChangeTransactionBuffer.addType(builder, this.type);
        MosaicSupplyChangeTransactionBuffer.addFee(builder, feeVector);
        MosaicSupplyChangeTransactionBuffer.addDeadline(builder, deadlineVector);
        MosaicSupplyChangeTransactionBuffer.addMosaicId(builder, mosaicIdVector);
        MosaicSupplyChangeTransactionBuffer.addDirection(builder, this.direction);
        MosaicSupplyChangeTransactionBuffer.addDelta(builder, deltaVector);

        // Calculate size
        const codedMosaicChangeSupply = MosaicSupplyChangeTransactionBuffer.endMosaicSupplyChangeTransactionBuffer(builder);
        builder.finish(codedMosaicChangeSupply);

        const bytes = builder.asUint8Array();
        return new MosaicSupplyChangeTransaction(bytes);
    }
}
