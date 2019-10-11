import {expect} from 'chai';
import {AccountService} from "../../src/api/AccountService";

describe('AccountService', () => {

    it('createAccount', () => {
        const account = AccountService.createAccount();
        expect(account).to.be.not.equal('');
    });

    it('createFromPrivateKey', () => {
        const account = AccountService.createFromPrivateKey('64511ECAB0F03F1182F4F1C58E542BAA68A26D1ECFF85791CAF89128D3325E55');
        expect(account.publicKey).to.be.equal('BF6D824A50E05EE84B2CA4534E600378E61BA6533B1564242C735E2B9A3BA46E');
        expect(account.address.plain()).to.be.equal('SBPPTE2VHCM2WIGMEW4ABO2ZREYRHYE5JEZ5L5WF');
    });

    it('createFromPublicKey', () => {
        const publicAccount = AccountService.createFromPublicKey('BF6D824A50E05EE84B2CA4534E600378E61BA6533B1564242C735E2B9A3BA46E');
        expect(publicAccount.publicKey).to.be.equal('BF6D824A50E05EE84B2CA4534E600378E61BA6533B1564242C735E2B9A3BA46E');
        expect(publicAccount.address.plain()).to.be.equal('SBPPTE2VHCM2WIGMEW4ABO2ZREYRHYE5JEZ5L5WF');
    });

    it('encryptMessage', () => {

        const testAccount = AccountService.createFromPrivateKey('64511ECAB0F03F1182F4F1C58E542BAA68A26D1ECFF85791CAF89128D3325E55');

        const message = AccountService.encryptMessage('test',
            testAccount.publicAccount,
            '22C11EBE4D5ABE56EAE2EED4D546930FAB413065189E983D32DC7ADD0CD14FC3');

        expect(message.payload.toString()).to.be.equal('C292F2DE4721C8FF3FC36E4D277610B3A29C9BE103686DF712880B20A89527F3DE0C43E9868229A59E481408A3F4F9B24084558A29D1D60220D7597B6849C63E');
    });

    it('decryptMessage', () => {
        const testAccount = AccountService.createFromPrivateKey('22C11EBE4D5ABE56EAE2EED4D546930FAB413065189E983D32DC7ADD0CD14FC3');
        const message = AccountService.decryptMessage(
            'C292F2DE4721C8FF3FC36E4D277610B3A29C9BE103686DF712880B20A89527F3DE0C43E9868229A59E481408A3F4F9B24084558A29D1D60220D7597B6849C63E',
            '64511ECAB0F03F1182F4F1C58E542BAA68A26D1ECFF85791CAF89128D3325E55',
            testAccount.publicAccount
        );
        expect(message.payload).to.be.equal('test');
    });
});
