export class NamespaceMetaDTO {
    'id': string;
    'active': boolean;
    'index': number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "id",
            "baseName": "id",
            "type": "string"
        },
        {
            "name": "active",
            "baseName": "active",
            "type": "boolean"
        },
        {
            "name": "index",
            "baseName": "index",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return NamespaceMetaDTO.attributeTypeMap;
    }
}

