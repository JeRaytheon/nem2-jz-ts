/**
 * @const
 * @namespace
 */
var Catapult: any = Catapult || {};

/**
 * @const
 * @namespace
 */
Catapult.Buffers = Catapult.Buffers || {};

/**
 * @constructor
 */
Catapult.Buffers.AddressAliasTransactionBuffer = function () {
    /**
     * @type {flatbuffers.ByteBuffer}
     */
    this.bb = null;

    /**
     * @type {number}
     */
    this.bb_pos = 0;
};

/**
 * @param {number} i
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {Catapult.Buffers.AddressAliasTransactionBuffer}
 */
Catapult.Buffers.AddressAliasTransactionBuffer.prototype.__init = function (i: any, bb: any) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {Catapult.Buffers.AddressAliasTransactionBuffer=} obj
 * @returns {Catapult.Buffers.AddressAliasTransactionBuffer}
 */
Catapult.Buffers.AddressAliasTransactionBuffer.getRootAsAddressAliasTransactionBuffer = function (bb: any, obj: any) {
    return (obj || new Catapult.Buffers.AddressAliasTransactionBuffer).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @returns {number}
 */
Catapult.Buffers.AddressAliasTransactionBuffer.prototype.size = function () {
    var offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readUint32(this.bb_pos + offset) : 0;
};

/**
 * @param {number} index
 * @returns {number}
 */
Catapult.Buffers.AddressAliasTransactionBuffer.prototype.signature = function (index:any) {
    var offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.readUint8(this.bb.__vector(this.bb_pos + offset) + index) : 0;
};

/**
 * @returns {number}
 */
Catapult.Buffers.AddressAliasTransactionBuffer.prototype.signatureLength = function () {
    var offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
};

/**
 * @returns {Uint8Array}
 */
Catapult.Buffers.AddressAliasTransactionBuffer.prototype.signatureArray = function () {
    var offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? new Uint8Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
};

/**
 * @param {number} index
 * @returns {number}
 */
Catapult.Buffers.AddressAliasTransactionBuffer.prototype.signer = function (index:any ) {
    var offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? this.bb.readUint8(this.bb.__vector(this.bb_pos + offset) + index) : 0;
};

/**
 * @returns {number}
 */
Catapult.Buffers.AddressAliasTransactionBuffer.prototype.signerLength = function () {
    var offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
};

/**
 * @returns {Uint8Array}
 */
Catapult.Buffers.AddressAliasTransactionBuffer.prototype.signerArray = function () {
    var offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? new Uint8Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
};

/**
 * @returns {number}
 */
Catapult.Buffers.AddressAliasTransactionBuffer.prototype.version = function () {
    var offset = this.bb.__offset(this.bb_pos, 10);
    return offset ? this.bb.readUint16(this.bb_pos + offset) : 0;
};

/**
 * @returns {number}
 */
Catapult.Buffers.AddressAliasTransactionBuffer.prototype.type = function () {
    var offset = this.bb.__offset(this.bb_pos, 12);
    return offset ? this.bb.readUint16(this.bb_pos + offset) : 0;
};

/**
 * @param {number} index
 * @returns {number}
 */
Catapult.Buffers.AddressAliasTransactionBuffer.prototype.fee = function (index:any) {
    var offset = this.bb.__offset(this.bb_pos, 14);
    return offset ? this.bb.readUint32(this.bb.__vector(this.bb_pos + offset) + index * 4) : 0;
};

/**
 * @returns {number}
 */
Catapult.Buffers.AddressAliasTransactionBuffer.prototype.feeLength = function () {
    var offset = this.bb.__offset(this.bb_pos, 14);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
};

/**
 * @returns {Uint32Array}
 */
Catapult.Buffers.AddressAliasTransactionBuffer.prototype.feeArray = function () {
    var offset = this.bb.__offset(this.bb_pos, 14);
    return offset ? new Uint32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
};

/**
 * @param {number} index
 * @returns {number}
 */
Catapult.Buffers.AddressAliasTransactionBuffer.prototype.deadline = function (index:any) {
    var offset = this.bb.__offset(this.bb_pos, 16);
    return offset ? this.bb.readUint32(this.bb.__vector(this.bb_pos + offset) + index * 4) : 0;
};

/**
 * @returns {number}
 */
Catapult.Buffers.AddressAliasTransactionBuffer.prototype.deadlineLength = function () {
    var offset = this.bb.__offset(this.bb_pos, 16);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
};

/**
 * @returns {Uint32Array}
 */
Catapult.Buffers.AddressAliasTransactionBuffer.prototype.deadlineArray = function () {
    var offset = this.bb.__offset(this.bb_pos, 16);
    return offset ? new Uint32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
};

/**
 * @returns {number}
 */
Catapult.Buffers.AddressAliasTransactionBuffer.prototype.aliasAction = function () {
    var offset = this.bb.__offset(this.bb_pos, 18);
    return offset ? this.bb.readUint8(this.bb_pos + offset) : 0;
};

/**
 * @param {number} index
 * @returns {number}
 */
Catapult.Buffers.AddressAliasTransactionBuffer.prototype.namespaceId = function (index:any) {
    var offset = this.bb.__offset(this.bb_pos, 20);
    return offset ? this.bb.readUint32(this.bb.__vector(this.bb_pos + offset) + index * 4) : 0;
};

/**
 * @returns {number}
 */
Catapult.Buffers.AddressAliasTransactionBuffer.prototype.namespaceIdLength = function () {
    var offset = this.bb.__offset(this.bb_pos, 20);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
};

/**
 * @returns {Uint32Array}
 */
Catapult.Buffers.AddressAliasTransactionBuffer.prototype.namespaceIdArray = function () {
    var offset = this.bb.__offset(this.bb_pos, 20);
    return offset ? new Uint32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
};

/**
 * @param {number} index
 * @returns {number}
 */
Catapult.Buffers.AddressAliasTransactionBuffer.prototype.address = function (index:any) {
    var offset = this.bb.__offset(this.bb_pos, 22);
    return offset ? this.bb.readUint8(this.bb.__vector(this.bb_pos + offset) + index * 4) : 0;
};

/**
 * @returns {number}
 */
Catapult.Buffers.AddressAliasTransactionBuffer.prototype.addressLength = function () {
    var offset = this.bb.__offset(this.bb_pos, 22);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
};

/**
 * @returns {Uint32Array}
 */
Catapult.Buffers.AddressAliasTransactionBuffer.prototype.addressArray = function () {
    var offset = this.bb.__offset(this.bb_pos, 22);
    return offset ? new Uint8Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
};

/**
 * @param {flatbuffers.Builder} builder
 */
Catapult.Buffers.AddressAliasTransactionBuffer.startAddressAliasTransactionBuffer = function (builder:any) {
    builder.startObject(10);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} size
 */
Catapult.Buffers.AddressAliasTransactionBuffer.addSize = function (builder:any , size:any) {
    builder.addFieldInt32(0, size, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} signatureOffset
 */
Catapult.Buffers.AddressAliasTransactionBuffer.addSignature = function (builder:any, signatureOffset:any) {
    builder.addFieldOffset(1, signatureOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {Array.<number>} data
 * @returns {flatbuffers.Offset}
 */
Catapult.Buffers.AddressAliasTransactionBuffer.createSignatureVector = function (builder:any, data:any) {
    builder.startVector(1, data.length, 1);
    for (var i = data.length - 1; i >= 0; i--) {
        builder.addInt8(data[i]);
    }
    return builder.endVector();
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} numElems
 */
Catapult.Buffers.AddressAliasTransactionBuffer.startSignatureVector = function (builder:any, numElems:any) {
    builder.startVector(1, numElems, 1);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} signerOffset
 */
Catapult.Buffers.AddressAliasTransactionBuffer.addSigner = function (builder:any, signerOffset:any) {
    builder.addFieldOffset(2, signerOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {Array.<number>} data
 * @returns {flatbuffers.Offset}
 */
Catapult.Buffers.AddressAliasTransactionBuffer.createSignerVector = function (builder:any, data:any) {
    builder.startVector(1, data.length, 1);
    for (var i = data.length - 1; i >= 0; i--) {
        builder.addInt8(data[i]);
    }
    return builder.endVector();
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} numElems
 */
Catapult.Buffers.AddressAliasTransactionBuffer.startSignerVector = function (builder:any, numElems:any) {
    builder.startVector(1, numElems, 1);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} version
 */
Catapult.Buffers.AddressAliasTransactionBuffer.addVersion = function (builder:any, version:any) {
    builder.addFieldInt16(3, version, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} type
 */
Catapult.Buffers.AddressAliasTransactionBuffer.addType = function (builder:any, type:any) {
    builder.addFieldInt16(4, type, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} feeOffset
 */
Catapult.Buffers.AddressAliasTransactionBuffer.addFee = function (builder:any, feeOffset:any) {
    builder.addFieldOffset(5, feeOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {Array.<number>} data
 * @returns {flatbuffers.Offset}
 */
Catapult.Buffers.AddressAliasTransactionBuffer.createFeeVector = function (builder:any, data:any) {
    builder.startVector(4, data.length, 4);
    for (var i = data.length - 1; i >= 0; i--) {
        builder.addInt32(data[i]);
    }
    return builder.endVector();
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} numElems
 */
Catapult.Buffers.AddressAliasTransactionBuffer.startFeeVector = function (builder:any, numElems:any) {
    builder.startVector(4, numElems, 4);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} deadlineOffset
 */
Catapult.Buffers.AddressAliasTransactionBuffer.addDeadline = function (builder:any, deadlineOffset:any) {
    builder.addFieldOffset(6, deadlineOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {Array.<number>} data
 * @returns {flatbuffers.Offset}
 */
Catapult.Buffers.AddressAliasTransactionBuffer.createDeadlineVector = function (builder:any, data:any) {
    builder.startVector(4, data.length, 4);
    for (var i = data.length - 1; i >= 0; i--) {
        builder.addInt32(data[i]);
    }
    return builder.endVector();
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} numElems
 */
Catapult.Buffers.AddressAliasTransactionBuffer.startDeadlineVector = function (builder:any, numElems:any) {
    builder.startVector(4, numElems, 4);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} aliasAction
 */
Catapult.Buffers.AddressAliasTransactionBuffer.addAliasAction = function (builder:any, aliasAction:any) {
    builder.addFieldInt8(7, aliasAction, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} deltaOffset
 */
Catapult.Buffers.AddressAliasTransactionBuffer.addNamespaceId = function (builder:any, namespaceIdOffset:any) {
    builder.addFieldOffset(8, namespaceIdOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {Array.<number>} data
 * @returns {flatbuffers.Offset}
 */
Catapult.Buffers.AddressAliasTransactionBuffer.createNamespaceIdVector = function (builder:any, data:any) {
    builder.startVector(4, data.length, 4);
    for (var i = data.length - 1; i >= 0; i--) {
        builder.addInt32(data[i]);
    }
    return builder.endVector();
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} numElems
 */
Catapult.Buffers.AddressAliasTransactionBuffer.startNamespaceIdVector = function (builder:any, numElems:any) {
    builder.startVector(4, numElems, 4);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} mosaicIdOffset
 */
Catapult.Buffers.AddressAliasTransactionBuffer.addAddress = function (builder:any, addressOffset:any ) {
    builder.addFieldOffset(9, addressOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {Array.<number>} data
 * @returns {flatbuffers.Offset}
 */
Catapult.Buffers.AddressAliasTransactionBuffer.createAddressVector = function (builder:any , data:any ) {
    builder.startVector(1, data.length, 1);
    for (var i = data.length - 1; i >= 0; i--) {
        builder.addInt8(data[i]);
    }
    return builder.endVector();
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} numElems
 */
Catapult.Buffers.AddressAliasTransactionBuffer.startAddressVector = function (builder:any , numElems:any ) {
    builder.startVector(1, numElems, 1);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
Catapult.Buffers.AddressAliasTransactionBuffer.endAddressAliasTransactionBuffer = function (builder:any ) {
    var offset = builder.endObject();
    return offset;
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} offset
 */
Catapult.Buffers.AddressAliasTransactionBuffer.finishAddressAliasTransactionBufferBuffer = function (builder:any , offset:any ) {
    builder.finish(offset);
};

// Exports for Node.js and RequireJS
export default Catapult;
