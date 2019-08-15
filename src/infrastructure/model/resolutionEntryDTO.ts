
import { SourceDTO } from './sourceDTO';

export class ResolutionEntryDTO {
    'source': SourceDTO;
    'resolved': Array<number>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "source",
            "baseName": "source",
            "type": "SourceDTO"
        },
        {
            "name": "resolved",
            "baseName": "resolved",
            "type": "Array<number>"
        }    ];

    static getAttributeTypeMap() {
        return ResolutionEntryDTO.attributeTypeMap;
    }
}

