

/**
 * Receipt version constants.
 *
 * @see https://github.com/nemtech/catapult-server/blob/master/src/catapult/model/ReceiptType.h
 * @see https://github.com/nemtech/catapult-server/blob/master/src/catapult/model/ReceiptType.cpp
 */
export class ReceiptVersion {

    /**
     * Balance transfer receipt version.
     * @type {number}
     */
    public static readonly BALANCE_TRANSFER = 0x1;

    /**
     * Balance change receipt version
     * @type {number}
     */
    public static readonly BALANCE_CHANGE = 0x1;
    /**
     * Artifact expiry receipt version
     * @type {number}
     */
    public static readonly ARTIFACT_EXPIRY = 0x1;
    /**
     * Transaction statement version
     * @type {number}
     */
    public static readonly TRANSACTION_STATEMENT = 0x1;

    /**
     * Resolution statement version
     * @type {number}
     */
    public static readonly RESOLUTION_STATEMENT = 0x1;

    /**
     * Resolution statement version
     * @type {number}
     */
    public static readonly INFLATION_RECEIPT = 0x1;
}
