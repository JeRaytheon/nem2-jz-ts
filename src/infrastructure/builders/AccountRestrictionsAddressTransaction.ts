import { RawAddress as address } from '../../core/format';
import { TransactionType } from '../../model/transaction/TransactionType';
import AccountRestrictionsAddressTransactionBufferPackage from '../buffers/AccountRestrictionsAddressTransactionBuffer';
import AccountRestrictionsAddressModificationTransactionSchema from '../schemas/AccountRestrictionsAddressModificationTransactionSchema';
import { VerifiableTransaction } from './VerifiableTransaction';
const {
    AccountRestrictionsAddressTransactionBuffer,
    RestrictionAddressModificationBuffer,
} = AccountRestrictionsAddressTransactionBufferPackage.Buffers;

import {flatbuffers} from 'flatbuffers';

export default class AccountRestrictionsAddressTransaction extends VerifiableTransaction {
    constructor(bytes:any) {
        super(bytes, AccountRestrictionsAddressModificationTransactionSchema);
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
        this.type = TransactionType.MODIFY_ACCOUNT_RESTRICTION_ADDRESS;
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
            const addressModificationVector = RestrictionAddressModificationBuffer
                .createValueVector(builder, address.stringToAddress(modification.value));
            RestrictionAddressModificationBuffer.startRestrictionAddressModificationBuffer(builder);
            RestrictionAddressModificationBuffer.addModificationType(builder, modification.type);
            RestrictionAddressModificationBuffer.addValue(builder, addressModificationVector);
            modificationsArray.push(RestrictionAddressModificationBuffer.endRestrictionAddressModificationBuffer(builder));
        });

        // Create vectors
        const signatureVector = AccountRestrictionsAddressTransactionBuffer
            .createSignatureVector(builder, Array(...Array(64)).map(Number.prototype.valueOf, 0));
        const signerVector = AccountRestrictionsAddressTransactionBuffer
            .createSignerVector(builder, Array(...Array(32)).map(Number.prototype.valueOf, 0));
        const deadlineVector = AccountRestrictionsAddressTransactionBuffer
            .createDeadlineVector(builder, this.deadline);
        const feeVector = AccountRestrictionsAddressTransactionBuffer
            .createFeeVector(builder, this.maxFee);
        const modificationVector = AccountRestrictionsAddressTransactionBuffer
            .createModificationsVector(builder, modificationsArray);

        AccountRestrictionsAddressTransactionBuffer.startAccountRestrictionsAddressTransactionBuffer(builder);
        AccountRestrictionsAddressTransactionBuffer.addSize(builder, 122 + (26 * this.modifications.length));
        AccountRestrictionsAddressTransactionBuffer.addSignature(builder, signatureVector);
        AccountRestrictionsAddressTransactionBuffer.addSigner(builder, signerVector);
        AccountRestrictionsAddressTransactionBuffer.addVersion(builder, this.version);
        AccountRestrictionsAddressTransactionBuffer.addType(builder, this.type);
        AccountRestrictionsAddressTransactionBuffer.addFee(builder, feeVector);
        AccountRestrictionsAddressTransactionBuffer.addDeadline(builder, deadlineVector);
        AccountRestrictionsAddressTransactionBuffer.addRestrictionType(builder, this.restrictionType);
        AccountRestrictionsAddressTransactionBuffer.addModificationCount(builder, this.modifications.length);
        AccountRestrictionsAddressTransactionBuffer.addModifications(builder, modificationVector);

        // Calculate size
        const codedAccountRestrictionsAddress =
            AccountRestrictionsAddressTransactionBuffer.endAccountRestrictionsAddressTransactionBuffer(builder);
        builder.finish(codedAccountRestrictionsAddress);

        const bytes = builder.asUint8Array();

        return new AccountRestrictionsAddressTransaction(bytes);
    }
}
