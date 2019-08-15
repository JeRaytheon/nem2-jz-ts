
import {
    array,
    Schema,
    TypeSize,
    ubyte,
    uint,
    ushort
} from './Schema';

/**
 * @module schema/MosaicAddressRestrictionTransactionSchema
 */

/**
 * Account Link schema
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
    array('mosaicId', TypeSize.INT),
    array('restrictionKey', TypeSize.INT),
    array('targetAddress', TypeSize.BYTE),
    array('previousRestrictionValue', TypeSize.INT),
    array('newRestrictionValue', TypeSize.INT),
]);
