import {from as observableFrom, Observable} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import { DtoMapping } from '../core/utils/DtoMapping';
import {AccountInfo} from '../model/account/AccountInfo';
import { AccountNames } from '../model/account/AccountNames';
import { AccountRestrictionsInfo } from '../model/account/AccountRestrictionsInfo';
import {Address} from '../model/account/Address';
import {MultisigAccountGraphInfo} from '../model/account/MultisigAccountGraphInfo';
import {MultisigAccountInfo} from '../model/account/MultisigAccountInfo';
import {PublicAccount} from '../model/account/PublicAccount';
import {Mosaic} from '../model/mosaic/Mosaic';
import {MosaicId} from '../model/mosaic/MosaicId';
import { NamespaceId } from '../model/namespace/NamespaceId';
import { NamespaceName } from '../model/namespace/NamespaceName';
import {AggregateTransaction} from '../model/transaction/AggregateTransaction';
import {Transaction} from '../model/transaction/Transaction';
import {UInt64} from '../model/UInt64';
import {AccountRepository} from './AccountRepository';
import { AccountInfoDTO,
         AccountNamesDTO,
         AccountRestrictionsDTO,
         AccountRestrictionsInfoDTO,
         AccountRoutesApi,
         MosaicDTO,
         MultisigAccountGraphInfoDTO,
         MultisigAccountInfoDTO,
         TransactionInfoDTO } from './api';
import {Http} from './Http';
import {NetworkHttp} from './NetworkHttp';
import {QueryParams} from './QueryParams';
import {CreateTransactionFromDTO} from './transaction/CreateTransactionFromDTO';

/**
 * Account http repository.
 *
 * @since 1.0
 */
export class AccountHttp extends Http implements AccountRepository {
    /**
     * @internal
     * Nem2 Library account routes api
     */
    private accountRoutesApi: AccountRoutesApi;

    /**
     * Constructor
     * @param url
     * @param networkHttp
     */
    constructor(url: string, networkHttp?: NetworkHttp) {
        networkHttp = networkHttp == null ? new NetworkHttp(url) : networkHttp;
        super(networkHttp);
        this.accountRoutesApi = new AccountRoutesApi(url);
    }

    /**
     * Gets an AccountInfo for an account.
     * @param address Address
     * @returns Observable<AccountInfo>
     */
    public getAccountInfo(address: Address): Observable<AccountInfo> {
        return observableFrom(this.accountRoutesApi.getAccountInfo(address.plain())).pipe(map((accountInfoDTO:any) => {
            return new AccountInfo(
                accountInfoDTO.meta,
                Address.createFromEncoded(accountInfoDTO.account.address),
                new UInt64(accountInfoDTO.account.addressHeight),
                accountInfoDTO.account.publicKey,
                new UInt64(accountInfoDTO.account.publicKeyHeight),
                accountInfoDTO.account.mosaics.map((mosaicDTO:any) => new Mosaic(
                    new MosaicId(mosaicDTO.id),
                    new UInt64(mosaicDTO.amount),
                )),
                new UInt64(accountInfoDTO.account.importance),
                new UInt64(accountInfoDTO.account.importanceHeight),
            );
        }));
    }

    /**
     * Get Account restrictions.
     * @param publicAccount public account
     * @returns Observable<AccountRestrictionsInfo>
     */
    public getAccountRestrictions(address: Address): Observable<AccountRestrictionsInfo> {
        return observableFrom(this.accountRoutesApi.getAccountRestrictions(address.plain()))
            .pipe(map((accountRestrictions:any) => {
            return DtoMapping.extractAccountRestrictionFromDto(accountRestrictions);
        }));
    }

    /**
     * Get Account restrictions.
     * @param address list of addresses
     * @returns Observable<AccountRestrictionsInfo[]>
     */
    public getAccountRestrictionsFromAccounts(addresses: Address[]): Observable<AccountRestrictionsInfo[]> {
        const accountIds = {
            addresses: addresses.map((address) => address.plain()),
        };
        return observableFrom(
            this.accountRoutesApi.getAccountRestrictionsFromAccounts(accountIds))
                .pipe(map((accountRestrictions:any) => {
            return accountRestrictions.map((restriction:any) => {
                return DtoMapping.extractAccountRestrictionFromDto(restriction);
            });
        }));
    }

