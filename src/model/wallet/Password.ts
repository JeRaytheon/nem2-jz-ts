

/**
 * Password model
 */
export class Password {
    /**
     * Password value
     */
    readonly value: string;

    /**
     * Create a password with at least 8 characters
     * @param password
     */
    constructor(password: string) {
        if (password.length < 8) { throw new Error('Password must be at least 8 characters'); }
        this.value = password;
    }

}
