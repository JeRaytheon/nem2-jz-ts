
import { NamespaceDTO } from './namespaceDTO';
import { NamespaceMetaDTO } from './namespaceMetaDTO';

export class NamespaceInfoDTO {
    'meta': NamespaceMetaDTO;
    'namespace': NamespaceDTO;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "meta",
            "baseName": "meta",
            "type": "NamespaceMetaDTO"
        },
        {
            "name": "namespace",
            "baseName": "namespace",
            "type": "NamespaceDTO"
        }    ];

    static getAttributeTypeMap() {
        return NamespaceInfoDTO.attributeTypeMap;
    }
}

