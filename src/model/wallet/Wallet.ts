

import {LocalDateTime} from 'js-joda';
import {Account} from '../account/Account';
import {Address} from '../account/Address';
import {NetworkType} from '../blockchain/NetworkType';
import {Password} from './Password';

/**
 * Wallet base model
 */
export abstract class Wallet {
    /**
     * @internal
     * @param name
     * @param network
     * @param address
     * @param creationDate
     * @param schema
     */
    constructor(
                /**
                 * The wallet's name
                 */
                public readonly name: string,
                /**
                 * The wallet's network
                 */
                public readonly network: NetworkType,
                /**
                 * The wallet's address
                 */
                public readonly address: Address,
                /**
                 * The wallet's creation date
                 */
                public readonly creationDate: LocalDateTime,
                /**
                 * Wallet schema number
                 */
                public readonly schema: string) {

    }

    /**
     * Abstract open wallet method returning an account from current wallet.
     * @param password - Password to open wallet.
     * @returns {Account}
     */
    public abstract open(password: Password): Account;
}
