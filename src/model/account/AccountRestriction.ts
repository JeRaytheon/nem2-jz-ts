

import { RestrictionType } from './RestrictionType';
/**
 * Account restriction structure describes restriction information.
 */
export class AccountRestriction {

    /**
     * Constructor
     * @param restrictionType
     * @param values
     */
    constructor(
            /**
             * Account restriction type
             */
            public readonly restrictionType: RestrictionType,
            /**
             * Restriction values.
             */
            public readonly values: object[]) {

    }

}
