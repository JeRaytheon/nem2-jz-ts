

import {Crypto} from '../../core/crypto';
import {Password} from './Password';
import { WalletAlgorithm } from './WalletAlgorithm';

/**
 * EncryptedPrivateKey model
 */
export class EncryptedPrivateKey {
    /**
     * @internal
     * @param encryptedKey
     * @param iv
     */
    constructor(
                /**
                 * Encrypted private key data
                 */
                public readonly encryptedKey: string,
                /**
                 * Initialization vector used in the decrypt process
                 */
                public readonly iv: string) {

    }

    /**
     * @internal
     * Decrypt an encrypted private key
     * @param password
     */
    decrypt(password: Password): string {
        const common = {
            password: password.value,
            privateKey: '',
        }
        const wallet = {
            encrypted: this.encryptedKey,
            iv: this.iv,
        };
        Crypto.passwordToPrivateKey(common, wallet, WalletAlgorithm.Pass_bip32);
        return common.privateKey;
    }
}
