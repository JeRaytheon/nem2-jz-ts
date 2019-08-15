

import {UInt64} from './UInt64';

/**
 * This class is used to define mosaicIds and namespaceIds
 */
export class Id extends UInt64 {
    public static fromHex(hexId: string): Id {
        const higher = parseInt(hexId.substr(0, 8), 16);
        const lower = parseInt(hexId.substr(8, 8), 16);

        return new Id([lower, higher]);
    }

    /**
     * Get string value of id
     * @returns {string}
     */
    public toHex(): string {
        const part1 = this.higher.toString(16);
        const part2 = this.lower.toString(16);

        return this.pad(part1, 8) + this.pad(part2, 8);
    }

    /**
     * @param str
     * @param maxVal
     * @returns {string}
     */
    private pad(str:any, maxVal:any): string {
        return (str.length < maxVal ? this.pad(`0${str}`, maxVal) : str);
    }

}
