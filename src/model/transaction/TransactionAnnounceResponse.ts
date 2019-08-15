

/**
 * Transaction response of an announce transaction
 */
export class TransactionAnnounceResponse {

    /**
     * @internal
     * @param message
     */
    constructor(
                /**
                 * The success or error message.
                 */
                public readonly message: string) {

    }
}
