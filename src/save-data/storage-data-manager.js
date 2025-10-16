/**
 * Storage Data Manager
 *
 * Handles all storage data operations for the Document Generator.
 * This includes saving, loading, and clearing form data, as well as
 * managing user authentication and form population.
 *
 * IMPORTANT: This manager uses src/fields/vars.json as the single source of truth.
 * It automatically adapts to changes in src/fields/vars.json without code modifications.
 * When you add/remove fields in src/fields/vars.json, the storage system automatically
 * handles them - no updates needed to this file!
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

        console.log('=== SAVE DATA DEBUG ===');
        console.log('Form data to save:', this.documentGenerator.formData);
        console.log('Jobs data:', this.documentGenerator.formData.jobsData);
        console.log('Physical demands:', this.documentGenerator.formData.physicalDemands);

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

            console.log('=== LOAD DATA DEBUG ===');
            console.log('Loaded form data:', formData);
            console.log('Jobs data:', formData?.jobsData);
            console.log('Physical demands:', formData?.physicalDemands);

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
                console.warn('loadFormData returned null - either no cookie or decryption failed');
                showWarning('No saved information found or incorrect passphrase.');
                return false;
            }
        } catch (error) {
            console.error('Load error (exception thrown):', error);
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
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
     * Uses the tabs manager to populate data instead of direct DOM manipulation
     * @param {Object} formData - Data to populate form with
     */
    populateForm(formData) {
        // Check if we have a tabs manager (new tab-based system)
        if (this.documentGenerator.tabsManager) {
            // Use the tabs manager to populate data
            // The formData structure should match what the tabs expect
            const tabData = {
                intro: {},
                demographics: {},
                jobs: {},
                summary: {}
            };

            // Handle jobs data structure - it can be stored as a nested object or flat
            if (formData.jobsData && typeof formData.jobsData === 'object') {
                // New format: jobs data is stored as a nested object
                tabData.jobs = formData.jobsData;
            } else if (formData.jobs && typeof formData.jobs === 'object') {
                // Alternative format: jobs is already structured
                tabData.jobs = formData.jobs;
            } else {
                // Build jobs data from individual demand fields
                tabData.jobs = {
                    physicalDemands: formData.physicalDemands || {},
                    mobilityDemands: formData.mobilityDemands || {},
                    cognitiveSensoryDemands: formData.cognitiveSensoryDemands || {},
                    environmentalDemands: formData.environmentalDemands || {},
                    liftingPushingPulling: formData.liftingPushingPulling || {},
                    classificationOfWork: formData.classificationOfWork || {}
                };
            }

            // Distribute the flat formData into tab-specific data
            const varsConfig = this.documentGenerator.varsConfig;
            Object.keys(varsConfig).forEach(fieldName => {
                if (formData.hasOwnProperty(fieldName)) {
                    // Map fields to appropriate tabs based on field names
                    if (['title', 'companyName', 'companyStreet', 'companyCity', 'companyState', 'companyZip', 'author', 'email', 'date', 'selectedTemplate', 'template'].includes(fieldName)) {
                        tabData.intro[fieldName] = formData[fieldName];
                    } else if (['jobTitle', 'jobPurpose', 'essentialFunctions', 'marginalFunctions', 'workSchedule', 'breaks', 'otherShiftInfo'].includes(fieldName)) {
                        tabData.demographics[fieldName] = formData[fieldName];
                    } else if (['documentContent'].includes(fieldName)) {
                        tabData.summary[fieldName] = formData[fieldName];
                    }
                    // Jobs-related fields are handled separately above
                }
            });

            // Set data in all tabs
            this.documentGenerator.tabsManager.setAllData(tabData);
        } else {
            // Fallback to old DOM-based approach for backward compatibility
            const varsConfig = this.documentGenerator.varsConfig;

            Object.keys(varsConfig).forEach(fieldName => {
                // Check if we have saved data for this field
                if (formData.hasOwnProperty(fieldName)) {
                    const element = document.getElementById(fieldName);
                    if (element) {
                        element.value = formData[fieldName];
                    } else {
                        console.warn(`Field "${fieldName}" defined in src/fields/vars.json but not found in form`);
                    }
                }
            });
        }

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
