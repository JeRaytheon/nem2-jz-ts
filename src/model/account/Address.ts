

import { SignSchema } from '../../core/crypto';
import { Convert as convert, RawAddress as AddressLibrary} from '../../core/format';
import {NetworkType} from '../blockchain/NetworkType';

/**
 * The address structure describes an address with its network
 */
export class Address {
    /**
     * Create from private key
     * @param publicKey - The account public key.
     * @param networkType - The NEM network type.
     * @param {SignSchema} signSchema The Sign Schema. (KECCAK_REVERSED_KEY / SHA3)
     * @returns {Address}
     */
    public static createFromPublicKey(publicKey: string,
                                      networkType: NetworkType,
                                      signSchema = SignSchema.SHA3): Address {
        const publicKeyUint8 = convert.hexToUint8(publicKey);
        const address = AddressLibrary
            .addressToString(AddressLibrary.publicKeyToAddress(publicKeyUint8, networkType, signSchema));
        return new Address(address, networkType);
    }

    /**
     * Create an Address from a given raw address.
     * @param rawAddress - Address in string format.
     *                  ex: SB3KUBHATFCPV7UZQLWAQ2EUR6SIHBSBEOEDDDF3 or SB3KUB-HATFCP-V7UZQL-WAQ2EU-R6SIHB-SBEOED-DDF3
     * @returns {Address}
     */
    public static createFromRawAddress(rawAddress: string) {
        let networkType: NetworkType;
        const addressTrimAndUpperCase: string = rawAddress
            .trim()
            .toUpperCase()
            .replace(/-/g, '');
        if (addressTrimAndUpperCase.length !== 40) {
            throw new Error('Address ' + addressTrimAndUpperCase + ' has to be 40 characters long');
        }
        if (addressTrimAndUpperCase.charAt(0) === 'S') {
            networkType = NetworkType.MIJIN_TEST;
        } else if (addressTrimAndUpperCase.charAt(0) === 'M') {
            networkType = NetworkType.MIJIN;
        } else if (addressTrimAndUpperCase.charAt(0) === 'T') {
            networkType = NetworkType.TEST_NET;
        } else if (addressTrimAndUpperCase.charAt(0) === 'N') {
            networkType = NetworkType.MAIN_NET;
        } else {
            throw new Error('Address Network unsupported');
        }
        return new Address(addressTrimAndUpperCase, networkType);
    }

    /**
     * @internal
     * Create an Address from a given encoded address.
     * @param {string} encoded
     * @return {Address}
     */
    public static createFromEncoded(encoded: string): Address {
        return Address.createFromRawAddress(AddressLibrary
            .addressToString(convert.hexToUint8(encoded)));
    }

    /**
     * @internal
     * @param address
     * @param networkType
     */
    private constructor(/**
                         * The address value.
                         */
                        private readonly address: string,
                        /**
                         * The NEM network type.
                         */
                        public readonly networkType: NetworkType) {
    }

    /**
     * Get address in plain format ex: SB3KUBHATFCPV7UZQLWAQ2EUR6SIHBSBEOEDDDF3.
     * @returns {string}
     */
    public plain(): string {
        return this.address;
    }

    /**
     * Get address in pretty format ex: SB3KUB-HATFCP-V7UZQL-WAQ2EU-R6SIHB-SBEOED-DDF3.
     * @returns {string}
     */
    public pretty(): string {
        return this.address.match(/.{1,6}/g)!.join('-');
    }

    /**
     * Compares addresses for equality
     * @param address - Address
     * @returns {boolean}
     */
    public equals(address: Address): boolean {
        return this.plain() === address.plain() && this.networkType === address.networkType;
    }

    /**
     * Create DTO object
     */
    public toDTO() {
        return {
            address: this.address,
            networkType: this.networkType,
        };
    }
}
