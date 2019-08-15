import * as utilities from './Utilities';

export class Base32 {
    /**
     * Base32 encodes a binary buffer.
     * @param {Uint8Array} data The binary data to encode.
     * @returns {string} The base32 encoded string corresponding to the input data.
     */
    public static Base32Encode = (data: Uint8Array): string => {
        if (0 !== data.length % utilities.Decoded_Block_Size) {
            throw Error(`decoded size must be multiple of ${utilities.Decoded_Block_Size}`);
        }
        const output = new Array(data.length / utilities.Decoded_Block_Size * utilities.Encoded_Block_Size);
        for (let i = 0; i < data.length / utilities.Decoded_Block_Size; ++i) {
            utilities.encodeBlock(data, i * utilities.Decoded_Block_Size, output, i * utilities.Encoded_Block_Size);
        }
        return output.join('');
    }

    /**
     * Base32 decodes a base32 encoded string.
     * @param {string} encoded The base32 encoded string to decode.
     * @returns {Uint8Array} The binary data corresponding to the input string.
     */
    public static Base32Decode = (encoded: string): Uint8Array => {
        if (0 !== encoded.length % utilities.Encoded_Block_Size) {
            throw Error(`encoded size must be multiple of ${utilities.Encoded_Block_Size}`);
        }

        const output = new Uint8Array(encoded.length / utilities.Encoded_Block_Size * utilities.Decoded_Block_Size);
        for (let i = 0; i < encoded.length / utilities.Encoded_Block_Size; ++i) {
            utilities.decodeBlock(encoded, i * utilities.Encoded_Block_Size, output, i * utilities.Decoded_Block_Size);
        }
        return output;
    }
}
