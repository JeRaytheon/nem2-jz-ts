

import {NamespaceId} from '../namespace/NamespaceId';
import {UInt64} from '../UInt64';
import {MosaicId} from './MosaicId';

/**
 * A mosaic describes an instance of a mosaic definition.
 * Mosaics can be transferred by means of a transfer transaction.
 */
export class Mosaic {

    /**
     * Constructor
     * @param id
     * @param amount
     */
    constructor(
                /**
                 * The mosaic id
                 */
                public readonly id: MosaicId|NamespaceId,
                /**
                 * The mosaic amount. The quantity is always given in smallest units for the mosaic
                 * i.e. if it has a divisibility of 3 the quantity is given in millis.
                 */
                public readonly amount: UInt64) {

    }

    /**
     * @internal
     * @returns {{amount: number[], id: number[]}}
     */
    public toDTO() {
        return {
            amount: this.amount.toDTO(),
            id: this.id.id.toDTO(),
        };
    }

}
