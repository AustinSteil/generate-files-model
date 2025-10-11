/**
 * Storage Data Manager
 * 
 * Handles all storage data operations for the Document Generator.
 * This includes saving, loading, and clearing form data, as well as
 * managing user authentication and form population.
 * 
 * @author Austin Steil
 * @version 1.0.0
 */

class StorageDataManager {
    /**
     * Initialize the Storage Data Manager
     * @param {DocumentGenerator} documentGenerator - Reference to the main document generator instance
     */
    constructor(documentGenerator) {
        this.documentGenerator = documentGenerator;
        this.secureStorage = documentGenerator.secureStorage;
        this.sessionPassphrase = null; // Temporarily store passphrase in memory for updates
    }

    /**
     * Handle saving form data securely
     * @param {boolean} isUpdate - Whether this is an update to existing unlocked data
     * @returns {Promise<boolean>} Success status of the save operation
     */
    async handleSaveData(isUpdate = false) {
        // Collect current form data
        this.documentGenerator.collectFormData();

        if (Object.keys(this.documentGenerator.formData).length === 0) {
            showError('Please fill in some information before saving');
            return false;
        }

        let userPhrase;

        if (isUpdate && this.sessionPassphrase) {
            // Use the stored passphrase for updates
            userPhrase = this.sessionPassphrase;
        } else {
            // Prompt for new passphrase
            userPhrase = await this.promptForPhrase('save');
            if (!userPhrase) return false;

            // Store the passphrase for potential updates during this session
            this.sessionPassphrase = userPhrase;
        }

        try {
            const success = await this.secureStorage.saveFormData(this.documentGenerator.formData, userPhrase);
            if (success) {
                const expirationDays = this.secureStorage.getExpirationDays();
                const message = isUpdate
                    ? `Data updated successfully! Your changes have been saved. Saved data will expire in ${expirationDays} days.`
                    : `Information saved securely! Use the same phrase to load it later. Saved data will expire in ${expirationDays} days.`;

                showSuccess(message, { duration: 8 });

                // Handle UI state based on operation type
                if (this.documentGenerator.storageUIManager) {
                    if (isUpdate) {
                        // For updates, keep the unlocked state
                        this.documentGenerator.storageUIManager.handleStorageOperation('update', true);
                    } else {
                        // For new saves, mark as unlocked since user just entered passphrase
                        this.documentGenerator.storageUIManager.handleStorageOperation('save_and_unlock', true);
                    }
                }
                return true;
            } else {
                showError('Failed to save information. Please try again.');
                return false;
            }
        } catch (error) {
            console.error('Save error:', error);
            showError('Failed to save information. Please try again.');
            return false;
        }
    }

    /**
     * Handle loading saved form data
     * @returns {Promise<boolean>} Success status of the load operation
     */
    async handleLoadData() {
        const userPhrase = await this.promptForPhrase('load');
        if (!userPhrase) return false;

        try {
            const formData = await this.secureStorage.loadFormData(userPhrase);
            if (formData) {
                this.populateForm(formData);
                showSuccess('Information loaded successfully!');

                // Store the passphrase for potential updates during this session
                this.sessionPassphrase = userPhrase;

                // Notify storage UI manager about successful load operation
                if (this.documentGenerator.storageUIManager) {
                    this.documentGenerator.storageUIManager.handleStorageOperation('load', true);
                }
                return true;
            } else {
                showWarning('No saved information found.');
                return false;
            }
        } catch (error) {
            console.error('Load error:', error);
            showError('Failed to load information. Please check your phrase and try again.');
            return false;
        }
    }

    /**
     * Handle clearing saved data
     * @returns {Promise<boolean>} Success status of the clear operation
     */
    async handleClearData() {
        const confirmed = confirm('Are you sure you want to clear all saved information? This cannot be undone.');
        if (confirmed) {
            this.secureStorage.clearStoredData();

            // Clear the session passphrase
            this.sessionPassphrase = null;

            // Notify storage UI manager about successful clear operation
            if (this.documentGenerator.storageUIManager) {
                this.documentGenerator.storageUIManager.handleStorageOperation('clear', true);
            }

            showSuccess('Saved information cleared successfully.');
            return true;
        }
        return false;
    }

    /**
     * Prompt user for encryption phrase using the dedicated modal component
     * @param {string} action - 'save' or 'load'
     * @returns {Promise<string|null>} User phrase or null if cancelled
     */
    async promptForPhrase(action) {
        // Use the global phrase modal instance
        if (window.phraseModal) {
            return await window.phraseModal.show(action);
        } else {
            // Fallback to basic prompt if modal isn't available
            const expirationDays = this.secureStorage.getExpirationDays();
            const expirationText = action === 'save' ? ` Saved data will expire in ${expirationDays} days.` : '';
            const phrase = prompt(
                `Enter a phrase to ${action} your information securely:\n\n` +
                `This phrase will be used to encrypt your data. ` +
                `${action === 'save' ? 'Remember this phrase - you\'ll need it to load your information later!' : 'Use the same phrase you used when saving.'}${expirationText}\n\n` +
                `Tip: Use a memorable phrase that's at least 4 characters long.`
            );

            if (!phrase) {
                return null;
            }

            if (phrase.length < 4) {
                showError('Please use a phrase that\'s at least 4 characters long for better security.');
                return null;
            }

            return phrase;
        }
    }

    /**
     * Populate form with loaded data
     * @param {Object} formData - Data to populate form with
     */
    populateForm(formData) {
        Object.entries(formData).forEach(([key, value]) => {
            const element = document.getElementById(key);
            if (element) {
                element.value = value;
            }
        });

        // Trigger validation after populating
        this.documentGenerator.validateForm();
    }

    /**
     * Check if there is stored data available
     * @returns {boolean} True if stored data exists
     */
    hasStoredData() {
        return this.secureStorage.hasStoredData();
    }

    /**
     * Get the number of days until stored data expires
     * @returns {number|null} Days remaining or null if no data
     */
    getRemainingDays() {
        return this.secureStorage.getRemainingDays();
    }

    /**
     * Get the default expiration days for new data
     * @returns {number} Default expiration days
     */
    getExpirationDays() {
        return this.secureStorage.getExpirationDays();
    }
}
