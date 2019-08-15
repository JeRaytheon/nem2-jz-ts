/**
* The namespace type: * 0 -  Root namespace. * 1 -  Subnamespace. 
*/
export class NamespaceTypeEnum {

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
    ];

    static getAttributeTypeMap() {
        return NamespaceTypeEnum.attributeTypeMap;
    }
}

