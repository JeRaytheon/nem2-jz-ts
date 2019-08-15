
import { AliasDTO } from './aliasDTO';
import { NamespaceTypeEnum } from './namespaceTypeEnum';

export class NamespaceDTO {
    /**
    * The public key of the owner of the namespace.
    */
    'owner': string;
    /**
    * The address of the owner of the namespace in hexadecimal.
    */
    'ownerAddress': string;
    'startHeight': Array<number>;
    'endHeight': Array<number>;
    /**
    * The level of the namespace.
    */
    'depth': number;
    'level0': Array<number>;
    'level1'?: Array<number>;
    'level2'?: Array<number>;
    'type': NamespaceTypeEnum;
    'alias': AliasDTO;
    'parentId': Array<number>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "owner",
            "baseName": "owner",
            "type": "string"
        },
        {
            "name": "ownerAddress",
            "baseName": "ownerAddress",
            "type": "string"
        },
        {
            "name": "startHeight",
            "baseName": "startHeight",
            "type": "Array<number>"
        },
        {
            "name": "endHeight",
            "baseName": "endHeight",
            "type": "Array<number>"
        },
        {
            "name": "depth",
            "baseName": "depth",
            "type": "number"
        },
        {
            "name": "level0",
            "baseName": "level0",
            "type": "Array<number>"
        },
        {
            "name": "level1",
            "baseName": "level1",
            "type": "Array<number>"
        },
        {
            "name": "level2",
            "baseName": "level2",
            "type": "Array<number>"
        },
        {
            "name": "type",
            "baseName": "type",
            "type": "NamespaceTypeEnum"
        },
        {
            "name": "alias",
            "baseName": "alias",
            "type": "AliasDTO"
        },
        {
            "name": "parentId",
            "baseName": "parentId",
            "type": "Array<number>"
        }    ];

    static getAttributeTypeMap() {
        return NamespaceDTO.attributeTypeMap;
    }
}

