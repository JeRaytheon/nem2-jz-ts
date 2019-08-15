export class TransactionPayload {
    /**
    * The transaction payload.
    */
    'payload'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "payload",
            "baseName": "payload",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return TransactionPayload.attributeTypeMap;
    }
}

