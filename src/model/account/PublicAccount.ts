

import { KeyPair, SignSchema } from '../../core/crypto';
import { Convert as convert} from '../../core/format';
import { NetworkType } from '../blockchain/NetworkType';
import { Address } from './Address';

const Hash512 = 64;

/**
 * The public account structure contains account's address and public key.
 */
export class PublicAccount {

    /**
     * @internal
     * @param publicKey
     * @param address
     */
    constructor(
                /**
                 * The account public private.
                 */
                public readonly publicKey: string,
                /**
                 * The account address.
                 */
                public readonly address: Address) {

    }

    /**
     * Create a PublicAccount from a public key and network type.
     * @param publicKey Public key
     * @param networkType Network type
     * @param {SignSchema} signSchema The Sign Schema. (KECCAK_REVERSED_KEY / SHA3)
     * @returns {PublicAccount}
     */
    static createFromPublicKey(publicKey: string, networkType: NetworkType, signSchema = SignSchema.SHA3): PublicAccount {
        if (publicKey == null || (publicKey.length !== 64 && publicKey.length !== 66)) {
            throw new Error('Not a valid public key');
        }
        const address = Address.createFromPublicKey(publicKey, networkType, signSchema);
        return new PublicAccount(publicKey, address);
    }

    /**
     * Verify a signature.
     *
     * @param {string} data - The data to verify.
     * @param {string} signature - The signature to verify.
     * @param {SignSchema} signSchema The Sign Schema. (KECCAK_REVERSED_KEY / SHA3)
     * @return {boolean}  - True if the signature is valid, false otherwise.
     */
    public verifySignature(data: string, signature: string, signSchema: SignSchema = SignSchema.SHA3): boolean {
        if (!signature) {
            throw new Error('Missing argument');
        }

        if (signature.length / 2 !== Hash512) {
            throw new Error('Signature length is incorrect');
        }

        if (!convert.isHexString(signature)) {
            throw new Error('Signature must be hexadecimal only');
        }
        // Convert signature key to Uint8Array
        const convertedSignature = convert.hexToUint8(signature);

        // Convert to Uint8Array
        const convertedData = convert.hexToUint8(convert.utf8ToHex(data));

        return KeyPair.verify(convert.hexToUint8(this.publicKey), convertedData, convertedSignature, signSchema);
    }

    /**
     * Compares public accounts for equality.
     * @param publicAccount
     * @returns {boolean}
     */
    equals(publicAccount: PublicAccount) {
        return this.publicKey === publicAccount.publicKey && this.address.plain() === publicAccount.address.plain();
    }

    /**
     * Create DTO object
     */
    toDTO() {
        return {
            publicKey: this.publicKey,
            address: this.address.toDTO(),
        };
    }
}
