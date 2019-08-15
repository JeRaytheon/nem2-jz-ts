

  import { AddressAlias } from '../namespace/AddressAlias';
  import { MosaicAlias } from '../namespace/MosaicAlias';
  import { ReceiptSource } from './ReceiptSource';

/**
 * The receipt source object.
 */
  export class ResolutionEntry {

    /**
     * @constructor
     * @param resolved - A resolved address or resolved mosaicId (alias).
     * @param source - The receipt source.
     */
    constructor(
                /**
                 * A resolved address or resolved mosaicId (alias).
                 */
                public readonly resolved: AddressAlias | MosaicAlias,
                /**
                 * The receipt source.
                 */
                public readonly source: ReceiptSource) {
    }
}
