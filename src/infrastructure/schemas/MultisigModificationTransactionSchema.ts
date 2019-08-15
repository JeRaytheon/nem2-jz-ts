
import {
    array,
    Schema,
    tableArray,
    TypeSize,
    ubyte,
    uint,
    ushort
} from './Schema';

/**
 * @module schema/MultigAggregateModificationTransactionSchema
 */

/**
 * Multisig aggregate modification transaction schema
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
    ubyte('minRemovalDelta'),
    ubyte('minApprovalDelta'),
    ubyte('numModifications'),
    tableArray('modifications', [
        ubyte('type'),
        array('cosignatoryPublicKey')
    ])
]);
