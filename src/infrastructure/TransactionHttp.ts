

import * as requestPromise from 'request-promise-native';
import {from as observableFrom, Observable, throwError as observableThrowError} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {PublicAccount} from '../model/account/PublicAccount';
import {CosignatureSignedTransaction} from '../model/transaction/CosignatureSignedTransaction';
import {Deadline} from '../model/transaction/Deadline';
import {SignedTransaction} from '../model/transaction/SignedTransaction';
import { SyncAnnounce } from '../model/transaction/SyncAnnounce';
import {Transaction} from '../model/transaction/Transaction';
import {TransactionAnnounceResponse} from '../model/transaction/TransactionAnnounceResponse';
import {TransactionInfo} from '../model/transaction/TransactionInfo';
import {TransactionStatus} from '../model/transaction/TransactionStatus';
import {TransactionType} from '../model/transaction/TransactionType';
import {UInt64} from '../model/UInt64';
import { AnnounceTransactionInfoDTO,
         BlockInfoDTO, BlockRoutesApi,
         TransactionInfoDTO,
         TransactionRoutesApi,
         TransactionStatusDTO } from './api';
import {Http} from './Http';
import {CreateTransactionFromDTO} from './transaction/CreateTransactionFromDTO';
import {TransactionRepository} from './TransactionRepository';

/**
 * Transaction http repository.
 *
 * @since 1.0
 */
export class TransactionHttp extends Http implements TransactionRepository {
    /**
     * @internal
     * Nem2 Library transaction routes api
     */
    private transactionRoutesApi: TransactionRoutesApi;

    /**
     * @internal
     * Nem2 Library blockchain routes api
     */
    private blockRoutesApi: BlockRoutesApi;

    /**
     * Constructor
     * @param url
     */
    constructor(private readonly url: string) {
        super();
        this.transactionRoutesApi = new TransactionRoutesApi(url);
        this.blockRoutesApi = new BlockRoutesApi(url);
    }

    /**
     * Gets a transaction for a transactionId
     * @param transactionId - Transaction id or hash.
     * @returns Observable<Transaction>
     */
    public getTransaction(transactionId: string): Observable<Transaction> {
        return observableFrom(this.transactionRoutesApi.getTransaction(transactionId)).pipe(map((transactionDTO) => {
            return CreateTransactionFromDTO(transactionDTO);
        }));
    }

    /**
     * Gets an array of transactions for different transaction ids
     * @param transactionIds - Array of transactions id and/or hash.
     * @returns Observable<Transaction[]>
     */
    public getTransactions(transactionIds: string[]): Observable<Transaction[]> {
        const transactionIdsBody = {
            transactionIds,
        };
        return observableFrom(
            this.transactionRoutesApi.getTransactions(transactionIdsBody)).pipe(map((transactionsDTO:any) => {
            return transactionsDTO.map((transactionDTO:any) => {
                return CreateTransactionFromDTO(transactionDTO);
            });
        }));
    }

    /**
     * Gets a transaction status for a transaction hash
     * @param hash - Transaction hash.
     * @returns Observable<TransactionStatus>
     */
    public getTransactionStatus(transactionHash: string): Observable<TransactionStatus> {
        return observableFrom(this.transactionRoutesApi.getTransactionStatus(transactionHash)).pipe(
            map((transactionStatusDTO:any) => {
                return new TransactionStatus(
                    transactionStatusDTO.status,
                    transactionStatusDTO.group,
                    transactionStatusDTO.hash,
                    transactionStatusDTO.deadline ? Deadline.createFromDTO(transactionStatusDTO.deadline) : undefined,
                    transactionStatusDTO.height ? new UInt64(transactionStatusDTO.height) : undefined);
            }));
    }

    /**
     * Gets an array of transaction status for different transaction hashes
     * @param transactionHashes - Array of transaction hash
     * @returns Observable<TransactionStatus[]>
     */
    public getTransactionsStatuses(transactionHashes: string[]): Observable<TransactionStatus[]> {
        const transactionHashesBody = {
            hashes: transactionHashes,
        };
        return observableFrom(
            this.transactionRoutesApi.getTransactionsStatuses(transactionHashesBody)).pipe(
            map((transactionStatusesDTO:any) => {
                return transactionStatusesDTO.map((transactionStatusDTO:any) => {
                    return new TransactionStatus(
                        transactionStatusDTO.status,
                        transactionStatusDTO.group,
                        transactionStatusDTO.hash,
                        transactionStatusDTO.deadline ? Deadline.createFromDTO(transactionStatusDTO.deadline) : undefined,
                        transactionStatusDTO.height ? new UInt64(transactionStatusDTO.height) : undefined);
                });
            }));
    }

