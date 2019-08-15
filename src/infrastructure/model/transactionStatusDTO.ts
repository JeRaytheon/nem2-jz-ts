export class TransactionStatusDTO {
    'group'?: string;
    'status': string;
    'hash'?: string;
    'deadline'?: Array<number>;
    'height'?: Array<number>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "group",
            "baseName": "group",
            "type": "string"
        },
        {
            "name": "status",
            "baseName": "status",
            "type": "string"
        },
        {
            "name": "hash",
            "baseName": "hash",
            "type": "string"
        },
        {
            "name": "deadline",
            "baseName": "deadline",
            "type": "Array<number>"
        },
        {
            "name": "height",
            "baseName": "height",
            "type": "Array<number>"
        }    ];

    static getAttributeTypeMap() {
        return TransactionStatusDTO.attributeTypeMap;
    }
}

