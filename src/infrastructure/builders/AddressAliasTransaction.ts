import { RawAddress as addressLibrary } from '../../core/format';
import { TransactionType } from '../../model/transaction/TransactionType';
import AddressAliasTransactionBufferPackage from '../buffers/AddressAliasTransactionBuffer';
import AddressAliasTransactionSchema from '../schemas/AddressAliasTransactionSchema';
import { VerifiableTransaction } from './VerifiableTransaction';

const {
    AddressAliasTransactionBuffer,
} = AddressAliasTransactionBufferPackage.Buffers;

import {flatbuffers} from 'flatbuffers';

/**
 * @module transactions/AddressAliasTransaction
 */
export class AddressAliasTransaction extends VerifiableTransaction {
    constructor(bytes:any) {
        super(bytes, AddressAliasTransactionSchema);
    }
}
// tslint:disable-next-line:max-classes-per-file
export class Builder {
    maxFee: any;
    version: any;
    type: any;
    deadline: any;
    address: any;
    namespaceId: any;
    actionType: any;
    constructor() {
        this.maxFee = [0, 0];
        this.type = TransactionType.ADDRESS_ALIAS;
    }

    addFee(maxFee:any) {
        this.maxFee = maxFee;
        return this;
    }

    addVersion(version:any) {
        this.version = version;
        return this;
    }

    addType(type:any) {
        this.type = type;
        return this;
    }

    addDeadline(deadline:any) {
        this.deadline = deadline;
        return this;
    }

    addActionType(actionType:any) {
        this.actionType = actionType;
        return this;
    }

    addNamespaceId(namespaceId:any) {
        this.namespaceId = namespaceId;
        return this;
    }

    addAddress(address:any) {
        this.address = addressLibrary.stringToAddress(address);
        return this;
    }

    build() {
        const builder = new flatbuffers.Builder(1);

        // Create vectors
        const signatureVector = AddressAliasTransactionBuffer
            .createSignatureVector(builder, Array(...Array(64)).map(Number.prototype.valueOf, 0));
        const signerVector = AddressAliasTransactionBuffer
            .createSignerVector(builder, Array(...Array(32)).map(Number.prototype.valueOf, 0));
        const deadlineVector = AddressAliasTransactionBuffer
            .createDeadlineVector(builder, this.deadline);
        const feeVector = AddressAliasTransactionBuffer
            .createFeeVector(builder, this.maxFee);
        const namespaceIdVector = AddressAliasTransactionBuffer
            .createNamespaceIdVector(builder, this.namespaceId);
        const addressVector = AddressAliasTransactionBuffer
            .createAddressVector(builder, this.address);

        AddressAliasTransactionBuffer.startAddressAliasTransactionBuffer(builder);
        AddressAliasTransactionBuffer.addSize(builder, 154);
        AddressAliasTransactionBuffer.addSignature(builder, signatureVector);
        AddressAliasTransactionBuffer.addSigner(builder, signerVector);
        AddressAliasTransactionBuffer.addVersion(builder, this.version);
        AddressAliasTransactionBuffer.addType(builder, this.type);
        AddressAliasTransactionBuffer.addFee(builder, feeVector);
        AddressAliasTransactionBuffer.addDeadline(builder, deadlineVector);
        AddressAliasTransactionBuffer.addActionType(builder, this.actionType);
        AddressAliasTransactionBuffer.addNamespaceId(builder, namespaceIdVector);
        AddressAliasTransactionBuffer.addAddress(builder, addressVector);

        // Calculate size
        const codedMosaicChangeSupply = AddressAliasTransactionBuffer.endAddressAliasTransactionBuffer(builder);
        builder.finish(codedMosaicChangeSupply);

        const bytes = builder.asUint8Array();

        return new AddressAliasTransaction(bytes);
    }
}
