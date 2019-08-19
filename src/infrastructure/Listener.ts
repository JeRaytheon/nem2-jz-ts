import {Observable, Subject} from 'rxjs';
import {filter, map, share} from 'rxjs/operators';
import * as WebSocket from 'ws';
import {Address} from '../model/account/Address';
import {PublicAccount} from '../model/account/PublicAccount';
import {BlockInfo} from '../model/blockchain/BlockInfo';
import {NetworkType} from '../model/blockchain/NetworkType';
import {NamespaceId} from '../model/namespace/NamespaceId';
import {AggregateTransaction} from '../model/transaction/AggregateTransaction';
import {AggregateTransactionCosignature} from '../model/transaction/AggregateTransactionCosignature';
import {CosignatureSignedTransaction} from '../model/transaction/CosignatureSignedTransaction';
import {Deadline} from '../model/transaction/Deadline';
import {InnerTransaction} from '../model/transaction/InnerTransaction';
import {ModifyMultisigAccountTransaction} from '../model/transaction/ModifyMultisigAccountTransaction';
import {MultisigCosignatoryModification} from '../model/transaction/MultisigCosignatoryModification';
import {MultisigCosignatoryModificationType} from '../model/transaction/MultisigCosignatoryModificationType';
import {Transaction} from '../model/transaction/Transaction';
import {TransactionStatusError} from '../model/transaction/TransactionStatusError';
import {TransferTransaction} from '../model/transaction/TransferTransaction';
import {UInt64} from '../model/UInt64';
import {CreateTransactionFromDTO, extractBeneficiary} from './transaction/CreateTransactionFromDTO';

enum ListenerChannelName {
    block = 'block',
    confirmedAdded = 'confirmedAdded',
    unconfirmedAdded = 'unconfirmedAdded',
    unconfirmedRemoved = 'unconfirmedRemoved',
    aggregateBondedAdded = 'partialAdded',
    aggregateBondedRemoved = 'partialRemoved',
    cosignature = 'cosignature',
    modifyMultisigAccount = 'modifyMultisigAccount',
    status = 'status',
}

interface ListenerMessage {
    readonly channelName: ListenerChannelName;
    readonly message: Transaction | string | BlockInfo | TransactionStatusError | CosignatureSignedTransaction;
}

/**
 * Listener service
 */
export class Listener {
    public readonly url: string;
    /**
     * @internal
     * WebSocket connector
     */
    private webSocket: WebSocket;
    /**
     * @internal
     * Message subject for all requests
     */
    private messageSubject: Subject<ListenerMessage>;
    /**
     * @internal
     * id
     */
    private uid: string;

    /**
     * Constructor
     * @param config - Listener configuration
     * @param websocketInjected - (Optional) WebSocket injected when using listeners in client
     */
    constructor(/**
                 * Listener configuration.
                 */
                private config: string,
                /**
                 * WebSocket injected when using listeners in client.
                 */
                private websocketInjected?: any) {
        this.config = config.replace(/\/$/, '');
        this.url = `${this.config}/ws`;
        this.messageSubject = new Subject();
    }

