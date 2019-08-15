/**
* The type of the modification: * 0 - Add cosignatory. * 1 - Remove cosignatory. 
*/
export class MultisigModificationTypeEnum {

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
    ];

    static getAttributeTypeMap() {
        return MultisigModificationTypeEnum.attributeTypeMap;
    }
}

