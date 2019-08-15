export class AccountNamesDTO {
    /**
    * The address of the account in hexadecimal.
    */
    'address': string;
    /**
    * The mosaic linked namespace names.
    */
    'names': Array<string>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "address",
            "baseName": "address",
            "type": "string"
        },
        {
            "name": "names",
            "baseName": "names",
            "type": "Array<string>"
        }    ];

    static getAttributeTypeMap() {
        return AccountNamesDTO.attributeTypeMap;
    }
}

