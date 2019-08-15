import { Convert as convert } from '../../core/format';
import { TransactionType } from '../../model/transaction/TransactionType';
import MultisigModificationTransactionBufferPackage from '../buffers/MultisigModificationTransactionBuffer';
import MultisigModificationTransactionSchema from '../schemas/MultisigModificationTransactionSchema';
import { VerifiableTransaction } from './VerifiableTransaction';

import {flatbuffers} from 'flatbuffers';

const {
    MultisigModificationTransactionBuffer,
    CosignatoryModificationBuffer,
} = MultisigModificationTransactionBufferPackage.Buffers;

/**
 * @module transactions/MultisigModificationTransaction
 */
export default class MultisigModificationTransaction extends VerifiableTransaction {
    constructor(bytes:any) {
        super(bytes, MultisigModificationTransactionSchema);
    }
}

// tslint:disable-next-line:max-classes-per-file
export class Builder {
    maxFee: any;
    version: any;
    type: any;
    deadline: any;
    minRemovalDelta: any;
    minApprovalDelta: any;
    modifications: any;
    constructor() {
        this.maxFee = [0, 0];
        this.type = TransactionType.MODIFY_MULTISIG_ACCOUNT;
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

    addMinRemovalDelta(minRemovalDelta:any) {
        this.minRemovalDelta = minRemovalDelta;
        return this;
    }

    addMinApprovalDelta(minApprovalDelta:any) {
        this.minApprovalDelta = minApprovalDelta;
        return this;
    }

    addModifications(modifications:any) {
        this.modifications = modifications;
        return this;
    }

    build() {
        const builder = new flatbuffers.Builder(1);

        // Create modifications
        const modificationsArray: any = [];
        this.modifications.forEach((modification:any) => {
            const cosignatoryPublicKeyVector = CosignatoryModificationBuffer
                .createCosignatoryPublicKeyVector(builder, convert.hexToUint8(modification.cosignatoryPublicKey));
            CosignatoryModificationBuffer.startCosignatoryModificationBuffer(builder);
            CosignatoryModificationBuffer.addType(builder, modification.type);
            CosignatoryModificationBuffer.addCosignatoryPublicKey(builder, cosignatoryPublicKeyVector);
            modificationsArray.push(CosignatoryModificationBuffer.endCosignatoryModificationBuffer(builder));
        });

        // Create vectors
        const signatureVector = MultisigModificationTransactionBuffer
            .createSignatureVector(builder, Array(...Array(64)).map(Number.prototype.valueOf, 0));
        const signerVector = MultisigModificationTransactionBuffer
            .createSignerVector(builder, Array(...Array(32)).map(Number.prototype.valueOf, 0));
        const deadlineVector = MultisigModificationTransactionBuffer
            .createDeadlineVector(builder, this.deadline);
        const feeVector = MultisigModificationTransactionBuffer
            .createFeeVector(builder, this.maxFee);
        const modificationsVector = MultisigModificationTransactionBuffer
            .createModificationsVector(builder, modificationsArray);

        MultisigModificationTransactionBuffer.startMultisigModificationTransactionBuffer(builder);
        MultisigModificationTransactionBuffer.addSize(builder, 123 + (33 * this.modifications.length));
        MultisigModificationTransactionBuffer.addSignature(builder, signatureVector);
        MultisigModificationTransactionBuffer.addSigner(builder, signerVector);
        MultisigModificationTransactionBuffer.addVersion(builder, this.version);
        MultisigModificationTransactionBuffer.addType(builder, this.type);
        MultisigModificationTransactionBuffer.addFee(builder, feeVector);
        MultisigModificationTransactionBuffer.addDeadline(builder, deadlineVector);
        MultisigModificationTransactionBuffer.addMinRemovalDelta(builder, this.minRemovalDelta);
        MultisigModificationTransactionBuffer.addMinApprovalDelta(builder, this.minApprovalDelta);
        MultisigModificationTransactionBuffer.addNumModifications(builder, this.modifications.length);
        MultisigModificationTransactionBuffer.addModifications(builder, modificationsVector);

        // Calculate size
        const codedMultisigAggregate = MultisigModificationTransactionBuffer
            .endMultisigModificationTransactionBuffer(builder);
        builder.finish(codedMultisigAggregate);

        const bytes = builder.asUint8Array();
        return new MultisigModificationTransaction(bytes);
    }
}
