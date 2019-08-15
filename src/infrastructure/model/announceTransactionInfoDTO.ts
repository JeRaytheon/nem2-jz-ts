export class AnnounceTransactionInfoDTO {
    'message': string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "message",
            "baseName": "message",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return AnnounceTransactionInfoDTO.attributeTypeMap;
    }
}

