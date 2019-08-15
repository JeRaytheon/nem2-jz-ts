import { TransactionType } from '../../model/transaction/TransactionType';
import AccountRestrictionsEntityTypeTransactionBufferPackage from '../buffers/AccountRestrictionsEntityTypeTransactionBuffer';
import AccountRestrictionsEntityTypeModificationTransactionSchema from '../schemas/AccountRestrictionsEntityTypeModificationTransactionSchema';
import { VerifiableTransaction } from './VerifiableTransaction';

const {
    AccountRestrictionsEntityTypeTransactionBuffer,
    RestrictionEntityTypeModificationBuffer,
} = AccountRestrictionsEntityTypeTransactionBufferPackage.Buffers;

import {flatbuffers} from 'flatbuffers';

export default class AccountRestrictionsEntityTypeTransaction extends VerifiableTransaction {
    constructor(bytes:any) {
        super(bytes, AccountRestrictionsEntityTypeModificationTransactionSchema);
    }
}

// tslint:disable-next-line:max-classes-per-file
export class Builder {
    maxFee: any;
    version: any;
    type: any;
    deadline: any;
    restrictionType: any;
    modifications: any;
    constructor() {
        this.maxFee = [0, 0];
        this.type = TransactionType.MODIFY_ACCOUNT_RESTRICTION_OPERATION;
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

    addRestrictionType(restrictionType:any) {
        this.restrictionType = restrictionType;
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
            RestrictionEntityTypeModificationBuffer.startRestrictionEntityTypeModificationBuffer(builder);
            RestrictionEntityTypeModificationBuffer.addModificationType(builder, modification.type);
            RestrictionEntityTypeModificationBuffer.addValue(builder, modification.value);
            modificationsArray.push(RestrictionEntityTypeModificationBuffer.endRestrictionEntityTypeModificationBuffer(builder));
        });

        // Create vectors
        const signatureVector = AccountRestrictionsEntityTypeTransactionBuffer
            .createSignatureVector(builder, Array(...Array(64)).map(Number.prototype.valueOf, 0));
        const signerVector = AccountRestrictionsEntityTypeTransactionBuffer
            .createSignerVector(builder, Array(...Array(32)).map(Number.prototype.valueOf, 0));
        const deadlineVector = AccountRestrictionsEntityTypeTransactionBuffer
            .createDeadlineVector(builder, this.deadline);
        const feeVector = AccountRestrictionsEntityTypeTransactionBuffer
            .createFeeVector(builder, this.maxFee);
        const modificationVector = AccountRestrictionsEntityTypeTransactionBuffer
            .createModificationsVector(builder, modificationsArray);

        AccountRestrictionsEntityTypeTransactionBuffer.startAccountRestrictionsEntityTypeTransactionBuffer(builder);
        AccountRestrictionsEntityTypeTransactionBuffer.addSize(builder, 122 + (3 * this.modifications.length));
        AccountRestrictionsEntityTypeTransactionBuffer.addSignature(builder, signatureVector);
        AccountRestrictionsEntityTypeTransactionBuffer.addSigner(builder, signerVector);
        AccountRestrictionsEntityTypeTransactionBuffer.addVersion(builder, this.version);
        AccountRestrictionsEntityTypeTransactionBuffer.addType(builder, this.type);
        AccountRestrictionsEntityTypeTransactionBuffer.addFee(builder, feeVector);
        AccountRestrictionsEntityTypeTransactionBuffer.addDeadline(builder, deadlineVector);
        AccountRestrictionsEntityTypeTransactionBuffer.addRestrictionType(builder, this.restrictionType);
        AccountRestrictionsEntityTypeTransactionBuffer.addModificationCount(builder, this.modifications.length);
        AccountRestrictionsEntityTypeTransactionBuffer.addModifications(builder, modificationVector);

        // Calculate size
        const codedAccountRestrictionsAddress = AccountRestrictionsEntityTypeTransactionBuffer
            .endAccountRestrictionsEntityTypeTransactionBuffer(builder);
        builder.finish(codedAccountRestrictionsAddress);

        const bytes = builder.asUint8Array();

        return new AccountRestrictionsEntityTypeTransaction(bytes);
    }
}