    /**
     * Gets AccountsInfo for different accounts.
     * @param addresses List of Address
     * @returns Observable<AccountInfo[]>
     */
    public getAccountsInfo(addresses: Address[]): Observable<AccountInfo[]> {
        const accountIdsBody = {
            addresses: addresses.map((address) => address.plain()),
        };
        return observableFrom(
            this.accountRoutesApi.getAccountsInfo(accountIdsBody)).pipe(map((accountsInfoMetaDataDTO:any) => {
            return accountsInfoMetaDataDTO.map((accountInfoDTO: AccountInfoDTO) => {
                return new AccountInfo(
                    accountInfoDTO.meta,
                    Address.createFromEncoded(accountInfoDTO.account.address),
                    new UInt64(accountInfoDTO.account.addressHeight),
                    accountInfoDTO.account.publicKey,
                    new UInt64(accountInfoDTO.account.publicKeyHeight),
                    accountInfoDTO.account.mosaics.map((mosaicDTO: MosaicDTO) =>
                        new Mosaic(new MosaicId(mosaicDTO.id), new UInt64(mosaicDTO.amount))),
                    new UInt64(accountInfoDTO.account.importance),
                    new UInt64(accountInfoDTO.account.importanceHeight),
                );
            });
        }));
    }

    public getAccountsNames(addresses: Address[]): Observable<AccountNames[]> {
        const accountIdsBody = {
            addresses: addresses.map((address) => address.plain()),
        };
        return observableFrom(
            this.accountRoutesApi.getAccountsNames(accountIdsBody)).pipe(map((accountNames:any) => {
            return accountNames.map((accountName:any) => {
                return new AccountNames(
                    Address.createFromEncoded(accountName.address),
                    accountName.names.map((name:any) => {
                        return new NamespaceName(new NamespaceId(name), name);
                    }),
                );
            });
        }));
    }
    /**
     * Gets a MultisigAccountInfo for an account.
     * @param address - User address
     * @returns Observable<MultisigAccountInfo>
     */
    public getMultisigAccountInfo(address: Address): Observable<MultisigAccountInfo> {
        return this.getNetworkTypeObservable().pipe(
            mergeMap((networkType) => observableFrom(
                this.accountRoutesApi.getAccountMultisig(address.plain()))
                    .pipe(map((multisigAccountInfoDTO:any) => {
                return new MultisigAccountInfo(
                    PublicAccount.createFromPublicKey(multisigAccountInfoDTO.multisig.account, networkType),
                    multisigAccountInfoDTO.multisig.minApproval,
                    multisigAccountInfoDTO.multisig.minRemoval,
                    multisigAccountInfoDTO.multisig.cosignatories
                        .map((cosigner:any) => PublicAccount.createFromPublicKey(cosigner, networkType)),
                    multisigAccountInfoDTO.multisig.multisigAccounts
                        .map((multisigAccount:any) => PublicAccount.createFromPublicKey(multisigAccount, networkType)),
                );
            }))));
    }

    /**
     * Gets a MultisigAccountGraphInfo for an account.
     * @param address - User address
     * @returns Observable<MultisigAccountGraphInfo>
     */
    public getMultisigAccountGraphInfo(address: Address): Observable<MultisigAccountGraphInfo> {
        return this.getNetworkTypeObservable().pipe(
            mergeMap((networkType) => observableFrom(
                this.accountRoutesApi.getAccountMultisigGraph(address.plain()))
                    .pipe(map((multisigAccountGraphInfosDTO:any) => {
                const multisigAccounts = new Map<number, MultisigAccountInfo[]>();
                multisigAccountGraphInfosDTO.map((multisigAccountGraphInfoDTO:any) => {
                    multisigAccounts.set(multisigAccountGraphInfoDTO.level,
                        multisigAccountGraphInfoDTO.multisigEntries.map((multisigAccountInfoDTO:any) => {
                            return new MultisigAccountInfo(
                                PublicAccount.createFromPublicKey(multisigAccountInfoDTO.multisig.account, networkType),
                                multisigAccountInfoDTO.multisig.minApproval,
                                multisigAccountInfoDTO.multisig.minRemoval,
                                multisigAccountInfoDTO.multisig.cosignatories
                                    .map((cosigner:any) => PublicAccount.createFromPublicKey(cosigner, networkType)),
                                multisigAccountInfoDTO.multisig.multisigAccounts
                                    .map((multisigAccountDTO:any) => PublicAccount.createFromPublicKey(multisigAccountDTO, networkType)));
                        }),
                    );
                });
                return new MultisigAccountGraphInfo(multisigAccounts);
            }))));
    }

