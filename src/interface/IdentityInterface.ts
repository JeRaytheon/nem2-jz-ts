import {IdentityType} from "./IdentityType";

export interface IdentityInterface {
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

}
