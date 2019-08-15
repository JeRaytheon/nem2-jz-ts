

/* eslint-disable no-use-before-define */

/**
 * In bytes
 * @type {{BYTE: number, SHORT: number, INT: number}}
 */
export const TypeSize = {
    BYTE: 1,
    SHORT: 2,
    INT: 4,
};

/**
 * @param {string} name Attribute name
 * @returns {ScalarAttribute} return ScalarAttribute Instance
 */
export const ubyte = (name:any) => {
    return new ScalarAttribute(name, TypeSize.BYTE);
};

/**
 *
 * @param {string} name Attribute Name
 * @returns {ScalarAttribute} ScalarAttribute Instance
 */
export const byte = (name:any) => {
    return new ScalarAttribute(name, TypeSize.BYTE);
};

/**
 *
 * @param {string} name Attribute Name
 * @returns {ScalarAttribute} ScalarAttribute Instance
 */
export const ushort = (name:any) => {
    return new ScalarAttribute(name, TypeSize.SHORT);
};

/**
 *
 * @param {string} name Attribute Name
 * @returns {ScalarAttribute} ScalarAttribute Instance
 */
export const short = (name:any) => {
    return new ScalarAttribute(name, TypeSize.SHORT);
};

/**
 *
 * @param {string} name Attribute Name
 * @returns {ScalarAttribute} ScalarAttribute Instance
 */
export const uint = (name:any) => {
    return new ScalarAttribute(name, TypeSize.INT);
};

/**
 *
 * @param {string} name Attribute Name
 * @returns {ScalarAttribute} ScalarAttribute Instance
 */
export const int = (name:any) => {
    return new ScalarAttribute(name, TypeSize.INT);
};

/**
 *
 * @param {string} name Attribute Name
 * @param {number} typeSize Attribute Byte Size
 * @returns {ArrayAttribute} ArrayAttribute Instance
 */
export const array = (name:any, typeSize = TypeSize.BYTE) => {
    return new ArrayAttribute(name, typeSize);
};

/**
 *
 * @param {string} name Attribute Name
 * @returns {ArrayAttribute} ArrayAttribute Instance
 */
// tslint:disable-next-line: variable-name
export const string = (name:any) => {
    return array(name);
};

/**
 *
 * @param {string} name Attribute Name
 * @param {module:schema/Schema} schema Table Specific Schema definition
 * @returns {TableAttribute} TableAttribute Instance
 */
export const table = (name:any, schema:any) => {
    return new TableAttribute(name, schema);
};

/**
 *
 * @param {string} name Attribute Name
 * @param {module:schema/Schema} schema Schema Definition
 * @returns {TableArrayAttribute} TableAttribute Instance
 */
export const tableArray = (name:any, schema:any) => {
    return new TableArrayAttribute(name, schema);
};

/* eslint-disable */
const readInt32 = (offset:any, bytes:any) => {
    return bytes[offset] | bytes[offset + 1] << 8 | bytes[offset + 2] << 16 | bytes[offset + 3] << 24;
};

const readInt16 = (offset:any, bytes:any) => {
    return bytes[offset] | bytes[offset + 1] << 8;
};

// tslint:disable-next-line: variable-name
const __offset = (val0:any, fieldPos:any, bytes:any) => {
    const vtable = val0 - readInt32(val0, bytes);
    return fieldPos < readInt16(vtable, bytes) ? readInt16(vtable + fieldPos, bytes) : 0;
};

// tslint:disable-next-line: variable-name
const __vector_length = (offset:any, bytes:any) => {
    return readInt32(offset + readInt32(offset, bytes), bytes);
};

// tslint:disable-next-line: variable-name
const __indirect = (offset:any, bytes:any) => {
    return offset + readInt32(offset, bytes);
};

// tslint:disable-next-line: variable-name
const __vector = (offset:any, bytes:any) => {
    return offset + readInt32(offset, bytes) + 4;
};

const findVector = (val0:any, fieldPos:any, bytes:any, size:any) => {
    const offset = __offset(val0, fieldPos, bytes);
    const offsetLong = offset + val0;
    const vecStart = __vector(offsetLong, bytes);
    const vecLength = __vector_length(offsetLong, bytes) * (size ? size : 1);
    return offset ? bytes.slice(vecStart, vecStart + vecLength) : 0;
};

const findParam = (val0:any, fieldPos:any, bytes:any, numBytes:any) => {
    const offset = __offset(val0, fieldPos, bytes);
    return offset ? bytes.slice(offset + val0, offset + val0 + numBytes) : 0;
};

const findObjectStartPosition = (val0:any, fieldPos:any, bytes:any) => {
    const offset = __offset(val0, fieldPos, bytes);
    return __indirect(offset + val0, bytes);
};

const findArrayLength = (val0:any, fieldPos:any, bytes:any) => {
    const offset = __offset(val0, fieldPos, bytes);
    return offset ? __vector_length(val0 + offset, bytes) : 0;
};

const findObjectArrayElementStartPosition = (val0:any, fieldPos:any, bytes:any, index:any) => {
    const offset = __offset(val0, fieldPos, bytes);
    const vector = __vector(val0 + offset, bytes);
    return __indirect(vector + index * 4, bytes);
};

/**
 * Schema
 * @module schema/Schema
 */
