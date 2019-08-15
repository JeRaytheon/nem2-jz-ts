
import {Address} from '../account/Address';
import {Alias} from './Alias';

/**
 * The AddressAlias structure describes address aliases
 *
 * @since 0.10.2
 */
export class AddressAlias implements Alias {

    /**
     * Create AddressAlias object
     *
     * @param type
     * @param content
     */
    constructor(/**
                 * The alias type
                 */
                public readonly type: number,
                /**
                 * The alias address
                 */
                public readonly address: Address) {
    }

    /**
     * Compares AddressAlias for equality.
     *
     * @return boolean
     */
    public equals(alias: any): boolean {
        if (alias instanceof AddressAlias) {
            return this.address.equals(alias.address);
        }
        return false;
    }
}
