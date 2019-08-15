import { CreateTransactionFromDTO } from '../../infrastructure/transaction/CreateTransactionFromDTO';
import { CreateTransactionFromPayload } from '../../infrastructure/transaction/CreateTransactionFromPayload';
import { Transaction } from '../../model/transaction/Transaction';

export class TransactionMapping {

    /**
     * Create transaction class from Json.
     * @param {object} dataJson The transaction json object.
     * @returns {module: model/transaction/transaction} The transaction class.
     */
    public static createFromDTO(dataJson: object): Transaction {
        return CreateTransactionFromDTO(dataJson);
    }

    /**
     * Create transaction class from payload binary.
     * @param {string} dataBytes The transaction json object.
     * @returns {module: model/transaction/transaction} The transaction class.
     */
    public static createFromPayload(dataBytes: string): Transaction {
        return CreateTransactionFromPayload(dataBytes);
    }
}
