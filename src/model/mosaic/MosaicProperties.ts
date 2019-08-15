

import {UInt64} from '../UInt64';
import { MosaicPropertyType } from './MosaicPropertyType';

/**
 * Mosaic properties model
 */
export class MosaicProperties {

    /**
     * The creator can choose between a definition that allows a mosaic supply change at a later point or an immutable supply.
     * Allowed values for the property are "true" and "false". The default value is "false".
     */
    public readonly supplyMutable: boolean;

    /**
     * The creator can choose if the mosaic definition should allow for transfers of the mosaic among accounts other than the creator.
     * If the property 'transferable' is set to "false", only transfer transactions
     * having the creator as sender or as recipient can transfer mosaics of that type.
     * If set to "true" the mosaics can be transferred to and from arbitrary accounts.
     * Allowed values for the property are thus "true" and "false". The default value is "true".
     */
    public readonly transferable: boolean;

    /**
     * Not all the mosaics of a given network will be subject to mosaic restrictions. The feature will only affect
     * those to which the issuer adds the "restrictable" property explicitly at the moment of its creation. This
     * property appears disabled by default, as it is undesirable for autonomous tokens like the public network currency.
     */
    public readonly restrictable: boolean;
    /**
     * @param flags
     * @param divisibility
     * @param duration
     */
    constructor(flags: UInt64,
                /**
                 * The divisibility determines up to what decimal place the mosaic can be divided into.
                 * Thus a divisibility of 3 means that a mosaic can be divided into smallest parts of 0.001 mosaics
                 * i.e. milli mosaics is the smallest sub-unit.
                 * When transferring mosaics via a transfer transaction the quantity transferred
                 * is given in multiples of those smallest parts.
                 * The divisibility must be in the range of 0 and 6. The default value is "0".
                 */
                public readonly divisibility: number,
                /**
                 * The duration in blocks a mosaic will be available.
                 * After the duration finishes mosaic is inactive and can be renewed.
                 * Duration is optional when defining the mosaic
                 */
                public readonly duration?: UInt64) {
        let binaryFlags = '00' + (flags.lower >>> 0).toString(2);
        binaryFlags = binaryFlags.substr(binaryFlags.length - 3, 3);
        this.supplyMutable = binaryFlags[2] === '1';
        this.transferable = binaryFlags[1] === '1';
        this.restrictable = binaryFlags[0] === '1';
    }

    /**
     * Static constructor function with default parameters
     * @returns {MosaicProperties}
     * @param params
     */
    public static create(params: {
        supplyMutable: boolean,
        transferable: boolean,
        divisibility: number,
        restrictable?: boolean,
        duration?: UInt64,
    }) {
        const restrictable = params.restrictable ? 4 : 0;
        const flags = (params.supplyMutable ? 1 : 0) + (params.transferable ? 2 : 0) + restrictable;
        return new MosaicProperties(UInt64.fromUint(flags), params.divisibility, params.duration);
    }

    /**
     * Create DTO object
     */
    toDTO() {
        const dto = [
            {id: MosaicPropertyType.MosaicFlags, value: UInt64.fromUint((this.supplyMutable ? 1 : 0) +
                                        (this.transferable ? 2 : 0) +
                                        (this.transferable ? 4 : 0)).toDTO()},
            {id: MosaicPropertyType.Divisibility, value: UInt64.fromUint(this.divisibility).toDTO()},
        ];

        if (this.duration !== undefined) {
            dto.push({id: MosaicPropertyType.Duration, value: this.duration.toDTO()});
        }

        return dto;
    }
}