export class Schema {
    schemaDefinition:any;
    /**
     * @constructor
     * @param {Array.<Attribute>} schemaDefinition Schema Definition
     */
    constructor(schemaDefinition:any) {
        this.schemaDefinition = schemaDefinition;
    }

    /**
     *
     * @param {Uint8Array} bytes flatbuffers bytes
     * @returns {Uint8Array} catapult buffer
     */
    serialize(bytes:any) {
        let i = 0;
        let resultBytes:any = [];
        while (i < this.schemaDefinition.length) {
            resultBytes = resultBytes.concat(this.schemaDefinition[i].serialize(bytes, 4 + (i * 2)));
            i++;
        }
        return resultBytes;
    }

    /**
     * @param {Uint8Array} bytes flatbuffer bytes
     * @returns {Array} Array with field name + payload
     */
    debugSerialize(bytes:any) {
        let i = 0;
        let result: any = [];
        while (i < this.schemaDefinition.length) {
            result = result.concat({
                name: this.schemaDefinition[i].name,
                bytes: this.schemaDefinition[i].debugSerialize(bytes, 4 + i * 2),
            });
            i++;
        }
        return result;
    }
}

// tslint:disable-next-line:max-classes-per-file
export class Attribute {
    name: any;
    /**
     * @constructor
     * @param {string} name schema attribute name
     */
    constructor(name:any) {
        this.name = name;
    }

    /**
     *
     * @param {Uint8Array} buffer flatbuffer bytes
     * @param {number} position attribute possition in flatbuffer bytes
     * @param {number} val0 position in case that it is an inner object
     */
    serialize(buffer:any, position:any, val0:any = undefined) {
        throw new Error('Unimplemented method');
    }

    /**
     * @suppress warnings
     * @param {Uint8Array} buffer buffer flatbuffer bytes
     * @param {number} position attribute possition in flatbuffer bytes
     * @param {number} val0 position in case that it is an inner object
     */
    debugSerialize(buffer:any, position:any, val0:any = undefined) {
        throw new Error('Unimplemented method');
    }
}

// tslint:disable-next-line:max-classes-per-file
export class ScalarAttribute extends Attribute {
    typeSize: any;
    name: any;
    /**
     * @constructor
     * @param {string} name schema attribute name
     * @param {number} typeSize
     */
    constructor(name:any, typeSize:any) {
        super(name);
        this.typeSize = typeSize;
    }

    serialize(buffer:any, position:any, val0:any = undefined) {
        return findParam(val0 ? val0 : buffer[0], position, buffer, this.typeSize);
    }

    debugSerialize(buffer:any, position:any, val0:any = undefined) {
        return {
            name: this.name,
            bytes: this.serialize(buffer, position, val0),
        };
    }
}

// tslint:disable-next-line:max-classes-per-file
export class ArrayAttribute extends Attribute {
    typeSize: any;
    name: any;
    /**
     * @constructor
     * @param name - {string}
     * @param typeSize - {TypeSize}
     */
    constructor(name:any, typeSize:any) {
        super(name);
        this.typeSize = typeSize;
    }

    serialize(buffer:any, position:any, val0:any = undefined) {
        return findVector(val0 ? val0 : buffer[0], position, buffer, this.typeSize);
    }

    debugSerialize(buffer:any, position:any, val0:any = undefined) {
        return {
            name: this.name,
            bytes: this.serialize(buffer, position, val0),
        };
    }
}

// tslint:disable-next-line:max-classes-per-file
export class TableAttribute extends Attribute {
    schema: any;
    name: any;
    /**
     *
     * @param {string} name
     * @param {module:schema/Schema} schema
     */
    constructor(name:any, schema:any) {
        super(name);
        this.schema = schema;
    }

    serialize(bytes:any, position:any, val0:any = undefined) {
        let result:any = [];
        const messageStartPosition = findObjectStartPosition(val0 ? val0 : bytes[0], position, bytes);
        let i = 0;
        while (i < this.schema.length) {
            result = result.concat(this.schema[i].serialize(bytes, 4 + i * 2, messageStartPosition));
            i++;
        }
        return result;
    }

    debugSerialize(buffer:any, position:any, val0:any = undefined) {
        return {
            name: this.name,
            bytes: this.serialize(buffer, position, val0),
        };
    }
}

// tslint:disable-next-line:max-classes-per-file
export class TableArrayAttribute extends Attribute {
    schema: any;
    name: any;
    /**
     * @constructor
     * @param {string} name
     * @param {module:schema/Schema} schema
     */
    constructor(name:any, schema:any) {
        super(name);
        this.schema = schema;
    }

    serialize(bytes:any, position:any, val0 :any= undefined) {
        let result:any = [];
        const arrayLength = findArrayLength(val0 ? val0 : bytes[0], position, bytes);
        let i = 0;
        while (i < arrayLength) {
            const startArrayPosition = findObjectArrayElementStartPosition(val0 ? val0 : bytes[0], position, bytes, i);
            for (let j = 0; j < this.schema.length; ++j) {
                result = result.concat(this.schema[j].serialize(bytes, 4 + j * 2, startArrayPosition));
            }
            i++;
        }
        return result;
    }

    debugSerialize(buffer:any, position:any, val0 :any= undefined) {
        return {
            name: this.name,
            bytes: this.serialize(buffer, position, val0),
        };
    }
}
