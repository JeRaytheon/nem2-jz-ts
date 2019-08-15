
import {
    array,
    Schema,
    TypeSize,
    ubyte,
    uint,
    ushort
} from './Schema';

/**
 * @module schema/SecretLockTransactionSchema
 */

/**
 * Secret lock transaction schema
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
    array('mosaicId', TypeSize.INT),
    array('mosaicAmount', TypeSize.INT),
    array('duration', TypeSize.INT),
    ubyte('hashAlgorithm'),
    array('secret'),
    array('recipient')
]);
export default schema;
