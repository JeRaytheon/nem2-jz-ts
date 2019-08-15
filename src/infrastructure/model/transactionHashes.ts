export class TransactionHashes {
    /**
    * The array of transaction hashes.
    */
    'hashes'?: Array<string>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "hashes",
            "baseName": "hashes",
            "type": "Array<string>"
        }    ];

    static getAttributeTypeMap() {
        return TransactionHashes.attributeTypeMap;
    }
}

