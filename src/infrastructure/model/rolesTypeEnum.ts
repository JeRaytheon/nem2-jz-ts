/**
* The role of the node: * 1 - A peer node. * 2 - An api node. 
*/
export class RolesTypeEnum {

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
    ];

    static getAttributeTypeMap() {
        return RolesTypeEnum.attributeTypeMap;
    }
}

