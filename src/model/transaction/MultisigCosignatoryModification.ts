import {PublicAccount} from '../account/PublicAccount';
import {MultisigCosignatoryModificationType} from './MultisigCosignatoryModificationType';

/**
 * Multisig cosignatory modifications are part of the NEM's multisig account system.
 * With a multisig cosignatory modification a cosignatory is added to or deleted from a multisig account.
 * Multisig cosignatory modifications are part of a modify multisig account transactions.
 *
 */
export class MultisigCosignatoryModification {

    /**
     * Constructor
     * @param modificiationType
     * @param cosignatoryPublicAccount
     */
    constructor(
        /**
         * Multi-signature modification type.
         */
        public readonly modificiationType: MultisigCosignatoryModificationType,
        /**
         * Cosignatory public account.
         */
        public readonly cosignatoryPublicAccount: PublicAccount) {

    }

    /**
     * @internal
     */
    toDTO() {
        return {
            cosignatoryPublicKey: this.cosignatoryPublicAccount.publicKey,
            modificiationType: this.modificiationType,
        };
    }
}
