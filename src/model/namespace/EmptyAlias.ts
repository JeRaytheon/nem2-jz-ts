
import {Alias} from './Alias';

/**
 * The EmptyAlias structure describes empty aliases (type:0)
 *
 * @since 0.10.2
 */
export class EmptyAlias implements Alias {
    /**
     * The alias type
     */
    public readonly type: number;

    /**
     * Create EmptyAlias object
     *
     * @param type
     * @param content
     */
    constructor() {
        this.type = 0;
    }

    /**
     * Compares EmptyAlias for equality.
     *
     * @return boolean
     */
    public equals(alias: any): boolean {
        return alias instanceof EmptyAlias || alias.type === 0;
    }
}
