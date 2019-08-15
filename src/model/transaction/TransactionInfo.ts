

import {UInt64} from '../UInt64';

/**
 * Transaction information model included in all transactions
 */
export class TransactionInfo {

    /**
     * @param height
     * @param index
     * @param id
     * @param hash
     * @param merkleComponentHash
     */
    constructor(
                /**
                 * The block height in which the transaction was included.
                 */
                public readonly height: UInt64,
                /**
                 * The index representing either transaction index/position within block or within an aggregate transaction.
                 */
                public readonly index: number,
                /**
                 * The transaction db id.
                 */
                public readonly id: string,
                /**
                 * The transaction hash.
                 */
                public readonly hash?: string,
                /**
                 * The transaction merkle hash.
                 */
                public readonly merkleComponentHash?: string) {}
}
