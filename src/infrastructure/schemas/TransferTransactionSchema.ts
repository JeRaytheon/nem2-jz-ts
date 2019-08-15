
import {
    array,
    Schema,
    table,
    tableArray,
    TypeSize,
    ubyte,
    uint,
    ushort
} from './Schema';

/**
 * @module schema/TransferTransactionSchema
 */

/**
 * Transfer transaction schema
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
    array('recipient'),
    ushort('messageSize'),
    ubyte('numMosaics'),
    table('message', [
        ubyte('type'),
        array('payload')
    ]),
    tableArray('mosaics', [
        array('id', TypeSize.INT),
        array('amount', TypeSize.INT)
    ])
]);
export default schema;
