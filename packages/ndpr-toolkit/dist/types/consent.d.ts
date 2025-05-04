/**
 * Represents a consent option that can be presented to users
 */
export interface ConsentOption {
    /**
     * Unique identifier for the consent option
     */
    id: string;
    /**
     * Display label for the consent option
     */
    label: string;
    /**
     * Detailed description of what this consent option covers
     */
    description: string;
    /**
     * Whether this consent option is required (cannot be declined)
     */
    required: boolean;
    /**
     * Default state of the consent option
     * @default false
     */
    defaultValue?: boolean;
}
/**
 * Represents the user's consent settings
 */
export interface ConsentSettings {
    /**
     * Map of consent option IDs to boolean values indicating consent status
     */
    consents: Record<string, boolean>;
    /**
     * Timestamp when consent was last updated
     */
    timestamp: number;
    /**
     * Version of the consent form that was accepted
     */
    version: string;
    /**
     * Method used to collect consent (e.g., "banner", "settings", "api")
     */
    method: string;
    /**
     * Whether the user has actively made a choice (as opposed to default settings)
     */
    hasInteracted: boolean;
}
/**
 * Represents the storage mechanism for consent settings
 */
export interface ConsentStorageOptions {
    /**
     * Storage key for consent settings
     * @default "ndpr_consent"
     */
    storageKey?: string;
    /**
     * Storage type to use
     * @default "localStorage"
     */
    storageType?: 'localStorage' | 'sessionStorage' | 'cookie';
    /**
     * Cookie options (only used when storageType is "cookie")
     */
    cookieOptions?: {
        /**
         * Domain for the cookie
         */
        domain?: string;
        /**
         * Path for the cookie
         * @default "/"
         */
        path?: string;
        /**
         * Expiration days for the cookie
         * @default 365
         */
        expires?: number;
        /**
         * Whether the cookie should be secure
         * @default true
         */
        secure?: boolean;
        /**
         * SameSite attribute for the cookie
         * @default "Lax"
         */
        sameSite?: 'Strict' | 'Lax' | 'None';
    };
}
