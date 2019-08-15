export class NamespaceIds {
    /**
    * The array of namespace identifiers.
    */
    'namespaceIds'?: Array<string>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "namespaceIds",
            "baseName": "namespaceIds",
            "type": "Array<string>"
        }    ];

    static getAttributeTypeMap() {
        return NamespaceIds.attributeTypeMap;
    }
}

