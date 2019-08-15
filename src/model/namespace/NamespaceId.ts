
import {Convert as convert} from '../../core/format';
import {NamespaceMosaicIdGenerator} from '../../infrastructure/transaction/NamespaceMosaicIdGenerator';
import {Id} from '../Id';

/**
 * The namespace id structure describes namespace id
 *
 * @since 1.0
 */
export class NamespaceId {

    /**
     * Namespace id
     */
    public readonly id: Id;

    /**
     * Namespace full name
     */
    public readonly fullName?: string;

    /**
     * Create NamespaceId from namespace string name (ex: nem or domain.subdom.subdome)
     * or id in form of array number (ex: [929036875, 2226345261])
     *
     * @param id
     */
    constructor(id: string | number[]) {
        if (id instanceof Array) {
            this.id = new Id(id);
        } else if (typeof id === 'string') {
            this.fullName = id;
            this.id = new Id(NamespaceMosaicIdGenerator.namespaceId(id));
        }
    }

    /**
     * Create a NamespaceId object from its encoded hexadecimal notation.
     * @param encoded
     * @returns {NamespaceId}
     */
    public static createFromEncoded(encoded: string): NamespaceId {
        const uint = convert.hexToUint8(encoded).reverse();
        const hex  = convert.uint8ToHex(uint);
        const namespace = new NamespaceId(Id.fromHex(hex).toDTO());
        return namespace;
    }

    /**
     * Get string value of id
     * @returns {string}
     */
    public toHex(): string {
        return this.id.toHex();
    }

    /**
     * Compares namespaceIds for equality.
     *
     * @return boolean
     */
    public equals(id: any): boolean {
        if (id instanceof NamespaceId) {
            return this.id.equals(id.id);
        }
        return false;
    }

    /**
     * Create DTO object
     */
    public toDTO() {
        return {
            id: this.id.toDTO(),
            fullName: this.fullName ? this.fullName : '',
        };
    }
}
