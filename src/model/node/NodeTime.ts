
import { RoleType } from './RoleType';
import { NetworkType } from '../blockchain/NetworkType';
import { UInt64 } from '../UInt64';
/**
 * The node info structure describes basic information of a node.
 */
export class NodeTime {

    /**
     * @param sendTimeStamp
     * @param receiveTimeStamp
     */
    constructor(/**
                 * The request send timestamp
                 */
                public readonly sendTimeStamp?: number[],
                /**
                 * The request received timestamp
                 */
                public readonly receiveTimeStamp?: number[] ) {}
}
