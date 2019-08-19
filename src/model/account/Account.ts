import {Crypto, KeyPair, SignSchema} from '../../core/crypto';
import {Convert as convert, RawAddress as AddressLibrary} from '../../core/format';
import {NetworkType} from '../blockchain/NetworkType';
import {AggregateTransaction} from '../transaction/AggregateTransaction';
import {CosignatureSignedTransaction} from '../transaction/CosignatureSignedTransaction';
import {CosignatureTransaction} from '../transaction/CosignatureTransaction';
import {EncryptedMessage} from '../transaction/EncryptedMessage';
import {PlainMessage} from '../transaction/PlainMessage';
import {SignedTransaction} from '../transaction/SignedTransaction';
import {Transaction} from '../transaction/Transaction';
import {Address} from './Address';
import {PublicAccount} from './PublicAccount';

interface IKeyPair {
    privateKey: Uint8Array;
    publicKey: Uint8Array;
}

/**
 * The account structure describes an account private key, public key, address and allows signing transactions.
 */
export class Account {

    /**
     * @internal
     * @param address
     * @param keyPair
     * @param {SignSchema} signSchema The Sign Schema. (KECCAK_REVERSED_KEY / SHA3)
     */
    private constructor(
        /**
         * The account address.
         */
        public readonly address: Address,
        /**
         * The account keyPair, public and private key.
         */
        private readonly keyPair: IKeyPair,
        /**
         * The Sign Schema (KECCAK_REVERSED_KEY / SHA3).
         */
        private readonly signSchema: SignSchema = SignSchema.SHA3) {
    }

    /**
     * Create an Account from a given private key
     * @param privateKey - Private key from an account
     * @param networkType - Network type
     * @param {SignSchema} signSchema The Sign Schema. (KECCAK_REVERSED_KEY / SHA3)
     * @return {Account}
     */
    public static createFromPrivateKey(privateKey: string,
                                       networkType: NetworkType,
                                       signSchema: SignSchema = SignSchema.SHA3): Account {
        const keyPair: IKeyPair = KeyPair.createKeyPairFromPrivateKeyString(privateKey, signSchema);
        const address = AddressLibrary.addressToString(
            AddressLibrary.publicKeyToAddress(keyPair.publicKey, networkType, signSchema));
        return new Account(
            Address.createFromRawAddress(address),
            keyPair,
            signSchema,
        );
    }

    /**
     * Generate a new account
     * @param networkType - Network type
     * @param {SignSchema} signSchema The Sign Schema. (KECCAK_REVERSED_KEY / SHA3)
     */
    public static generateNewAccount(networkType: NetworkType, signSchema: SignSchema = SignSchema.SHA3): Account {
        // Create random bytes
        const randomBytesArray = Crypto.randomBytes(32);
        // Hash random bytes with entropy seed
        // Finalize and keep only 32 bytes
        const hashKey = convert.uint8ToHex(randomBytesArray);

        // Create KeyPair from hash key
        const keyPair = KeyPair.createKeyPairFromPrivateKeyString(hashKey, signSchema);

        const address = Address.createFromPublicKey(convert.uint8ToHex(keyPair.publicKey), networkType, signSchema);
        return new Account(address, keyPair, signSchema);
    }
    /**
     * Create a new encrypted Message
     * @param message - Plain message to be encrypted
     * @param recipientPublicAccount - Recipient public account
     * @param {SignSchema} signSchema The Sign Schema. (KECCAK_REVERSED_KEY / SHA3)
     * @returns {EncryptedMessage}
     */
    public encryptMessage(message: string,
                          recipientPublicAccount: PublicAccount,
                          signSchema: SignSchema = SignSchema.SHA3): EncryptedMessage {
        return EncryptedMessage.create(message, recipientPublicAccount, this.privateKey, signSchema);
    }

