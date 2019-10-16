import {HttpService} from "../../src/api/HttpService";
import {apiUrl} from "../../src/config/config";
import {TabType} from "../../src/model/TabType";
import {IdentityModel} from "../../src/model/IdentityModel";
import {expect} from 'chai';
import {AccountService} from "../../src/api/AccountService";

describe('HttpService', () => {

    it(' uptoChainServiceCommon eg: identity upto chain service', async (done) => {

        const testAccount = AccountService.createFromPrivateKey('64511ECAB0F03F1182F4F1C58E542BAA68A26D1ECFF85791CAF89128D3325E55')
        const identityData = new IdentityModel();
        identityData.name = 'test-name';
        identityData.license = 'test-license';
        identityData.bankAccountInfo = 'test-bankAccountInfo';
        const data = IdentityModel.toJsonStr(identityData);

        const hash = await HttpService.uptoChainServiceCommon(apiUrl, 'A2167EAD6317768312A4EDDE543224B47A9F39523D42370981BAA911A1461FA8',
            TabType.identity, testAccount.publicKey, data, false);
        console.info(hash)
        expect(hash).to.be.not.equal(undefined);
    });

    it('transactionService', async () => {

        const testAccount = AccountService.createFromPrivateKey('64511ECAB0F03F1182F4F1C58E542BAA68A26D1ECFF85791CAF89128D3325E55')
        const hash = await HttpService.transactionService(apiUrl, 'A2167EAD6317768312A4EDDE543224B47A9F39523D42370981BAA911A1461FA8', testAccount.address.plain(), 123, "test");
        expect(hash).to.be.not.equal(undefined);
    });

    it('getServiceStatus', async () => {
        const serviceStatus = await HttpService.getServiceStatus('DE83531871E2975AE69B1A67657606A0166B45236A208006CDBDAEDFB6E306F1', apiUrl);
        expect(serviceStatus.hash).to.be.equal('DE83531871E2975AE69B1A67657606A0166B45236A208006CDBDAEDFB6E306F1');
        expect(serviceStatus.status).to.be.equal('Success');
    });

    it('getServiceInfo', async () => {
        const serviceInfo = await HttpService.getServiceInfo('DE83531871E2975AE69B1A67657606A0166B45236A208006CDBDAEDFB6E306F1', apiUrl);
        const identityData: {
            type: string,
            data: any
        } = JSON.parse(serviceInfo.payload);
        expect(identityData.type).to.be.equal('identityInfo');
        const data = JSON.parse(identityData.data);
        expect(data.name).to.be.equal('test-name');
        expect(data.license).to.be.equal('test-license');
        expect(data.bankAccountInfo).to.be.equal('test-bankAccountInfo');
    });

    it('getServiceInfosByAddress', async () => {
        const serviceInfos = await HttpService.getServiceInfosByAddress('BF6D824A50E05EE84B2CA4534E600378E61BA6533B1564242C735E2B9A3BA46E', apiUrl);
        expect(serviceInfos).to.be.not.equal(undefined);
    });

    it('getAccountInfo', async () => {
        const accountInfo = await HttpService.getAccountInfo('SBPPTE2VHCM2WIGMEW4ABO2ZREYRHYE5JEZ5L5WF', apiUrl);
        expect(accountInfo.address.plain()).to.be.equal('SBPPTE2VHCM2WIGMEW4ABO2ZREYRHYE5JEZ5L5WF');
        expect(accountInfo.publicKey).to.be.equal('BF6D824A50E05EE84B2CA4534E600378E61BA6533B1564242C735E2B9A3BA46E');
    });

    it('getAssets', async () => {
        const assetsInfos = await HttpService.getAssets('SBPPTE2VHCM2WIGMEW4ABO2ZREYRHYE5JEZ5L5WF', apiUrl);
        console.info(assetsInfos)
    });
});
