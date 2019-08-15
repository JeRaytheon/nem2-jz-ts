import { TransactionType } from '../../model/transaction/TransactionType';
import AccountRestrictionsMosaicTransactionBufferPackage from '../buffers/AccountRestrictionsMosaicTransactionBuffer';
import AccountRestrictionsMosaicModificationTransactionSchema from '../schemas/AccountRestrictionsMosaicModificationTransactionSchema';
import { VerifiableTransaction } from './VerifiableTransaction';

const {
    AccountRestrictionsMosaicTransactionBuffer,
    RestrictionMosaicModificationBuffer,
} = AccountRestrictionsMosaicTransactionBufferPackage.Buffers;

import {flatbuffers} from 'flatbuffers';

export default class AccountRestrictionsMosaicTransaction extends VerifiableTransaction {
    constructor(bytes:any) {
        super(bytes, AccountRestrictionsMosaicModificationTransactionSchema);
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
        this.type = TransactionType.MODIFY_ACCOUNT_RESTRICTION_MOSAIC;
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
            const addressModificationVector = RestrictionMosaicModificationBuffer
                .createValueVector(builder, modification.value);
            RestrictionMosaicModificationBuffer.startRestrictionMosaicModificationBuffer(builder);
            RestrictionMosaicModificationBuffer.addModificationType(builder, modification.type);
            RestrictionMosaicModificationBuffer.addValue(builder, addressModificationVector);
            modificationsArray.push(RestrictionMosaicModificationBuffer.endRestrictionMosaicModificationBuffer(builder));
        });

        // Create vectors
        const signatureVector = AccountRestrictionsMosaicTransactionBuffer
            .createSignatureVector(builder, Array(...Array(64)).map(Number.prototype.valueOf, 0));
        const signerVector = AccountRestrictionsMosaicTransactionBuffer
            .createSignerVector(builder, Array(...Array(32)).map(Number.prototype.valueOf, 0));
        const deadlineVector = AccountRestrictionsMosaicTransactionBuffer
            .createDeadlineVector(builder, this.deadline);
        const feeVector = AccountRestrictionsMosaicTransactionBuffer
            .createFeeVector(builder, this.maxFee);
        const modificationVector = AccountRestrictionsMosaicTransactionBuffer
            .createModificationsVector(builder, modificationsArray);

        AccountRestrictionsMosaicTransactionBuffer.startAccountRestrictionsMosaicTransactionBuffer(builder);
        AccountRestrictionsMosaicTransactionBuffer.addSize(builder, 122 + (9 * this.modifications.length));
        AccountRestrictionsMosaicTransactionBuffer.addSignature(builder, signatureVector);
        AccountRestrictionsMosaicTransactionBuffer.addSigner(builder, signerVector);
        AccountRestrictionsMosaicTransactionBuffer.addVersion(builder, this.version);
        AccountRestrictionsMosaicTransactionBuffer.addType(builder, this.type);
        AccountRestrictionsMosaicTransactionBuffer.addFee(builder, feeVector);
        AccountRestrictionsMosaicTransactionBuffer.addDeadline(builder, deadlineVector);
        AccountRestrictionsMosaicTransactionBuffer.addRestrictionType(builder, this.restrictionType);
        AccountRestrictionsMosaicTransactionBuffer.addModificationCount(builder, this.modifications.length);
        AccountRestrictionsMosaicTransactionBuffer.addModifications(builder, modificationVector);

        // Calculate size
        const codedAccountRestrictionsMosaic = AccountRestrictionsMosaicTransactionBuffer.endAccountRestrictionsMosaicTransactionBuffer(builder);
        builder.finish(codedAccountRestrictionsMosaic);

        const bytes = builder.asUint8Array();

        return new AccountRestrictionsMosaicTransaction(bytes);
    }
}
