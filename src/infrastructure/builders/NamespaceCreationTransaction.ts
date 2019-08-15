import { Convert as convert } from '../../core/format';
import { TransactionType } from '../../model/transaction/TransactionType';
import * as NamespaceCreationTransactionBufferPackage from '../buffers/NamespaceCreationTransactionBuffer';
import NamespaceCreationTransactionSchema from '../schemas/NamespaceCreationTransactionSchema';
import { VerifiableTransaction } from './VerifiableTransaction';

const {
    NamespaceCreationTransactionBuffer,
} = NamespaceCreationTransactionBufferPackage.default.Buffers;

import {flatbuffers} from 'flatbuffers';

export default class NamespaceCreationTransaction extends VerifiableTransaction {
    constructor(bytes:any) {
        super(bytes, NamespaceCreationTransactionSchema);
    }
}

// tslint:disable-next-line:max-classes-per-file
export class Builder {
    maxFee: any;
    version: any;
    type: any;
    deadline: any;
    namespaceType: any;
    duration: any;
    parentId: any;
    namespaceId: any;
    namespaceName: any;
    constructor() {
        this.maxFee = [0, 0];
        this.type = TransactionType.REGISTER_NAMESPACE;
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

    addNamespaceType(namespaceType:any) {
        this.namespaceType = namespaceType;
        return this;
    }

    addDuration(duration:any) {
        this.duration = duration;
        return this;
    }

    addParentId(parentId:any) {
        this.parentId = parentId;
        return this;
    }

    addNamespaceId(namespaceId:any) {
        this.namespaceId = namespaceId;
        return this;
    }

    addNamespaceName(namespaceName:any) {
        this.namespaceName = namespaceName;
        return this;
    }

    build() {
        const builder = new flatbuffers.Builder(1);

        const namespaceNameLength = convert.utf8ToHex(this.namespaceName).length / 2;

        // create vectors
        const signatureVector = NamespaceCreationTransactionBuffer
            .createSignatureVector(builder, Array(...Array(64)).map(Number.prototype.valueOf, 0));
        const signerVector = NamespaceCreationTransactionBuffer
            .createSignerVector(builder, Array(...Array(32)).map(Number.prototype.valueOf, 0));
        const deadlineVector = NamespaceCreationTransactionBuffer
            .createDeadlineVector(builder, this.deadline);
        const feeVector = NamespaceCreationTransactionBuffer
            .createFeeVector(builder, this.maxFee);
        const parentIdVector = 1 === this.namespaceType ? this.parentId : this.duration;
        const durationParentIdVector = NamespaceCreationTransactionBuffer
            .createDurationParentIdVector(builder, parentIdVector);
        const namespaceIdVector = NamespaceCreationTransactionBuffer
            .createNamespaceIdVector(builder, this.namespaceId);

        const name = builder.createString(this.namespaceName);

        NamespaceCreationTransactionBuffer.startNamespaceCreationTransactionBuffer(builder);
        NamespaceCreationTransactionBuffer.addSize(builder, 138 + namespaceNameLength);
        NamespaceCreationTransactionBuffer.addSignature(builder, signatureVector);
        NamespaceCreationTransactionBuffer.addSigner(builder, signerVector);
        NamespaceCreationTransactionBuffer.addVersion(builder, this.version);
        NamespaceCreationTransactionBuffer.addType(builder, this.type);
        NamespaceCreationTransactionBuffer.addFee(builder, feeVector);
        NamespaceCreationTransactionBuffer.addDeadline(builder, deadlineVector);
        NamespaceCreationTransactionBuffer.addNamespaceType(builder, this.namespaceType);
        NamespaceCreationTransactionBuffer.addDurationParentId(builder, durationParentIdVector);
        NamespaceCreationTransactionBuffer.addNamespaceId(builder, namespaceIdVector);
        NamespaceCreationTransactionBuffer.addNamespaceNameSize(builder, namespaceNameLength);
        NamespaceCreationTransactionBuffer.addNamespaceName(builder, name);

        // Calculate size
        const codedNamespace = NamespaceCreationTransactionBuffer.endNamespaceCreationTransactionBuffer(builder);
        builder.finish(codedNamespace);

        const bytes = builder.asUint8Array();
        return new NamespaceCreationTransaction(bytes);
    }
}
