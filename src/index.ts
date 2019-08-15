import { IdentityContract } from './model/jz/IdentityContract';
import { ApostilleData } from './model/jz/ApostilleData';

export * from './infrastructure/infrastructure';
export * from './model/model';
export * from './service/service';
export * from './core/utils/utility';
export * from './core/format';
export * from './core/crypto';

start();

async function start() {

    // const identity = new IdentityContract();
    // const apostilleData = new ApostilleData();
    // identity.requestIP = "127.0.0.1";
    // identity.requestId = "0001";
    // apostilleData.fxppbgs = "123123123";
    // apostilleData.gpzjxbah = "asdzxc";
    // apostilleData.license = "xxxx";
    // identity.accountId = "qqwewewe";
    // identity.ApostilleData = apostilleData;
    // console.info(await IdentityContract.toStr(identity))
}

