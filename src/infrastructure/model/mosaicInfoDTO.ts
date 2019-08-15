
import { MosaicDefinitionDTO } from './mosaicDefinitionDTO';
import { MosaicMetaDTO } from './mosaicMetaDTO';

export class MosaicInfoDTO {
    'meta': MosaicMetaDTO;
    'mosaic': MosaicDefinitionDTO;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "meta",
            "baseName": "meta",
            "type": "MosaicMetaDTO"
        },
        {
            "name": "mosaic",
            "baseName": "mosaic",
            "type": "MosaicDefinitionDTO"
        }    ];

    static getAttributeTypeMap() {
        return MosaicInfoDTO.attributeTypeMap;
    }
}

