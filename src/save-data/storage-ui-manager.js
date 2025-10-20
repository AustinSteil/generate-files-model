/**
 * Storage UI Manager
 * 
 * Handles all storage-related UI interactions and user prompts for the Document Generator.
 * This includes managing the floating storage button, checking for saved data on load,
 * and displaying user-friendly alerts and modals for storage operations.
 * 
 * @author Austin Steil
 * @version 1.0.0
 * @license MIT <https://raw.githubusercontent.com/AustinSteil/generate-files-model/refs/heads/main/LICENSE>
 * @copyright 2025 Austin Steil
 * @created October 18, 2025
 * @updated October 18, 2025
 */

class StorageUIManager {
    /**
     * Initialize the Storage UI Manager
     * @param {DocumentGenerator} documentGenerator - Reference to the main document generator instance
     */
    constructor(documentGenerator) {
        this.documentGenerator = documentGenerator;
        this.floatingButton = null;
        this.secureStorage = documentGenerator.secureStorage;
    }

    /**
     * Initialize all storage UI components
     */
    async initialize() {
        // Initialize floating storage button
        this.initializeFloatingButton();
        
        // Check for saved data and prompt user
        this.checkForSavedDataOnLoad();
    }

    /**
     * Initialize floating storage button
     */
    initializeFloatingButton() {
        // Wait for components to be loaded
        if (typeof FloatingStorageButton !== 'undefined') {
            this.floatingButton = new FloatingStorageButton(this.documentGenerator);
        } else {
            // Retry after a short delay if components aren't loaded yet
            setTimeout(() => this.initializeFloatingButton(), 100);
        }
    }

    /**
     * Refresh floating button state (called after storage operations)
     */
    refreshStorageUI() {
        if (this.floatingButton) {
            this.floatingButton.refresh();
        }
    }

    /**
     * Check for saved data on page load and prompt user to load it
     */
    async checkForSavedDataOnLoad() {
        // Wait a moment for all components to initialize
        setTimeout(async () => {
            const hasStoredData = this.documentGenerator.storageDataManager ?
                this.documentGenerator.storageDataManager.hasStoredData() :
                this.secureStorage.hasStoredData();

            if (hasStoredData) {
                // Check if data has expired before showing the modal
                const remainingDays = this.documentGenerator.storageDataManager ?
                    this.documentGenerator.storageDataManager.getRemainingDays() :
                    this.secureStorage.getRemainingDays();

                // If data is expired (0 or negative days), automatically clear it
                if (remainingDays !== null && remainingDays <= 0) {
                    this.secureStorage.clearStoredData();
                    if (this.floatingButton) {
                        this.floatingButton.resetUnlockedState();
                    }
                    return; // Don't show the modal, data is cleared
                }

                // Data is still valid, show the modal
                const shouldLoad = await this.showSavedDataAlert();
                if (shouldLoad) {
                    // Automatically trigger load data flow
                    this.documentGenerator.handleLoadData();
                }
            }
        }, 500); // Small delay to ensure UI is ready
    }

    /**
     * Show alert about found saved data and ask user if they want to load it
     * @returns {Promise<boolean>} True if user wants to load data
     */
    async showSavedDataAlert() {
        // Get expiration days
        const expirationDays = this.documentGenerator.storageDataManager ?
            (this.documentGenerator.storageDataManager.getRemainingDays() || this.documentGenerator.storageDataManager.getExpirationDays()) :
            (this.secureStorage.getRemainingDays() || this.secureStorage.getExpirationDays());

        // Create content with benefits
        const content = `
            <p>Saved data will expire in ${expirationDays} days.</p>
            <div class="alert-benefits" style="background: var(--gradient-info-subtle); padding: var(--spacing-lg); border-radius: var(--radius-md); margin: var(--spacing-lg) 0; border-left: 4px solid var(--color-info-border);">
                <div class="benefit-item" style="display: flex; align-items: center; gap: var(--spacing-md); margin-bottom: var(--spacing-md);">
                    <span class="benefit-icon" style="font-size: 1.2rem; width: 20px; text-align: center;">⚡</span>
                    <span>Quick access to your saved data</span>
                </div>
                <div class="benefit-item" style="display: flex; align-items: center; gap: var(--spacing-md); margin-bottom: var(--spacing-md);">
                    <span class="benefit-icon" style="font-size: 1.2rem; width: 20px; text-align: center;">🔐</span>
                    <span>Your information is encrypted and secure</span>
                </div>
                <div class="benefit-item" style="display: flex; align-items: center; gap: var(--spacing-md);">
                    <span class="benefit-icon" style="font-size: 1.2rem; width: 20px; text-align: center;">✏️</span>
                    <span>Continue where you left off</span>
                </div>
            </div>
        `;

        // Create modal with reusable Modal component
        const modal = new Modal({
            title: 'Previous Session Data Discovered',
            content: content,
            size: 'medium',
            buttons: [
                {
                    text: 'Close',
                    action: 'dismiss',
                    variant: 'secondary'
                },
                {
                    text: 'Clear Data',
                    action: 'clear',
                    variant: 'warning',
                    handler: async (modal) => {
                        // Call the clear data function
                        await this.documentGenerator.handleClearData();
                        return true; // Allow modal to close
                    }
                },
                {
                    text: 'Load Data',
                    action: 'load',
                    variant: 'primary'
                }
            ]
        });

        const result = await modal.show();

        // Return true only if user chose to load data
        return result === 'load';
    }

    /**
     * Handle floating button state updates after storage operations
     * This method is called by the DocumentGenerator after save/load/clear operations
     * @param {string} operation - The operation that was performed ('save', 'load', 'clear')
     * @param {boolean} success - Whether the operation was successful
     */
    handleStorageOperation(operation, success) {
        if (!success) return;

        switch (operation) {
            case 'save':
                // Reset unlocked state since this is new encryption with potentially new passphrase
                if (this.floatingButton) {
                    this.floatingButton.resetUnlockedState();
                } else {
                    this.refreshStorageUI();
                }
                break;

            case 'save_and_unlock':
                // Mark as unlocked since user just entered passphrase for new save
                if (this.floatingButton) {
                    this.floatingButton.markAsUnlocked();
                }
                break;

            case 'update':
                // Keep unlocked state since we're using the same passphrase for updates
                // Just refresh the UI to ensure consistency
                this.refreshStorageUI();
                break;

            case 'load':
                // Mark as unlocked since user entered correct passphrase
                if (this.floatingButton) {
                    this.floatingButton.markAsUnlocked();
                }
                break;

            case 'clear':
                // Reset unlocked state when data is cleared
                if (this.floatingButton) {
                    this.floatingButton.resetUnlockedState();
                } else {
                    this.refreshStorageUI();
                }
                break;
        }
    }

    /**
     * Get reference to the floating button instance
     * @returns {FloatingStorageButton|null} The floating button instance
     */
    getFloatingButton() {
        return this.floatingButton;
    }
}
