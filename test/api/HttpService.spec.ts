import {HttpService} from "../../src/api/HttpService";
import {apiUrl, netType} from "../../src/config/config";
import {TabType} from "../../src/model/TabType";
import {IdentityModel} from "../../src/model/IdentityModel";
import {Account} from "nem2-sdk";

describe('service', () => {

    it('identity upto chain service', async (done) => {
        const test = {
            private: "64511ECAB0F03F1182F4F1C58E542BAA68A26D1ECFF85791CAF89128D3325E55"
        }
        const identityAccount = {
            private: "9CE882FAD5480772ED00ABEE33DC0F7D379FFB802B1DD7A942C7EEAA5569FF87"
        }
        const testAccount = Account.createFromPrivateKey(test.private, netType)
        const identityData = new IdentityModel();
        identityData.name = 'test-name';
        identityData.license = 'test-license';
        identityData.bankAccountInfo = 'test-bankAccountInfo';

        const data = IdentityModel.toJsonStr(identityData);
        const service = await HttpService.uptoChainServiceCommon(apiUrl,identityAccount.private,
            TabType.identity, testAccount.publicKey, data, false);
        console.info(service);
    });

    it('transactionService test', async (done) => {
        const test = {
            private: "64511ECAB0F03F1182F4F1C58E542BAA68A26D1ECFF85791CAF89128D3325E55"
        }
        const testAccount = Account.createFromPrivateKey(test.private, netType)
        const account = {
            private: "9CE882FAD5480772ED00ABEE33DC0F7D379FFB802B1DD7A942C7EEAA5569FF87"
        }
        const service = await HttpService.transactionService(apiUrl,account.private, testAccount.address.plain(), 1,"test");
        console.info(service);
    });

});
