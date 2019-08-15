export class NetworkTypeDTO {
    /**
    * The name of the network.
    */
    'name': string;
    /**
    * A short text describing the network.
    */
    'description': string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "name",
            "baseName": "name",
            "type": "string"
        },
        {
            "name": "description",
            "baseName": "description",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return NetworkTypeDTO.attributeTypeMap;
    }
}

