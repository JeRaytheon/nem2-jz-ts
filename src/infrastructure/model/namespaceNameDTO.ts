export class NamespaceNameDTO {
    'parentId'?: Array<number>;
    'namespaceId': Array<number>;
    /**
    * The name of the namespace.
    */
    'name': string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "parentId",
            "baseName": "parentId",
            "type": "Array<number>"
        },
        {
            "name": "namespaceId",
            "baseName": "namespaceId",
            "type": "Array<number>"
        },
        {
            "name": "name",
            "baseName": "name",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return NamespaceNameDTO.attributeTypeMap;
    }
}

