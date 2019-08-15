
import { NetworkType } from '../blockchain/NetworkType';
import { RoleType } from './RoleType';
/**
 * The node info structure describes basic information of a node.
 */
export class NodeInfo {

    /**
     * @param publicKey
     * @param port
     * @param networkIdentifier
     * @param version
     * @param roles
     * @param host
     * @param friendlyName
     */
    constructor(/**
                 * The public key used to identify the node.
                 */
                public readonly publicKey: string,
                /**
                 * The port used for the communication.
                 */
                public readonly port: number,
                /**
                 * The network identifier.
                 */
                public readonly networkIdentifier: NetworkType,
                /**
                 * The version of the application.
                 */
                public readonly version: number,
                /**
                 * The roles of the application.
                 */
                public readonly roles: RoleType,
                /**
                 * The IP address of the endpoint.
                 */
                public readonly host: string,
                /**
                 * The name of the node.
                 */
                public readonly friendlyName: string ) {}
}