    /**
     * Gets an array of confirmed transactions for which an account is signer or receiver.
     * @param publicAccount - User public account
     * @param queryParams - (Optional) Query params
     * @returns Observable<Transaction[]>
     */
    public transactions(publicAccount: PublicAccount, queryParams?: QueryParams): Observable<Transaction[]> {
        return observableFrom(
            this.accountRoutesApi.transactions(publicAccount.publicKey,
                                               this.queryParams(queryParams).pageSize,
                                               this.queryParams(queryParams).id,
                                               this.queryParams(queryParams).order)).pipe(
            map((transactionsDTO:any) => {
                return transactionsDTO.map((transactionDTO:any) => {
                    return CreateTransactionFromDTO(transactionDTO);
                });
            }));
    }

    /**
     * Gets an array of transactions for which an account is the recipient of a transaction.
     * A transaction is said to be incoming with respect to an account if the account is the recipient of a transaction.
     * @param publicAccount - User public account
     * @param queryParams - (Optional) Query params
     * @returns Observable<Transaction[]>
     */
    public incomingTransactions(publicAccount: PublicAccount, queryParams?: QueryParams): Observable <Transaction[]> {
        return observableFrom(
            this.accountRoutesApi.incomingTransactions(publicAccount.publicKey,
                                                       this.queryParams(queryParams).pageSize,
                                                       this.queryParams(queryParams).id,
                                                       this.queryParams(queryParams).order)).pipe(
            map((transactionsDTO:any) => {
                return transactionsDTO.map((transactionDTO:any) => {
                    return CreateTransactionFromDTO(transactionDTO);
                });
            }));
    }

    /**
     * Gets an array of transactions for which an account is the sender a transaction.
     * A transaction is said to be outgoing with respect to an account if the account is the sender of a transaction.
     * @param publicAccount - User public account
     * @param queryParams - (Optional) Query params
     * @returns Observable<Transaction[]>
     */
    public outgoingTransactions(publicAccount: PublicAccount, queryParams?: QueryParams): Observable <Transaction[]> {
        return observableFrom(
            this.accountRoutesApi.outgoingTransactions(publicAccount.publicKey,
                                                       this.queryParams(queryParams).pageSize,
                                                       this.queryParams(queryParams).id,
                                                       this.queryParams(queryParams).order)).pipe(
            map((transactionsDTO:any) => {
                return transactionsDTO.map((transactionDTO:any) => {
                    return CreateTransactionFromDTO(transactionDTO);
                });
            }));
    }

    /**
     * Gets the array of transactions for which an account is the sender or receiver and which have not yet been included in a block.
     * Unconfirmed transactions are those transactions that have not yet been included in a block.
     * Unconfirmed transactions are not guaranteed to be included in any block.
     * @param publicAccount - User public account
     * @param queryParams - (Optional) Query params
     * @returns Observable<Transaction[]>
     */
    public unconfirmedTransactions(publicAccount: PublicAccount, queryParams?: QueryParams): Observable <Transaction[]> {
        return observableFrom(
            this.accountRoutesApi.unconfirmedTransactions(publicAccount.publicKey,
                                                          this.queryParams(queryParams).pageSize,
                                                          this.queryParams(queryParams).id,
                                                          this.queryParams(queryParams).order)).pipe(
            map((transactionsDTO:any) => {
                return transactionsDTO.map((transactionDTO:any) => {
                    return CreateTransactionFromDTO(transactionDTO);
                });
            }));
    }

    /**
     * Gets an array of transactions for which an account is the sender or has sign the transaction.
     * A transaction is said to be aggregate bonded with respect to an account if there are missing signatures.
     * @param publicAccount - User public account
     * @param queryParams - (Optional) Query params
     * @returns Observable<AggregateTransaction[]>
     */
    public aggregateBondedTransactions(publicAccount: PublicAccount, queryParams?: QueryParams): Observable <AggregateTransaction[]> {
        return observableFrom(
            this.accountRoutesApi.partialTransactions(publicAccount.publicKey,
                                                      this.queryParams(queryParams).pageSize,
                                                      this.queryParams(queryParams).id,
                                                      this.queryParams(queryParams).order)).pipe(
            map((transactionsDTO:any) => {
                return transactionsDTO.map((transactionDTO:any) => {
                    return CreateTransactionFromDTO(transactionDTO) as AggregateTransaction;
                });
            }));
    }
}
