

import { Convert as convert } from '../../core/format';
import { Builder } from '../../infrastructure/builders/NamespaceCreationTransaction';
import {VerifiableTransaction} from '../../infrastructure/builders/VerifiableTransaction';
import {NamespaceMosaicIdGenerator} from '../../infrastructure/transaction/NamespaceMosaicIdGenerator';
import { PublicAccount } from '../account/PublicAccount';
import { NetworkType } from '../blockchain/NetworkType';
import { NamespaceId } from '../namespace/NamespaceId';
import { NamespaceType } from '../namespace/NamespaceType';
import { UInt64 } from '../UInt64';
import { Deadline } from './Deadline';
import { Transaction } from './Transaction';
import { TransactionInfo } from './TransactionInfo';
import { TransactionType } from './TransactionType';
import { TransactionVersion } from './TransactionVersion';

/**
 * Accounts can rent a namespace for an amount of blocks and after a this renew the contract.
 * This is done via a RegisterNamespaceTransaction.
 */
export class RegisterNamespaceTransaction extends Transaction {

    /**
     * Create a root namespace object
     * @param deadline - The deadline to include the transaction.
     * @param namespaceName - The namespace name.
     * @param duration - The duration of the namespace.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @returns {RegisterNamespaceTransaction}
     */
    public static createRootNamespace(deadline: Deadline,
                                      namespaceName: string,
                                      duration: UInt64,
                                      networkType: NetworkType,
                                      maxFee: UInt64 = new UInt64([0, 0])): RegisterNamespaceTransaction {
        return new RegisterNamespaceTransaction(networkType,
            TransactionVersion.REGISTER_NAMESPACE,
            deadline,
            maxFee,
            NamespaceType.RootNamespace,
            namespaceName,
            new NamespaceId(namespaceName),
            duration,
        );
    }

    /**
     * Create a sub namespace object
     * @param deadline - The deadline to include the transaction.
     * @param namespaceName - The namespace name.
     * @param parentNamespace - The parent namespace name.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @returns {RegisterNamespaceTransaction}
     */
    public static createSubNamespace(deadline: Deadline,
                                     namespaceName: string,
                                     parentNamespace: string | NamespaceId,
                                     networkType: NetworkType,
                                     maxFee: UInt64 = new UInt64([0, 0])): RegisterNamespaceTransaction {
        let parentId: NamespaceId;
        if (typeof parentNamespace === 'string') {
            parentId = new NamespaceId(NamespaceMosaicIdGenerator.subnamespaceParentId(parentNamespace, namespaceName));
        } else {
            parentId = parentNamespace;
        }
        return new RegisterNamespaceTransaction(networkType,
            TransactionVersion.REGISTER_NAMESPACE,
            deadline,
            maxFee,
            NamespaceType.SubNamespace,
            namespaceName,
            typeof parentNamespace === 'string' ?
                new NamespaceId(NamespaceMosaicIdGenerator.subnamespaceNamespaceId(parentNamespace, namespaceName)) :
                new NamespaceId(NamespaceMosaicIdGenerator.namespaceId(namespaceName)),
            undefined,
            parentId,
        );
    }

    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param maxFee
     * @param namespaceType
     * @param namespaceName
     * @param namespaceId
     * @param duration
     * @param parentId
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType: NetworkType,
                version: number,
                deadline: Deadline,
                maxFee: UInt64,
                /**
                 * The namespace type could be namespace or sub namespace
                 */
                public readonly namespaceType: NamespaceType,
                /**
                 * The namespace name
                 */
                public readonly namespaceName: string,
                /**
                 * The id of the namespace derived from namespaceName.
                 * When creating a sub namespace the namespaceId is derived from namespaceName and parentName.
                 */
                public readonly namespaceId: NamespaceId,
                /**
                 * The number of blocks a namespace is active
                 */
                public readonly duration?: UInt64,
                /**
                 * The id of the parent sub namespace
                 */
                public readonly parentId?: NamespaceId,
                signature?: string,
                signer?: PublicAccount,
                transactionInfo?: TransactionInfo) {
        super(TransactionType.REGISTER_NAMESPACE, networkType, version, deadline, maxFee, signature, signer, transactionInfo);
    }

    /**
     * @override Transaction.size()
     * @description get the byte size of a RegisterNamespaceTransaction
     * @returns {number}
     * @memberof RegisterNamespaceTransaction
     */
    public get size(): number {
        const byteSize = super.getSize();

        // set static byte size fields
        const byteType = 1;
        const byteDurationParentId = 8;
        const byteNamespaceId = 8;
        const byteNameSize = 1;

        // convert name to uint8
        const byteName = convert.utf8ToHex(this.namespaceName).length / 2;

        return byteSize + byteType + byteDurationParentId + byteNamespaceId + byteNameSize + byteName;
    }

    /**
     * @internal
     * @returns {VerifiableTransaction}
     */
    protected buildTransaction(): VerifiableTransaction {
        let registerNamespacetransaction = new Builder()
            .addDeadline(this.deadline.toDTO())
            .addFee(this.maxFee.toDTO())
            .addVersion(this.versionToDTO())
            .addNamespaceType(this.namespaceType)
            .addNamespaceId(this.namespaceId.id.toDTO())
            .addNamespaceName(this.namespaceName);

        if (this.namespaceType === NamespaceType.RootNamespace) {
            registerNamespacetransaction = registerNamespacetransaction.addDuration(this.duration!.toDTO());
        } else {
            registerNamespacetransaction = registerNamespacetransaction.addParentId(this.parentId!.id.toDTO());
        }

        return registerNamespacetransaction.build();
    }

}
