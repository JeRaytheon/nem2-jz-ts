import {Account} from "nem2-sdk";
import {netType} from "../config/config";

export class AccountService {

    public static createAccount(){
        return Account.generateNewAccount(netType);
    }
    

}
