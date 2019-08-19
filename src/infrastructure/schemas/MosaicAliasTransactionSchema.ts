import {
    array,
    Schema,
    TypeSize,
    ubyte,
    uint,
    ushort
} from './Schema';

/**
 * @module schema/MosaicAliasTransactionSchema
 */

/**
 * Mosaic alias transaction schema
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
    ubyte('aliasAction'),
    array('namespaceId', TypeSize.INT),
    array('mosaicId', TypeSize.INT)
]);
