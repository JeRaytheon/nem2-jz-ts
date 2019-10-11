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

    身份帐号：22C11EBE4D5ABE56EAE2EED4D546930FAB413065189E983D32DC7ADD0CD14FC3
    事件帐号：BEE0F3188B4C1261232E9F5017ABE62B87973CE41AC26154FD54D8CC0F700C59
    文件帐号：86946764B9DF2930A3C53ECA627530DAD45C299FEDCE112B24A8DA10AFD5084E
    其它帐号：063DD107169C04990E6743ABE76E54FCFBA2E3E2243740F57BA0E77316E5E52C
    8441881FA1942DFDEF207F8CA38E98D3D63AF4EDD9FC63063951FFDDD63B0792
    9AA6941D7E39CD5F9452680F1012A04826A8947DDDAAD61F0D337802ABA7BEAD
    DBB68B0C96A685B367ADD3EA027C392E15B6D77C059AF48B40F3FF9A69E38092
