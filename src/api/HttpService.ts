import {
    Account, AccountHttp,
    Deadline,
    EncryptedMessage,
    Message,
    NetworkCurrencyMosaic,
    PlainMessage,
    PublicAccount,
    SignedTransaction, Transaction,
    TransactionHttp, TransactionStatus,
    TransferTransaction
} from "nem2-sdk";
import {apiUrl, fee, generationHash, netType} from "../config/config";

export class HttpService {


    /**
     * 通用上链数据接口
     *
     * @param systemAccountPrivateKey 不用角色对应系统帐号私钥
     * @param tab 自定义标签
     * @param recipientPublicKey 等待认证帐号的公钥
     * @param data 认证数据
     * @param isEncrypt 是否加密
     */
    public static async uptoChainServiceCommon(systemAccountPrivateKey: string, tab: string, recipientPublicKey: string, data: string, isEncrypt: boolean) {

        const transactionHttp = new TransactionHttp(apiUrl);

        const account = Account.createFromPrivateKey(systemAccountPrivateKey, netType);

        const chainData: { type: string, data: string } = {type: tab, data: data};

        let message: Message = PlainMessage.create(JSON.stringify(chainData));

        const recipientPublicAccount = PublicAccount.createFromPublicKey(recipientPublicKey, netType);

        if (isEncrypt) {
            message = EncryptedMessage.create(JSON.stringify(chainData), recipientPublicAccount, account.privateKey, netType);
        }
        const identityTransaction: TransferTransaction = TransferTransaction.create(
            Deadline.create(),
            recipientPublicAccount.address,
            [NetworkCurrencyMosaic.createAbsolute(0)],
            message,
            netType,
            fee);
        const signedTransaction: SignedTransaction = account.sign(identityTransaction, generationHash);
        transactionHttp.announce(signedTransaction);
        return signedTransaction.hash;
    }

    /**
     * 根据事务hash获取事务状态
     * @param transactionHash
     */
    public static async getServiceStatus(transactionHash: string): Promise<TransactionStatus> {
        const transactionHttp = new TransactionHttp(apiUrl);
        const transactionStatus: TransactionStatus = await transactionHttp.getTransactionStatus(transactionHash).toPromise();
        return transactionStatus;
    }

    /**
     * 根据事务hash获取事务信息
     * @param transactionHash
     */
    public static async getServiceInfoBy(transactionHash: string): Promise<any> {
        const transactionHttp = new TransactionHttp(apiUrl);
        const transaction: any = await transactionHttp.getTransaction(transactionHash).toPromise();
        return transaction.message;
    }

    /**
     * 根据事务hash获取事务信息List
     * @param transactionHashs
     */
    public static async getServiceInfos(transactionHashs: string[]): Promise<any> {
        let messageList: any = [];
        const transactionHttp = new TransactionHttp(apiUrl);
        const transactions: any = await transactionHttp.getTransactions(transactionHashs).toPromise();
        for (let transactionsKey in transactions) {
            messageList.push(transactions);
        }
        return messageList
    }

    /**
     * 根据公钥 获取事务信息
     * @param address
     */
    public static async getServiceInfosByAddress(publicKey: string): Promise<Transaction[]> {

        const accountHttp = new AccountHttp(apiUrl);
        const account: PublicAccount = PublicAccount.createFromPublicKey(publicKey, netType);
        return await accountHttp.transactions(account.address).toPromise();
    }


}
