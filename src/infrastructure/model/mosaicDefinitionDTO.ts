
import { MosaicPropertyDTO } from './mosaicPropertyDTO';

export class MosaicDefinitionDTO {
    'mosaicId': Array<number>;
    'supply': Array<number>;
    'height': Array<number>;
    /**
    * The public key of the mosaic owner.
    */
    'owner': string;
    /**
    * The number of definitions for the same mosaic.
    */
    'revision': number;
    'properties': Array<MosaicPropertyDTO>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "mosaicId",
            "baseName": "mosaicId",
            "type": "Array<number>"
        },
        {
            "name": "supply",
            "baseName": "supply",
            "type": "Array<number>"
        },
        {
            "name": "height",
            "baseName": "height",
            "type": "Array<number>"
        },
        {
            "name": "owner",
            "baseName": "owner",
            "type": "string"
        },
        {
            "name": "revision",
            "baseName": "revision",
            "type": "number"
        },
        {
            "name": "properties",
            "baseName": "properties",
            "type": "Array<MosaicPropertyDTO>"
        }    ];

    static getAttributeTypeMap() {
        return MosaicDefinitionDTO.attributeTypeMap;
    }
}

