
import {NamespaceId} from '../namespace/NamespaceId';
import {UInt64} from '../UInt64';
import {Mosaic} from './Mosaic';
import {MosaicId} from './MosaicId';

/**
 * NetworkHarvestMosaic mosaic
 *
 * This represents the per-network harvest mosaic. This mosaicId is aliased
 * with namespace name `cat.harvest`.
 *
 * @since 0.10.2
 */
export class NetworkHarvestMosaic extends Mosaic {

    /**
     * namespaceId of `currency` namespace.
     *
     * @type {Id}
     */
    public static NAMESPACE_ID = new NamespaceId('cat.harvest');

    /**
     * Divisiblity
     * @type {number}
     */
    public static DIVISIBILITY = 3;

    /**
     * Initial supply
     * @type {number}
     */
    public static INITIAL_SUPPLY = 15000000;

    /**
     * Is tranferable
     * @type {boolean}
     */
    public static TRANSFERABLE = true;

    /**
     * Is Supply mutable
     * @type {boolean}
     */
    public static SUPPLY_MUTABLE = true;

    /**
     * constructor
     * @param owner
     * @param amount
     */
    private constructor(amount: UInt64) {
        super(NetworkHarvestMosaic.NAMESPACE_ID, amount);
    }

    /**
     * Create NetworkHarvestMosaic with using NetworkHarvestMosaic as unit.
     *
     * @param amount
     * @returns {NetworkHarvestMosaic}
     */
    public static createRelative(amount: UInt64 | number) {
        if (typeof amount === 'number') {
            return new NetworkHarvestMosaic(UInt64.fromUint(amount * Math.pow(10, NetworkHarvestMosaic.DIVISIBILITY)));
        }
        return new NetworkHarvestMosaic(UInt64.fromUint((amount as UInt64).compact() * Math.pow(10, NetworkHarvestMosaic.DIVISIBILITY)));
    }

    /**
     * Create NetworkHarvestMosaic with using micro NetworkHarvestMosaic as unit,
     * 1 NetworkHarvestMosaic = 1000000 micro NetworkHarvestMosaic.
     *
     * @param amount
     * @returns {NetworkHarvestMosaic}
     */
    public static createAbsolute(amount: UInt64 | number) {
        if (typeof amount === 'number') {
            return new NetworkHarvestMosaic(UInt64.fromUint(amount));
        }
        return new NetworkHarvestMosaic(amount as UInt64);
    }
}
