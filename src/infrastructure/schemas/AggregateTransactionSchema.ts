
import {
    array,
    Schema,
    TypeSize,
    uint,
    ushort
} from './Schema';

/**
 * @module schema/AggregateTransactionSchema
 */

/**
 * Aggregate transaction schema
 * @const {module:schema/Schema}
 */
const schema = new Schema([
    uint('size'),
    array('signature'),
    array('signer'),
    ushort('version'),
    ushort('type'),
    array('fee', TypeSize.INT),
    array('deadline', TypeSize.INT),
    uint('transactionsSize'),
    array('transactions')
]);

export default schema;
