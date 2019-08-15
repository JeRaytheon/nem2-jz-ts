

import {PublicAccount} from '../account/PublicAccount';
import {UInt64} from '../UInt64';
import {MosaicId} from './MosaicId';
import {MosaicProperties} from './MosaicProperties';

/**
 * The mosaic info structure describes a mosaic.
 */
export class MosaicInfo {

    /**
     * @param active
     * @param index
     * @param metaId
     * @param nonce
     * @param supply
     * @param height
     * @param owner
     * @param properties
     */
    constructor(/**
                 * The meta data id.
                 */
                public readonly metaId: string,
                /**
                 * The mosaic id.
                 */
                public readonly mosaicId: MosaicId,
                /**
                 * The mosaic supply.
                 */
                public readonly supply: UInt64,
                /**
                 * The block height were mosaic was created.
                 */
                public readonly height: UInt64,
                /**
                 * The public key of the mosaic creator.
                 */
                public readonly owner: PublicAccount,
                /**
                 * The mosaic revision
                 */
                public readonly revision: number,
                /**
                 * The mosaic properties.
                 */
                private readonly properties: MosaicProperties,
            ) {
    }

    /**
     * Mosaic divisibility
     * @returns {number}
     */
    public get divisibility(): number {
        return this.properties.divisibility;
    }

    /**
     * Mosaic duration
     * @returns {UInt64}
     */
    public get duration(): UInt64 | undefined {
        return this.properties.duration;
    }

    /**
     * Is mosaic supply mutable
     * @returns {boolean}
     */
    public isSupplyMutable(): boolean {
        return this.properties.supplyMutable;
    }

    /**
     * Is mosaic transferable
     * @returns {boolean}
     */
    public isTransferable(): boolean {
        return this.properties.transferable;
    }

    /**
     * Is mosaic restrictable
     * @returns {boolean}
     */
    public isRestrictable(): boolean {
        return this.properties.restrictable;
    }
}
