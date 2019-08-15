
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
Catapult.Buffers.RestrictionAddressModificationBuffer = function() {
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
 * @returns {Catapult.Buffers.RestrictionAddressModificationBuffer}
 */
Catapult.Buffers.RestrictionAddressModificationBuffer.prototype.__init = function(i:any, bb:any) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {Catapult.Buffers.RestrictionAddressModificationBuffer=} obj
 * @returns {Catapult.Buffers.RestrictionAddressModificationBuffer}
 */
Catapult.Buffers.RestrictionAddressModificationBuffer.getRootAsRestrictionAddressModificationBuffer = function(bb:any, obj:any) {
    return (obj || new Catapult.Buffers.RestrictionAddressModificationBuffer).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @returns {number}
 */
Catapult.Buffers.RestrictionAddressModificationBuffer.prototype.modificationType = function() {
    var offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readUint8(this.bb_pos + offset) : 0;
};

/**
 * @param {number} index
 * @returns {number}
 */
Catapult.Buffers.RestrictionAddressModificationBuffer.prototype.value = function(index:any) {
    var offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.readUint8(this.bb.__vector(this.bb_pos + offset) + index) : 0;
};

/**
 * @returns {number}
 */
Catapult.Buffers.RestrictionAddressModificationBuffer.prototype.valueLength = function() {
    var offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
};

/**
 * @returns {Uint8Array}
 */
Catapult.Buffers.RestrictionAddressModificationBuffer.prototype.valueArray = function() {
    var offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? new Uint8Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
};

/**
 * @param {flatbuffers.Builder} builder
 */
Catapult.Buffers.RestrictionAddressModificationBuffer.startRestrictionAddressModificationBuffer = function(builder:any) {
    builder.startObject(2);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} type
 */
Catapult.Buffers.RestrictionAddressModificationBuffer.addModificationType = function(builder:any, type:any) {
    builder.addFieldInt8(0, type, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} valueOffset
 */
Catapult.Buffers.RestrictionAddressModificationBuffer.addValue = function(builder:any, valueOffset:any) {
    builder.addFieldOffset(1, valueOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {Array.<number>} data
 * @returns {flatbuffers.Offset}
 */
Catapult.Buffers.RestrictionAddressModificationBuffer.createValueVector = function(builder:any, data:any) {
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
Catapult.Buffers.RestrictionAddressModificationBuffer.startValueVector = function(builder:any, numElems:any) {
    builder.startVector(1, numElems, 1);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
Catapult.Buffers.RestrictionAddressModificationBuffer.endRestrictionAddressModificationBuffer = function(builder:any) {
    var offset = builder.endObject();
    return offset;
};

/**
 * @constructor
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer = function() {
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
 * @returns {Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer}
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.prototype.__init = function(i:any, bb:any) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer=} obj
 * @returns {Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer}
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.getRootAsAccountRestrictionsAddressTransactionBuffer = function(bb:any, obj:any) {
    return (obj || new Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @returns {number}
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.prototype.size = function() {
    var offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readUint32(this.bb_pos + offset) : 0;
};

/**
 * @param {number} index
 * @returns {number}
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.prototype.signature = function(index:any) {
    var offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.readUint8(this.bb.__vector(this.bb_pos + offset) + index) : 0;
};

/**
 * @returns {number}
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.prototype.signatureLength = function() {
    var offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
};

/**
 * @returns {Uint8Array}
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.prototype.signatureArray = function() {
    var offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? new Uint8Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
};

/**
 * @param {number} index
 * @returns {number}
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.prototype.signer = function(index:any) {
    var offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? this.bb.readUint8(this.bb.__vector(this.bb_pos + offset) + index) : 0;
};

/**
 * @returns {number}
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.prototype.signerLength = function() {
    var offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
};

/**
 * @returns {Uint8Array}
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.prototype.signerArray = function() {
    var offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? new Uint8Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
};

/**
 * @returns {number}
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.prototype.version = function() {
    var offset = this.bb.__offset(this.bb_pos, 10);
    return offset ? this.bb.readUint16(this.bb_pos + offset) : 0;
};

/**
 * @returns {number}
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.prototype.type = function() {
    var offset = this.bb.__offset(this.bb_pos, 12);
    return offset ? this.bb.readUint16(this.bb_pos + offset) : 0;
};

/**
 * @param {number} index
 * @returns {number}
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.prototype.fee = function(index:any) {
    var offset = this.bb.__offset(this.bb_pos, 14);
    return offset ? this.bb.readUint32(this.bb.__vector(this.bb_pos + offset) + index * 4) : 0;
};

/**
 * @returns {number}
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.prototype.feeLength = function() {
    var offset = this.bb.__offset(this.bb_pos, 14);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
};

/**
 * @returns {Uint32Array}
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.prototype.feeArray = function() {
    var offset = this.bb.__offset(this.bb_pos, 14);
    return offset ? new Uint32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
};

/**
 * @param {number} index
 * @returns {number}
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.prototype.deadline = function(index:any) {
    var offset = this.bb.__offset(this.bb_pos, 16);
    return offset ? this.bb.readUint32(this.bb.__vector(this.bb_pos + offset) + index * 4) : 0;
};

/**
 * @returns {number}
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.prototype.deadlineLength = function() {
    var offset = this.bb.__offset(this.bb_pos, 16);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
};

/**
 * @returns {Uint32Array}
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.prototype.deadlineArray = function() {
    var offset = this.bb.__offset(this.bb_pos, 16);
    return offset ? new Uint32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
};

/**
 * @returns {number}
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.prototype.restrictionType = function() {
    var offset = this.bb.__offset(this.bb_pos, 18);
    return offset ? this.bb.readUint8(this.bb_pos + offset) : 0;
};


/**
 * @returns {number}
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.prototype.modificationCount = function() {
    var offset = this.bb.__offset(this.bb_pos, 20);
    return offset ? this.bb.readUint8(this.bb_pos + offset) : 0;
};

/**
 * @param {number} index
 * @param {Catapult.Buffers.RestrictionAddressModificationBuffer=} obj
 * @returns {Catapult.Buffers.RestrictionAddressModificationBuffer}
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.prototype.modifications = function(index:any, obj:any) {
    var offset = this.bb.__offset(this.bb_pos, 22);
    return offset ? (obj || new Catapult.Buffers.RestrictionAddressModificationBuffer).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
};

/**
 * @returns {number}
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.prototype.modificationsLength = function() {
    var offset = this.bb.__offset(this.bb_pos, 22);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
};

/**
 * @param {flatbuffers.Builder} builder
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.startAccountRestrictionsAddressTransactionBuffer = function(builder:any) {
    builder.startObject(11);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} size
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.addSize = function(builder:any, size:any) {
    builder.addFieldInt32(0, size, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} signatureOffset
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.addSignature = function(builder:any, signatureOffset:any) {
    builder.addFieldOffset(1, signatureOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {Array.<number>} data
 * @returns {flatbuffers.Offset}
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.createSignatureVector = function(builder:any, data:any) {
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
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.startSignatureVector = function(builder:any, numElems:any) {
    builder.startVector(1, numElems, 1);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} signerOffset
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.addSigner = function(builder:any, signerOffset:any) {
    builder.addFieldOffset(2, signerOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {Array.<number>} data
 * @returns {flatbuffers.Offset}
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.createSignerVector = function(builder:any, data:any) {
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
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.startSignerVector = function(builder:any, numElems:any) {
    builder.startVector(1, numElems, 1);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} version
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.addVersion = function(builder:any, version:any) {
    builder.addFieldInt16(3, version, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} type
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.addType = function(builder:any, type:any) {
    builder.addFieldInt16(4, type, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} feeOffset
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.addFee = function(builder:any, feeOffset:any) {
    builder.addFieldOffset(5, feeOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {Array.<number>} data
 * @returns {flatbuffers.Offset}
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.createFeeVector = function(builder:any, data:any) {
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
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.startFeeVector = function(builder:any, numElems:any) {
    builder.startVector(4, numElems, 4);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} deadlineOffset
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.addDeadline = function(builder:any, deadlineOffset:any) {
    builder.addFieldOffset(6, deadlineOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {Array.<number>} data
 * @returns {flatbuffers.Offset}
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.createDeadlineVector = function(builder:any, data:any) {
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
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.startDeadlineVector = function(builder:any, numElems:any) {
    builder.startVector(4, numElems, 4);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} restrictionType
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.addRestrictionType = function(builder:any, restrictionType:any) {
    builder.addFieldInt8(7, restrictionType, 0);
};


/**
 * @param {flatbuffers.Builder} builder
 * @param {number} modificationCount
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.addModificationCount = function(builder:any, modificationCount:any) {
    builder.addFieldInt8(8, modificationCount, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} modificationsOffset
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.addModifications = function(builder:any, modificationsOffset:any) {
    builder.addFieldOffset(9, modificationsOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {Array.<flatbuffers.Offset>} data
 * @returns {flatbuffers.Offset}
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.createModificationsVector = function(builder:any, data:any) {
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
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.startModificationsVector = function(builder:any, numElems:any) {
    builder.startVector(4, numElems, 4);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.endAccountRestrictionsAddressTransactionBuffer = function(builder:any) {
    var offset = builder.endObject();
    return offset;
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} offset
 */
Catapult.Buffers.AccountRestrictionsAddressTransactionBuffer.finishAccountRestrictionsAddressTransactionBufferBuffer = function(builder:any, offset:any) {
    builder.finish(offset);
};

// Exports for Node.js and RequireJS
export default Catapult;
