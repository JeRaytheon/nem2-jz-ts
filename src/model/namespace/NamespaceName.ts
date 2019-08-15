

import {NamespaceId} from './NamespaceId';

/**
 * The namespace name info structure describes basic information of a namespace and name.
 */
export class NamespaceName {

    /**
     * @param namespaceId
     * @param name
     */
    constructor(/**
                 * The namespace id.
                 */
                public readonly namespaceId: NamespaceId,
                /**
                 * The namespace name.
                 */
                public readonly name: string,
                /**
                 * The parent id.
                 */
                public readonly parentId?: NamespaceId) {
    }
}
