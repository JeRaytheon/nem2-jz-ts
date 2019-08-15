
import {MosaicId} from '../mosaic/MosaicId';
import {Alias} from './Alias';

/**
 * The MosaicAlias structure describe mosaic aliases
 *
 * @since 0.10.2
 */
export class MosaicAlias implements Alias {

    /**
     * Create AddressAlias object
     *
     * @param type
     * @param mosaicId
     */
    constructor(/**
                 * The alias type
                 */
                public readonly type: number,
                /**
                 * The alias address
                 */
                public readonly mosaicId: MosaicId) {
    }

    /**
     * Compares AddressAlias for equality.
     *
     * @return boolean
     */
    public equals(alias: any): boolean {
        if (alias instanceof MosaicAlias) {
            return this.mosaicId.equals(alias.mosaicId);
        }
        return false;
    }

    /**
     * Get string value of mosaicId
     * @returns {string}
     */
    public toHex(): string {
        return this.mosaicId.toHex();
    }
}
