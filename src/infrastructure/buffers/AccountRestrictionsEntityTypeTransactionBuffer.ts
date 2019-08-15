/**
 * @const
 * @namespace
 */
var Catapult:any = Catapult || {};

/**
 * @const
 * @namespace
 */
Catapult.Buffers = Catapult.Buffers || {};

/**
 * @constructor
 */
Catapult.Buffers.RestrictionEntityTypeModificationBuffer = function() {
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
 * @returns {Catapult.Buffers.RestrictionEntityTypeModificationBuffer}
 */
Catapult.Buffers.RestrictionEntityTypeModificationBuffer.prototype.__init = function(i:any, bb:any) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {Catapult.Buffers.RestrictionEntityTypeModificationBuffer=} obj
 * @returns {Catapult.Buffers.RestrictionEntityTypeModificationBuffer}
 */
Catapult.Buffers.RestrictionEntityTypeModificationBuffer.getRootAsRestrictionEntityTypeModificationBuffer = function(bb:any, obj:any) {
    return (obj || new Catapult.Buffers.RestrictionEntityTypeModificationBuffer).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @returns {number}
 */
Catapult.Buffers.RestrictionEntityTypeModificationBuffer.prototype.modificationType = function() {
    var offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readUint8(this.bb_pos + offset) : 0;
};

/**
 * @param {number} index
 * @returns {number}
 */
Catapult.Buffers.RestrictionEntityTypeModificationBuffer.prototype.value = function() {
    var offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.readUint16(this.bb_pos + offset) : 0;
};

/**
 * @param {flatbuffers.Builder} builder
 */
Catapult.Buffers.RestrictionEntityTypeModificationBuffer.startRestrictionEntityTypeModificationBuffer = function(builder:any) {
    builder.startObject(2);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} type
 */
Catapult.Buffers.RestrictionEntityTypeModificationBuffer.addModificationType = function(builder:any, type:any) {
    builder.addFieldInt8(0, type, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} valueOffset
 */
Catapult.Buffers.RestrictionEntityTypeModificationBuffer.addValue = function(builder:any, valueOffset:any) {
    builder.addFieldInt16(1, valueOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
Catapult.Buffers.RestrictionEntityTypeModificationBuffer.endRestrictionEntityTypeModificationBuffer = function(builder:any) {
    var offset = builder.endObject();
    return offset;
};

/**
 * @constructor
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer = function() {
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
 * @returns {Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer}
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.prototype.__init = function(i:any, bb:any) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer=} obj
 * @returns {Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer}
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.getRootAsAccountRestrictionsEntityTypeTransactionBuffer = function(bb:any, obj:any) {
    return (obj || new Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @returns {number}
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.prototype.size = function() {
    var offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readUint32(this.bb_pos + offset) : 0;
};

/**
 * @param {number} index
 * @returns {number}
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.prototype.signature = function(index:any) {
    var offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.readUint8(this.bb.__vector(this.bb_pos + offset) + index) : 0;
};

/**
 * @returns {number}
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.prototype.signatureLength = function() {
    var offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
};

/**
 * @returns {Uint8Array}
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.prototype.signatureArray = function() {
    var offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? new Uint8Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
};

/**
 * @param {number} index
 * @returns {number}
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.prototype.signer = function(index:any) {
    var offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? this.bb.readUint8(this.bb.__vector(this.bb_pos + offset) + index) : 0;
};

/**
 * @returns {number}
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.prototype.signerLength = function() {
    var offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
};

/**
 * @returns {Uint8Array}
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.prototype.signerArray = function() {
    var offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? new Uint8Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
};

/**
 * @returns {number}
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.prototype.version = function() {
    var offset = this.bb.__offset(this.bb_pos, 10);
    return offset ? this.bb.readUint16(this.bb_pos + offset) : 0;
};

/**
 * @returns {number}
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.prototype.type = function() {
    var offset = this.bb.__offset(this.bb_pos, 12);
    return offset ? this.bb.readUint16(this.bb_pos + offset) : 0;
};

/**
 * @param {number} index
 * @returns {number}
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.prototype.fee = function(index:any) {
    var offset = this.bb.__offset(this.bb_pos, 14);
    return offset ? this.bb.readUint32(this.bb.__vector(this.bb_pos + offset) + index * 4) : 0;
};

/**
 * @returns {number}
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.prototype.feeLength = function() {
    var offset = this.bb.__offset(this.bb_pos, 14);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
};

/**
 * @returns {Uint32Array}
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.prototype.feeArray = function() {
    var offset = this.bb.__offset(this.bb_pos, 14);
    return offset ? new Uint32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
};

/**
 * @param {number} index
 * @returns {number}
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.prototype.deadline = function(index:any) {
    var offset = this.bb.__offset(this.bb_pos, 16);
    return offset ? this.bb.readUint32(this.bb.__vector(this.bb_pos + offset) + index * 4) : 0;
};

/**
 * @returns {number}
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.prototype.deadlineLength = function() {
    var offset = this.bb.__offset(this.bb_pos, 16);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
};

/**
 * @returns {Uint32Array}
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.prototype.deadlineArray = function() {
    var offset = this.bb.__offset(this.bb_pos, 16);
    return offset ? new Uint32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
};

/**
 * @returns {number}
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.prototype.restrictionType = function() {
    var offset = this.bb.__offset(this.bb_pos, 18);
    return offset ? this.bb.readUint8(this.bb_pos + offset) : 0;
};


/**
 * @returns {number}
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.prototype.modificationCount = function() {
    var offset = this.bb.__offset(this.bb_pos, 20);
    return offset ? this.bb.readUint8(this.bb_pos + offset) : 0;
};

/**
 * @param {number} index
 * @param {Catapult.Buffers.RestrictionEntityTypeModificationBuffer=} obj
 * @returns {Catapult.Buffers.RestrictionEntityTypeModificationBuffer}
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.prototype.modifications = function(index:any, obj:any) {
    var offset = this.bb.__offset(this.bb_pos, 22);
    return offset ? (obj || new Catapult.Buffers.RestrictionEntityTypeModificationBuffer).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
};

/**
 * @returns {number}
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.prototype.modificationsLength = function() {
    var offset = this.bb.__offset(this.bb_pos, 22);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
};

/**
 * @param {flatbuffers.Builder} builder
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.startAccountRestrictionsEntityTypeTransactionBuffer = function(builder:any) {
    builder.startObject(11);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} size
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.addSize = function(builder:any, size:any) {
    builder.addFieldInt32(0, size, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} signatureOffset
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.addSignature = function(builder:any, signatureOffset:any) {
    builder.addFieldOffset(1, signatureOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {Array.<number>} data
 * @returns {flatbuffers.Offset}
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.createSignatureVector = function(builder:any, data:any) {
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
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.startSignatureVector = function(builder:any, numElems:any) {
    builder.startVector(1, numElems, 1);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} signerOffset
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.addSigner = function(builder:any, signerOffset:any) {
    builder.addFieldOffset(2, signerOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {Array.<number>} data
 * @returns {flatbuffers.Offset}
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.createSignerVector = function(builder:any, data:any) {
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
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.startSignerVector = function(builder:any, numElems:any) {
    builder.startVector(1, numElems, 1);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} version
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.addVersion = function(builder:any, version:any) {
    builder.addFieldInt16(3, version, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} type
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.addType = function(builder:any, type:any) {
    builder.addFieldInt16(4, type, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} feeOffset
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.addFee = function(builder:any, feeOffset:any) {
    builder.addFieldOffset(5, feeOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {Array.<number>} data
 * @returns {flatbuffers.Offset}
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.createFeeVector = function(builder:any, data:any) {
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
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.startFeeVector = function(builder:any, numElems:any) {
    builder.startVector(4, numElems, 4);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} deadlineOffset
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.addDeadline = function(builder:any, deadlineOffset:any) {
    builder.addFieldOffset(6, deadlineOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {Array.<number>} data
 * @returns {flatbuffers.Offset}
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.createDeadlineVector = function(builder:any, data:any) {
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
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.startDeadlineVector = function(builder:any, numElems:any) {
    builder.startVector(4, numElems, 4);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} restrictionType
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.addRestrictionType = function(builder:any, restrictionType:any) {
    builder.addFieldInt8(7, restrictionType, 0);
};


/**
 * @param {flatbuffers.Builder} builder
 * @param {number} modificationCount
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.addModificationCount = function(builder:any, modificationCount:any) {
    builder.addFieldInt8(8, modificationCount, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} modificationsOffset
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.addModifications = function(builder:any, modificationsOffset:any) {
    builder.addFieldOffset(9, modificationsOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {Array.<flatbuffers.Offset>} data
 * @returns {flatbuffers.Offset}
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.createModificationsVector = function(builder:any, data:any) {
    builder.startVector(4, data.length, 4);
    for (var i = data.length - 1; i >= 0; i--) {
        builder.addOffset(data[i]);
    }
    return builder.endVector();
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} numElems
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.startModificationsVector = function(builder:any, numElems:any) {
    builder.startVector(4, numElems, 4);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.endAccountRestrictionsEntityTypeTransactionBuffer = function(builder:any) {
    var offset = builder.endObject();
    return offset;
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} offset
 */
Catapult.Buffers.AccountRestrictionsEntityTypeTransactionBuffer.finishAccountRestrictionsEntityTypeTransactionBufferBuffer = function(builder:any, offset:any) {
    builder.finish(offset);
};

// Exports for Node.js and RequireJS
export default Catapult;
