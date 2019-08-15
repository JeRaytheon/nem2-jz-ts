import { Convert as convert } from '../../core/format';
import { TransactionType } from '../../model/transaction/TransactionType';
import AccountLinkTransactionBufferPackage from '../buffers/AccountLinkTransactionBuffer';
import AccountLinkTransactionSchema from '../schemas/AccountLinkTransactionSchema';
import {VerifiableTransaction} from './VerifiableTransaction';

import {flatbuffers} from 'flatbuffers';

const {
    AccountLinkTransactionBuffer,
} = AccountLinkTransactionBufferPackage.Buffers;

export class AccountLinkTransaction extends VerifiableTransaction {
    constructor(bytes:any) {
        super(bytes, AccountLinkTransactionSchema);
    }
}

// tslint:disable-next-line:max-classes-per-file
export class Builder {
    maxFee: any;
    version: any;
    type: any;
    deadline: any;
    remoteAccountKey: any;
    linkAction: any;
    constructor() {
        this.maxFee = [0, 0];
        this.type = TransactionType.LINK_ACCOUNT;
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

    addRemoteAccountKey(remoteAccountKey:any) {
        this.remoteAccountKey = convert.hexToUint8(remoteAccountKey);
        return this;
    }

    addLinkAction(linkAction:any) {
        this.linkAction = linkAction;
        return this;
    }
    build() {
        const builder = new flatbuffers.Builder(1);

        // Create vectors
        const signatureVector = AccountLinkTransactionBuffer
            .createSignatureVector(builder, Array(...Array(64)).map(Number.prototype.valueOf, 0));
        const signerVector = AccountLinkTransactionBuffer.createSignerVector(builder, Array(...Array(32)).map(Number.prototype.valueOf, 0));
        const deadlineVector = AccountLinkTransactionBuffer.createDeadlineVector(builder, this.deadline);
        const feeVector = AccountLinkTransactionBuffer.createFeeVector(builder, this.maxFee);
        const remoteAccountKeyVector = AccountLinkTransactionBuffer.createRemoteAccountKeyVector(builder, this.remoteAccountKey);

        AccountLinkTransactionBuffer.startAccountLinkTransactionBuffer(builder);
        AccountLinkTransactionBuffer.addSize(builder, 153);
        AccountLinkTransactionBuffer.addSignature(builder, signatureVector);
        AccountLinkTransactionBuffer.addSigner(builder, signerVector);
        AccountLinkTransactionBuffer.addVersion(builder, this.version);
        AccountLinkTransactionBuffer.addType(builder, this.type);
        AccountLinkTransactionBuffer.addFee(builder, feeVector);
        AccountLinkTransactionBuffer.addDeadline(builder, deadlineVector);
        AccountLinkTransactionBuffer.addRemoteAccountKey(builder, remoteAccountKeyVector);
        AccountLinkTransactionBuffer.addLinkAction(builder, this.linkAction);

        // Calculate size

        const codedTransfer = AccountLinkTransactionBuffer.endAccountLinkTransactionBuffer(builder);
        builder.finish(codedTransfer);

        const bytes = builder.asUint8Array();
        return new AccountLinkTransaction(bytes);
    }
}
