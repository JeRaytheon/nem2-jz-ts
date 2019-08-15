export class HeightInfoDTO {
    'height': Array<number>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "height",
            "baseName": "height",
            "type": "Array<number>"
        }    ];

    static getAttributeTypeMap() {
        return HeightInfoDTO.attributeTypeMap;
    }
}

