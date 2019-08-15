
import { MosaicPropertyIdEnum } from './mosaicPropertyIdEnum';

export class MosaicPropertyDTO {
    'id'?: MosaicPropertyIdEnum;
    'value'?: Array<number>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "id",
            "baseName": "id",
            "type": "MosaicPropertyIdEnum"
        },
        {
            "name": "value",
            "baseName": "value",
            "type": "Array<number>"
        }    ];

    static getAttributeTypeMap() {
        return MosaicPropertyDTO.attributeTypeMap;
    }
}

