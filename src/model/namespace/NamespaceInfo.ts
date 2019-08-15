

import {PublicAccount} from '../account/PublicAccount';
import {UInt64} from '../UInt64';
import {Alias} from './Alias';
import {NamespaceId} from './NamespaceId';

/**
 * Object containing information of a namespace.
 */
export class NamespaceInfo {

    /**
     * @param active
     * @param index
     * @param metaId
     * @param type
     * @param depth
     * @param levels
     * @param parentId
     * @param owner
     * @param startHeight
     * @param endHeight
     */
    constructor(/**
                 * Namespace is active.
                 */
                public readonly active: boolean,
                /**
                 * The namespace index.
                 */
                public readonly index: number,
                /**
                 * The meta data id.
                 */
                public readonly metaId: string,
                /**
                 * The namespace type, namespace and sub namespace.
                 */
                private readonly type: number,
                /**
                 * The level of namespace.
                 */
                public readonly depth: number,
                /**
                 * The namespace id levels.
                 */
                public readonly levels: NamespaceId[],
                /**
                 * The namespace parent id.
                 */
                private readonly parentId: NamespaceId,
                /**
                 * The owner of the namespace.
                 */
                public readonly owner: PublicAccount,
                /**
                 * The height at which the ownership begins.
                 */
                public readonly startHeight: UInt64,
                /**
                 * The height at which the ownership ends.
                 */
                public readonly endHeight: UInt64,
                /**
                 * The alias linked to a namespace.
                 */
                public readonly alias: Alias) {

    }

    /**
     * Namespace id
     * @returns {Id}
     */
    get id(): NamespaceId {
        return this.levels[this.levels.length - 1];
    }

    /**
     * Is root namespace
     * @returns {boolean}
     */
    public isRoot(): boolean {
        return this.type === 0;
    }

    /**
     * Is sub namepsace
     * @returns {boolean}
     */
    public isSubnamespace(): boolean {
        return this.type === 1;
    }

    /**
     * Has alias
     * @returns {boolean}
     */
    public hasAlias(): boolean {
        return this.alias.type !== 0;
    }

    /**
     * Get parent id
     * @returns {Id}
     */
    public parentNamespaceId(): NamespaceId {
        if (this.isRoot()) {
            throw new Error('Is a Root Namespace');
        }
        return this.parentId;
    }
}
