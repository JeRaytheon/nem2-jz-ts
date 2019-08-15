import {from as observableFrom, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BlockchainScore} from '../model/blockchain/BlockchainScore';
import {UInt64} from '../model/UInt64';
import { BlockchainScoreDTO,
         ChainRoutesApi,
         HeightInfoDTO } from './api';
import { ChainRepository } from './ChainRepository';
import {Http} from './Http';

/**
 * Chian http repository.
 *
 * @since 1.0
 */
export class ChainHttp extends Http implements ChainRepository {
    /**
     * @internal
     * Nem2 Library chain routes api
     */
    private chainRoutesApi: ChainRoutesApi;

    /**
     * Constructor
     * @param url
     */
    constructor(url: string) {
        super();
        this.chainRoutesApi = new ChainRoutesApi(url);
    }

    /**
     * Gets current blockchain height
     * @returns Observable<UInt64>
     */
    public getBlockchainHeight(): Observable<UInt64> {
        return observableFrom(this.chainRoutesApi.getBlockchainHeight()).pipe(map((heightDTO:any) => {
            return new UInt64(heightDTO.height);
        }));
    }

    /**
     * Gets current blockchain score
     * @returns Observable<BlockchainScore>
     */
    public getBlockchainScore(): Observable<BlockchainScore> {
        return observableFrom(this.chainRoutesApi.getBlockchainScore()).pipe(map((blockchainScoreDTO:any) => {
            return new BlockchainScore(
                new UInt64(blockchainScoreDTO.scoreLow),
                new UInt64(blockchainScoreDTO.scoreHigh),
            );
        }));
    }
}
