export class AccountIds {
    /**
    * The array of public keys.
    */
    'publicKeys'?: Array<string>;
    /**
    * The array of addresses.
    */
    'addresses'?: Array<string>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "publicKeys",
            "baseName": "publicKeys",
            "type": "Array<string>"
        },
        {
            "name": "addresses",
            "baseName": "addresses",
            "type": "Array<string>"
        }    ];

    static getAttributeTypeMap() {
        return AccountIds.attributeTypeMap;
    }
}

