export class CommunicationTimestamps {
    'sendTimestamp'?: Array<number>;
    'receiveTimestamp'?: Array<number>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "sendTimestamp",
            "baseName": "sendTimestamp",
            "type": "Array<number>"
        },
        {
            "name": "receiveTimestamp",
            "baseName": "receiveTimestamp",
            "type": "Array<number>"
        }    ];

    static getAttributeTypeMap() {
        return CommunicationTimestamps.attributeTypeMap;
    }
}

