

import {LocalDateTime} from 'js-joda';
import {Crypto, KeyPair, SignSchema} from '../../core/crypto';
import { Convert as convert} from '../../core/format';
import {Account} from '../account/Account';
import {Address} from '../account/Address';
import {NetworkType} from '../blockchain/NetworkType';
import {EncryptedPrivateKey} from './EncryptedPrivateKey';
import {Password} from './Password';
import {Wallet} from './Wallet';

/**
 * Simple wallet model generates a private key from a PRNG
 */
export class SimpleWallet extends Wallet {

    /**
     * @internal
     * @param name
     * @param network
     * @param address
     * @param creationDate
     * @param encryptedPrivateKey
     */
    constructor(name: string,
                network: NetworkType,
                address: Address,
                creationDate: LocalDateTime,
                /**
                 * The encrypted private key and information to decrypt it
                 */
                public readonly encryptedPrivateKey: EncryptedPrivateKey) {
        super(name, network, address, creationDate, 'simple_v1');
    }

    /**
     * Create a Simple wallet
     * @param name - Wallet name
     * @param password - Password to encrypt wallet
     * @param network - Network id
     * @param {SignSchema} signSchema The Sign Schema. (KECCAK_REVERSED_KEY / SHA3)
     * @returns {SimpleWallet}
     */
    public static create(name: string,
                         password: Password,
                         network: NetworkType,
                         signSchema: SignSchema = SignSchema.SHA3): SimpleWallet {
        // Create random bytes
        const randomBytesArray = Crypto.randomBytes(32);
        // Hash random bytes with entropy seed
        // Finalize and keep only 32 bytes
        const hashKey = convert.uint8ToHex(randomBytesArray); // TODO: derive private key correctly

        // Create KeyPair from hash key
        const keyPair = KeyPair.createKeyPairFromPrivateKeyString(hashKey, signSchema);

        // Create address from public key
        const address = Address.createFromPublicKey(convert.uint8ToHex(keyPair.publicKey), network);

        // Encrypt private key using password
        const encrypted = Crypto.encodePrivateKey(hashKey, password.value);

        const encryptedPrivateKey = new EncryptedPrivateKey(encrypted.ciphertext, encrypted.iv);

        return new SimpleWallet(name, network, address, LocalDateTime.now(), encryptedPrivateKey);
    }

    /**
     * Create a SimpleWallet from private key
     * @param name - Wallet name
     * @param password - Password to encrypt wallet
     * @param privateKey - Wallet private key
     * @param network - Network id
     * @param {SignSchema} signSchema The Sign Schema. (KECCAK_REVERSED_KEY / SHA3)
     * @returns {SimpleWallet}
     */
    static createFromPrivateKey(name: string,
                                password: Password,
                                privateKey: string,
                                network: NetworkType,
                                signSchema: SignSchema = SignSchema.SHA3): SimpleWallet {
        // Create KeyPair from hash key
        const keyPair = KeyPair.createKeyPairFromPrivateKeyString(privateKey, signSchema);

        // Create address from public key
        const address = Address.createFromPublicKey(convert.uint8ToHex(keyPair.publicKey), network, signSchema);

        // Encrypt private key using password
        const encrypted = Crypto.encodePrivateKey(privateKey, password.value);

        const encryptedPrivateKey = new EncryptedPrivateKey(encrypted.ciphertext, encrypted.iv);

        return new SimpleWallet(name, network, address, LocalDateTime.now(), encryptedPrivateKey);
    }

    /**
     * Open a wallet and generate an Account
     * @param password - Password to decrypt private key
     * @param {SignSchema} signSchema The Sign Schema. (KECCAK_REVERSED_KEY / SHA3)
     * @returns {Account}
     */
    public open(password: Password, signSchema: SignSchema = SignSchema.SHA3): Account {
        return Account.createFromPrivateKey(this.encryptedPrivateKey.decrypt(password), this.network, signSchema);
    }

}
