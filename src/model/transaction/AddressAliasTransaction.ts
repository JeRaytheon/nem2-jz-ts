import { Builder } from '../../infrastructure/builders/AddressAliasTransaction';
import { VerifiableTransaction } from '../../infrastructure/builders/VerifiableTransaction';
import { Address } from '../account/Address';
import { PublicAccount } from '../account/PublicAccount';
import { NetworkType } from '../blockchain/NetworkType';
import { AliasAction } from '../namespace/AliasAction';
import { NamespaceId } from '../namespace/NamespaceId';
import { UInt64 } from '../UInt64';
import { Deadline } from './Deadline';
import { Transaction } from './Transaction';
import { TransactionInfo } from './TransactionInfo';
import { TransactionType } from './TransactionType';
import { TransactionVersion } from './TransactionVersion';

/**
 * In case a mosaic has the flag 'supplyMutable' set to true, the creator of the mosaic can change the supply,
 * i.e. increase or decrease the supply.
 */
export class AddressAliasTransaction extends Transaction {

    /**
     * Create a address alias transaction object
     * @param deadline - The deadline to include the transaction.
     * @param aliasAction - The alias action type.
     * @param namespaceId - The namespace id.
     * @param address - The address.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @returns {AddressAliasTransaction}
     */
    public static create(deadline: Deadline,
                         aliasAction: AliasAction,
                         namespaceId: NamespaceId,
                         address: Address,
                         networkType: NetworkType,
                         maxFee: UInt64 = new UInt64([0, 0])): AddressAliasTransaction {
        return new AddressAliasTransaction(networkType,
            TransactionVersion.ADDRESS_ALIAS,
            deadline,
            maxFee,
            aliasAction,
            namespaceId,
            address,
        );
    }

    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param maxFee
     * @param aliasAction
     * @param namespaceId
     * @param address
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType: NetworkType,
                version: number,
                deadline: Deadline,
                maxFee: UInt64,
                /**
                 * The alias action type.
                 */
                public readonly aliasAction: AliasAction,
                /**
                 * The namespace id that will be an alias.
                 */
                public readonly namespaceId: NamespaceId,
                /**
                 * The mosaic id.
                 */
                public readonly address: Address,
                signature?: string,
                signer?: PublicAccount,
                transactionInfo?: TransactionInfo) {
        super(TransactionType.ADDRESS_ALIAS, networkType, version, deadline, maxFee, signature, signer, transactionInfo);
    }

    /**
     * @override Transaction.size()
     * @description get the byte size of a AddressAliasTransaction
     * @returns {number}
     * @memberof AddressAliasTransaction
     */
    public get size(): number {
        const byteSize = super.getSize();

        // set static byte size fields
        const byteActionType = 1;
        const byteNamespaceId = 8;
        const byteAddress = 25;

        return byteSize + byteActionType + byteNamespaceId + byteAddress;
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
            .addAliasAction(this.aliasAction)
            .addNamespaceId(this.namespaceId.id.toDTO())
            .addAddress(this.address.plain())
            .build();
    }

}
