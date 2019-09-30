import {HttpService} from "../../src/api/HttpService";
import {identityAccount, testAccount} from "../../src/config/config";
import {TabType} from "../../src/model/TabType";
import {IdentityModel} from "../../src/model/IdentityModel";

describe('service', () => {

    it('identity upto chain service', (done) => {
        const identityData = new IdentityModel();
        identityData.name = 'test-name';
        identityData.license = 'test-license';
        identityData.bankAccountInfo = 'test-bankAccountInfo';

        const data = IdentityModel.toJsonStr(identityData);
        const service =await HttpService.uptoChainServiceCommon(identityAccount.private, TabType.identity, testAccount.public, data, false);

        console.info(service);
    });

}
