

import {MultisigAccountInfo} from './MultisigAccountInfo';

/**
 * Multisig account graph info model
 */
export class MultisigAccountGraphInfo {

    /**
     * @internal
     * @param multisigAccounts
     */
    constructor(/**
                 * The multisig accounts.
                 */
                public readonly multisigAccounts: Map<number, MultisigAccountInfo[]>) {
    }
}
