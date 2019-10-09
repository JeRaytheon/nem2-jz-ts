import {HttpService} from "../../src/api/HttpService";
import {apiUrl, netType} from "../../src/config/config";
import {TabType} from "../../src/model/TabType";
import {IdentityModel} from "../../src/model/IdentityModel";
import {Account} from "nem2-sdk";

describe('service', () => {

    it('identity upto chain service', async (done) => {
        const testAccount = {
            private: "5955373D9898E2FBC9247A73CF5EEB2E07CA81E92FC2E2CDFF1E8A81024288DC"
        }
        const identityAccount = {
            private: "FB650A6142E24B2909399538588CE86527C5F6D3703D8117724988FA7AEA1160"
        }
        const account = Account.createFromPrivateKey(testAccount.private, netType)

        const identityData = new IdentityModel();
        identityData.name = 'test-name';
        identityData.license = 'test-license';
        identityData.bankAccountInfo = 'test-bankAccountInfo';

        const data = IdentityModel.toJsonStr(identityData);
        const service = await HttpService.uptoChainServiceCommon(apiUrl,identityAccount.private, TabType.identity, account.publicKey, data, false);
        console.info(service);
    });

});
