
import { ResolutionStatementDTO } from './resolutionStatementDTO';
import { TransactionStatementDTO } from './transactionStatementDTO';

/**
* The collection of transaction statements and resolutions triggered for the block requested.
*/
export class StatementsDTO {
    /**
    * The array of transaction statements for the block requested.
    */
    'transactionStatements': Array<TransactionStatementDTO>;
    /**
    * The array of address resolutions for the block requested.
    */
    'addressResolutionStatements': Array<ResolutionStatementDTO>;
    /**
    * The array of mosaic resolutions for the block requested.
    */
    'mosaicResolutionStatements': Array<ResolutionStatementDTO>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "transactionStatements",
            "baseName": "transactionStatements",
            "type": "Array<TransactionStatementDTO>"
        },
        {
            "name": "addressResolutionStatements",
            "baseName": "addressResolutionStatements",
            "type": "Array<ResolutionStatementDTO>"
        },
        {
            "name": "mosaicResolutionStatements",
            "baseName": "mosaicResolutionStatements",
            "type": "Array<ResolutionStatementDTO>"
        }    ];

    static getAttributeTypeMap() {
        return StatementsDTO.attributeTypeMap;
    }
}

