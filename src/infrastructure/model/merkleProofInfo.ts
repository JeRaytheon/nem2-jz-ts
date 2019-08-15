
import { MerklePathItem } from './merklePathItem';

export class MerkleProofInfo {
    /**
    * The complementary data needed to calculate the merkle root.
    */
    'merklePath'?: Array<MerklePathItem>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "merklePath",
            "baseName": "merklePath",
            "type": "Array<MerklePathItem>"
        }    ];

    static getAttributeTypeMap() {
        return MerkleProofInfo.attributeTypeMap;
    }
}

