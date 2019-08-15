

import { Builder } from '../../infrastructure/builders/AccountLinkTransaction';
import { VerifiableTransaction } from '../../infrastructure/builders/VerifiableTransaction';
import { PublicAccount } from '../account/PublicAccount';
import { NetworkType } from '../blockchain/NetworkType';
import { UInt64 } from '../UInt64';
import { Deadline } from './Deadline';
import { LinkAction } from './LinkAction';
import { Transaction } from './Transaction';
import { TransactionInfo } from './TransactionInfo';
import { TransactionType } from './TransactionType';
import { TransactionVersion } from './TransactionVersion';

/**
 * Announce an AccountLinkTransaction to delegate the account importance to a proxy account.
 * By doing so, you can enable delegated harvesting
 */
export class AccountLinkTransaction extends Transaction {
    /**
     * Create a link account transaction object
     * @param deadline - The deadline to include the transaction.
     * @param remoteAccountKey - The public key of the remote account.
     * @param linkAction - The account link action.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @returns {AccountLinkTransaction}
     */
    public static create(deadline: Deadline,
                         remoteAccountKey: string,
                         linkAction: LinkAction,
                         networkType: NetworkType,
                         maxFee: UInt64 = new UInt64([0, 0])): AccountLinkTransaction {
        return new AccountLinkTransaction(networkType,
            TransactionVersion.LINK_ACCOUNT,
            deadline,
            maxFee,
            remoteAccountKey,
            linkAction);
    }

    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param maxFee
     * @param remoteAccountKey
     * @param linkAction
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType: NetworkType,
                version: number,
                deadline: Deadline,
                maxFee: UInt64,
                /**
                 * The public key of the remote account.
                 */
                public readonly remoteAccountKey: string,
                /**
                 * The account link action.
                 */
                public readonly linkAction: LinkAction,
                signature?: string,
                signer?: PublicAccount,
                transactionInfo?: TransactionInfo) {
        super(TransactionType.LINK_ACCOUNT, networkType, version, deadline, maxFee, signature, signer, transactionInfo);
    }

    /**
     * @override Transaction.size()
     * @description get the byte size of a AccountLinkTransaction
     * @returns {number}
     * @memberof AccountLinkTransaction
     */
    public get size(): number {
        const byteSize = super.getSize();

        // set static byte size fields
        const bytePublicKey = 32;
        const byteLinkAction = 1;

        return byteSize + bytePublicKey + byteLinkAction;
    }

    /**
     * @internal
     * @returns {VerifiableTransaction}
     */
    protected buildTransaction(): VerifiableTransaction {
        return new Builder()
            .addDeadline(this.deadline.toDTO())
            .addFee(this.maxFee.toDTO())
            .addVersion(this.versionToDTO())
            .addRemoteAccountKey(this.remoteAccountKey)
            .addLinkAction(this.linkAction)
            .build();
    }

}
