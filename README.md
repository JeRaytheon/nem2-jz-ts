# 交子区块链服务说明—测试版本

## 源码库调用：
	npm install nem2-jz-ts
## 区块链服务器节点选择：
	http://47.108.88.254:3000
## 区块链浏览器查看：
	http://47.108.88.254:8000

## 创建帐号
	使用 AccountService.createAccount()
	通过私钥创建帐号 AccountService.createFromPrivateKey(privateKey)

## 如何获取公钥
	通过私钥获取 AccountService.createFromPrivateKey(private)
	通过已经上链帐号获取 HttpService.getAccountInfo(地址，节点服务器ip)

## 如何获取地址
	根据公钥获取AccountService.createFromPublicKey(publicKey);

## 获取帐号资产
	HttpService.getAssets(地址，节点服务器ip)
	
## 数据加密解密
    AccountService.encryptMessage(message, privateKey, recipientPublicAccount)
    AccountService.decryptMessage(encryptedMessage, privateKey, publicAccount)

## 系统资产交易
**参数说明**
    node:节点
    accountPrivateKey:私钥
    recipientAddress:接受方地址
    amount:转账数额
    bz:备注可传参数
   
	HttpService.transactionService(node: string, accountPrivateKey: string, recipientAddress: string, amount: number, bz?: string)

## 数据上链（通用方法上链）
**参数说明**
	node:服务器节点 http://47.108.88.254:3000 ,
	systemAccountPrivateKey:系统帐号私钥(不用角色对应不同系统帐号私钥)，
	tab:	自定义标签用于表示不同的业务类型
	recipientPublicKey：	等待认证帐号的公钥
	data:认证数据 最好为jsonStr
	isEncrypt: 是否加密
	
	HttpService.uptoChainServiceCommon（node,systemAccountPrivateKey,tab,recipientPublicKey,data,isEncrypt);
## 帐号说明
	不同的系统帐号有着不同的功能
	比如身份上链，系统帐号则需要传递自定义身份类系统帐号，例如：HttpService.uptoChainServiceCommon(node,identityAccount.private, TabType.identity, publicKey, data, false);

## 根据事务hash获取事务状态  
    HttpService.getServiceStatus(transactionHash: string, node: string)
    
## 根据事务hash获取事务信息
    HttpService.getServiceInfo(transactionHash: string, node: string)
   
## 测试帐号私钥分类

    身份帐号：A2167EAD6317768312A4EDDE543224B47A9F39523D42370981BAA911A1461FA8
    事件帐号：97880E3980F08DAC07014BCCFAD6112BF05A7F87FEBBECB76B742F5290A0CF55
    文件帐号：512041772A6419403DBFCA0BB023F424D1CFBA9441680C71A526FCBAB9E63310
    其它帐号：3C5434474014F12DC4B799AA071DF442672ABCBC1E1216E92C5A6A0936548C8F
    86B71309B8CB73E96114DA6EEEDDE31FB6A98FC7C2239B4E5464AB7161F7CF25
    A0157CDF8BB399BB752E97648DACA3F504EFD10CA0F0F7B6F14ADFA38F6E7863
    FC36FB3CE076EFF34E90471EFE8F26209C6FBEB49409EB673D49AC69602A6367
