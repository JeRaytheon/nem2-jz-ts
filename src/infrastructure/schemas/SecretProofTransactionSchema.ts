
import {
    array,
    Schema,
    TypeSize,
    ubyte,
    uint,
    ushort
} from './Schema';

/**
 * @module schema/SecretProofTransactionSchema
 */

/**
 * Secret proof transaction schema
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
    ubyte('hashAlgorithm'),
    array('secret'),
    array('recipient'),
    ushort('proofSize'),
    array('proof')
]);
export default schema;
