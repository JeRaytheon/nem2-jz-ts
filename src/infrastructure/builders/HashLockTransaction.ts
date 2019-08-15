import { Convert as convert } from '../../core/format';
import * as HashLockTransactionBufferPackage from '../buffers/HashLockTransactionBuffer';
import HashLockTransactionSchema from '../schemas/HashLockTransactionSchema';
import { VerifiableTransaction } from './VerifiableTransaction';
import { TransactionType } from '../../model/transaction/TransactionType';

import {flatbuffers} from 'flatbuffers';

const {
    HashLockTransactionBuffer,
} = HashLockTransactionBufferPackage.default.Buffers;

export default class HashLockTransaction extends VerifiableTransaction {
    constructor(bytes:any) {
        super(bytes, HashLockTransactionSchema);
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
    hash: any;
    constructor() {
        this.maxFee = [0, 0];
        this.type = TransactionType.LOCK;
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

    addHash(hash:any) {
        this.hash = hash;
        return this;
    }

    build() {
        const builder = new flatbuffers.Builder(1);

        // Create vectors
        const signatureVector = HashLockTransactionBuffer
            .createSignatureVector(builder, Array(...Array(64)).map(Number.prototype.valueOf, 0));
        const signerVector = HashLockTransactionBuffer.createSignerVector(builder, Array(...Array(32)).map(Number.prototype.valueOf, 0));
        const deadlineVector = HashLockTransactionBuffer.createDeadlineVector(builder, this.deadline);
        const feeVector = HashLockTransactionBuffer.createFeeVector(builder, this.maxFee);
        const mosaicIdVector = HashLockTransactionBuffer.createMosaicIdVector(builder, this.mosaicId);
        const mosaicAmountVector = HashLockTransactionBuffer.createMosaicAmountVector(builder, this.mosaicAmount);
        const durationVector = HashLockTransactionBuffer.createDurationVector(builder, this.duration);
        const byteHash = convert.hexToUint8(this.hash);
        const hashVector = HashLockTransactionBuffer.createHashVector(builder, byteHash);

        HashLockTransactionBuffer.startHashLockTransactionBuffer(builder);
        HashLockTransactionBuffer.addSize(builder, 176);
        HashLockTransactionBuffer.addSignature(builder, signatureVector);
        HashLockTransactionBuffer.addSigner(builder, signerVector);
        HashLockTransactionBuffer.addVersion(builder, this.version);
        HashLockTransactionBuffer.addType(builder, this.type);
        HashLockTransactionBuffer.addFee(builder, feeVector);
        HashLockTransactionBuffer.addDeadline(builder, deadlineVector);
        HashLockTransactionBuffer.addMosaicId(builder, mosaicIdVector);
        HashLockTransactionBuffer.addMosaicAmount(builder, mosaicAmountVector);
        HashLockTransactionBuffer.addDuration(builder, durationVector);
        HashLockTransactionBuffer.addHash(builder, hashVector);

        const codedHashLock = HashLockTransactionBuffer.endHashLockTransactionBuffer(builder);
        builder.finish(codedHashLock);

        const bytes = builder.asUint8Array();
        return new HashLockTransaction(bytes);
    }
}
