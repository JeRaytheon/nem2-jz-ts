

import {UInt64} from '../UInt64';

/**
 * The blockchain score structure describes blockchain difficulty.
 */
export class BlockchainScore {

    /**
     * @param scoreLow
     * @param scoreHigh
     */
    constructor(/**
                 * Low part of the blockchain score.
                 */
                public readonly scoreLow: UInt64,
                /**
                 * High part of the blockchain score.
                 */
                public readonly scoreHigh: UInt64) {

    }
}
