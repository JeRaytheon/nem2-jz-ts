
export * from './accountDTO';
export * from './accountIds';
export * from './accountInfoDTO';
export * from './accountMetaDTO';
export * from './accountNamesDTO';
export * from './accountRestrictionDTO';
export * from './accountRestrictionTypeEnum';
export * from './accountRestrictionsDTO';
export * from './accountRestrictionsInfoDTO';
export * from './aliasDTO';
export * from './aliasTypeEnum';
export * from './announceTransactionInfoDTO';
export * from './blockDTO';
export * from './blockInfoDTO';
export * from './blockMetaDTO';
export * from './blockchainScoreDTO';
export * from './communicationTimestamps';
export * from './cosignature';
export * from './heightInfoDTO';
export * from './merklePathItem';
export * from './merkleProofInfo';
export * from './merkleProofInfoDTO';
export * from './mosaicDTO';
export * from './mosaicDefinitionDTO';
export * from './mosaicIds';
export * from './mosaicInfoDTO';
export * from './mosaicMetaDTO';
export * from './mosaicNamesDTO';
export * from './mosaicPropertyDTO';
export * from './mosaicPropertyIdEnum';
export * from './multisigAccountGraphInfoDTO';
export * from './multisigAccountInfoDTO';
export * from './multisigDTO';
export * from './multisigModificationTypeEnum';
export * from './namespaceDTO';
export * from './namespaceIds';
export * from './namespaceInfoDTO';
export * from './namespaceMetaDTO';
export * from './namespaceNameDTO';
export * from './namespaceTypeEnum';
export * from './networkTypeDTO';
export * from './nodeInfoDTO';
export * from './nodeTimeDTO';
export * from './receiptTypeEnum';
export * from './resolutionEntryDTO';
export * from './resolutionStatementDTO';
export * from './rolesTypeEnum';
export * from './serverDTO';
export * from './serverInfoDTO';
export * from './sourceDTO';
export * from './statementsDTO';
export * from './storageInfoDTO';
export * from './transactionHashes';
export * from './transactionIds';
export * from './transactionInfoDTO';
export * from './transactionMetaDTO';
export * from './transactionPayload';
export * from './transactionStatementDTO';
export * from './transactionStatusDTO';

import localVarRequest = require('request');

import { AccountDTO } from './accountDTO';
import { AccountIds } from './accountIds';
import { AccountInfoDTO } from './accountInfoDTO';
import { AccountMetaDTO } from './accountMetaDTO';
import { AccountNamesDTO } from './accountNamesDTO';
import { AccountRestrictionDTO } from './accountRestrictionDTO';
import { AccountRestrictionTypeEnum } from './accountRestrictionTypeEnum';
import { AccountRestrictionsDTO } from './accountRestrictionsDTO';
import { AccountRestrictionsInfoDTO } from './accountRestrictionsInfoDTO';
import { AliasDTO } from './aliasDTO';
import { AliasTypeEnum } from './aliasTypeEnum';
import { AnnounceTransactionInfoDTO } from './announceTransactionInfoDTO';
import { BlockDTO } from './blockDTO';
import { BlockInfoDTO } from './blockInfoDTO';
import { BlockMetaDTO } from './blockMetaDTO';
import { BlockchainScoreDTO } from './blockchainScoreDTO';
import { CommunicationTimestamps } from './communicationTimestamps';
import { Cosignature } from './cosignature';
import { HeightInfoDTO } from './heightInfoDTO';
import { MerklePathItem } from './merklePathItem';
import { MerkleProofInfo } from './merkleProofInfo';
import { MerkleProofInfoDTO } from './merkleProofInfoDTO';
import { MosaicDTO } from './mosaicDTO';
import { MosaicDefinitionDTO } from './mosaicDefinitionDTO';
import { MosaicIds } from './mosaicIds';
import { MosaicInfoDTO } from './mosaicInfoDTO';
import { MosaicMetaDTO } from './mosaicMetaDTO';
import { MosaicNamesDTO } from './mosaicNamesDTO';
import { MosaicPropertyDTO } from './mosaicPropertyDTO';
import { MosaicPropertyIdEnum } from './mosaicPropertyIdEnum';
import { MultisigAccountGraphInfoDTO } from './multisigAccountGraphInfoDTO';
import { MultisigAccountInfoDTO } from './multisigAccountInfoDTO';
import { MultisigDTO } from './multisigDTO';
import { MultisigModificationTypeEnum } from './multisigModificationTypeEnum';
import { NamespaceDTO } from './namespaceDTO';
import { NamespaceIds } from './namespaceIds';
import { NamespaceInfoDTO } from './namespaceInfoDTO';
import { NamespaceMetaDTO } from './namespaceMetaDTO';
import { NamespaceNameDTO } from './namespaceNameDTO';
import { NamespaceTypeEnum } from './namespaceTypeEnum';
import { NetworkTypeDTO } from './networkTypeDTO';
import { NodeInfoDTO } from './nodeInfoDTO';
import { NodeTimeDTO } from './nodeTimeDTO';
import { ReceiptTypeEnum } from './receiptTypeEnum';
import { ResolutionEntryDTO } from './resolutionEntryDTO';
import { ResolutionStatementDTO } from './resolutionStatementDTO';
import { RolesTypeEnum } from './rolesTypeEnum';
import { ServerDTO } from './serverDTO';
import { ServerInfoDTO } from './serverInfoDTO';
import { SourceDTO } from './sourceDTO';
import { StatementsDTO } from './statementsDTO';
import { StorageInfoDTO } from './storageInfoDTO';
import { TransactionHashes } from './transactionHashes';
import { TransactionIds } from './transactionIds';
import { TransactionInfoDTO } from './transactionInfoDTO';
import { TransactionMetaDTO } from './transactionMetaDTO';
import { TransactionPayload } from './transactionPayload';
import { TransactionStatementDTO } from './transactionStatementDTO';
import { TransactionStatusDTO } from './transactionStatusDTO';

