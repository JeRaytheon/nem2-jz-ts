

import {UInt64} from '../UInt64';
import {Deadline} from './Deadline';

/**
 * Transaction status contains basic of a transaction announced to the blockchain.
 */
export class TransactionStatus {

    /**
     * @param group
     * @param status
     * @param hash
     * @param deadline
     * @param height
     */
    constructor(
                /**
                 * The transaction status being the error name in case of failure and success otherwise.
                 */
                public readonly status: string,
                /**
                 * The transaction status group "failed", "unconfirmed", "confirmed", etc...
                 */
                public readonly group?: string,
                /**
                 * The transaction hash.
                 */
                public readonly hash?: string,
                /**
                 * The transaction deadline.
                 */
                public readonly deadline?: Deadline,
                /**
                 * The height of the block at which it was confirmed or rejected.
                 */
                public readonly height?: UInt64) {}
}
