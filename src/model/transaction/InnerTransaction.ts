

import {PublicAccount} from '../account/PublicAccount';
import {Transaction} from './Transaction';

/**
 * Transaction with signer included, used when adding signer to transactions included in an aggregate transaction.
 */
export type InnerTransaction = Transaction &  {signer: PublicAccount};
