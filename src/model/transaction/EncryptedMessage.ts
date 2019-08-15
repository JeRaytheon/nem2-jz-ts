

import {Crypto, SignSchema} from '../../core/crypto';
import {PublicAccount} from '../account/PublicAccount';
import {Message} from './Message';
import {MessageType} from './MessageType';
import {PlainMessage} from './PlainMessage';

/**
 * Encrypted Message model
 */
export class EncryptedMessage extends Message {

    public readonly recipientPublicAccount?: PublicAccount;

    constructor(payload: string,
                recipientPublicAccount?: PublicAccount) {
        super(MessageType.EncryptedMessage, payload);
        this.recipientPublicAccount = recipientPublicAccount;
    }

    /**
     *
     * @param message - Plain message to be encrypted
     * @param recipientPublicAccount - Recipient public account
     * @param privateKey - Sender private key
     * @param {SignSchema} signSchema The Sign Schema. (KECCAK_REVERSED_KEY / SHA3)
     * @return {EncryptedMessage}
     */
    public static create(message: string, recipientPublicAccount: PublicAccount, privateKey:string, signSchema: SignSchema = SignSchema.SHA3) {
        return new EncryptedMessage(
            Crypto.encode(privateKey, recipientPublicAccount.publicKey, message, signSchema).toUpperCase(),
            recipientPublicAccount);
    }

    /**
     *
     * @param payload
     */
    public static createFromPayload(payload: string): EncryptedMessage {
        return new EncryptedMessage(this.decodeHex(payload));
    }

    /**
     *
     * @param encryptMessage - Encrypted message to be decrypted
     * @param privateKey - Recipient private key
     * @param recipientPublicAccount - Sender public account
     * @param {SignSchema} signSchema The Sign Schema. (KECCAK_REVERSED_KEY / SHA3)
     * @return {PlainMessage}
     */
    public static decrypt(encryptMessage: EncryptedMessage,
                          privateKey:string,
                          recipientPublicAccount: PublicAccount,
                          signSchema: SignSchema = SignSchema.SHA3): PlainMessage {
        return new PlainMessage(this.decodeHex(
                Crypto.decode(privateKey, recipientPublicAccount.publicKey, encryptMessage.payload, signSchema)));
    }
}
