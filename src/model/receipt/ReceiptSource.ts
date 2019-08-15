

/**
 * The receipt source object.
 */
export class ReceiptSource {

    /**
     * @constructor
     * @param primaryId - The transaction primary source (e.g. index within block).
     * @param secondaryId - The transaction secondary source (e.g. index within aggregate).
     */
    constructor(
                /**
                 * The transaction primary source (e.g. index within block).
                 */
                public readonly primaryId: number,
                /**
                 * The transaction secondary source (e.g. index within aggregate).
                 */
                public readonly secondaryId: number) {
    }
}
