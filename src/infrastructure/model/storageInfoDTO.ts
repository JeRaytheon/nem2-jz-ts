export class StorageInfoDTO {
    /**
    * The number of blocks stored.
    */
    'numBlocks': number;
    /**
    * The number of transactions stored.
    */
    'numTransactions': number;
    /**
    * The number of accounts created.
    */
    'numAccounts': number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "numBlocks",
            "baseName": "numBlocks",
            "type": "number"
        },
        {
            "name": "numTransactions",
            "baseName": "numTransactions",
            "type": "number"
        },
        {
            "name": "numAccounts",
            "baseName": "numAccounts",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return StorageInfoDTO.attributeTypeMap;
    }
}

