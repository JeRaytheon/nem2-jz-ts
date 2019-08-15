

export class SyncAnnounce {
    /**
     * @internal
     * @param payload
     * @param hash
     * @param address
     */
    constructor(
        /**
         * Transaction serialized data
         */
        public readonly payload: string,
        /**
         * Transaction hash
         */
        public readonly hash: string,
        /**
         * Transaction address
         */
        public readonly address: string) {
    }
}
