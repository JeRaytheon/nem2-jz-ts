export class MosaicIds {
    /**
    * The array of mosaic identifiers.
    */
    'mosaicIds'?: Array<string>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "mosaicIds",
            "baseName": "mosaicIds",
            "type": "Array<string>"
        }    ];

    static getAttributeTypeMap() {
        return MosaicIds.attributeTypeMap;
    }
}

