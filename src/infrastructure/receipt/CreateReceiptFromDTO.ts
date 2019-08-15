import { Address } from '../../model/account/Address';
import {PublicAccount} from '../../model/account/PublicAccount';
import {MosaicId} from '../../model/mosaic/MosaicId';
import { AddressAlias } from '../../model/namespace/AddressAlias';
import { AliasType } from '../../model/namespace/AliasType';
import { MosaicAlias } from '../../model/namespace/MosaicAlias';
import { NamespaceId } from '../../model/namespace/NamespaceId';
import { ArtifactExpiryReceipt } from '../../model/receipt/ArtifactExpiryReceipt';
import { BalanceChangeReceipt } from '../../model/receipt/BalanceChangeReceipt';
import { BalanceTransferReceipt } from '../../model/receipt/BalanceTransferReceipt';
import { InflationReceipt } from '../../model/receipt/InflationReceipt';
import { Receipt } from '../../model/receipt/Receipt';
import { ReceiptSource } from '../../model/receipt/ReceiptSource';
import { ReceiptType } from '../../model/receipt/ReceiptType';
import { ResolutionEntry } from '../../model/receipt/ResolutionEntry';
import { ResolutionStatement } from '../../model/receipt/ResolutionStatement';
import { ResolutionType } from '../../model/receipt/ResolutionType';
import { Statement } from '../../model/receipt/Statement';
import { TransactionStatement } from '../../model/receipt/TransactionStatement';
import {UInt64} from '../../model/UInt64';

/**
 * @param receiptDTO
 * @param networkType
 * @returns {Statement}
 * @see https://github.com/nemtech/catapult-server/blob/master/src/catapult/model/ReceiptType.h
 * @see https://github.com/nemtech/catapult-server/blob/master/src/catapult/model/ReceiptType.cpp
 * @constructor
 */
export const CreateStatementFromDTO = (receiptDTO:any, networkType:any): Statement => {
    return new Statement(
        receiptDTO.transactionStatements.map((statement:any) => createTransactionStatement(statement, networkType)),
        receiptDTO.addressResolutionStatements.map((statement:any) => createResolutionStatement(statement, ResolutionType.Address)),
        receiptDTO.mosaicResolutionStatements.map((statement:any) => createResolutionStatement(statement, ResolutionType.Mosaic)),
    );
};

/**
 * @param receiptDTO
 * @param networkType
 * @returns {Receipt}
 * @constructor
 */
export const CreateReceiptFromDTO = (receiptDTO:any, networkType:any): Receipt => {
    switch (receiptDTO.type) {
        case ReceiptType.Harvest_Fee:
        case ReceiptType.LockHash_Created:
        case ReceiptType.LockHash_Completed:
        case ReceiptType.LockHash_Expired:
        case ReceiptType.LockSecret_Created:
        case ReceiptType.LockSecret_Completed:
        case ReceiptType.LockSecret_Expired:
            return createBalanceChangeReceipt(receiptDTO, networkType);
        case ReceiptType.Mosaic_Levy:
        case ReceiptType.Mosaic_Rental_Fee:
        case ReceiptType.Namespace_Rental_Fee:
            return createBalanceTransferReceipt(receiptDTO, networkType);
        case ReceiptType.Mosaic_Expired:
        case ReceiptType.Namespace_Expired:
            return  createArtifactExpiryReceipt(receiptDTO);
        case ReceiptType.Inflation:
            return createInflationReceipt(receiptDTO);
        default:
            throw new Error(`Receipt type: ${receiptDTO.type} not recognized.`);
    }
};

/**
 * @internal
 * @param statementDTO
 * @param resolutionType
 * @returns {ResolutionStatement}
 * @constructor
 */
const createResolutionStatement = (statementDTO:any, resolutionType:any): ResolutionStatement => {
    switch (resolutionType) {
        case ResolutionType.Address:
            return new ResolutionStatement(
                statementDTO.height,
                Address.createFromEncoded(statementDTO.unresolved),
                statementDTO.resolutionEntries.map((entry:any) => {
                    return new ResolutionEntry(new AddressAlias(AliasType.Address, Address.createFromEncoded(entry.resolved)),
                        new ReceiptSource(entry.source.primaryId, entry.source.secondaryId));
                }),
            );
        case ResolutionType.Mosaic:
            return new ResolutionStatement(
                statementDTO.height,
                new MosaicId(statementDTO.unresolved),
                statementDTO.resolutionEntries.map((entry:any) => {
                    return new ResolutionEntry(new MosaicAlias(AliasType.Mosaic, new MosaicId(entry.resolved)),
                        new ReceiptSource(entry.source.primaryId, entry.source.secondaryId));
                }),
            );
        default:
            throw new Error ('Resolution type invalid');
    }
};

/**
 * @internal
 * @param statementDTO
 * @param networkType
 * @returns {TransactionStatement}
 * @constructor
 */
const createTransactionStatement = (statementDTO:any, networkType:any): TransactionStatement => {
    return new TransactionStatement(
        statementDTO.height,
        new ReceiptSource(statementDTO.source.primaryId, statementDTO.source.secondaryId),
        statementDTO.receipts.map((receipt:any) => {
            return CreateReceiptFromDTO(receipt, networkType);
        }),
    );
};

/**
 * @internal
 * @param receiptDTO
 * @param networkType
 * @returns {BalanceChangeReceipt}
 * @constructor
 */
const createBalanceChangeReceipt = (receiptDTO:any, networkType:any): Receipt => {
    return new BalanceChangeReceipt(
        PublicAccount.createFromPublicKey(receiptDTO.account, networkType),
        new MosaicId(receiptDTO.mosaicId),
        new UInt64(receiptDTO.amount),
        receiptDTO.version,
        receiptDTO.type,
    );
};

/**
 * @internal
 * @param receiptDTO
 * @param networkType
 * @returns {BalanceTransferReceipt}
 * @constructor
 */
const createBalanceTransferReceipt = (receiptDTO:any, networkType:any): Receipt => {
    return new BalanceTransferReceipt(
        PublicAccount.createFromPublicKey(receiptDTO.sender, networkType),
        Address.createFromEncoded(receiptDTO.recipient),
        new MosaicId(receiptDTO.mosaicId),
        new UInt64(receiptDTO.amount),
        receiptDTO.version,
        receiptDTO.type,
    );
};

/**
 * @internal
 * @param receiptDTO
 * @returns {ArtifactExpiryReceipt}
 * @constructor
 */
const createArtifactExpiryReceipt = (receiptDTO:any): Receipt => {
    return new ArtifactExpiryReceipt(
        extractArtifactId(receiptDTO.type, receiptDTO.artifactId),
        receiptDTO.version,
        receiptDTO.type,
    );
};

/**
 * @internal
 * @param receiptDTO
 * @returns {InflationReceipt}
 * @constructor
 */
const createInflationReceipt = (receiptDTO:any): Receipt => {
    return new InflationReceipt(
        new MosaicId(receiptDTO.mosaicId),
        new UInt64(receiptDTO.amount),
        receiptDTO.version,
        receiptDTO.type,
    );
};

const extractArtifactId = (receiptType: ReceiptType, id: number[]): MosaicId | NamespaceId => {
    switch (receiptType) {
        case ReceiptType.Mosaic_Expired:
            return new MosaicId(id);
        case ReceiptType.Namespace_Expired:
            return new NamespaceId(id);
        default:
            throw new Error('Receipt type is not supported.');
    }
};
