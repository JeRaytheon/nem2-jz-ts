
import {
    array,
    Schema,
    TypeSize,
    ubyte,
    uint,
    ushort
} from './Schema';

/**
 * @module schema/AccountLinkTransaction
 */

/**
 * Account Link schema
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
    array('remoteAccountKey'),
    ubyte('linkAction')
]);
export default schema;
