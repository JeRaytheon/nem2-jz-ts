import { SignSchema } from '../../core/crypto';
import { Convert } from '../../core/format/Convert';
import {CosignatureTransaction as CosignaturetransactionLibrary} from '../../infrastructure/builders/CosignatureTransaction';
import { VerifiableTransaction } from '../../infrastructure/builders/VerifiableTransaction';
import {Account} from '../account/Account';
import {AggregateTransaction} from './AggregateTransaction';
import {CosignatureSignedTransaction} from './CosignatureSignedTransaction';

/**
 * Cosignature transaction is used to sign an aggregate transactions with missing cosignatures.
 */
export class CosignatureTransaction {
    /**
     * @param transactionToCosign
     */
    constructor(/**
                 * Transaction to cosign.
                 */
                public readonly transactionToCosign: AggregateTransaction) {

    }

    /**
     * Create a cosignature transaction
     * @param transactionToCosign - Transaction to cosign.
     * @returns {CosignatureTransaction}
     */
    public static create(transactionToCosign: AggregateTransaction) {
        if (transactionToCosign.isUnannounced()) {
            throw new Error('transaction to cosign should be announced first');
        }
        return new CosignatureTransaction(transactionToCosign);
    }

    /**
     * Co-sign transaction with transaction payload (off chain)
     * Creating a new CosignatureSignedTransaction
     * @param account - The signing account
     * @param payload - off transaction payload (aggregated transaction is unannounced)
     * @param generationHash - Network generation hash
     * @param {SignSchema} signSchema The Sign Schema. (KECCAK_REVERSED_KEY / SHA3)
     * @returns {CosignatureSignedTransaction}
     */
    public static signTransactionPayload(account: Account,
                                         payload: string,
                                         generationHash: string,
                                         signSchema: SignSchema = SignSchema.SHA3): CosignatureSignedTransaction {
        /**
         * For aggregated complete transaction, cosignatories are gathered off chain announced.
         */
        const transactionHash = VerifiableTransaction.createTransactionHash(payload, Array.from(Convert.hexToUint8(generationHash)));
        const aggregateSignatureTransaction = new CosignaturetransactionLibrary(transactionHash);
        const signedTransactionRaw = aggregateSignatureTransaction.signCosignatoriesTransaction(account, signSchema);
        return new CosignatureSignedTransaction(signedTransactionRaw.parentHash,
            signedTransactionRaw.signature,
            signedTransactionRaw.signer);
    }

    /**
     * @internal
     * Serialize and sign transaction creating a new SignedTransaction
     * @param account
     * @param {SignSchema} signSchema The Sign Schema. (KECCAK_REVERSED_KEY / SHA3)
     * @returns {CosignatureSignedTransaction}
     */
    public signWith(account: Account, signSchema: SignSchema = SignSchema.SHA3): CosignatureSignedTransaction {
        const aggregateSignatureTransaction = new CosignaturetransactionLibrary(this.transactionToCosign.transactionInfo!.hash);
        const signedTransactionRaw = aggregateSignatureTransaction.signCosignatoriesTransaction(account, signSchema);
        return new CosignatureSignedTransaction(signedTransactionRaw.parentHash,
            signedTransactionRaw.signature,
            signedTransactionRaw.signer);
    }
}
