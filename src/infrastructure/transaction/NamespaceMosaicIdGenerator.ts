

import {Crypto} from '../../core/crypto';
import { IdGenerator } from '../../core/format';

export class NamespaceMosaicIdGenerator {
    /**
     * @returns mosaic Id
     */
    public static mosaicId = (nonce:any, ownerPublicId:any) => {
        return IdGenerator.generateMosaicId(nonce, ownerPublicId);
    }

    /**
     * @returns random mosaic nonce
     */
    public static generateRandomMosaicNonce = () => {
        return Crypto.randomBytes(4);
    }

    /**
     * @param {string} namespaceName - The namespace name
     * @returns sub namespace id
     */
    public static namespaceId = (namespaceName:any) => {
        const path = IdGenerator.generateNamespacePath(namespaceName);
        return path.length ? IdGenerator.generateNamespacePath(namespaceName)[path.length - 1] : [];
    }
    /**
     * @param {string} parentNamespaceName - The parent namespace name
     * @param {string} namespaceName - The namespace name
     * @returns sub namespace parent id
     */
    public static subnamespaceParentId = (parentNamespaceName: string, namespaceName: string) => {
        const path = IdGenerator.generateNamespacePath(`${parentNamespaceName}.${namespaceName}`);
        return IdGenerator.generateNamespacePath(parentNamespaceName)[path.length - 2];
    }

    /**
     * @param {string} parentNamespaceName - The parent namespace name
     * @param {string} namespaceName - The namespace name
     * @returns sub namespace id
     */
    public static subnamespaceNamespaceId = (parentNamespaceName:any, namespaceName:any) => {
        const path = IdGenerator.generateNamespacePath(`${parentNamespaceName}.${namespaceName}`);
        return path[path.length - 1];
    }

}
