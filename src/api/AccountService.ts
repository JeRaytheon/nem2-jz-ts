import {
    Account, EncryptedMessage, PlainMessage,
    PublicAccount
} from "nem2-sdk";
import {netType} from "../config/config";

export class AccountService {

    /**
     * 创建新帐号
     */
    public static createAccount() {
        return Account.generateNewAccount(netType);
    }

    /**
     * 通过私钥创建帐号
     * @param privateKey
     * @param netType
     */
    public static createFromPrivateKey(privateKey: string) {
        return Account.createFromPrivateKey(privateKey, netType);
    }

    /**
     * 通过公钥获取地址信息
     * @param publicKey
     * @param netType
     */
    public static createFromPublicKey(publicKey: string) {
        return PublicAccount.createFromPublicKey(publicKey, netType);
    }

    /**
     * 创建加密信息
     * @param message 待加密信息
     * @param privateKey 加密人私钥
     * @param recipientPublicAccount 解密人公钥
     */
    public encryptMessage(message: string, privateKey: string, recipientPublicAccount: PublicAccount): EncryptedMessage {
        return EncryptedMessage.create(message, recipientPublicAccount, privateKey, netType);
    }

    /**
     * 解密信息
     * @param encryptedMessage 待解密信息
     * @param privateKey 解密人私钥
     * @param publicAccount 加密人公钥
     */
    public decryptMessage(encryptedMessage: EncryptedMessage, privateKey: string, publicAccount: PublicAccount): PlainMessage {
        return EncryptedMessage.decrypt(encryptedMessage, privateKey, publicAccount, netType);
    }
}
