/**
 * Secure Storage for User Form Data
 *
 * Provides client-side encryption for storing sensitive form data.
 * Uses Web Crypto API for AES-GCM encryption with a user-derived key.
 *
 * Storage mechanism: localStorage (no size limits like cookies)
 * Security: AES-GCM 256-bit encryption with PBKDF2 key derivation
 *
 * @author Austin Steil
 * @version 2.0.0
 */

class SecureStorage {
    constructor() {
        this.storageName = 'userFormData';
        this.storageExpireDays = 30; // Data expires after 30 days

        // Legacy cookie names for backward compatibility
        this.cookieName = 'userFormData';
        this.cookieExpireDays = 30;
    }

    /**
     * Generate a cryptographic key from user input (like a simple password/phrase)
     * @param {string} userPhrase - User-provided phrase for key derivation
     * @param {Uint8Array} salt - Salt for key derivation
     * @returns {Promise<CryptoKey>} Derived encryption key
     */
    async deriveKey(userPhrase, salt) {
        const encoder = new TextEncoder();
        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            encoder.encode(userPhrase),
            { name: 'PBKDF2' },
            false,
            ['deriveKey']
        );

        return crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: salt,
                iterations: 100000,
                hash: 'SHA-256'
            },
            keyMaterial,
            { name: 'AES-GCM', length: 256 },
            false,
            ['encrypt', 'decrypt']
        );
    }

    /**
     * Encrypt data using AES-GCM
     * @param {Object} data - Data to encrypt
     * @param {string} userPhrase - User phrase for encryption
     * @returns {Promise<string>} Base64 encoded encrypted data
     */
    async encryptData(data, userPhrase) {
        const encoder = new TextEncoder();
        const dataString = JSON.stringify(data);
        
        // Generate random salt and IV
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const iv = crypto.getRandomValues(new Uint8Array(12));
        
        // Derive key from user phrase
        const key = await this.deriveKey(userPhrase, salt);
        
        // Encrypt the data
        const encryptedData = await crypto.subtle.encrypt(
            { name: 'AES-GCM', iv: iv },
            key,
            encoder.encode(dataString)
        );

        // Combine salt, IV, and encrypted data
        const combined = new Uint8Array(salt.length + iv.length + encryptedData.byteLength);
        combined.set(salt, 0);
        combined.set(iv, salt.length);
        combined.set(new Uint8Array(encryptedData), salt.length + iv.length);

        // Convert to base64 for cookie storage
        return btoa(String.fromCharCode(...combined));
    }

    /**
     * Decrypt data using AES-GCM
     * @param {string} encryptedBase64 - Base64 encoded encrypted data
     * @param {string} userPhrase - User phrase for decryption
     * @returns {Promise<Object>} Decrypted data object
     */
    async decryptData(encryptedBase64, userPhrase) {
        try {
            // Convert from base64
            const combined = new Uint8Array(
                atob(encryptedBase64).split('').map(char => char.charCodeAt(0))
            );

            // Extract salt, IV, and encrypted data
            const salt = combined.slice(0, 16);
            const iv = combined.slice(16, 28);
            const encryptedData = combined.slice(28);

            // Derive key from user phrase
            const key = await this.deriveKey(userPhrase, salt);

            // Decrypt the data
            const decryptedBuffer = await crypto.subtle.decrypt(
                { name: 'AES-GCM', iv: iv },
                key,
                encryptedData
            );

            // Convert back to string and parse JSON
            const decoder = new TextDecoder();
            const dataString = decoder.decode(decryptedBuffer);
            return JSON.parse(dataString);
        } catch (error) {
            throw new Error('Failed to decrypt data. Invalid phrase or corrupted data.');
        }
    }

    /**
     * Set a cookie with expiration
     * @param {string} name - Cookie name
     * @param {string} value - Cookie value
     * @param {number} days - Days until expiration
     */
    setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict;Secure=${location.protocol === 'https:'}`;
    }

    /**
     * Get a cookie value by name
     * @param {string} name - Cookie name
     * @returns {string|null} Cookie value or null if not found
     */
    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    /**
     * Delete a cookie
     * @param {string} name - Cookie name to delete
     */
    deleteCookie(name) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    }

    /**
     * Save form data securely to localStorage
     * Uses the same AES-GCM encryption as before, but stores in localStorage instead of cookies
     * @param {Object} formData - Form data to save
     * @param {string} userPhrase - User phrase for encryption
     * @returns {Promise<boolean>} Success status
     */
    async saveFormData(formData, userPhrase) {
        try {
            const encryptedData = await this.encryptData(formData, userPhrase);

            // Check data size
            const dataSize = encryptedData.length;
            const dataSizeKB = (dataSize / 1024).toFixed(2);
            const dataSizeMB = (dataSize / (1024 * 1024)).toFixed(2);
            console.log(`=== STORAGE SIZE CHECK ===`);
            console.log(`Encrypted data size: ${dataSize} bytes (${dataSizeKB} KB / ${dataSizeMB} MB)`);
            console.log(`localStorage limit: ~5-10 MB (varies by browser)`);

            // Store in localStorage (much larger limit than cookies)
            localStorage.setItem(this.storageName, encryptedData);

            // Store metadata
            localStorage.setItem('hasStoredData', 'true');

            // Store the expiration timestamp for dynamic calculation
            const expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + (this.storageExpireDays * 24 * 60 * 60 * 1000));
            localStorage.setItem('dataExpiration', expirationDate.getTime().toString());

            console.log('Data saved successfully to localStorage');

            // Clean up any old cookie data
            this.deleteCookie(this.cookieName);
            this.deleteCookie('hasStoredData');
            this.deleteCookie('dataExpiration');

            return true;
        } catch (error) {
            console.error('Failed to save form data:', error);

            // Check if it's a quota exceeded error
            if (error.name === 'QuotaExceededError') {
                console.error('localStorage quota exceeded! Data is too large.');
            }

            return false;
        }
    }

    /**
     * Load form data securely from localStorage (with fallback to cookies for backward compatibility)
     * @param {string} userPhrase - User phrase for decryption
     * @returns {Promise<Object|null>} Decrypted form data or null
     */
    async loadFormData(userPhrase) {
        try {
            // Try localStorage first
            let encryptedData = localStorage.getItem(this.storageName);
            let source = 'localStorage';

            // Fallback to cookies for backward compatibility
            if (!encryptedData) {
                encryptedData = this.getCookie(this.cookieName);
                source = 'cookie (legacy)';
            }

            console.log(`=== STORAGE LOAD CHECK ===`);
            if (!encryptedData) {
                console.error('No encrypted data found in localStorage or cookies');
                return null;
            }

            const dataSize = encryptedData.length;
            const dataSizeKB = (dataSize / 1024).toFixed(2);
            console.log(`Retrieved data from ${source}`);
            console.log(`Data size: ${dataSize} bytes (${dataSizeKB} KB)`);

            const formData = await this.decryptData(encryptedData, userPhrase);
            console.log('Decryption successful!');

            // If we loaded from cookie, migrate to localStorage
            if (source === 'cookie (legacy)') {
                console.log('Migrating data from cookie to localStorage...');
                await this.saveFormData(formData, userPhrase);
            }

            return formData;
        } catch (error) {
            console.error('Failed to load form data:', error);
            console.error('This could be due to: wrong passphrase, corrupted data, or truncated cookie data');
            throw error;
        }
    }

    /**
     * Check if stored data exists (checks both localStorage and cookies)
     * @returns {boolean} True if stored data exists
     */
    hasStoredData() {
        // Check localStorage first
        if (localStorage.getItem('hasStoredData') === 'true') {
            return true;
        }

        // Fallback to cookie for backward compatibility
        return this.getCookie('hasStoredData') === 'true';
    }

    /**
     * Clear all stored data (both localStorage and cookies)
     */
    clearStoredData() {
        // Clear localStorage
        localStorage.removeItem(this.storageName);
        localStorage.removeItem('hasStoredData');
        localStorage.removeItem('dataExpiration');

        // Clear legacy cookies
        this.deleteCookie(this.cookieName);
        this.deleteCookie('hasStoredData');
        this.deleteCookie('dataExpiration');

        console.log('All stored data cleared from localStorage and cookies');
    }

    /**
     * Get the number of days until storage expiration
     * @returns {number} Number of days until expiration
     */
    getExpirationDays() {
        return this.storageExpireDays;
    }

    /**
     * Get the actual remaining days until stored data expires
     * @returns {number|null} Number of days remaining, or null if no data stored
     */
    getRemainingDays() {
        if (!this.hasStoredData()) {
            return null;
        }

        // Get the expiration timestamp from localStorage first
        let expirationTimestamp = localStorage.getItem('dataExpiration');

        // Fallback to cookie for backward compatibility
        if (!expirationTimestamp) {
            expirationTimestamp = this.getCookie('dataExpiration');
        }

        if (expirationTimestamp) {
            const expirationDate = new Date(parseInt(expirationTimestamp));
            const now = new Date();
            const timeDiff = expirationDate.getTime() - now.getTime();
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            return Math.max(0, daysDiff);
        } else {
            // Fallback: assume it was set recently with default expiration
            return this.storageExpireDays;
        }
    }
}

// Export for use in other modules
window.SecureStorage = SecureStorage;
