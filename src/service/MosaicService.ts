

import { Observable, of as observableOf } from 'rxjs';
import { filter, first, map, mergeMap, take, toArray } from 'rxjs/operators';
import { AccountHttp } from '../infrastructure/AccountHttp';
import { MosaicHttp } from '../infrastructure/MosaicHttp';
import { NamespaceHttp } from '../infrastructure/NamespaceHttp';
import { Address } from '../model/account/Address';
import { MosaicInfo } from '../model/model';
import { Mosaic } from '../model/mosaic/Mosaic';
import { MosaicId } from '../model/mosaic/MosaicId';
import { MosaicAmountView } from './MosaicAmountView';
import { MosaicView } from './MosaicView';

/**
 * Mosaic service
 */
export class MosaicService {

    /**
     * Constructor
     * @param accountHttp
     * @param mosaicHttp
     */
    constructor(private readonly accountHttp: AccountHttp,
                private readonly mosaicHttp: MosaicHttp) {

    }

    /**
     * Get mosaic view given mosaicIds
     * @param mosaicIds - The ids of the mosaics
     * @returns {Observable<MosaicView[]>}
     */
    mosaicsView(mosaicIds: MosaicId[]): Observable<MosaicView[]> {
        return observableOf(mosaicIds).pipe(
            mergeMap((_) => this.mosaicHttp.getMosaics(mosaicIds).pipe(
                mergeMap((_) => _),
                map((mosaicInfo: MosaicInfo) => {
                    return new MosaicView(mosaicInfo);
                }),
                toArray())));
    }

    /**
     * Get mosaic amount view given mosaic array
     * @param mosaics
     * @returns {Observable<MosaicAmountView[]>}
     */
    mosaicsAmountView(mosaics: Mosaic[]): Observable<MosaicAmountView[]> {
        return observableOf(mosaics).pipe(
            mergeMap((_) => _),
            mergeMap((mosaic: Mosaic) => this.mosaicsView([new MosaicId(mosaic.id.id.toDTO())]).pipe(
                filter((_) => _.length !== 0),
                map<MosaicView[], MosaicAmountView>((mosaicViews) => {
                    return new MosaicAmountView(mosaicViews[0].mosaicInfo, mosaic.amount);
                }),
            toArray())));
    }

    /**
     * Get balance mosaics in form of MosaicAmountViews for a given account address
     * @param address - Account address
     * @returns {Observable<MosaicAmountView[]>}
     */
    mosaicsAmountViewFromAddress(address: Address): Observable<MosaicAmountView[]> {
        return observableOf(address).pipe(
            mergeMap((_) => this.accountHttp.getAccountInfo(_)),
            mergeMap((_) => this.mosaicsAmountView(_.mosaics)));
    }
}
