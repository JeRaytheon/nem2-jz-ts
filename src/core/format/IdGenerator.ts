import { sha3_256 } from 'js-sha3';
import * as utilities from './Utilities';

export class IdGenerator {
    /**
     * Generates a mosaic id given a nonce and a public id.
     * @param {object} nonce The mosaic nonce.
     * @param {object} ownerPublicId The public id.
     * @returns {module:coders/uint64~uint64} The mosaic id.
     */
    public static generateMosaicId = (nonce:any, ownerPublicId:any) => {
        const hash = sha3_256.create();
        hash.update(nonce);
        hash.update(ownerPublicId);
        const result = new Uint32Array(hash.arrayBuffer());
        return [result[0], result[1] & 0x7FFFFFFF];
    }

    /**
     * Parses a unified namespace name into a path.
     * @param {string} name The unified namespace name.
     * @returns {array<module:coders/uint64~uint64>} The namespace path.
     */
    public static generateNamespacePath = (name: string) => {
        if (0 >= name.length) {
            utilities.throwInvalidFqn('having zero length', name);
        }
        let namespaceId = utilities.idGeneratorConst.namespace_base_id;
        const path:any = [];
        const start = utilities.split(name, (substringStart:any, size:any) => {
            namespaceId = utilities.generateNamespaceId(namespaceId, utilities.extractPartName(name, substringStart, size));
            utilities.append(path, namespaceId, name);
        });
        namespaceId = utilities.generateNamespaceId(namespaceId, utilities.extractPartName(name, start, name.length - start));
        utilities.append(path, namespaceId, name);
        return path;
    }
}