/* tslint:disable:no-unused-variable */
let primitives = [
                    "string",
                    "boolean",
                    "double",
                    "integer",
                    "long",
                    "float",
                    "number",
                    "any"
                 ];
                 
let enumsMap: {[index: string]: any} = {

    "AliasTypeEnum": AliasTypeEnum,
    "MosaicPropertyIdEnum": MosaicPropertyIdEnum,
    "MultisigModificationTypeEnum": MultisigModificationTypeEnum,
    "NamespaceTypeEnum": NamespaceTypeEnum,
    "ReceiptTypeEnum": ReceiptTypeEnum,
    "RolesTypeEnum": RolesTypeEnum,
}

let typeMap: {[index: string]: any} = {
    "AccountDTO": AccountDTO,
    "AccountIds": AccountIds,
    "AccountInfoDTO": AccountInfoDTO,
    "AccountMetaDTO": AccountMetaDTO,
    "AccountNamesDTO": AccountNamesDTO,
    "AccountRestrictionDTO": AccountRestrictionDTO,
    "AccountRestrictionTypeEnum": AccountRestrictionTypeEnum,
    "AccountRestrictionsDTO": AccountRestrictionsDTO,
    "AccountRestrictionsInfoDTO": AccountRestrictionsInfoDTO,
    "AliasDTO": AliasDTO,
    "AnnounceTransactionInfoDTO": AnnounceTransactionInfoDTO,
    "BlockDTO": BlockDTO,
    "BlockInfoDTO": BlockInfoDTO,
    "BlockMetaDTO": BlockMetaDTO,
    "BlockchainScoreDTO": BlockchainScoreDTO,
    "CommunicationTimestamps": CommunicationTimestamps,
    "Cosignature": Cosignature,
    "HeightInfoDTO": HeightInfoDTO,
    "MerklePathItem": MerklePathItem,
    "MerkleProofInfo": MerkleProofInfo,
    "MerkleProofInfoDTO": MerkleProofInfoDTO,
    "MosaicDTO": MosaicDTO,
    "MosaicDefinitionDTO": MosaicDefinitionDTO,
    "MosaicIds": MosaicIds,
    "MosaicInfoDTO": MosaicInfoDTO,
    "MosaicMetaDTO": MosaicMetaDTO,
    "MosaicNamesDTO": MosaicNamesDTO,
    "MosaicPropertyDTO": MosaicPropertyDTO,
    "MultisigAccountGraphInfoDTO": MultisigAccountGraphInfoDTO,
    "MultisigAccountInfoDTO": MultisigAccountInfoDTO,
    "MultisigDTO": MultisigDTO,
    "NamespaceDTO": NamespaceDTO,
    "NamespaceIds": NamespaceIds,
    "NamespaceInfoDTO": NamespaceInfoDTO,
    "NamespaceMetaDTO": NamespaceMetaDTO,
    "NamespaceNameDTO": NamespaceNameDTO,
    "NetworkTypeDTO": NetworkTypeDTO,
    "NodeInfoDTO": NodeInfoDTO,
    "NodeTimeDTO": NodeTimeDTO,
    "ResolutionEntryDTO": ResolutionEntryDTO,
    "ResolutionStatementDTO": ResolutionStatementDTO,
    "ServerDTO": ServerDTO,
    "ServerInfoDTO": ServerInfoDTO,
    "SourceDTO": SourceDTO,
    "StatementsDTO": StatementsDTO,
    "StorageInfoDTO": StorageInfoDTO,
    "TransactionHashes": TransactionHashes,
    "TransactionIds": TransactionIds,
    "TransactionInfoDTO": TransactionInfoDTO,
    "TransactionMetaDTO": TransactionMetaDTO,
    "TransactionPayload": TransactionPayload,
    "TransactionStatementDTO": TransactionStatementDTO,
    "TransactionStatusDTO": TransactionStatusDTO,
}

