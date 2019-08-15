export class MultisigDTO {
    /**
    * The account public key.
    */
    'account': string;
    /**
    * The account address in hexadecimal.
    */
    'accountAddress'?: string;
    /**
    * The number of signatures needed to approve a transaction.
    */
    'minApproval': number;
    /**
    * The number of signatures needed to remove a cosignatory.
    */
    'minRemoval': number;
    /**
    * The array of public keys of the cosignatory accounts.
    */
    'cosignatories': Array<string>;
    /**
    * The array of multisig accounts where the account is cosignatory.
    */
    'multisigAccounts': Array<string>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "account",
            "baseName": "account",
            "type": "string"
        },
        {
            "name": "accountAddress",
            "baseName": "accountAddress",
            "type": "string"
        },
        {
            "name": "minApproval",
            "baseName": "minApproval",
            "type": "number"
        },
        {
            "name": "minRemoval",
            "baseName": "minRemoval",
            "type": "number"
        },
        {
            "name": "cosignatories",
            "baseName": "cosignatories",
            "type": "Array<string>"
        },
        {
            "name": "multisigAccounts",
            "baseName": "multisigAccounts",
            "type": "Array<string>"
        }    ];

    static getAttributeTypeMap() {
        return MultisigDTO.attributeTypeMap;
    }
}

