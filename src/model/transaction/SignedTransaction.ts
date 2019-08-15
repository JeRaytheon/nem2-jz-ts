

import {NetworkType} from '../blockchain/NetworkType';

/**
 * SignedTransaction object is used to transfer the transaction data and the signature to the server
 * in order to initiate and broadcast a transaction.
 */
export class SignedTransaction {
    /**
     * @internal
     * @param payload
     * @param hash
     * @param signer
     * @param type
     * @param networkType
     */
    constructor(/**
                 * Transaction serialized data
                 */
                public readonly payload: string,
                /**
                 * Transaction hash
                 */
                public readonly hash: string,
                /**
                 * Transaction signer
                 */
                public readonly signer: string,
                /**
                 * Transaction type
                 */
                public readonly type: number,
                /**
                 * Signer network type
                 */
                public readonly networkType: NetworkType) {
        if (hash.length !== 64) {
            throw new Error('hash must be 64 characters long');
        }
    }

    /**
     * Create DTO object
     */
    toDTO() {
        return {
            payload: this.payload,
            hash: this.hash,
            signer: this.signer,
            type: this.type,
            networkType: this.networkType,
        };
    }
}
