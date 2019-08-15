import { Convert as convert, RawAddress as address } from '../../core/format';
import { TransactionType } from '../../model/transaction/TransactionType';
import * as SecretProofTransactionBufferPackage from '../buffers/SecretProofTransactionBuffer';
import SecretProofTransactionSchema from '../schemas/SecretProofTransactionSchema';
import { VerifiableTransaction } from './VerifiableTransaction';

import {flatbuffers} from 'flatbuffers';

const {
    SecretProofTransactionBuffer,
} = SecretProofTransactionBufferPackage.default.Buffers;

export default class SecretProofTransaction extends VerifiableTransaction {
    constructor(bytes:any) {
        super(bytes, SecretProofTransactionSchema);
    }
}

// tslint:disable-next-line:max-classes-per-file
export class Builder {
    maxFee: any;
    version: any;
    type: any;
    deadline: any;
    hashAlgorithm: any;
    secret: any;
    recipient: any;
    proof: any;
    constructor() {
        this.maxFee = [0, 0];
        this.type = TransactionType.SECRET_PROOF;
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

    addHashAlgorithm(hashAlgorithm:any) {
        this.hashAlgorithm = hashAlgorithm;
        return this;
    }

    addSecret(secret:any) {
        this.secret = secret;
        return this;
    }
    addRecipient(recipient:any) {
        this.recipient = address.stringToAddress(recipient);
        return this;
    }

    addProof(proof:any) {
        this.proof = proof;
        return this;
    }

    build() {
        const builder = new flatbuffers.Builder(1);

        // Create vectors
        const signatureVector = SecretProofTransactionBuffer
            .createSignatureVector(builder, Array(...Array(64)).map(Number.prototype.valueOf, 0));
        const signerVector = SecretProofTransactionBuffer.createSignerVector(builder, Array(...Array(32)).map(Number.prototype.valueOf, 0));
        const deadlineVector = SecretProofTransactionBuffer.createDeadlineVector(builder, this.deadline);
        const feeVector = SecretProofTransactionBuffer.createFeeVector(builder, this.maxFee);
        const byteSecret = convert.hexToUint8(64 > this.secret.length ? this.secret + '0'.repeat(64 - this.secret.length) : this.secret);
        const secretVector = SecretProofTransactionBuffer.createSecretVector(builder, byteSecret);
        const recipientVector = SecretProofTransactionBuffer.createRecipientVector(builder, this.recipient);
        const byteProof = convert.hexToUint8(this.proof);
        const proofVector = SecretProofTransactionBuffer.createProofVector(builder, byteProof);

        SecretProofTransactionBuffer.startSecretProofTransactionBuffer(builder);
        SecretProofTransactionBuffer.addSize(builder, 180 + byteProof.length);
        SecretProofTransactionBuffer.addSignature(builder, signatureVector);
        SecretProofTransactionBuffer.addSigner(builder, signerVector);
        SecretProofTransactionBuffer.addVersion(builder, this.version);
        SecretProofTransactionBuffer.addType(builder, this.type);
        SecretProofTransactionBuffer.addFee(builder, feeVector);
        SecretProofTransactionBuffer.addDeadline(builder, deadlineVector);
        SecretProofTransactionBuffer.addHashAlgorithm(builder, this.hashAlgorithm);
        SecretProofTransactionBuffer.addSecret(builder, secretVector);
        SecretProofTransactionBuffer.addRecipient(builder, recipientVector);
        SecretProofTransactionBuffer.addProofSize(builder, byteProof.length);
        SecretProofTransactionBuffer.addProof(builder, proofVector);

        const codedSecretProof = SecretProofTransactionBuffer.endSecretProofTransactionBuffer(builder);
        builder.finish(codedSecretProof);

        const bytes = builder.asUint8Array();
        return new SecretProofTransaction(bytes);
    }
}
