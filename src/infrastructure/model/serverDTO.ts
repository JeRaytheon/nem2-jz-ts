
import { ServerInfoDTO } from './serverInfoDTO';

export class ServerDTO {
    'serverInfo': ServerInfoDTO;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "serverInfo",
            "baseName": "serverInfo",
            "type": "ServerInfoDTO"
        }    ];

    static getAttributeTypeMap() {
        return ServerDTO.attributeTypeMap;
    }
}

