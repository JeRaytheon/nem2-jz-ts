

import { MerkleProofInfoPayload } from "./MerkleProofInfoPayload";

/**
 * The block merkle proof info
 */
export class MerkleProofInfo {

    /**
     * @param payload - The merkle proof payload
     * @param type - The merkle proof type
     */
    constructor(/**
                 * The merkle proof payload
                 */
                public readonly payload: MerkleProofInfoPayload,
                /**
                 * The merkle proof type
                 */
                public readonly type: string) {

    }
}
