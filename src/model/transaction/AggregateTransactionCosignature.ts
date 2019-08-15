

import {PublicAccount} from '../account/PublicAccount';
import { NetworkType } from '../blockchain/NetworkType';
/**
 * Model representing cosignature of an aggregate transaction.
 */
export class AggregateTransactionCosignature {

    /**
     * @param signature
     * @param signer
     */
    constructor(/**
                 * The signature of aggregate transaction done by the cosigner.
                 */
                public readonly signature: string,
                /**
                 * The cosigner public account.
                 */
                public readonly signer: PublicAccount) {

    }

    /**
     * Create DTO object
     */
    public toDTO() {
        return {
            signature: this.signature,
            signer: this.signer.toDTO(),
        };
    }
}
