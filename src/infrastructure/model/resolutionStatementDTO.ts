
import { ResolutionEntryDTO } from './resolutionEntryDTO';

/**
* A resolution statement keeps the relation between a namespace alias used in a transaction and the real address or mosaicId.
*/
export class ResolutionStatementDTO {
    'height': Array<number>;
    'unresolved': Array<number>;
    /**
    * The array of resolution entries linked to the unresolved namespaceId. It is an array instead of a single UInt64 field since within one block the resolution might change for different sources due to alias related transactions.
    */
    'resolutionEntries': Array<ResolutionEntryDTO>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "height",
            "baseName": "height",
            "type": "Array<number>"
        },
        {
            "name": "unresolved",
            "baseName": "unresolved",
            "type": "Array<number>"
        },
        {
            "name": "resolutionEntries",
            "baseName": "resolutionEntries",
            "type": "Array<ResolutionEntryDTO>"
        }    ];

    static getAttributeTypeMap() {
        return ResolutionStatementDTO.attributeTypeMap;
    }
}

