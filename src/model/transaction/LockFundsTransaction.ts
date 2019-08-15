

import { Builder } from '../../infrastructure/builders/HashLockTransaction';
import {VerifiableTransaction} from '../../infrastructure/builders/VerifiableTransaction';
import { PublicAccount } from '../account/PublicAccount';
import { NetworkType } from '../blockchain/NetworkType';
import { Mosaic } from '../mosaic/Mosaic';
import { UInt64 } from '../UInt64';
import { Deadline } from './Deadline';
import { SignedTransaction } from './SignedTransaction';
import { Transaction } from './Transaction';
import { TransactionInfo } from './TransactionInfo';
import { TransactionType } from './TransactionType';
import { TransactionVersion } from './TransactionVersion';

/**
 * Lock funds transaction is used before sending an Aggregate bonded transaction, as a deposit to announce the transaction.
 * When aggregate bonded transaction is confirmed funds are returned to LockFundsTransaction signer.
 *
 * @since 1.0
 */
export class LockFundsTransaction extends Transaction {

    /**
     * Aggregate bonded hash.
     */
    public readonly hash: string;

    /**
     * Create a Lock funds transaction object
     * @param deadline - The deadline to include the transaction.
     * @param mosaic - The locked mosaic.
     * @param duration - The funds lock duration.
     * @param signedTransaction - The signed transaction for which funds are locked.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @returns {LockFundsTransaction}
     */
    public static create(deadline: Deadline,
                         mosaic: Mosaic,
                         duration: UInt64,
                         signedTransaction: SignedTransaction,
                         networkType: NetworkType,
                         maxFee: UInt64 = new UInt64([0, 0])): LockFundsTransaction {
        return new LockFundsTransaction(
            networkType,
            TransactionVersion.LOCK,
            deadline,
            maxFee,
            mosaic,
            duration,
            signedTransaction,
        );
    }

    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param maxFee
     * @param mosaic
     * @param duration
     * @param signedTransaction
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType: NetworkType,
                version: number,
                deadline: Deadline,
                maxFee: UInt64,
                /**
                 * The locked mosaic.
                 */
                public readonly mosaic: Mosaic,
                /**
                 * The funds lock duration.
                 */
                public readonly duration: UInt64,
                signedTransaction: SignedTransaction,
                signature?: string,
                signer?: PublicAccount,
                transactionInfo?: TransactionInfo) {
        super(TransactionType.LOCK, networkType, version, deadline, maxFee, signature, signer, transactionInfo);
        this.hash = signedTransaction.hash;
        if (signedTransaction.type !== TransactionType.AGGREGATE_BONDED) {
            throw new Error('Signed transaction must be Aggregate Bonded Transaction');
        }
    }

    /**
     * @override Transaction.size()
     * @description get the byte size of a LockFundsTransaction
     * @returns {number}
     * @memberof LockFundsTransaction
     */
    public get size(): number {
        const byteSize = super.getSize();

        // set static byte size fields
        const byteMosaicId = 8;
        const byteAmount = 8;
        const byteDuration = 8;
        const byteHash = 32;

        return byteSize + byteMosaicId + byteAmount + byteDuration + byteHash;
    }

    /**
     * @internal
     * @return {VerifiableTransaction}
     */
    protected buildTransaction(): VerifiableTransaction {
        return new Builder()
            .addDeadline(this.deadline.toDTO())
            .addType(this.type)
            .addFee(this.maxFee.toDTO())
            .addVersion(this.versionToDTO())
            .addMosaicId(this.mosaic.id.id.toDTO())
            .addMosaicAmount(this.mosaic.amount.toDTO())
            .addDuration(this.duration.toDTO())
            .addHash(this.hash)
            .build();
    }

}
