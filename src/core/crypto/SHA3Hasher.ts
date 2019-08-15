import { keccak256, keccak512, sha3_256, sha3_512 } from 'js-sha3';
import { Convert as convert, RawArray as array } from '../format';
import { SignSchema } from './SignSchema';

export class SHA3Hasher {
    /**
     * Calculates the hash of data.
     * @param {Uint8Array} dest The computed hash destination.
     * @param {Uint8Array} data The data to hash.
     * @param {numeric} length The hash length in bytes.
     * @param {SignSchema} signSchema The Sign Schema. (KECCAK_REVERSED_KEY / SHA3)
     */
    public static func = (dest:Uint8Array, data:Uint8Array, length:any, signSchema = SignSchema.SHA3) => {
        const hasher = SHA3Hasher.getHasher(length, signSchema);
        const hash = hasher.arrayBuffer(data);
        array.copy(dest, array.uint8View(hash));
    }

    /**
     * Creates a hasher object.
     * @param {numeric} length The hash length in bytes.
     * @param {SignSchema} signSchema The Sign Schema. (KECCAK_REVERSED_KEY / SHA3)
     * @returns {object} The hasher.
     */
    public static createHasher = (length = 64, signSchema = SignSchema.SHA3) => {
        let hash:any;
        return {
            reset: () => {
                hash = SHA3Hasher.getHasher(length, signSchema).create();
            },
            update: (data: any) => {
                if (data instanceof Uint8Array) {
                    hash.update(data);
                } else if ('string' === typeof data) {
                    hash.update(convert.hexToUint8(data));
                } else {
                    throw Error('unsupported data type');
                }
            },
            finalize: (result: any) => {
                array.copy(result, array.uint8View(hash.arrayBuffer()));
            },
        };
    }

    /**
     * Get a hasher instance.
     * @param {numeric} length The hash length in bytes.
     * @param {SignSchema} signSchema The Sign Schema. (KECCAK_REVERSED_KEY / SHA3)
     * @returns {object} The hasher.
     */
    public static getHasher = (length = 64, signSchema = SignSchema.SHA3) => {
        let hasher:any = {
            32: signSchema === SignSchema.SHA3 ? sha3_256 : keccak256,
            64: signSchema === SignSchema.SHA3 ? sha3_512 : keccak512,
        }
        return hasher[length];
    }
}
