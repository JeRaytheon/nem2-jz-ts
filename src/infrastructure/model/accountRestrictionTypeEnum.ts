/**
* The account restriction type: * 0x01 (1 decimal) - Allow only receiving transactions from an address. * 0x02 (2 decimal) - Allow only receiving transactions containing a mosaic id. * 0x04 (4 decimal) - Allow only sending transactions with a given transaction type. * 0x05 (5 decimal) - Restriction type sentinel. * 0x81 (129 decimal) - Block receiving transactions from an address. * 0x82 (130 decimal) - Block receiving transactions containing a mosaic id. * 0x84 (132 decimal) -  Block sending transactions with a given transaction type. 
*/
export class AccountRestrictionTypeEnum {

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
    ];

    static getAttributeTypeMap() {
        return AccountRestrictionTypeEnum.attributeTypeMap;
    }
}

