
import {Crypto} from '../../core/crypto';
import { Convert as convert} from '../../core/format';
/**
 * The mosaic nonce structure
 *
 * @since 1.0
 */
export class MosaicNonce {

    /**
     * Mosaic nonce
     */
    public readonly nonce: Uint8Array;

    /**
     * Create a random MosaicNonce
     *
     * @return  {MosaicNonce}
     */
    public static createRandom(): MosaicNonce {
        const bytes = Crypto.randomBytes(4);
        const nonce = new Uint8Array(bytes);
        return new MosaicNonce(nonce);
    }

    /**
     * Create a MosaicNonce from hexadecimal notation.
     *
     * @param   hex     {string}
     * @return  {MosaicNonce}
     */
    public static createFromHex(hex: string): MosaicNonce {
        const uint8 = convert.hexToUint8(hex);

        if (uint8.length !== 4) {
            throw new Error('Expected 4 bytes for Nonce and got ' + hex.length + ' instead.');
        }

        return new MosaicNonce(uint8);
    }

    /**
     * Create MosaicNonce from Uint8Array
     *
     * @param id
     */
    constructor(nonce: Uint8Array) {
        if (nonce.length !== 4) {
            throw Error('Invalid byte size for nonce, should be 4 bytes but received ' + nonce.length);
        }

        this.nonce = nonce;
    }

    /**
     * @internal
     * @returns {[number,number,number,number]}
     */
    public toDTO(): Uint8Array {
        return this.nonce;
    }
}
