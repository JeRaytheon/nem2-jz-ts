

import { AccountAddressRestrictionModificationTransaction } from '../../model/transaction/AccountAddressRestrictionModificationTransaction';
import { AccountLinkTransaction } from '../../model/transaction/AccountLinkTransaction';
import { AccountMosaicRestrictionModificationTransaction } from '../../model/transaction/AccountMosaicRestrictionModificationTransaction';
import { AccountOperationRestrictionModificationTransaction } from '../../model/transaction/AccountOperationRestrictionModificationTransaction';
import { AddressAliasTransaction } from '../../model/transaction/AddressAliasTransaction';
import { AggregateTransaction } from '../../model/transaction/AggregateTransaction';
import { LockFundsTransaction } from '../../model/transaction/LockFundsTransaction';
import { ModifyMultisigAccountTransaction } from '../../model/transaction/ModifyMultisigAccountTransaction';
import { MosaicAddressRestrictionTransaction } from '../../model/transaction/MosaicAddressRestrictionTransaction';
import { MosaicAliasTransaction } from '../../model/transaction/MosaicAliasTransaction';
import { MosaicDefinitionTransaction } from '../../model/transaction/MosaicDefinitionTransaction';
import { MosaicGlobalRestrictionTransaction } from '../../model/transaction/MosaicGlobalRestrictionTransaction';
import { MosaicSupplyChangeTransaction } from '../../model/transaction/MosaicSupplyChangeTransaction';
import { RegisterNamespaceTransaction } from '../../model/transaction/RegisterNamespaceTransaction';
import { SecretLockTransaction } from '../../model/transaction/SecretLockTransaction';
import { SecretProofTransaction } from '../../model/transaction/SecretProofTransaction';
import { Transaction } from '../../model/transaction/Transaction';
import { TransactionType } from '../../model/transaction/TransactionType';
import { TransferTransaction } from '../../model/transaction/TransferTransaction';

/**
 * @internal
 * @param transaction - The transaction class object
 * @returns JSON object
 * @constructor
 */
