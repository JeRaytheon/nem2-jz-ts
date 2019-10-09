import {HttpService} from "../../src/api/HttpService";
import {apiUrl, netType} from "../../src/config/config";
import {TabType} from "../../src/model/TabType";
import {IdentityModel} from "../../src/model/IdentityModel";
import {Account} from "nem2-sdk";

describe('service', () => {

    it('identity upto chain service', async (done) => {
        const testAccount = {
            private: "D58621860923566D7F4233108B462F7EB0111094873219190B06308553A89A86"
        }
        const identityAccount = {
            private: "11A8E16834FA8B93C04DDD263DB2A73B7EFB060360F2E15358943523FC226DCB"
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
