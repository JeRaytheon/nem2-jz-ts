export class BlockchainScoreDTO {
    'scoreHigh': Array<number>;
    'scoreLow': Array<number>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "scoreHigh",
            "baseName": "scoreHigh",
            "type": "Array<number>"
        },
        {
            "name": "scoreLow",
            "baseName": "scoreLow",
            "type": "Array<number>"
        }    ];

    static getAttributeTypeMap() {
        return BlockchainScoreDTO.attributeTypeMap;
    }
}

