/**
* The transaction that triggered the receipt.
*/
export class SourceDTO {
    /**
    * The transaction index within the block.
    */
    'primaryId': number;
    /**
    * The transaction index inside within the aggregate transaction. If the transaction is not an inner transaction, then the secondary id is set to 0.
    */
    'secondaryId': number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "primaryId",
            "baseName": "primaryId",
            "type": "number"
        },
        {
            "name": "secondaryId",
            "baseName": "secondaryId",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return SourceDTO.attributeTypeMap;
    }
}

