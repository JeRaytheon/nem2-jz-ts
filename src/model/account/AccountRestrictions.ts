
import { AccountRestriction } from './AccountRestriction';
import { Address } from './Address';
/**
 * Account restrictions structure describes restriction information for an account.
 */
export class AccountRestrictions {

    /**
     * Constructor
     * @param address
     * @param restrictions
     */
    constructor(
                /**
                 * Account Address
                 */
                public readonly address: Address,
                /**
                 * Restrictions.
                 */
                public readonly restrictions: AccountRestriction[]) {

    }
}
