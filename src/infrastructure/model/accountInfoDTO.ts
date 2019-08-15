import { AccountDTO } from './accountDTO';
import { AccountMetaDTO } from './accountMetaDTO';

export class AccountInfoDTO {
    'meta': AccountMetaDTO;
    'account': AccountDTO;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "meta",
            "baseName": "meta",
            "type": "AccountMetaDTO"
        },
        {
            "name": "account",
            "baseName": "account",
            "type": "AccountDTO"
        }    ];

    static getAttributeTypeMap() {
        return AccountInfoDTO.attributeTypeMap;
    }
}

