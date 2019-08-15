

/**
 * Hash type. Supported types are:
 * 0: Op_Sha3_256 (default).
 * 1: Op_Keccak_256 (ETH compatibility).
 * 2: Op_Hash_160 (first with SHA-256 and then with RIPEMD-160 (BTC compatibility))
 * 3: Op_Hash_256: input is hashed twice with SHA-256 (BTC compatibility)
 */
import {Convert as convert} from '../../core/format';

export enum HashType {
    Op_Sha3_256 = 0,
    Op_Keccak_256 = 1,
    Op_Hash_160 = 2,
    Op_Hash_256 = 3,
}

export function HashTypeLengthValidator(hashType: HashType, input: string): boolean {
    if (convert.isHexString(input)) {
        switch (hashType) {
            case HashType.Op_Sha3_256:
            case HashType.Op_Hash_256:
            case HashType.Op_Keccak_256:
                return input.length === 64;
            case HashType.Op_Hash_160:
                return input.length === 40 || input.length === 64;
            default:
                break;
        }
    }
    return false;
}
