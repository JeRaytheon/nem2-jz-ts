

import {Deadline} from './Deadline';

/**
 * Transaction status error model returned by listeners
 */
export class TransactionStatusError {

    /**
     * @internal
     * @param hash
     * @param status
     * @param deadline
     */
    constructor(
                /**
                 * The transaction hash.
                 */
                public readonly hash: string,
                /**
                 * The status error message.
                 */
                public readonly status: string,
                /**
                 * The transaction deadline.
                 */
                public readonly deadline: Deadline) {

    }
}
