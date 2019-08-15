
import { CommunicationTimestamps } from './communicationTimestamps';

export class NodeTimeDTO {
    'communicationTimestamps': CommunicationTimestamps;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "communicationTimestamps",
            "baseName": "communicationTimestamps",
            "type": "CommunicationTimestamps"
        }    ];

    static getAttributeTypeMap() {
        return NodeTimeDTO.attributeTypeMap;
    }
}

