import {
    Account,
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

}
