import {Observable, of as observableOf} from 'rxjs';
import {map} from 'rxjs/operators';
import {NetworkType} from '../model/blockchain/NetworkType';
import {NetworkHttp} from './NetworkHttp';
import { QueryParams } from './QueryParams';
/**
 * Http extended by all http services
 */
export abstract class Http {
    private networkHttp: NetworkHttp;
    private networkType: NetworkType;

    /**
     * Constructor
     * @param url
     * @param networkHttp
     */
    constructor(networkHttp?: NetworkHttp) {
        if (networkHttp) {
            this.networkHttp = networkHttp;
        }
    }

    getNetworkTypeObservable(): Observable<NetworkType> {
        let networkTypeResolve;
        if (this.networkType == null) {
            networkTypeResolve = this.networkHttp.getNetworkType().pipe(map((networkType) => {
                this.networkType = networkType;
                return networkType;
            }));
        } else {
            networkTypeResolve = observableOf(this.networkType);
        }
        return networkTypeResolve;
    }

    queryParams(queryParams?: QueryParams): any {
        return {
            pageSize: queryParams ? queryParams.pageSize : undefined,
            id: queryParams ? queryParams.id : undefined,
            order: queryParams ? queryParams.order : undefined,
        };
    }

    errorHandling(error: any): Error {
        if (error.response && error.response.statusCode && error.response.body) {
            const formattedError = {
                statusCode: error.response.statusCode,
                errorDetails: error.response.body,
            };
            return new Error(JSON.stringify(formattedError));
        }
        return new Error(error);
    }
}
