import {
    VerifiableTransaction
} from './VerifiableTransaction';


import {flatbuffers} from 'flatbuffers';

/**
 * @module transactions/VerifiableTransactionBuilder
 */

/**
 * @callback LambdaBuilder
 * @param {flatbuffers.Builder} builder
 * @return {void}
 */

export default class VerifiableTransactionBuilder {
    bytes: any;
    schema: any
    /**
     * @param {LambdaBuilder} lambda Callback
     * @returns {VerifiableTransactionBuilder} Returns self instance
     */
    addTransaction(lambda:any) {
        const builder = new flatbuffers.Builder(1);

        lambda(builder);

        this.bytes = builder.asUint8Array();
        return this;
    }

    /**
     * @param {module:schema/Schema} schema Schema corresponding with flatbuffers Schema used on addTransaction
     * @returns {VerifiableTransactionBuilder} Returns self instance
     */
    addSchema(schema:any) {
        this.schema = schema;
        return this;
    }

    /**
     * @returns {VerifiableTransaction} Returns VerifiableTransaction instance
     */
    build() {
        return new VerifiableTransaction(this.bytes, this.schema);
    }
}
