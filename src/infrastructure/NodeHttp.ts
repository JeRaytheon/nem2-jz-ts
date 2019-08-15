

import {from as observableFrom, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { NodeInfo } from '../model/node/NodeInfo';
import { NodeTime } from '../model/node/NodeTime';
import { NodeInfoDTO, NodeRoutesApi, NodeTimeDTO } from './api';
import {Http} from './Http';
import {NodeRepository} from './NodeRepository';

/**
 * Node http repository.
 *
 * @since 1.0
 */
export class NodeHttp extends Http implements NodeRepository {
    /**
     * @internal
     * Nem2 Library account routes api
     */
    private nodeRoutesApi: NodeRoutesApi;

    /**
     * Constructor
     * @param url
     */
    constructor(url: string) {
        super();
        this.nodeRoutesApi = new NodeRoutesApi(url);

    }

    /**
     * Supplies additional information about the application running on a node.
     * @summary Get the node information
     */
    public getNodeInfo(): Observable<NodeInfo> {
        return observableFrom(this.nodeRoutesApi.getNodeInfo()).pipe(map((nodeInfoDTO:any) => {
            return new NodeInfo(
                nodeInfoDTO.publicKey,
                nodeInfoDTO.port,
                nodeInfoDTO.networkIdentifier,
                nodeInfoDTO.version,
                nodeInfoDTO.roles as number,
                nodeInfoDTO.host,
                nodeInfoDTO.friendlyName,
            );
        }));
    }

    /**
     * Gets the node time at the moment the reply was sent and received.
     * @summary Get the node time
     */
    public getNodeTime(): Observable<NodeTime> {
        return observableFrom(this.nodeRoutesApi.getNodeTime()).pipe(map((nodeTimeDTO:any) => {
            return new NodeTime(nodeTimeDTO.communicationTimestamps.sendTimestamp, nodeTimeDTO.communicationTimestamps.receiveTimestamp);
        }));
    }
}
