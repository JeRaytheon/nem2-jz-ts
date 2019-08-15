export class MosaicNamesDTO {
    'mosaicId': Array<number>;
    /**
    * The mosaic linked namespace names.
    */
    'names': Array<string>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "mosaicId",
            "baseName": "mosaicId",
            "type": "Array<number>"
        },
        {
            "name": "names",
            "baseName": "names",
            "type": "Array<string>"
        }    ];

    static getAttributeTypeMap() {
        return MosaicNamesDTO.attributeTypeMap;
    }
}

