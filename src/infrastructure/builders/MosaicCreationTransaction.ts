import { TransactionType } from '../../model/transaction/TransactionType';
import MosaicCreationTransactionBufferPackage from '../buffers/MosaicCreationTransactionBuffer';
import {
    schema as MosaicCreationTransactionSchema,
    schemaNoDuration as MosaicCreationTransactionSchemaNoDuration,
} from '../schemas/MosaicCreationTransactionSchema';
import { VerifiableTransaction } from './VerifiableTransaction';

import {flatbuffers} from 'flatbuffers';

const {
    MosaicCreationTransactionBuffer,
} = MosaicCreationTransactionBufferPackage.Buffers;

export default class MosaicCreationTransaction extends VerifiableTransaction {
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
    flags: any;
    nonce: any;
    divisibility: any;
    duration: any;
    constructor() {
        this.flags = 0;
        this.maxFee = [0, 0];
        this.type = TransactionType.MOSAIC_DEFINITION;
        this.nonce = 0;
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

    addNonce(nonce:any) {
        this.nonce = nonce;
        return this;
    }

    addDeadline(deadline:any) {
        this.deadline = deadline;
        return this;
    }

    addDuration(duration:any) {
        this.duration = duration;
        return this;
    }

    addDivisibility(divisibility:any) {
        this.divisibility = divisibility;
        return this;
    }

    addSupplyMutable() {
        this.flags += 1;
        return this;
    }

    addTransferability() {
        this.flags += 2;
        return this;
    }

    addRestrictable() {
        this.flags += 4;
        return this;
    }

    addMosaicId(mosaicId:any) {
        this.mosaicId = mosaicId;
        return this;
    }

    build() {
        const builder = new flatbuffers.Builder(1);

        // Create vectors
        const signatureVector = MosaicCreationTransactionBuffer
            .createSignatureVector(builder, Array(...Array(64)).map(Number.prototype.valueOf, 0));
        const signerVector = MosaicCreationTransactionBuffer
            .createSignerVector(builder, Array(...Array(32)).map(Number.prototype.valueOf, 0));
        const deadlineVector = MosaicCreationTransactionBuffer
            .createDeadlineVector(builder, this.deadline);
        const feeVector = MosaicCreationTransactionBuffer
            .createFeeVector(builder, this.maxFee);
        const nonceVector = MosaicCreationTransactionBuffer
            .createNonceVector(builder, this.nonce);
        const mosaicIdVector = MosaicCreationTransactionBuffer
            .createMosaicIdVector(builder, this.mosaicId);

        const durationVector = MosaicCreationTransactionBuffer
            .createDurationVector(builder, this.duration);

        const durationProvided = 0 < this.duration.length;

        MosaicCreationTransactionBuffer.startMosaicCreationTransactionBuffer(builder);
        MosaicCreationTransactionBuffer.addSize(builder, durationProvided ? 144 : 135);
        MosaicCreationTransactionBuffer.addSignature(builder, signatureVector);
        MosaicCreationTransactionBuffer.addSigner(builder, signerVector);
        MosaicCreationTransactionBuffer.addVersion(builder, this.version);
        MosaicCreationTransactionBuffer.addType(builder, this.type);
        MosaicCreationTransactionBuffer.addFee(builder, feeVector);
        MosaicCreationTransactionBuffer.addDeadline(builder, deadlineVector);
        MosaicCreationTransactionBuffer.addNonce(builder, nonceVector);
        MosaicCreationTransactionBuffer.addMosaicId(builder, mosaicIdVector);
        MosaicCreationTransactionBuffer.addNumOptionalProperties(builder, durationProvided ? 1 : 0);
        MosaicCreationTransactionBuffer.addFlags(builder, this.flags);

        MosaicCreationTransactionBuffer.addDivisibility(builder, this.divisibility);

        if (durationProvided) {
            MosaicCreationTransactionBuffer.addIndicateDuration(builder, 2);
            MosaicCreationTransactionBuffer.addDuration(builder, durationVector);
        }

        // Calculate size

        const codedMosaicCreation = MosaicCreationTransactionBuffer.endMosaicCreationTransactionBuffer(builder);
        builder.finish(codedMosaicCreation);

        const bytes = builder.asUint8Array();

        const schema = durationProvided ? MosaicCreationTransactionSchema : MosaicCreationTransactionSchemaNoDuration;
        return new MosaicCreationTransaction(bytes, schema);
    }
}
