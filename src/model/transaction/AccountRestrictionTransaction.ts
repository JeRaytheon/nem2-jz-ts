

import { RestrictionType } from '../account/RestrictionType';
import { NetworkType } from '../blockchain/NetworkType';
import { UInt64 } from '../UInt64';
import { AccountAddressRestrictionModificationTransaction } from './AccountAddressRestrictionModificationTransaction';
import { AccountMosaicRestrictionModificationTransaction } from './AccountMosaicRestrictionModificationTransaction';
import { AccountOperationRestrictionModificationTransaction } from './AccountOperationRestrictionModificationTransaction';
import { AccountRestrictionModification } from './AccountRestrictionModification';
import { Deadline } from './Deadline';
import { TransactionType } from './TransactionType';

export class AccountRestrictionTransaction {
    /**
     * Create an account address restriction transaction object
     * @param deadline - The deadline to include the transaction.
     * @param restrictionType - Type of account restriction transaction
     * @param modification - array of address modifications
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @returns {AccountAddressRestrictionModificationTransaction}
     */
    public static createAddressRestrictionModificationTransaction(
        deadline: Deadline,
        restrictionType: RestrictionType,
        modifications: Array<AccountRestrictionModification<string>>,
        networkType: NetworkType,
        maxFee: UInt64 = new UInt64([0, 0]),
    ): AccountAddressRestrictionModificationTransaction {
        if (![RestrictionType.AllowAddress, RestrictionType.BlockAddress].includes(restrictionType)) {
            throw new Error ('Restriction type is not allowed.');
        }
        return AccountAddressRestrictionModificationTransaction.create(
            deadline,
            restrictionType,
            modifications,
            networkType,
            maxFee,
        );
    }

    /**
     * Create an account mosaic restriction transaction object
     * @param deadline - The deadline to include the transaction.
     * @param restrictionType - Type of account restriction transaction
     * @param modification - array of mosaic modifications
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @returns {AccountMosaicRestrictionModificationTransaction}
     */
    public static createMosaicRestrictionModificationTransaction(
        deadline: Deadline,
        restrictionType: RestrictionType,
        modifications: Array<AccountRestrictionModification<number[]>>,
        networkType: NetworkType,
        maxFee: UInt64 = new UInt64([0, 0]),
    ): AccountMosaicRestrictionModificationTransaction {
        if (![RestrictionType.AllowMosaic, RestrictionType.BlockMosaic].includes(restrictionType)) {
            throw new Error ('Restriction type is not allowed.');
        }
        return AccountMosaicRestrictionModificationTransaction.create(
            deadline,
            restrictionType,
            modifications,
            networkType,
            maxFee,
        );
    }

    /**
     * Create an account operation restriction transaction object
     * @param deadline - The deadline to include the transaction.
     * @param restrictionType - Type of account restriction transaction
     * @param modification - array of operation modifications
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @returns {createOperationRestrictionModificationTransaction}
     */
    public static createOperationRestrictionModificationTransaction(
        deadline: Deadline,
        restrictionType: RestrictionType,
        modifications: Array<AccountRestrictionModification<TransactionType>>,
        networkType: NetworkType,
        maxFee: UInt64 = new UInt64([0, 0]),
    ): AccountOperationRestrictionModificationTransaction {
        if (![RestrictionType.AllowTransaction, RestrictionType.BlockTransaction].includes(restrictionType)) {
            throw new Error ('Restriction type is not allowed.');
        }
        return AccountOperationRestrictionModificationTransaction.create(
            deadline,
            restrictionType,
            modifications,
            networkType,
            maxFee,
        );
    }
}
