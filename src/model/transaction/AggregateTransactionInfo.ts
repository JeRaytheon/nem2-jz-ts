

import {UInt64} from '../UInt64';
import {TransactionInfo} from './TransactionInfo';

/**
 * Inner transaction information model included in all aggregate inner transactions
 */
export class AggregateTransactionInfo extends TransactionInfo {

    /**
     * @param height
     * @param index
     * @param id
     * @param aggregateHash
     * @param aggregateId
     */
    constructor(height: UInt64,
                index: number,
                id: string,
                /**
                 * The hash of the aggregate transaction.
                 */
                public readonly aggregateHash: string,
                /**
                 * The id of the aggregate transaction.
                 */
                public readonly aggregateId: string) {

        super(height, index, id);
    }
}
