import { TransactionType } from '../../model/transaction/TransactionType';
import MosaicGlobalRestrictionTransactionBufferPackage from '../buffers/MosaicGlobalRestrictionTransactionBuffer';
import MosaicGlobalRestrictionTransactionSchema from '../schemas/MosaicGlobalRestrictionTransactionSchema';
import { VerifiableTransaction } from './VerifiableTransaction';

import {flatbuffers} from 'flatbuffers';

const {
    MosaicGlobalRestrictionTransactionBuffer,
} = MosaicGlobalRestrictionTransactionBufferPackage.Buffers;

export default class MosaicGlobalRestrictionTransaction extends VerifiableTransaction {
    constructor(bytes:any, schema:any) {
        super(bytes, schema);
    }
}
// tslint:disable-next-line: max-classes-per-file
export class Builder {
    maxFee: any;
    version: any;
    type: any;
    deadline: any;
    mosaicId: any;
    referenceMosaicId: any;
    restrictionKey: any;
    previousRestrictionValue: any;
    previousRestrictionType: any;
    newRestrictionValue: any;
    newRestrictionType: any;
    constructor() {
        this.maxFee = [0, 0];
        this.type = TransactionType.MOSAIC_GLOBAL_RESTRICTION;
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

    addRestrictionKey(restrictionKey:any) {
        this.restrictionKey = restrictionKey;
        return this;
    }

    addPreviousRestrictionValue(previousRestrictionValue:any) {
        this.previousRestrictionValue = previousRestrictionValue;
        return this;
    }

    addPreviousRestrictionType(previousRestrictionType:any) {
        this.previousRestrictionType = previousRestrictionType;
        return this;
    }

    addNewRestrictionValue(newRestrictionValue:any) {
        this.newRestrictionValue = newRestrictionValue;
        return this;
    }

    addNewRestrictionType(newRestrictionType:any) {
        this.newRestrictionType = newRestrictionType;
        return this;
    }

    addMosaicId(mosaicId:any) {
        this.mosaicId = mosaicId;
        return this;
    }

    addReferenceMosaicId(referenceMosaicId:any) {
        this.referenceMosaicId = referenceMosaicId;
        return this;
    }

    build() {
        const builder = new flatbuffers.Builder(1);

        // Create vectors
        const signatureVector = MosaicGlobalRestrictionTransactionBuffer
            .createSignatureVector(builder, Array(...Array(64)).map(Number.prototype.valueOf, 0));
        const signerVector = MosaicGlobalRestrictionTransactionBuffer
            .createSignerVector(builder, Array(...Array(32)).map(Number.prototype.valueOf, 0));
        const deadlineVector = MosaicGlobalRestrictionTransactionBuffer
            .createDeadlineVector(builder, this.deadline);
        const feeVector = MosaicGlobalRestrictionTransactionBuffer
            .createFeeVector(builder, this.maxFee);
        const mosaicIdVector = MosaicGlobalRestrictionTransactionBuffer
            .createMosaicIdVector(builder, this.mosaicId);
        const referenceMosaicIdVector = MosaicGlobalRestrictionTransactionBuffer
            .createReferenceMosaicIdVector(builder, this.referenceMosaicId);
        const restrictionKeyVector = MosaicGlobalRestrictionTransactionBuffer
            .createRestrictionKeyVector(builder, this.restrictionKey);
        const previousRestrictionValueVector = MosaicGlobalRestrictionTransactionBuffer
            .createPreviousRestrictionValueVector(builder, this.previousRestrictionValue);
        const newRestrictionValueVector = MosaicGlobalRestrictionTransactionBuffer
            .createNewRestrictionValueVector(builder, this.newRestrictionValue);

        MosaicGlobalRestrictionTransactionBuffer.startMosaicGlobalRestrictionTransactionBuffer(builder);
        MosaicGlobalRestrictionTransactionBuffer.addSize(builder, 162);
        MosaicGlobalRestrictionTransactionBuffer.addSignature(builder, signatureVector);
        MosaicGlobalRestrictionTransactionBuffer.addSigner(builder, signerVector);
        MosaicGlobalRestrictionTransactionBuffer.addVersion(builder, this.version);
        MosaicGlobalRestrictionTransactionBuffer.addType(builder, this.type);
        MosaicGlobalRestrictionTransactionBuffer.addFee(builder, feeVector);
        MosaicGlobalRestrictionTransactionBuffer.addDeadline(builder, deadlineVector);
        MosaicGlobalRestrictionTransactionBuffer.addMosaicId(builder, mosaicIdVector);
        MosaicGlobalRestrictionTransactionBuffer.addReferenceMosaicId(builder, referenceMosaicIdVector);
        MosaicGlobalRestrictionTransactionBuffer.addRestrictionKey(builder, restrictionKeyVector);
        MosaicGlobalRestrictionTransactionBuffer.addPreviousRestrictionValue(builder, previousRestrictionValueVector);
        MosaicGlobalRestrictionTransactionBuffer.addPreviousRestrictionType(builder, this.previousRestrictionType);
        MosaicGlobalRestrictionTransactionBuffer.addNewRestrictionValue(builder, newRestrictionValueVector);
        MosaicGlobalRestrictionTransactionBuffer.addNewRestrictionType(builder, this.newRestrictionType);

        // Calculate size

        const codedMosaicGlobalRestriction =
            MosaicGlobalRestrictionTransactionBuffer.endMosaicGlobalRestrictionTransactionBuffer(builder);
        builder.finish(codedMosaicGlobalRestriction);

        const bytes = builder.asUint8Array();

        const schema = MosaicGlobalRestrictionTransactionSchema;
        return new MosaicGlobalRestrictionTransaction(bytes, schema);
    }
}