    /**
     * Decrypts an encrypted message
     * @param encryptedMessage - Encrypted message
     * @param publicAccount - The public account originally encrypted the message
     * @param {SignSchema} signSchema The Sign Schema. (KECCAK_REVERSED_KEY / SHA3)
     * @returns {PlainMessage}
     */
    public decryptMessage(encryptedMessage: EncryptedMessage,
                          publicAccount: PublicAccount,
                          signSchema: SignSchema = SignSchema.SHA3): PlainMessage {
        return EncryptedMessage.decrypt(encryptedMessage, this.privateKey, publicAccount, signSchema);
    }
    /**
     * Account public key.
     * @return {string}
     */
    get publicKey(): string {
        return convert.uint8ToHex(this.keyPair.publicKey);
    }

    /**
     * Public account.
     * @return {PublicAccount}
     */
    get publicAccount(): PublicAccount {
        return PublicAccount.createFromPublicKey(this.publicKey, this.address.networkType, this.signSchema);
    }

    /**
     * Account private key.
     * @return {string}
     */
    get privateKey(): string {
        return convert.uint8ToHex(this.keyPair.privateKey);
    }

    /**
     * Sign a transaction
     * @param transaction - The transaction to be signed.
     * @param generationHash - Network generation hash hex
     * @param {SignSchema} signSchema The Sign Schema. (KECCAK_REVERSED_KEY / SHA3)
     * @return {SignedTransaction}
     */
    public sign(transaction: Transaction, generationHash:string, signSchema: SignSchema = SignSchema.SHA3): SignedTransaction {
        return transaction.signWith(this, generationHash, signSchema);
    }

    /**
     * Sign transaction with cosignatories creating a new SignedTransaction
     * @param transaction - The aggregate transaction to be signed.
     * @param cosignatories - The array of accounts that will cosign the transaction
     * @param generationHash - Network generation hash hex
     * @param {SignSchema} signSchema The Sign Schema. (KECCAK_REVERSED_KEY / SHA3)
     * @return {SignedTransaction}
     */
    public signTransactionWithCosignatories(transaction: AggregateTransaction,
                                            cosignatories: Account[],
                                            generationHash: string,
                                            signSchema: SignSchema = SignSchema.SHA3): SignedTransaction {
        return transaction.signTransactionWithCosignatories(this, cosignatories, generationHash, signSchema);
    }

    /**
     * Sign transaction with cosignatories collected from cosigned transactions and creating a new SignedTransaction
     * For off chain Aggregated Complete Transaction co-signing.
     * @param initiatorAccount - Initiator account
     * @param {CosignatureSignedTransaction[]} cosignatureSignedTransactions - Array of cosigned transaction
     * @param generationHash - Network generation hash hex
     * @param {SignSchema} signSchema The Sign Schema. (KECCAK_REVERSED_KEY / SHA3)
     * @return {SignedTransaction}
     */
    public signTransactionGivenSignatures(transaction: AggregateTransaction,
                                          cosignatureSignedTransactions: CosignatureSignedTransaction[],
                                          generationHash: string,
                                          signSchema: SignSchema = SignSchema.SHA3): SignedTransaction {
        return transaction.signTransactionGivenSignatures(this, cosignatureSignedTransactions, generationHash, signSchema);
    }
    /**
     * Sign aggregate signature transaction
     * @param cosignatureTransaction - The aggregate signature transaction.
     * @param {SignSchema} signSchema The Sign Schema. (KECCAK_REVERSED_KEY / SHA3)
     * @return {CosignatureSignedTransaction}
     */
    public signCosignatureTransaction(cosignatureTransaction: CosignatureTransaction,
                                      signSchema: SignSchema = SignSchema.SHA3): CosignatureSignedTransaction {
        return cosignatureTransaction.signWith(this, signSchema);
    }

    /**
     * Sign raw data
     * @param data - Data to be signed
     * @param {SignSchema} signSchema The Sign Schema. (KECCAK_REVERSED_KEY / SHA3)
     * @return {string} - Signed data result
     */
    public signData(data: string, signSchema: SignSchema = SignSchema.SHA3): string {
        return convert.uint8ToHex(KeyPair.sign(this.keyPair,
            convert.hexToUint8(convert.utf8ToHex(data)),
            signSchema,
        ));
    }
}
