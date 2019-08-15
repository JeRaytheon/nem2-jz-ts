
import { MultisigAccountInfoDTO } from './multisigAccountInfoDTO';

export class MultisigAccountGraphInfoDTO {
    /**
    * The level of the multisig account.
    */
    'level': number;
    /**
    * The array of multisig accounts for this level.
    */
    'multisigEntries': Array<MultisigAccountInfoDTO>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "level",
            "baseName": "level",
            "type": "number"
        },
        {
            "name": "multisigEntries",
            "baseName": "multisigEntries",
            "type": "Array<MultisigAccountInfoDTO>"
        }    ];

    static getAttributeTypeMap() {
        return MultisigAccountGraphInfoDTO.attributeTypeMap;
    }
}

