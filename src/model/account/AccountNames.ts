

import { NamespaceName } from '../namespace/NamespaceName';
import {Address} from './Address';

/**
 * Account with linked names
 */
export class AccountNames {

    /**
     *
     */
    constructor(
        /**
         * Address of the account.
         */
        public readonly address: Address,
        /**
         * Address linked namespace Ids
         */
        public readonly names: NamespaceName[]) {

    }
}
