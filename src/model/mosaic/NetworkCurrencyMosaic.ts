

import {NamespaceId} from '../namespace/NamespaceId';
import {UInt64} from '../UInt64';
import {Mosaic} from './Mosaic';
import {MosaicId} from './MosaicId';

/**
 * NetworkCurrencyMosaic mosaic
 * 
 * This represents the per-network currency mosaic. This mosaicId is aliased
 * with namespace name `cat.currency`.
 * 
 * @since 0.10.2
 */
export class NetworkCurrencyMosaic extends Mosaic {

    /**
     * namespaceId of `currency` namespace.
     *
     * @type {Id}
     */
    public static NAMESPACE_ID = new NamespaceId('cat.currency');

    /**
     * Divisiblity
     * @type {number}
     */
    public static DIVISIBILITY = 6;

    /**
     * Initial supply
     * @type {number}
     */
    public static INITIAL_SUPPLY = 8999999998;

    /**
     * Is tranferable
     * @type {boolean}
     */
    public static TRANSFERABLE = true;

    /**
     * Is Supply mutable
     * @type {boolean}
     */
    public static SUPPLY_MUTABLE = false;

    /**
     * constructor
     * @param owner
     * @param amount
     */
    private constructor(amount: UInt64) {
        super(NetworkCurrencyMosaic.NAMESPACE_ID, amount);
    }

    /**
     * Create NetworkCurrencyMosaic with using NetworkCurrencyMosaic as unit.
     *
     * @param amount
     * @returns {NetworkCurrencyMosaic}
     */
    public static createRelative(amount: UInt64 | number) {
        if (typeof amount === 'number') {
            return new NetworkCurrencyMosaic(UInt64.fromUint(amount * Math.pow(10, NetworkCurrencyMosaic.DIVISIBILITY)));
        }
        return new NetworkCurrencyMosaic(UInt64.fromUint((amount as UInt64).compact() * Math.pow(10, NetworkCurrencyMosaic.DIVISIBILITY)));
    }

    /**
     * Create NetworkCurrencyMosaic with using micro NetworkCurrencyMosaic as unit,
     * 1 NetworkCurrencyMosaic = 1000000 micro NetworkCurrencyMosaic.
     *
     * @param amount
     * @returns {NetworkCurrencyMosaic}
     */
    public static createAbsolute(amount: UInt64 | number) {
        if (typeof amount === 'number') {
            return new NetworkCurrencyMosaic(UInt64.fromUint(amount));
        }
        return new NetworkCurrencyMosaic(amount as UInt64);
    }
}
