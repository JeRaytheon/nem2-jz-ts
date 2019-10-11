import {
    Account, AccountHttp, AccountInfo, Address, Crypto,
    Deadline,
    EncryptedMessage,
    Message, MosaicAmountView, MosaicHttp, MosaicId, MosaicService,
    NetworkCurrencyMosaic,
    PlainMessage,
    PublicAccount,
    SignedTransaction, Transaction,
    TransactionHttp, TransactionStatus,
    TransferTransaction
} from "nem2-sdk";
import {fee, generationHash, netType} from "../config/config";
import {AssetsModel} from "../model/AssetsModel";

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
    public static async uptoChainServiceCommon(node: string, systemAccountPrivateKey: string, tab: string, recipientPublicKey: string, data: string, isEncrypt: boolean) {

        return new Promise(async (resolve, reject) => {
            try {
                const transactionHttp = new TransactionHttp(node);

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
                    [NetworkCurrencyMosaic.createAbsolute(1)],
                    message,
                    netType,
                    fee);
                const signedTransaction: SignedTransaction = account.sign(identityTransaction, generationHash);
                transactionHttp.announce(signedTransaction);
                resolve(signedTransaction.hash)
            } catch (error) {
                reject(error)
            }
        })


    }

    /**
     * 系统资产交易服务
     * @param node节点
     * @param accountPrivateKey私钥
     * @param recipientAddress接受方地址
     * @param amount 转账数额
     * @param bz 可传参数
     */
    public static async transactionService(node: string, accountPrivateKey: string, recipientAddress: string, amount: number, bz?: string) {
        return new Promise(async (resolve, reject) => {
            try {
                const transactionHttp = new TransactionHttp(node);
                const account = Account.createFromPrivateKey(accountPrivateKey, netType);
                let message: Message = PlainMessage.create(bz);
                const identityTransaction: TransferTransaction = TransferTransaction.create(
                    Deadline.create(),
                    Address.createFromRawAddress(recipientAddress),
                    [NetworkCurrencyMosaic.createAbsolute(amount)],
                    message,
                    netType,
                    fee);
                const signedTransaction: SignedTransaction = account.sign(identityTransaction, generationHash);
                transactionHttp.announce(signedTransaction);
                resolve(signedTransaction.hash)
            } catch (error) {
                reject(error)
            }
        })
    }


    /**
     * 根据事务hash获取事务状态
     * @param transactionHash
     * @node  node 服务器节点
     */
    public static async getServiceStatus(transactionHash: string, node: string): Promise<TransactionStatus> {

        return new Promise(async (resolve, reject) => {
            try {
                const transactionHttp = new TransactionHttp(node);
                const transactionStatus: TransactionStatus = await transactionHttp.getTransactionStatus(transactionHash).toPromise();
                resolve(transactionStatus);
            } catch (error) {
                reject(error)
            }
        })
    }

    /**
     * 根据事务hash获取事务信息
     * @param transactionHash
     * @node  node 服务器节点
     */
    public static async getServiceInfo(transactionHash: string, node: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const transactionHttp = new TransactionHttp(node);
                const transaction: any = await transactionHttp.getTransaction(transactionHash).toPromise();
                resolve(transaction.message);
            } catch (error) {
                reject(error)
            }
        })
    }

    /**
     * 根据事务hash获取事务信息List
     * @param transactionHashs
     * @node  node 服务器节点
     */
    public static async getServiceInfos(transactionHashs: string[], node: string): Promise<any> {

        return new Promise(async (resolve, reject) => {
            try {
                let messageList: any = [];
                const transactionHttp = new TransactionHttp(node);
                const transactions: any = await transactionHttp.getTransactions(transactionHashs).toPromise();
                for (let transactionsKey in transactions) {
                    messageList.push(transactions);
                }
                resolve(messageList);
            } catch (error) {
                reject(error)
            }
        })
    }

    /**
     * 根据公钥 获取事务信息
     * @param address
     * @node  node 服务器节点
     */
    public static async getServiceInfosByAddress(publicKey: string, node: string): Promise<Transaction[]> {

        return new Promise(async (resolve, reject) => {
            try {
                const accountHttp = new AccountHttp(node);
                const account: PublicAccount = PublicAccount.createFromPublicKey(publicKey, netType);
                resolve(accountHttp.transactions(account.address).toPromise());
            } catch (error) {
                reject(error)
            }
        });
    }


    /**
     * 获取已经上链的帐号信息
     * @param addressStr
     * @param node
     */
    public static async getAccountInfo(addressStr: string, node: string): Promise<AccountInfo> {
        return new Promise(async (resolve, reject) => {
            try {
                const accountHttp = new AccountHttp(node);
                const address = Address.createFromRawAddress(addressStr);
                const accountInfo: AccountInfo = await accountHttp.getAccountInfo(address).toPromise();
                resolve(accountInfo)
            } catch (error) {
                reject(error)
            }
        });
    }

    /**
     *
     * @param addressStr
     * @param node
     */
    public static async getAssets(addressStr: string, node: string): Promise<AssetsModel[]> {

        return new Promise(async (resolve, reject) => {
            let assetsList: AssetsModel[] = [];
            try {
                const accountHttp = new AccountHttp(node)
                const mosaicHttp = new MosaicHttp(node)
                const mosaicService = new MosaicService(accountHttp, mosaicHttp)
                const address = Address.createFromRawAddress(addressStr);
                const accountInfo = await accountHttp.getAccountInfo(address).toPromise()
                if (!accountInfo.mosaics.length) return []

                const mosaics = accountInfo.mosaics.map(mosaic => mosaic)
                const mosaicIds = mosaics.map(({id}) => new MosaicId(id.toHex()))
                const mosaicViews = await mosaicService.mosaicsView(mosaicIds).toPromise()

                const mosaicAmountViews = mosaics
                    .map(mosaic => {
                        const mosaicView = mosaicViews
                            .find(({mosaicInfo}) => mosaicInfo.id.toHex() === mosaic.id.toHex())

                        if (mosaicView === undefined) throw new Error('A MosaicView was not found')
                        return new MosaicAmountView(mosaicView.mosaicInfo, mosaic.amount)
                    })
                mosaicAmountViews.forEach(mosaicAmountView => {
                    assetsList.push({
                            name: AssetsModel.transformation(mosaicAmountView.fullName()),
                            amount: mosaicAmountView.relativeAmount()
                        }
                    )
                })
                resolve(assetsList)
            } catch (error) {
                reject(error)
            }
        })
    }

}
