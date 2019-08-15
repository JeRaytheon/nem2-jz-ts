

/**
 * The block merkle path item
 */
export class MerklePathItem {

    /**
     * @param position
     * @param hash
     */
    constructor(/**
                 * The position
                 */
                public readonly position?: number,
                /**
                 * The hash
                 */
                public readonly hash?: string) {

    }
}
