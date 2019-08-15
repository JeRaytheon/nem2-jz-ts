
import { AccountRestrictionsDTO } from './accountRestrictionsDTO';

export class AccountRestrictionsInfoDTO {
    'accountRestrictions': AccountRestrictionsDTO;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "accountRestrictions",
            "baseName": "accountRestrictions",
            "type": "AccountRestrictionsDTO"
        }    ];

    static getAttributeTypeMap() {
        return AccountRestrictionsInfoDTO.attributeTypeMap;
    }
}

