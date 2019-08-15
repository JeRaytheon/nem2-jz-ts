
import {
    array,
    Schema,
    TypeSize,
    ubyte,
    uint,
    ushort,
} from './Schema';

/**
 * @module schema/MosaicGlobalRestrictionTransactionSchema
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
    array('referenceMosaicId', TypeSize.INT),
    array('restrictionKey', TypeSize.INT),
    array('previousRestrictionValue', TypeSize.INT),
    ubyte('previousRestrictionType'),
    array('newRestrictionValue', TypeSize.INT),
    ubyte('newRestrictionType'),

]);
