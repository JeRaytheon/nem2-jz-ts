export class ServerInfoDTO {
    /**
    * The catapult-rest component version.
    */
    'restVersion': string;
    /**
    * The catapult-sdk component version.
    */
    'sdkVersion': string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "restVersion",
            "baseName": "restVersion",
            "type": "string"
        },
        {
            "name": "sdkVersion",
            "baseName": "sdkVersion",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return ServerInfoDTO.attributeTypeMap;
    }
}

