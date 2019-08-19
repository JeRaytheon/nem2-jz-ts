import { IdentityType } from "./IdentityType";
import { ApostilleData } from "./ApostilleData";
import { BaseContract } from "./BaseContract";

export class IdentityContract extends BaseContract {

    /**
     * The identityType.
     */
    identityType: IdentityType;
    /**
     * The accountId string.
     */
    accountId: string;
    /**
     * The accountLogo string.
     */
    accountLogo: string;
    /**
     * The accountName .
     */
    accountName: string;
    /**
     * The accountLevel.
     */
    accountLevel: string;

    /**
     *
     * The ApostilleData
     */
    ApostilleData:ApostilleData;


    /**
     * CompanyIdentity
     * @param entity
     */
    public static async toStr(entity:IdentityContract){
         return JSON.stringify(entity);
    }

}
