
import { SourceDTO } from './sourceDTO';

/**
* The collection of receipts related to a transaction.
*/
export class TransactionStatementDTO {
    'height': Array<number>;
    'source': SourceDTO;
    /**
    * The array of receipts.
    */
    'receipts': Array<object>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "height",
            "baseName": "height",
            "type": "Array<number>"
        },
        {
            "name": "source",
            "baseName": "source",
            "type": "SourceDTO"
        },
        {
            "name": "receipts",
            "baseName": "receipts",
            "type": "Array<object>"
        }    ];

    static getAttributeTypeMap() {
        return TransactionStatementDTO.attributeTypeMap;
    }
}

