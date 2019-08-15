
import { AccountRestrictionTypeEnum } from './accountRestrictionTypeEnum';

export class AccountRestrictionDTO {
    'restrictionType': AccountRestrictionTypeEnum;
    /**
    * The address, transaction type or mosaic id to restrict.
    */
    'values': Array<object>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "restrictionType",
            "baseName": "restrictionType",
            "type": "AccountRestrictionTypeEnum"
        },
        {
            "name": "values",
            "baseName": "values",
            "type": "Array<object>"
        }    ];

    static getAttributeTypeMap() {
        return AccountRestrictionDTO.attributeTypeMap;
    }
}

