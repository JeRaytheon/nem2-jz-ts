export class TransactionIds {
    /**
    * The array of transaction ids.
    */
    'transactionIds'?: Array<string>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "transactionIds",
            "baseName": "transactionIds",
            "type": "Array<string>"
        }    ];

    static getAttributeTypeMap() {
        return TransactionIds.attributeTypeMap;
    }
}

