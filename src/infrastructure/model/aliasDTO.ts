
import { AliasTypeEnum } from './aliasTypeEnum';

export class AliasDTO {
    'type': AliasTypeEnum;
    'mosaicId'?: Array<number>;
    /**
    * The aliased address in hexadecimal.
    */
    'address'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "type",
            "baseName": "type",
            "type": "AliasTypeEnum"
        },
        {
            "name": "mosaicId",
            "baseName": "mosaicId",
            "type": "Array<number>"
        },
        {
            "name": "address",
            "baseName": "address",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return AliasDTO.attributeTypeMap;
    }
}

