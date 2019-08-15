
import { AccountRestrictions } from './AccountRestrictions';
/**
 * Account restrictions structure describes restriction information for an account.
 */
export class AccountRestrictionsInfo {

    /**
     * Constructor
     * @param meta
     * @param accountRestrictions
     */
    constructor(
                /**
                 * meta
                 */
                public readonly meta: any,
                /**
                 * Restrictions.
                 */
                public readonly accountRestrictions: AccountRestrictions) {

    }
}
