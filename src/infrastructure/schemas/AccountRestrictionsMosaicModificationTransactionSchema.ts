
import {
    array,
    Schema,
    TypeSize,
    ubyte,
    ushort,
    tableArray,
    uint
} from './Schema';

/**
 * @module schema/AccountRestrictionsMosaicModificationTransactionSchema
 */

/**
 * Account restrictions address transaction schema
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
    ubyte('restrictionType'),
    ubyte('modificationCount'),
    tableArray('modifications', [
        ubyte('modificationType'),
        array('value', TypeSize.INT)
    ])
]);