export class ObjectSerializer {
    public static findCorrectType(data: any, expectedType: string) {
        if (data == undefined) {
            return expectedType;
        } else if (primitives.indexOf(expectedType.toLowerCase()) !== -1) {
            return expectedType;
        } else if (expectedType === "Date") {
            return expectedType;
        } else {
            if (enumsMap[expectedType]) {
                return expectedType;
            }

            if (!typeMap[expectedType]) {
                return expectedType; // w/e we don't know the type
            }

            // Check the discriminator
            let discriminatorProperty = typeMap[expectedType].discriminator;
            if (discriminatorProperty == null) {
                return expectedType; // the type does not have a discriminator. use it.
            } else {
                if (data[discriminatorProperty]) {
                    var discriminatorType = data[discriminatorProperty];
                    if(typeMap[discriminatorType]){
                        return discriminatorType; // use the type given in the discriminator
                    } else {
                        return expectedType; // discriminator did not map to a type
                    }
                } else {
                    return expectedType; // discriminator was not present (or an empty string)
                }
            }
        }
    }

    public static serialize(data: any, type: string) {
        if (data == undefined) {
            return data;
        } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        } else if (type.lastIndexOf("Array<", 0) === 0) { // string.startsWith pre es6
            let subType: string = type.replace("Array<", ""); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            let transformedData: any[] = [];
            for (let index in data) {
                let date = data[index];
                transformedData.push(ObjectSerializer.serialize(date, subType));
            }
            return transformedData;
        } else if (type === "Date") {
            return data.toISOString();
        } else {
            if (enumsMap[type]) {
                return data;
            }
            if (!typeMap[type]) { // in case we dont know the type
                return data;
            }
            
            // Get the actual type of this object
            type = this.findCorrectType(data, type);

            // get the map for the correct type.
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            let instance: {[index: string]: any} = {};
            for (let index in attributeTypes) {
                let attributeType = attributeTypes[index];
                instance[attributeType.baseName] = ObjectSerializer.serialize(data[attributeType.name], attributeType.type);
            }
            return instance;
        }
    }

    public static deserialize(data: any, type: string) {
        // polymorphism may change the actual type.
        type = ObjectSerializer.findCorrectType(data, type);
        if (data == undefined) {
            return data;
        } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        } else if (type.lastIndexOf("Array<", 0) === 0) { // string.startsWith pre es6
            let subType: string = type.replace("Array<", ""); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            let transformedData: any[] = [];
            for (let index in data) {
                let date = data[index];
                transformedData.push(ObjectSerializer.deserialize(date, subType));
            }
            return transformedData;
        } else if (type === "Date") {
            return new Date(data);
        } else {
            if (enumsMap[type]) {// is Enum
                return data;
            }

            if (!typeMap[type]) { // dont know the type
                return data;
            }
            let instance = new typeMap[type]();
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            for (let index in attributeTypes) {
                let attributeType = attributeTypes[index];
                instance[attributeType.name] = ObjectSerializer.deserialize(data[attributeType.baseName], attributeType.type);
            }
            return instance;
        }
    }
}

export interface Authentication {
    /**
    * Apply authentication settings to header and query params.
    */
    applyToRequest(requestOptions: localVarRequest.Options): void;
}

export class HttpBasicAuth implements Authentication {
    public username: string = '';
    public password: string = '';

    applyToRequest(requestOptions: localVarRequest.Options): void {
        requestOptions.auth = {
            username: this.username, password: this.password
        }
    }
}

export class ApiKeyAuth implements Authentication {
    public apiKey: string = '';

    constructor(private location: string, private paramName: string) {
    }

    applyToRequest(requestOptions: localVarRequest.Options): void {
        if (this.location == "query") {
            (<any>requestOptions.qs)[this.paramName] = this.apiKey;
        } else if (this.location == "header" && requestOptions && requestOptions.headers) {
            requestOptions.headers[this.paramName] = this.apiKey;
        }
    }
}

export class OAuth implements Authentication {
    public accessToken: string = '';

    applyToRequest(requestOptions: localVarRequest.Options): void {
        if (requestOptions && requestOptions.headers) {
            requestOptions.headers["Authorization"] = "Bearer " + this.accessToken;
        }
    }
}

export class VoidAuth implements Authentication {
    public username: string = '';
    public password: string = '';

    applyToRequest(_: localVarRequest.Options): void {
        // Do nothing
    }
}