    /**
     * Open web socket connection.
     * @returns Promise<Void>
     */
    public open(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.webSocket === undefined || this.webSocket.readyState === WebSocket.CLOSED) {
                if (this.websocketInjected) {
                    this.webSocket = new this.websocketInjected(this.url);
                } else {
                    this.webSocket = new WebSocket(this.url);
                }
                this.webSocket.onopen = () => {
                    console.log('connection open');
                };
                this.webSocket.onerror = (err) => {
                    console.log('WebSocket Error ');
                    console.log(err);
                    reject(err);
                };
                this.webSocket.onmessage = (msg) => {
                    const message = JSON.parse(msg.data as string);

                    if (message.uid) {
                        this.uid = message.uid;
                        resolve();
                    } else if (message.transaction) {
                        this.messageSubject.next({channelName: message.meta.channelName, message: CreateTransactionFromDTO(message)});
                    } else if (message.block) {
                        const networkType = parseInt(message.block.version.toString(16).substr(0, 2), 16);
                        this.messageSubject.next({
                            channelName: ListenerChannelName.block, message: new BlockInfo(
                                message.meta.hash,
                                message.meta.generationHash,
                                message.meta.totalFee ? new UInt64(message.meta.totalFee) : new UInt64([0, 0]),
                                message.meta.numTransactions,
                                message.block.signature,
                                PublicAccount.createFromPublicKey(message.block.signer, networkType),
                                networkType,
                                parseInt(message.block.version.toString(16).substr(2, 2), 16), // Tx version
                                message.block.type,
                                new UInt64(message.block.height),
                                new UInt64(message.block.timestamp),
                                new UInt64(message.block.difficulty),
                                message.block.feeMultiplier,
                                message.block.previousBlockHash,
                                message.block.blockTransactionsHash,
                                message.block.blockReceiptsHash,
                                message.block.stateHash,
                                extractBeneficiary(message, networkType), // passing `message` as `blockDTO`
                            ),
                        });
                    } else if (message.status) {
                        this.messageSubject.next({
                            channelName: ListenerChannelName.status, message: new TransactionStatusError(
                                message.hash,
                                message.status,
                                Deadline.createFromDTO(message.deadline)),
                        });
                    } else if (message.meta) {
                        this.messageSubject.next({channelName: message.meta.channelName, message: message.meta.hash});
                    } else if (message.parentHash) {
                        this.messageSubject.next({
                            channelName: ListenerChannelName.cosignature,
                            message: new CosignatureSignedTransaction(message.parentHash, message.signature, message.signer),
                        });
                    }
                };
            } else {
                resolve();
            }
        });
    }

    /**
     * returns a boolean that repressents the open state
     * @returns a boolean
     */
    public isOpen(): boolean {
        if (this.webSocket) {
            return this.webSocket.readyState === WebSocket.OPEN;
        }
        return false;
    }

    /**
     * Close web socket connection.
     * @returns void
     */
    public close(): void {
        if (this.webSocket && (this.webSocket.readyState === WebSocket.OPEN || this.webSocket.readyState === WebSocket.CONNECTING)) {
            this.webSocket.close();
        }
    }

    /**
     * Terminate web socket connection.
     * @returns void
     */
    public terminate(): void {
        if (this.webSocket) {
            this.webSocket.close();
        }
    }

    /**
     * Returns an observable stream of BlockInfo.
     * Each time a new Block is added into the blockchain,
     * it emits a new BlockInfo in the event stream.
     *
     * @return an observable stream of BlockInfo
     */
    public newBlock(): Observable<BlockInfo> {
        this.subscribeTo('block');
        return this.messageSubject
            .asObservable().pipe(
                share(),
                filter((_) => _.channelName === ListenerChannelName.block),
                filter((_) => _.message instanceof BlockInfo),
                map((_) => _.message as BlockInfo));
    }

    /**
     * Returns an observable stream of Transaction for a specific address.
     * Each time a transaction is in confirmed state an it involves the address,
     * it emits a new Transaction in the event stream.
     *
     * @param address address we listen when a transaction is in confirmed state
     * @return an observable stream of Transaction with state confirmed
     */
    public confirmed(address: Address): Observable<Transaction> {
        this.subscribeTo(`confirmedAdded/${address.plain()}`);
        return this.messageSubject.asObservable().pipe(
            filter((_) => _.channelName === ListenerChannelName.confirmedAdded),
            filter((_) => _.message instanceof Transaction),
            map((_) => _.message as Transaction),
            filter((_) => this.transactionFromAddress(_, address)));
    }

    /**
     * Returns an observable stream of Transaction for a specific address.
     * Each time a transaction is in unconfirmed state an it involves the address,
     * it emits a new Transaction in the event stream.
     *
     * @param address address we listen when a transaction is in unconfirmed state
     * @return an observable stream of Transaction with state unconfirmed
     */
    public unconfirmedAdded(address: Address): Observable<Transaction> {
        this.subscribeTo(`unconfirmedAdded/${address.plain()}`);
        return this.messageSubject.asObservable().pipe(
            filter((_) => _.channelName === ListenerChannelName.unconfirmedAdded),
            filter((_) => _.message instanceof Transaction),
            map((_) => _.message as Transaction),
            filter((_) => this.transactionFromAddress(_, address)));
    }

    /**
     * Returns an observable stream of Transaction Hashes for specific address.
     * Each time a transaction with state unconfirmed changes its state,
     * it emits a new message with the transaction hash in the event stream.
     *
     * @param address address we listen when a transaction is removed from unconfirmed state
     * @return an observable stream of Strings with the transaction hash
     */
    public unconfirmedRemoved(address: Address): Observable<string> {
        this.subscribeTo(`unconfirmedRemoved/${address.plain()}`);
        return this.messageSubject.asObservable().pipe(
            filter((_) => _.channelName === ListenerChannelName.unconfirmedRemoved),
            filter((_) => typeof _.message === 'string'),
            map((_) => _.message as string));
    }

    /**
     * Return an observable of {@link AggregateTransaction} for specific address.
     * Each time an aggregate bonded transaction is announced,
     * it emits a new {@link AggregateTransaction} in the event stream.
     *
     * @param address address we listen when a transaction with missing signatures state
     * @return an observable stream of AggregateTransaction with missing signatures state
     */
    public aggregateBondedAdded(address: Address): Observable<AggregateTransaction> {
        this.subscribeTo(`partialAdded/${address.plain()}`);
        return this.messageSubject.asObservable().pipe(
            filter((_) => _.channelName === ListenerChannelName.aggregateBondedAdded),
            filter((_) => _.message instanceof AggregateTransaction),
            map((_) => _.message as AggregateTransaction),
            filter((_) => this.transactionFromAddress(_, address)));
    }

    /**
     * Returns an observable stream of Transaction Hashes for specific address.
     * Each time an aggregate bonded transaction is announced,
     * it emits a new message with the transaction hash in the event stream.
     *
     * @param address address we listen when a transaction is confirmed or rejected
     * @return an observable stream of Strings with the transaction hash
     */
    public aggregateBondedRemoved(address: Address): Observable<string> {
        this.subscribeTo(`partialRemoved/${address.plain()}`);
        return this.messageSubject.asObservable().pipe(
            filter((_) => _.channelName === ListenerChannelName.aggregateBondedRemoved),
            filter((_) => typeof _.message === 'string'),
            map((_) => _.message as string));
    }

    /**
     * Returns an observable stream of {@link TransactionStatusError} for specific address.
     * Each time a transaction contains an error,
     * it emits a new message with the transaction status error in the event stream.
     *
     * @param address address we listen to be notified when some error happened
     * @return an observable stream of {@link TransactionStatusError}
     */
    public status(address: Address): Observable<TransactionStatusError> {
        this.subscribeTo(`status/${address.plain()}`);
        return this.messageSubject.asObservable().pipe(
            filter((_) => _.channelName === ListenerChannelName.status),
            filter((_) => _.message instanceof TransactionStatusError),
            map((_) => _.message as TransactionStatusError));
    }

    /**
     * Returns an observable stream of {@link CosignatureSignedTransaction} for specific address.
     * Each time a cosigner signs a transaction the address initialized,
     * it emits a new message with the cosignatory signed transaction in the even stream.
     *
     * @param address address we listen when a cosignatory is added to some transaction address sent
     * @return an observable stream of {@link CosignatureSignedTransaction}
     */
    public cosignatureAdded(address: Address): Observable<CosignatureSignedTransaction> {
        this.subscribeTo(`cosignature/${address.plain()}`);
        return this.messageSubject.asObservable().pipe(
            filter((_) => _.channelName === ListenerChannelName.cosignature),
            filter((_) => _.message instanceof CosignatureSignedTransaction),
            map((_) => _.message as CosignatureSignedTransaction));
    }

    /**
     * @internal
     * Subscribes to a channelName.
     * @param channel - Channel subscribed to.
     */
    private subscribeTo(channel: string) {
        const subscriptionMessage = {
            uid: this.uid,
            subscribe: channel,
        };
        this.webSocket.send(JSON.stringify(subscriptionMessage));
    }

    /**
     * @internal
     * @param channel - Channel to unsubscribe
     */
    private unsubscribeTo(channel: string) {
        const unsubscribeMessage = {
            uid: this.uid,
            unsubscribe: channel,
        };
        this.webSocket.send(JSON.stringify(unsubscribeMessage));
    }

    /**
     * @internal
     * Filters if a transaction has been initiated or signed by an address
     * @param transaction - Transaction object
     * @param address - Address
     * @returns boolean
     */
    private transactionFromAddress(transaction: Transaction, address: Address): boolean {
        let transactionFromAddress = this.transactionHasSignerOrReceptor(transaction, address);

        if (transaction instanceof AggregateTransaction) {
            transaction.cosignatures.map((_: AggregateTransactionCosignature) => {
                if (_.signer.address.equals(address)) {
                    transactionFromAddress = true;
                }
            });
            transaction.innerTransactions.map((innerTransaction: InnerTransaction) => {
                if (this.transactionHasSignerOrReceptor(innerTransaction, address)) {
                    transactionFromAddress = true;
                }
            });
        }
        return transactionFromAddress;
    }

    /**
     * @internal
     * @param transaction
     * @param address
     * @returns {boolean}
     */
    private transactionHasSignerOrReceptor(transaction: Transaction, address: Address | NamespaceId): boolean {

        if (address instanceof NamespaceId) {
            return transaction instanceof TransferTransaction
                && (transaction.recipient as NamespaceId).equals(address);
        }

        return transaction.signer!.address.equals(address) || (
            transaction instanceof TransferTransaction
            && (transaction.recipient as Address).equals(address)
        );
    }

    /**
     * @internal
     * Filters if an account has been added to multi signatories
     * @param transaction - Transaction object
     * @param address - Address
     * @returns boolean
     */
    // tslint:disable-next-line:adjacent-overload-signatures
    private accountAddedToMultiSig(transaction: Transaction, address: Address): boolean {
        if (transaction instanceof ModifyMultisigAccountTransaction) {
            transaction.modifications.map((_: MultisigCosignatoryModification) => {
                if (_.modificiationType === MultisigCosignatoryModificationType.Add && _.cosignatoryPublicAccount.address.equals(address)) {
                    return true;
                }
            });
        }
        return false;
    }
}
