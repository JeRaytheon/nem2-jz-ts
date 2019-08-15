import { MosaicDTO } from './mosaicDTO';

export class AccountDTO {
    /**
    * The account unique address in hexadecimal. 
    */
    'address': string;
    'addressHeight': Array<number>;
    /**
    * The public key of an account can be used to verify signatures of the account. Only accounts that have already published a transaction have a public key assigned to the account. Otherwise, the field is null. 
    */
    'publicKey': string;
    'publicKeyHeight': Array<number>;
    /**
    * The list of mosaics the account owns. The amount is represented in absolute amount. Thus a balance of 123456789 for a mosaic with divisibility 6 (absolute) means the account owns 123.456789 instead. 
    */
    'mosaics': Array<MosaicDTO>;
    'importance': Array<number>;
    'importanceHeight': Array<number>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "address",
            "baseName": "address",
            "type": "string"
        },
        {
            "name": "addressHeight",
            "baseName": "addressHeight",
            "type": "Array<number>"
        },
        {
            "name": "publicKey",
            "baseName": "publicKey",
            "type": "string"
        },
        {
            "name": "publicKeyHeight",
            "baseName": "publicKeyHeight",
            "type": "Array<number>"
        },
        {
            "name": "mosaics",
            "baseName": "mosaics",
            "type": "Array<MosaicDTO>"
        },
        {
            "name": "importance",
            "baseName": "importance",
            "type": "Array<number>"
        },
        {
            "name": "importanceHeight",
            "baseName": "importanceHeight",
            "type": "Array<number>"
        }    ];

    static getAttributeTypeMap() {
        return AccountDTO.attributeTypeMap;
    }
}

