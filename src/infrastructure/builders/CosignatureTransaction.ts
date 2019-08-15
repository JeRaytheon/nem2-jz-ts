import { Convert as convert } from '../../core/format/Convert';
import { VerifiableTransaction } from './VerifiableTransaction';

/**
 * @module transactions/AggregateSignatureTransaction
 * @version 1.0.0
 */
export class CosignatureTransaction extends VerifiableTransaction {
    constructor(hash:any) {
        super(convert.hexToUint8(hash), undefined);
    }
}
