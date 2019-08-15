export class AccountMetaDTO {
    'height': Array<number>;
    'hash': string;
    'merkleComponentHash': string;
    'index': number;
    'id': string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "height",
            "baseName": "height",
            "type": "Array<number>"
        },
        {
            "name": "hash",
            "baseName": "hash",
            "type": "string"
        },
        {
            "name": "merkleComponentHash",
            "baseName": "merkleComponentHash",
            "type": "string"
        },
        {
            "name": "index",
            "baseName": "index",
            "type": "number"
        },
        {
            "name": "id",
            "baseName": "id",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return AccountMetaDTO.attributeTypeMap;
    }
}

