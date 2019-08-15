

import {Message} from './Message';
import {MessageType} from './MessageType';

/**
 * The plain message model defines a plain string. When sending it to the network we transform the payload to hex-string.
 */
export class PlainMessage extends Message {
    /**
     * Create plain message object.
     * @returns PlainMessage
     */
    public static create(message: string): PlainMessage {
        return new PlainMessage(message);
    }

    /**
     * @internal
     */
    public static createFromPayload(payload: string): PlainMessage {
        return new PlainMessage(this.decodeHex(payload));
    }

    /**
     * @internal
     * @param payload
     */
    constructor(payload: string) {
        super(MessageType.PlainMessage, payload);
    }

}

/**
 * Plain message containing an empty string
 * @type {PlainMessage}
 */
export const EmptyMessage = PlainMessage.create('');
