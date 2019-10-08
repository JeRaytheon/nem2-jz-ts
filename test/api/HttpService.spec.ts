import {HttpService} from "../../src/api/HttpService";
import {identityAccount, netType, testAccount} from "../../src/config/config";
import {TabType} from "../../src/model/TabType";
import {IdentityModel} from "../../src/model/IdentityModel";
import {Account} from "nem2-sdk";

describe('service', () => {

    it('identity upto chain service', async (done) => {

        const account = Account.createFromPrivateKey(testAccount.private,netType)

        const identityData = new IdentityModel();
        identityData.name = 'test-name';
        identityData.license = 'test-license';
        identityData.bankAccountInfo = 'test-bankAccountInfo';

        const data = IdentityModel.toJsonStr(identityData);
        const service = await HttpService.uptoChainServiceCommon(identityAccount.private, TabType.identity, account.publicKey, data, false);
        console.info(service);
    });

});
