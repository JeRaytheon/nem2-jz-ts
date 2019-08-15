export class MerklePathItem {
    'position'?: number;
    'hash'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "position",
            "baseName": "position",
            "type": "number"
        },
        {
            "name": "hash",
            "baseName": "hash",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return MerklePathItem.attributeTypeMap;
    }
}

