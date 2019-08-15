

import {decode} from 'utf8';

/**
 * An abstract message class that serves as the base class of all message types.
 */
export abstract class Message {
    /**
     * @internal
     * @param hex
     * @returns {string}
     */
    public static decodeHex(hex: string): string {
        let str = '';
        for (let i = 0; i < hex.length; i += 2) {
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        }
        try {
            return decode(str);
        } catch (e) {
            return str;
        }
    }

    /**
     * @internal
     * @param type
     * @param payload
     */
    constructor(/**
                 * Message type
                 */
                public readonly type: number,
                /**
                 * Message payload
                 */
                public readonly payload: string) {
    }

    /**
     * Create DTO object
     */
    toDTO() {
        return {
            type: this.type,
            payload: this.payload,
        };
    }
}
