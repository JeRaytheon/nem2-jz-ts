
import { BlockDTO } from './blockDTO';
import { BlockMetaDTO } from './blockMetaDTO';

export class BlockInfoDTO {
    'meta': BlockMetaDTO;
    'block': BlockDTO;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "meta",
            "baseName": "meta",
            "type": "BlockMetaDTO"
        },
        {
            "name": "block",
            "baseName": "block",
            "type": "BlockDTO"
        }    ];

    static getAttributeTypeMap() {
        return BlockInfoDTO.attributeTypeMap;
    }
}

