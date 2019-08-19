import { ClientResponse } from 'http';
import {from as observableFrom, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {BlockchainStorageInfo} from '../model/blockchain/BlockchainStorageInfo';
import { ServerInfo } from '../model/diagnostic/ServerInfo';
import { DiagnosticRoutesApi, ServerDTO, StorageInfoDTO } from './api';
import {DiagnosticRepository} from './DiagnosticRepository';
import {Http} from './Http';

/**
 * Diagnostic http repository.
 *
 * @since 1.0
 */
export class DiagnosticHttp extends Http implements DiagnosticRepository {
    /**
     * @internal
     * Nem2 Library diagnostic routes api
     */
    private diagnosticRoutesApi: DiagnosticRoutesApi;

    /**
     * Constructor
     * @param url
     */
    constructor(url: string) {
        super();
        this.diagnosticRoutesApi = new DiagnosticRoutesApi(url);
    }

    /**
     * Gets blockchain storage info.
     * @returns Observable<BlockchainStorageInfo>
     */
    public getDiagnosticStorage(): Observable<BlockchainStorageInfo> {
        return observableFrom(
            this.diagnosticRoutesApi.getDiagnosticStorage()).pipe(
            map((response: { response: ClientResponse; body: StorageInfoDTO; } ) => {
                const blockchainStorageInfoDTO = response.body;
                return new BlockchainStorageInfo(
                    blockchainStorageInfoDTO.numBlocks,
                    blockchainStorageInfoDTO.numTransactions,
                    blockchainStorageInfoDTO.numAccounts,
                );
            }),
            catchError((error) =>  throwError(this.errorHandling(error))),
        );
    }

    /**
     * Gets blockchain server info.
     * @returns Observable<Server>
     */
    public getServerInfo(): Observable<ServerInfo> {
        return observableFrom(
            this.diagnosticRoutesApi.getServerInfo()).pipe(
            map((response: { response: ClientResponse; body: ServerDTO; } ) => {
                const serverDTO = response.body;
                return new ServerInfo(serverDTO.serverInfo.restVersion,
                    serverDTO.serverInfo.sdkVersion);
            }),
            catchError((error) =>  throwError(this.errorHandling(error))),
        );
    }
}
