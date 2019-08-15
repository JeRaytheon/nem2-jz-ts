

import { MerklePathItem } from "./MerklePathItem";

/**
 * The block merkle proof payload
 */
export class MerkleProofInfoPayload {

    /**
     * @param merklePath
     */
    constructor(/**
                 * The merkle path item
                 */
                public readonly merklePath: MerklePathItem[]) {

    }
}
