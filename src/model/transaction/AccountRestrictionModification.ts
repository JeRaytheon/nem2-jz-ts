

import { Address } from '../account/Address';
import { RestrictionModificationType } from '../account/RestrictionModificationType';
import { MosaicId } from '../mosaic/MosaicId';
import { TransactionType } from './TransactionType';

export class AccountRestrictionModification<T> {

    /**
     * Constructor
     * @param modificationType
     * @param value
     */
    constructor(
                /**
                 * Modification type.
                 */
                public readonly modificationType: RestrictionModificationType,
                /**
                 * Modification value (Address, Mosaic or Transaction Type).
                 */
                public readonly value: T) {

    }

    /**
     * Create an address filter for account restriction modification
     * @param modificationType - modification type. 0: Add, 1: Remove
     * @param address - modification value (Address)
     * @returns {AccountRestrictionModification}
     */
    public static createForAddress(modificationType: RestrictionModificationType,
                                   address: Address): AccountRestrictionModification<string> {
        return new AccountRestrictionModification<string>(modificationType, address.plain());
    }
    /**
     * Create an mosaic filter for account restriction modification
     * @param modificationType - modification type. 0: Add, 1: Remove
     * @param mosaicId - modification value (Mosaic)
     * @returns {AccountRestrictionModification}
     */
    public static createForMosaic(modificationType: RestrictionModificationType,
                                  mosaicId: MosaicId): AccountRestrictionModification<number[]> {
    return new AccountRestrictionModification<number[]>(modificationType, mosaicId.id.toDTO());
    }

    /**
     * Create an operation filter for account restriction modification
     * @param modificationType - modification type. 0: Add, 1: Remove
     * @param operation - modification value (Transaction Type)
     * @returns {AccountRestrictionModification}
     */
    public static createForOperation(modificationType: RestrictionModificationType,
                                     operation: number): AccountRestrictionModification<TransactionType> {
    return new AccountRestrictionModification<TransactionType>(modificationType, operation);
    }

    /**
     * @internal
     */
    toDTO() {
        return {
            value: this.value,
            type: this.modificationType,
        };
    }
}