    /**
     * Send a signed transaction
     * @param signedTransaction - Signed transaction
     * @returns Observable<TransactionAnnounceResponse>
     */
    public announce(signedTransaction: SignedTransaction): Observable<TransactionAnnounceResponse> {
        return observableFrom(this.transactionRoutesApi.announceTransaction(signedTransaction)).pipe(
            map((transactionAnnounceResponseDTO:any) => {
                return new TransactionAnnounceResponse(transactionAnnounceResponseDTO.message);
            }));
    }

    /**
     * Send a signed transaction with missing signatures
     * @param signedTransaction - Signed transaction
     * @returns Observable<TransactionAnnounceResponse>
     */
    public announceAggregateBonded(signedTransaction: SignedTransaction): Observable<any> {
        if (signedTransaction.type !== TransactionType.AGGREGATE_BONDED) {
            return observableFrom(new Promise((resolve, reject) => {
                reject('Only Transaction Type 0x4241 is allowed for announce aggregate bonded');
            }));
        }
        return observableFrom(this.transactionRoutesApi.announcePartialTransaction(signedTransaction)).pipe(
            map((transactionAnnounceResponseDTO:any) => {
                return new TransactionAnnounceResponse(transactionAnnounceResponseDTO.message);
            }));
    }

    /**
     * Send a cosignature signed transaction of an already announced transaction
     * @param cosignatureSignedTransaction - Cosignature signed transaction
     * @returns Observable<TransactionAnnounceResponse>
     */
    public announceAggregateBondedCosignature(
        cosignatureSignedTransaction: CosignatureSignedTransaction): Observable<TransactionAnnounceResponse> {
        return observableFrom(this.transactionRoutesApi.announceCosignatureTransaction(cosignatureSignedTransaction)).pipe(
            map((transactionAnnounceResponseDTO:any) => {
                return new TransactionAnnounceResponse(transactionAnnounceResponseDTO.message);
            }));
    }

    public announceSync(signedTx: SignedTransaction): Observable<Transaction> {
        const address = PublicAccount.createFromPublicKey(signedTx.signer, signedTx.networkType).address;
        const syncAnnounce = new SyncAnnounce(
            signedTx.payload,
            signedTx.hash,
            address.plain(),
        );

        return observableFrom(
            requestPromise.put({url: this.url + `/transaction/sync`, body: syncAnnounce, json: true}),
        ).pipe(map((response) => {
            if (response.status !== undefined) {
                throw new TransactionStatus(
                    'failed',
                    response.status,
                    response.hash,
                    Deadline.createFromDTO(response.deadline),
                    UInt64.fromUint(0));
            } else {
                return CreateTransactionFromDTO(response);
            }
        }), catchError((err) => {
            if (err.statusCode === 405) {
                return observableThrowError('non sync server');
            }
            return observableThrowError(err);
        }));
    }

    /**
     * Gets a transaction's effective paid fee
     * @param transactionId - Transaction id or hash.
     * @returns Observable<number>
     */
    public getTransactionEffectiveFee(transactionId: string): Observable<any> {
        return observableFrom(this.transactionRoutesApi.getTransaction(transactionId)).pipe(
            mergeMap((transactionDTO) => {
                // parse transaction to take advantage of `size` getter overload
                const transaction = CreateTransactionFromDTO(transactionDTO);
                const uintHeight = (transaction.transactionInfo as TransactionInfo).height;

                // now read block details
                return observableFrom(this.blockRoutesApi.getBlockByHeight(uintHeight.compact())).pipe(
                map((blockDTO:any) => {

                    // @see https://nemtech.github.io/concepts/transaction.html#fees
                    // effective_fee = feeMultiplier x transaction::size
                    return blockDTO.block.feeMultiplier * transaction.getSize();
                }));
            }), catchError((err) => {
                return observableThrowError(err);
            }));
    }
}
