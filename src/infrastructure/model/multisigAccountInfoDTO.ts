
import { MultisigDTO } from './multisigDTO';

export class MultisigAccountInfoDTO {
    'multisig': MultisigDTO;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "multisig",
            "baseName": "multisig",
            "type": "MultisigDTO"
        }    ];

    static getAttributeTypeMap() {
        return MultisigAccountInfoDTO.attributeTypeMap;
    }
}

