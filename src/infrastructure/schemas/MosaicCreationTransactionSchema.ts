
import {
    array,
    Schema,
    TypeSize,
    ubyte,
    uint,
    ushort
} from './Schema';

/**
 * @module schema/MosaicCreationTransactionSchema
 */

/**
 * Mosaic definition creation transaction schema
 * @const {module:schema/Schema}
 */
export const schema = new Schema([
    uint('size'),
    array('signature'),
    array('signer'),
    ushort('version'),
    ushort('type'),
    array('fee', TypeSize.INT),
    array('deadline', TypeSize.INT),
    array('nonce', TypeSize.BYTE),
    array('mosaicId', TypeSize.INT),
    ubyte('numOptionalProperties'),
    ubyte('flags'),
    ubyte('divisibility'),
    ubyte('indicateDuration'),
    array('duration', TypeSize.INT)
]);

export const schemaNoDuration = new Schema([
    uint('size'),
    array('signature'),
    array('signer'),
    ushort('version'),
    ushort('type'),
    array('fee', TypeSize.INT),
    array('deadline', TypeSize.INT),
    array('nonce', TypeSize.BYTE),
    array('mosaicId', TypeSize.INT),
    ubyte('numOptionalProperties'),
    ubyte('flags'),
    ubyte('divisibility')
]);
