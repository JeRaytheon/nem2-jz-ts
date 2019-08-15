
import {
    array,
    Schema,
    string,
    TypeSize,
    ubyte,
    uint,
    ushort
} from './Schema';

/**
 * @module schema/NamespaceCreationTransactionSchema
 */

/**
 * Provision namespace transaction schema
 * @const {module:schema/Schema}
 */
export default new Schema([
    uint('size'),
    array('signature'),
    array('signer'),
    ushort('version'),
    ushort('type'),
    array('fee', TypeSize.INT),
    array('deadline', TypeSize.INT),
    ubyte('namespaceType'),
    array('durationParentId', TypeSize.INT),
    array('namespaceId', TypeSize.INT),
    ubyte('namespaceNameSize'),
    string('name')
]);