export const SerializeTransactionToJSON = (transaction: Transaction): any => {
    switch (transaction.type) {
        case TransactionType.LINK_ACCOUNT:
            return {
                remoteAccountKey: (transaction as AccountLinkTransaction).remoteAccountKey,
                action: (transaction as AccountLinkTransaction).linkAction,
            };
        case TransactionType.ADDRESS_ALIAS:
            return {
                action: (transaction as AddressAliasTransaction).actionType,
                namespaceId: (transaction as AddressAliasTransaction).namespaceId.toDTO(),
                address: (transaction as AddressAliasTransaction).address.toDTO(),
            };
        case TransactionType.AGGREGATE_BONDED:
        case TransactionType.AGGREGATE_COMPLETE:
            return {
                transactions: (transaction as AggregateTransaction).innerTransactions.map((innerTransaction) => {
                    return innerTransaction.toJSON();
                }),
                cosignatures: (transaction as AggregateTransaction).cosignatures.map((cosignature) => {
                    return cosignature.toDTO();
                }),
            };
        case TransactionType.LOCK:
            return {
                mosaicId: (transaction as LockFundsTransaction).mosaic.id.id,
                amount: (transaction as LockFundsTransaction).mosaic.amount.toDTO(),
                duration: (transaction as LockFundsTransaction).duration.toDTO(),
                hash: (transaction as LockFundsTransaction).hash,
            };
        case TransactionType.MODIFY_ACCOUNT_RESTRICTION_ADDRESS:
            return {
                restrictionType: (transaction as AccountAddressRestrictionModificationTransaction).restrictionType,
                modifications: (transaction as AccountAddressRestrictionModificationTransaction).
                    modifications.map((modification) => {
                        return modification.toDTO();
                    }),
            };
        case TransactionType.MODIFY_ACCOUNT_RESTRICTION_OPERATION:
            return {
                restrictionType: (transaction as AccountOperationRestrictionModificationTransaction).restrictionType,
                modifications: (transaction as AccountOperationRestrictionModificationTransaction).
                    modifications.map((modification) => {
                        return modification.toDTO();
                    }),
            };
        case TransactionType.MODIFY_ACCOUNT_RESTRICTION_MOSAIC:
            return {
                restrictionType: (transaction as AccountMosaicRestrictionModificationTransaction).restrictionType,
                modifications: (transaction as AccountMosaicRestrictionModificationTransaction).modifications.map((modification) => {
                        return modification.toDTO();
                    }),
            };
        case TransactionType.MODIFY_MULTISIG_ACCOUNT:
            return {
                minApprovalDelta: (transaction as ModifyMultisigAccountTransaction).minApprovalDelta,
                minRemovalDelta: (transaction as ModifyMultisigAccountTransaction).minRemovalDelta,
                modifications: (transaction as ModifyMultisigAccountTransaction).modifications.map((modification) => {
                        return modification.toDTO();
                    }),
            };
        case TransactionType.MOSAIC_ALIAS:
            return {
                action: (transaction as MosaicAliasTransaction).actionType,
                namespaceId: (transaction as MosaicAliasTransaction).namespaceId.toDTO(),
                mosaicId: (transaction as MosaicAliasTransaction).mosaicId.toDTO(),
            };
        case TransactionType.MOSAIC_DEFINITION:
            return {
                nonce: (transaction as MosaicDefinitionTransaction).nonce,
                mosaicId: (transaction as MosaicDefinitionTransaction).mosaicId.toDTO(),
                properties: (transaction as MosaicDefinitionTransaction).mosaicProperties.toDTO(),
            };
        case TransactionType.MOSAIC_SUPPLY_CHANGE:
            return {
                mosaicId: (transaction as MosaicSupplyChangeTransaction).mosaicId.toDTO(),
                direction: (transaction as MosaicSupplyChangeTransaction).direction,
                delta: (transaction as MosaicSupplyChangeTransaction).delta.toDTO(),
            };
        case TransactionType.REGISTER_NAMESPACE:
            const registerNamespaceDuration = (transaction as RegisterNamespaceTransaction).duration;
            const registerNamespaceParentId = (transaction as RegisterNamespaceTransaction).parentId;

            const jsonObject = {
                namespaceType: (transaction as RegisterNamespaceTransaction).namespaceType,
                namespaceName: (transaction as RegisterNamespaceTransaction).namespaceName,
                namespaceId: (transaction as RegisterNamespaceTransaction).namespaceId.toDTO(),
            };

            if (registerNamespaceDuration) {
                Object.assign(jsonObject, {duration: registerNamespaceDuration.toDTO()});
            }
            if (registerNamespaceParentId) {
                Object.assign(jsonObject, {parentId: registerNamespaceParentId.toDTO()});
            }
            return jsonObject;
        case TransactionType.SECRET_LOCK:
            return {
                mosaicId: (transaction as SecretLockTransaction).mosaic.id.id,
                amount: (transaction as SecretLockTransaction).mosaic.amount.toDTO(),
                duration: (transaction as SecretLockTransaction).duration.toDTO(),
                hashAlgorithm: (transaction as SecretLockTransaction).hashType,
                secret: (transaction as SecretLockTransaction).secret,
                recipient: (transaction as SecretLockTransaction).recipient.toDTO(),
            };
        case TransactionType.SECRET_PROOF:
            return {
                hashAlgorithm: (transaction as SecretProofTransaction).hashType,
                secret: (transaction as SecretProofTransaction).secret,
                recipient: (transaction as SecretProofTransaction).recipient.toDTO(),
                proof: (transaction as SecretProofTransaction).proof,
            };
        case TransactionType.TRANSFER:
            return {
                recipient: (transaction as TransferTransaction).recipient.toDTO(),
                mosaics: (transaction as TransferTransaction).mosaics.map((mosaic) => {
                    return mosaic.toDTO();
                }),
                message: (transaction as TransferTransaction).message.toDTO(),
            };
        case TransactionType.MOSAIC_GLOBAL_RESTRICTION:
            return {
                mosaicId: (transaction as MosaicGlobalRestrictionTransaction).mosaicId.toDTO(),
                referenceMosaicId: (transaction as MosaicGlobalRestrictionTransaction).referenceMosaicId.toDTO(),
                restrictionKey: (transaction as MosaicGlobalRestrictionTransaction).restrictionKey.toDTO(),
                previousRestrictionValue: (transaction as MosaicGlobalRestrictionTransaction).previousRestrictionValue.toDTO(),
                previousRestrictionType: (transaction as MosaicGlobalRestrictionTransaction).previousRestrictionType,
                newRestrictionValue: (transaction as MosaicGlobalRestrictionTransaction).newRestrictionValue.toDTO(),
                newRestrictionType: (transaction as MosaicGlobalRestrictionTransaction).newRestrictionType,
            };
        case TransactionType.MOSAIC_ADDRESS_RESTRICTION:
            return {
                mosaicId: (transaction as MosaicAddressRestrictionTransaction).mosaicId.toDTO(),
                restrictionKey: (transaction as MosaicAddressRestrictionTransaction).restrictionKey.toDTO(),
                targetAddress: (transaction as MosaicAddressRestrictionTransaction).targetAddress.toDTO(),
                previousRestrictionValue: (transaction as MosaicAddressRestrictionTransaction).previousRestrictionValue.toDTO(),
                newRestrictionValue: (transaction as MosaicAddressRestrictionTransaction).newRestrictionValue.toDTO(),

            };
        default:
            throw new Error ('Transaction type not implemented yet.');
    }

};
