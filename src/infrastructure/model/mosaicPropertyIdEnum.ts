/**
* The mosaic propery id means: * 0 - MosaicFlags * 1 - Divisibility * 2 - Duration 
*/
export class MosaicPropertyIdEnum {

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
    ];

    static getAttributeTypeMap() {
        return MosaicPropertyIdEnum.attributeTypeMap;
    }
}

