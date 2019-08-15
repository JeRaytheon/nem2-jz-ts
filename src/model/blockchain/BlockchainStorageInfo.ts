

/**
 * The blockchain storage info structure describes stored data.
 */
export class BlockchainStorageInfo {

    /**
     * @param numBlocks
     * @param numTransactions
     * @param numAccounts
     */
    constructor(/**
                 * The number of confirmed blocks.
                 */
                public readonly numBlocks: number,
                /**
                 * The number of confirmed transactions.
                 */
                public readonly numTransactions: number,
                /**
                 * The number accounts published in the blockchain.
                 */
                public readonly numAccounts: number) {
    }
}
