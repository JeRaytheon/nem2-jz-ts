

import {MosaicInfo} from '../model/mosaic/MosaicInfo';
import {UInt64} from '../model/UInt64';

/**
 * Class representing mosaic view information with amount
 */
export class MosaicAmountView {

    /**
     * @param mosaicInfo
     * @param namespaceName
     * @param mosaicName
     * @param amount
     */
    constructor(/**
                 * The mosaic information
                 */
                public readonly mosaicInfo: MosaicInfo,
                /**
                 * The amount of absolute mosaics we have
                 */
                public readonly amount: UInt64) {

    }

    /**
     * Relative amount dividing amount by the divisibility
     * @returns {string}
     */
    public relativeAmount(): number {
        if (this.mosaicInfo.divisibility === 0) {
            return this.amount.compact();
        }
        return this.amount.compact() / Math.pow(10, this.mosaicInfo.divisibility);
    }

    /**
     * Namespace and mosaic description
     * @returns {string}
     */
    public fullName(): string {
        return this.mosaicInfo.mosaicId.toHex();
    }
}
