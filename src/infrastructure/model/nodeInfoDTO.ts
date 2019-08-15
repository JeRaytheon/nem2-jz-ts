
import { RolesTypeEnum } from './rolesTypeEnum';

export class NodeInfoDTO {
    /**
    * The public key used to identify the node.
    */
    'publicKey': string;
    /**
    * The port used for the communication.
    */
    'port': number;
    'networkIdentifier': number;
    /**
    * The version of the application.
    */
    'version': number;
    'roles': RolesTypeEnum;
    /**
    * The IP address of the endpoint.
    */
    'host': string;
    /**
    * The name of the node.
    */
    'friendlyName': string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "publicKey",
            "baseName": "publicKey",
            "type": "string"
        },
        {
            "name": "port",
            "baseName": "port",
            "type": "number"
        },
        {
            "name": "networkIdentifier",
            "baseName": "networkIdentifier",
            "type": "number"
        },
        {
            "name": "version",
            "baseName": "version",
            "type": "number"
        },
        {
            "name": "roles",
            "baseName": "roles",
            "type": "RolesTypeEnum"
        },
        {
            "name": "host",
            "baseName": "host",
            "type": "string"
        },
        {
            "name": "friendlyName",
            "baseName": "friendlyName",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return NodeInfoDTO.attributeTypeMap;
    }
}

