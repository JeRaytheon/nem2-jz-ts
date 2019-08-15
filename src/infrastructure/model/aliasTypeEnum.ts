/**
* The alias type: * 0 -  No alias. * 1 -  Mosaic id alias. * 2 -  Addres alias. 
*/
export class AliasTypeEnum {

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
    ];

    static getAttributeTypeMap() {
        return AliasTypeEnum.attributeTypeMap;
    }
}

