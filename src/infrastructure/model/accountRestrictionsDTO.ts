
import { AccountRestrictionDTO } from './accountRestrictionDTO';

export class AccountRestrictionsDTO {
    /**
    * The address of the account in hexadecimal.
    */
    'address': string;
    'restrictions': Array<AccountRestrictionDTO>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "address",
            "baseName": "address",
            "type": "string"
        },
        {
            "name": "restrictions",
            "baseName": "restrictions",
            "type": "Array<AccountRestrictionDTO>"
        }    ];

    static getAttributeTypeMap() {
        return AccountRestrictionsDTO.attributeTypeMap;
    }
}

