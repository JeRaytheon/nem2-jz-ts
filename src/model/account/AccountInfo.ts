

import {Mosaic} from '../mosaic/Mosaic';
import {UInt64} from '../UInt64';
import {Address} from './Address';
import {PublicAccount} from './PublicAccount';

/**
 * The account info structure describes basic information for an account.
 */
export class AccountInfo {

    /**
     *
     */
    constructor(// TODO: meta not implemented in nis
        /**
         * Account metadata
         */
        public readonly meta: any,
        /**
         * Address of the account.
         */
        public readonly address: Address,
        /**
         * Height when the address was published.
         */
        public readonly addressHeight: UInt64,
        /**
         * Public key of the account.
         */
        public readonly publicKey: string,
        /**
         * Height when the public key was published.
         */
        public readonly publicKeyHeight: UInt64,
        /**
         * Mosaics hold by the account.
         */
        public readonly mosaics: Mosaic[],
        /**
         * Importance of the account.
         */
        public readonly importance: UInt64,
        /**
         * Importance height of the account.
         */
        public readonly importanceHeight: UInt64) {

    }

    /**
     * Returns account public account.
     * @returns {PublicAccount}
     */
    get publicAccount(): PublicAccount {
        return PublicAccount.createFromPublicKey(this.publicKey, this.address.networkType);
    }
}
