

import {PublicAccount} from './PublicAccount';

/**
 * The multisig account graph info structure describes the information of all the mutlisig levels an account is involved in.
 */
export class MultisigAccountInfo {

    /**
     * @param account
     * @param minApproval
     * @param minRemoval
     * @param cosignatories
     * @param multisigAccounts
     */
    constructor(/**
                 * The account multisig public account.
                 */
                public readonly account: PublicAccount,
                /**
                 * The number of signatures needed to approve a transaction.
                 */
                public readonly minApproval: number,
                /**
                 * The number of signatures needed to remove a cosignatory.
                 */
                public readonly minRemoval: number,
                /**
                 * The multisig account cosignatories.
                 */
                public readonly cosignatories: PublicAccount[],
                /**
                 * The multisig accounts this account is cosigner of.
                 */
                public readonly multisigAccounts: PublicAccount[]) {

    }

    /**
     * Checks if the account is a multisig account.
     * @returns {boolean}
     */
    public isMultisig(): boolean {
        return this.minRemoval !== 0 && this.minApproval !== 0;
    }

    /**
     * Checks if an account is cosignatory of the multisig account.
     * @param account
     * @returns {boolean}
     */
    public hasCosigner(account: PublicAccount): boolean {
        return this.cosignatories.find((cosigner) => cosigner.equals(account)) !== undefined;
    }

    /**
     * Checks if the multisig account is cosignatory of an account.
     * @param account
     * @returns {boolean}
     */
    public isCosignerOfMultisigAccount(account: PublicAccount): boolean {
        return this.multisigAccounts.find((multisigAccount) => multisigAccount.equals(account)) !== undefined;
    }
}
