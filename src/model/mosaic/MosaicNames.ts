

import { NamespaceName } from '../namespace/NamespaceName';
import { MosaicId } from './MosaicId';

/**
 * Mosaic with linked names
 */
export class MosaicNames {

    /**
     *
     */
    constructor(
        /**
         * Mosaic Id
         */
        public readonly mosaicId: MosaicId,
        /**
         * Address linked namespace names
         */
        public readonly names: NamespaceName[]) {

    }
}
