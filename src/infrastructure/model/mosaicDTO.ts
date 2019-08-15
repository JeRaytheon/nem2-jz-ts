export class MosaicDTO {
    'id': Array<number>;
    'amount': Array<number>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "id",
            "baseName": "id",
            "type": "Array<number>"
        },
        {
            "name": "amount",
            "baseName": "amount",
            "type": "Array<number>"
        }    ];

    static getAttributeTypeMap() {
        return MosaicDTO.attributeTypeMap;
    }
}

