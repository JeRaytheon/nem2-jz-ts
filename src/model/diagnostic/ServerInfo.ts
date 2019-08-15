

/**
 * The server information.
 */
export class ServerInfo {

    /**
     * @param restVersion - The catapult-rest component version
     * @param sdkVersion - the catapult-sdk component version
     */
    constructor(/**
                 * The catapult-rest component version
                 */
                public readonly restVersion: string,
                /**
                 * the catapult-sdk component version
                 */
                public readonly sdkVersion: string) {

    }
}
