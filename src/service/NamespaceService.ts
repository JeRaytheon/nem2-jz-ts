

import {Observable} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {NamespaceHttp} from '../infrastructure/NamespaceHttp';
import {NamespaceId} from '../model/namespace/NamespaceId';
import {NamespaceInfo} from '../model/namespace/NamespaceInfo';
import {NamespaceName} from '../model/namespace/NamespaceName';
import {Namespace} from './Namespace';

/**
 * Namespace service
 */
export class NamespaceService {

    /**
     * Constructor
     * @param namespaceHttp
     */
    constructor(private readonly namespaceHttp: NamespaceHttp) {
    }

    /**
     * Get namespace info and name from namespace Id
     * @param id
     * @returns {Observable<Namespace>}
     */
    namespace(id: NamespaceId): Observable<Namespace> {
        return this.namespaceHttp.getNamespace(id).pipe(
            mergeMap((namespaceInfo: NamespaceInfo) => this.namespaceHttp
                .getNamespacesName(namespaceInfo.levels).pipe(
                map((names) => Object.assign(
                    {__proto__: Object.getPrototypeOf(namespaceInfo)},
                    namespaceInfo,
                    {name: this.extractFullNamespace(namespaceInfo, names)})))));
    }

    private extractFullNamespace(namespace: NamespaceInfo, namespaceNames: NamespaceName[]): string {
        return namespace.levels.map((level) => {
            const namespaceName = namespaceNames.find((name) => name.namespaceId.equals(level));
            if (namespace === undefined) {
                throw new Error('Not found');
            }
            return namespaceName;
        })
            .map((namespaceName: NamespaceName) => namespaceName.name)
            .join('.');
    }
}
