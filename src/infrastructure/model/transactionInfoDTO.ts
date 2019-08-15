
import { TransactionMetaDTO } from './transactionMetaDTO';

export class TransactionInfoDTO {
    'meta': TransactionMetaDTO;
    'transaction': object;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "meta",
            "baseName": "meta",
            "type": "TransactionMetaDTO"
        },
        {
            "name": "transaction",
            "baseName": "transaction",
            "type": "object"
        }    ];

    static getAttributeTypeMap() {
        return TransactionInfoDTO.attributeTypeMap;
    }
}

