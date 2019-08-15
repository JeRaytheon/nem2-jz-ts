

import { RawUInt64 as uint64 } from '../core/format';

/**
 * UInt64 data model
 */
export class UInt64 {

    /**
     * uint64 lower part
     */
    public readonly lower: number;

    /**
     * uint64 higher part
     */
    public readonly higher: number;

    /**
     * Create from uint value
     * @param value
     * @returns {UInt64}
     */
    public static fromUint(value: number): UInt64 {
        if (value < 0) {
            throw new Error('Unsigned integer cannot be negative');
        }
        return new UInt64(uint64.fromUint(value));
    }

    /**
     * Parses a hex string into a UInt64.
     * @param {string} input A hex encoded string.
     * @returns {module:coders/uint64~uint64} The uint64 representation of the input.
     */
    public static fromHex(input: string): UInt64 {
        const dto = uint64.fromHex(input);
        return new UInt64(dto);
    }

    /**
     * Constructor
     * @param uintArray
     */
    constructor(uintArray: number[]) {
        if (uintArray.length !== 2 || uintArray[0] < 0 || uintArray[1] < 0) {
            throw new Error('uintArray must be be an array of two uint numbers');
        }
        this.lower = uintArray[0];
        this.higher = uintArray[1];
    }

    /**
     * Get DTO representation with format: `[lower, higher]`
     *
     * @internal
     * @returns {[number,number]}
     */
    public toDTO(): number[] {
        return [this.lower, this.higher];
    }

    /**
     * Get hexadecimal representation
     *
     * @return {string}
     */
    public toHex(): string {
        return uint64.toHex(this.toDTO());
    }

    /**
     * Compact higher and lower uint parts into a uint
     * @returns {number}
     */
    public compact(): number {
        return uint64.compact(this.toDTO());
    }

    /**
     * Compares for equality
     * @param other
     * @returns {boolean}
     */
    public equals(other: UInt64): boolean {
        return this.lower === other.lower && this.higher === other.higher;
    }
}
