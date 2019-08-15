

import { ReceiptType } from './ReceiptType';
import { ReceiptVersion } from './ReceiptVersion';

/**
 * An abstract transaction class that serves as the base class of all receipts.
 */
export abstract class Receipt {

    /**
     * @constructor
     * @param size
     * @param version
     * @param type
     */
    constructor(
                /**
                 * The receipt version.
                 */
                public readonly version: ReceiptVersion,
                /**
                 * The receipt type.
                 */
                public readonly type: ReceiptType,
                /**
                 * The receipt size.
                 */
                public readonly size?: number) {
    }
}
