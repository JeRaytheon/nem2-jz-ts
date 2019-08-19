
/**
 * @module transactions/AggregateTransaction
 */
import { SignSchema } from '../../core/crypto';
import { TransactionType } from '../../model/transaction/TransactionType';
import AggregateTransactionBufferPackage from '../buffers/AggregateTransactionBuffer';
import AggregateTransactionSchema from '../schemas/AggregateTransactionSchema';
import { CosignatureTransaction} from './CosignatureTransaction';
import { VerifiableTransaction } from './VerifiableTransaction';

import {flatbuffers} from 'flatbuffers';

const {
    AggregateTransactionBuffer,
} = AggregateTransactionBufferPackage.Buffers;

export class AggregateTransaction extends VerifiableTransaction {
    constructor(bytes:any ) {
        super(bytes, AggregateTransactionSchema);
    }

    signTransactionWithCosigners(initializer:any , cosigners:any , generationHash:any , signSchema: SignSchema = SignSchema.SHA3) {
        const signedTransaction = this.signTransaction(initializer, generationHash, signSchema);
        cosigners.forEach((cosigner:any ) => {
            const signatureTransaction = new CosignatureTransaction(signedTransaction.hash);
            const signatureCosignTransaction = signatureTransaction.signCosignatoriesTransaction(cosigner, signSchema);
            signedTransaction.payload = signedTransaction.payload +
                signatureCosignTransaction.signer + signatureCosignTransaction.signature;
        });

        // Calculate new size
        const size = `00000000${(signedTransaction.payload.length / 2).toString(16)}`;
        const formatedSize = size.substr(size.length - 8, size.length);
        const littleEndianSize = formatedSize.substr(6, 2) + formatedSize.substr(4, 2) +
            formatedSize.substr(2, 2) + formatedSize.substr(0, 2);

        signedTransaction.payload = littleEndianSize +
            signedTransaction.payload.substr(8, signedTransaction.payload.length - 8);

        return signedTransaction;
    }

    signTransactionGivenSignatures(initializer:any , cosignedSignedTransactions:any , generationHash:any , signSchema = SignSchema.SHA3) {
        const signedTransaction = this.signTransaction(initializer, generationHash, signSchema);
        cosignedSignedTransactions.forEach((cosignedTransaction:any ) => {
            signedTransaction.payload = signedTransaction.payload + cosignedTransaction.signer + cosignedTransaction.signature;
        });

        // Calculate new size
        const size = `00000000${(signedTransaction.payload.length / 2).toString(16)}`;
        const formatedSize = size.substr(size.length - 8, size.length);
        const littleEndianSize = formatedSize.substr(6, 2) + formatedSize.substr(4, 2) +
            formatedSize.substr(2, 2) + formatedSize.substr(0, 2);

        signedTransaction.payload = littleEndianSize +
            signedTransaction.payload.substr(8, signedTransaction.payload.length - 8);

        return signedTransaction;
    }
}
// tslint:disable-next-line:max-classes-per-file
export class Builder {
    maxFee: any;
    version: any;
    type: any;
    deadline: any;
    transactions: any;
    constructor() {
        this.maxFee = [0, 0];
        this.type = TransactionType.AGGREGATE_COMPLETE;
    }

    addFee(maxFee:any ) {
        this.maxFee = maxFee;
        return this;
    }

    addVersion(version:any ) {
        this.version = version;
        return this;
    }

    addType(type:any ) {
        this.type = type;
        return this;
    }

    addDeadline(deadline:any ) {
        this.deadline = deadline;
        return this;
    }

    addTransactions(transactions:any ) {
        let tmp:any  = [];
        for (let i = 0; i < transactions.length; ++i) {
            tmp = tmp.concat(transactions[i]);
        }

        this.transactions = tmp;
        return this;
    }

    build() {
        const builder = new flatbuffers.Builder(1);

        // Create vectors
        const signatureVector = AggregateTransactionBuffer
            .createSignatureVector(builder, Array(...Array(64))
                .map(Number.prototype.valueOf, 0));
        const signerVector = AggregateTransactionBuffer
            .createSignerVector(builder, Array(...Array(32))
                .map(Number.prototype.valueOf, 0));
        const deadlineVector = AggregateTransactionBuffer.createDeadlineVector(builder, this.deadline);
        const feeVector = AggregateTransactionBuffer.createFeeVector(builder, this.maxFee);
        const modificationsVector = AggregateTransactionBuffer.createTransactionsVector(builder, this.transactions);

        AggregateTransactionBuffer.startAggregateTransactionBuffer(builder);
        AggregateTransactionBuffer.addSize(builder, 120 + 4 + this.transactions.length);
        AggregateTransactionBuffer.addSignature(builder, signatureVector);
        AggregateTransactionBuffer.addSigner(builder, signerVector);
        AggregateTransactionBuffer.addVersion(builder, this.version);
        AggregateTransactionBuffer.addType(builder, this.type);
        AggregateTransactionBuffer.addFee(builder, feeVector);
        AggregateTransactionBuffer.addDeadline(builder, deadlineVector);
        AggregateTransactionBuffer.addTransactionsSize(builder, 0 !== this.transactions.length ? this.transactions.length : 4294967296);
        AggregateTransactionBuffer.addTransactions(builder, modificationsVector);

        // Calculate size
        const codedAggregate = AggregateTransactionBuffer.endAggregateTransactionBuffer(builder);
        builder.finish(codedAggregate);

        const bytes = builder.asUint8Array();
        return new AggregateTransaction(bytes);
    }
}
