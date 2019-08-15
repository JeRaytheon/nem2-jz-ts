

import { ResolutionStatement } from './ResolutionStatement';
import { TransactionStatement } from './TransactionStatement';

export class Statement {

    /**
     * Receipt - transaction statement object
     * @param transactionStatements - The transaction statements.
     * @param addressResolutionStatements - The address resolution statements.
     * @param mosaicResolutionStatements - The mosaic resolution statements.
     */
    constructor(
                /**
                 * The transaction statements.
                 */
                public readonly transactionStatements: TransactionStatement[],
                /**
                 * The address resolution statements.
                 */
                public readonly addressResolutionStatements: ResolutionStatement[],
                /**
                 * The mosaic resolution statements.
                 */
                public readonly mosaicResolutionStatements: ResolutionStatement[]) {
    }
}
