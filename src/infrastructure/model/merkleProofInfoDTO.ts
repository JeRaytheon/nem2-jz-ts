
import { MerkleProofInfo } from './merkleProofInfo';

export class MerkleProofInfoDTO {
    'payload': MerkleProofInfo;
    'type': string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "payload",
            "baseName": "payload",
            "type": "MerkleProofInfo"
        },
        {
            "name": "type",
            "baseName": "type",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return MerkleProofInfoDTO.attributeTypeMap;
    }
}

