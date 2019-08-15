export class BlockMetaDTO {
    'hash': string;
    'generationHash': string;
    'subCacheMerkleRoots': Array<string>;
    'totalFee': Array<number>;
    'numTransactions': number;
    'numStatements'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "hash",
            "baseName": "hash",
            "type": "string"
        },
        {
            "name": "generationHash",
            "baseName": "generationHash",
            "type": "string"
        },
        {
            "name": "subCacheMerkleRoots",
            "baseName": "subCacheMerkleRoots",
            "type": "Array<string>"
        },
        {
            "name": "totalFee",
            "baseName": "totalFee",
            "type": "Array<number>"
        },
        {
            "name": "numTransactions",
            "baseName": "numTransactions",
            "type": "number"
        },
        {
            "name": "numStatements",
            "baseName": "numStatements",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return BlockMetaDTO.attributeTypeMap;
    }
}

