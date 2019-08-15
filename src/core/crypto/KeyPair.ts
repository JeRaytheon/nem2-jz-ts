import { Convert as convert } from '../format';
import { SignSchema } from './SignSchema';
import * as Utility from './Utilities';

export class KeyPair {
    /**
     * Creates a key pair from a private key string.
     * @param {string} privateKeyString A hex encoded private key string.
     * @param {SignSchema} signSchema The Sign Schema. (KECCAK_REVERSED_KEY / SHA3)
     * @returns {module:crypto/keyPair~KeyPair} The key pair.
     */
    public static createKeyPairFromPrivateKeyString = (privateKeyString:string, signSchema = SignSchema.SHA3) => {
        const privateKey = convert.hexToUint8(privateKeyString);

        // KECCAK_REVERSED_KEY uses reversed private key.
        const secretKey = signSchema === SignSchema.SHA3 ? privateKey : convert.hexToUint8Reverse(privateKeyString);
        if (Utility.Key_Size !== privateKey.length) {
            throw Error(`private key has unexpected size: ${privateKey.length}`);
        }
        const publicKey = Utility.catapult_crypto.extractPublicKey(secretKey, Utility.catapult_hash.func, signSchema);
        return {
            privateKey,
            publicKey,
        };
    }

    /**
     * Signs a data buffer with a key pair.
     * @param {module:crypto/keyPair~KeyPair} keyPair The key pair to use for signing.
     * @param {Uint8Array} data The data to sign.
     * @param {SignSchema} signSchema The Sign Schema. (KECCAK_REVERSED_KEY / SHA3)
     * @returns {Uint8Array} The signature.
     */
    public static sign = (keyPair:any, data:Uint8Array, signSchema = SignSchema.SHA3) => {
        let secretKey = keyPair.privateKey;
        // KECCAK_REVERSED_KEY uses reversed private key.
        if (signSchema === SignSchema.KECCAK_REVERSED_KEY) {
            secretKey = convert.hexToUint8Reverse(convert.uint8ToHex(secretKey));
        }
        return Utility.catapult_crypto.sign(data, keyPair.publicKey, secretKey,
                Utility.catapult_hash.createHasher(64, signSchema));
    }

    /**
     * Verifies a signature.
     * @param {module:crypto/keyPair~PublicKey} publicKey The public key to use for verification.
     * @param {Uint8Array} data The data to verify.
     * @param {Uint8Array} signature The signature to verify.
     * @param {SignSchema} signSchema The Sign Schema. (KECCAK_REVERSED_KEY / SHA3)
     * @returns {boolean} true if the signature is verifiable, false otherwise.
     */
    public static verify = (publicKey:any, data:Uint8Array, signature:Uint8Array, signSchema = SignSchema.SHA3) => {
        return Utility.catapult_crypto.verify(publicKey, data, signature, Utility.catapult_hash.createHasher(64, signSchema));
    }

    /**
     * Creates a shared key given a key pair and an arbitrary public key.
     * The shared key can be used for encrypted message passing between the two.
     * @param {module:crypto/keyPair~KeyPair} keyPair The key pair for which to create the shared key.
     * @param {Uint8Array} publicKey The public key for which to create the shared key.
     * @param {Uint8Array} salt A salt that should be applied to the shared key.
     * @param {SignSchema} signSchema The Sign Schema. (KECCAK_REVERSED_KEY / SHA3)
     * @returns {Uint8Array} The shared key.
     */
    public static deriveSharedKey = (keyPair:any, publicKey:Uint8Array, salt:Uint8Array, signSchema = SignSchema.SHA3) => {
        if (Utility.Key_Size !== salt.length) {
            throw Error(`salt has unexpected size: ${salt.length}`);
        }
        if (Utility.Key_Size !== publicKey.length) {
            throw Error(`public key has unexpected size: ${salt.length}`);
        }
        let secretKey = keyPair.privateKey;
        // KECCAK_REVERSED_KEY uses reversed private key.
        if (signSchema === SignSchema.KECCAK_REVERSED_KEY) {
            secretKey = convert.hexToUint8Reverse(convert.uint8ToHex(secretKey));
        }
        return Utility.catapult_crypto.deriveSharedKey(salt, secretKey, publicKey, Utility.catapult_hash.func, signSchema);
    }
}
