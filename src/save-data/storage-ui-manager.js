/**
 * Storage UI Manager
 * 
 * Handles all storage-related UI interactions and user prompts for the Document Generator.
 * This includes managing the floating storage button, checking for saved data on load,
 * and displaying user-friendly alerts and modals for storage operations.
 * 
 * @author Austin Steil
 * @version 1.0.0
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
        return new Promise((resolve) => {
            // Create custom alert modal
            const alertModal = document.createElement('div');
            alertModal.className = 'modal saved-data-alert';
            alertModal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Previous Session Data Discovered</h3>
                    </div>
                    <div class="modal-body">
                        <p>Saved data will expire in ${this.documentGenerator.storageDataManager ?
                            (this.documentGenerator.storageDataManager.getRemainingDays() || this.documentGenerator.storageDataManager.getExpirationDays()) :
                            (this.secureStorage.getRemainingDays() || this.secureStorage.getExpirationDays())} days.</p>
                            <div class="alert-benefits">
                            <div class="benefit-item">
                                <span class="benefit-icon">⚡</span>
                                <span>Quick access to your saved data</span>
                            </div>
                            <div class="benefit-item">
                                <span class="benefit-icon">🔐</span>
                                <span>Your information is encrypted and secure</span>
                            </div>
                            <div class="benefit-item">
                                <span class="benefit-icon">✏️</span>
                                <span>Continue where you left off</span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="alertDismiss">Close</button>
                        <button type="button" class="btn btn-warning" id="alertClear">Clear Data</button>
                        <button type="button" class="btn btn-primary" id="alertLoad">Load Data</button>
                    </div>
                </div>
            `;

            document.body.appendChild(alertModal);

            // Show modal
            alertModal.style.display = 'block';
            document.body.style.overflow = 'hidden';

            // Handle button clicks
            const loadBtn = alertModal.querySelector('#alertLoad');
            const dismissBtn = alertModal.querySelector('#alertDismiss');
            const clearBtn = alertModal.querySelector('#alertClear');

            const cleanup = () => {
                alertModal.remove();
                document.body.style.overflow = '';
            };

            loadBtn.addEventListener('click', () => {
                cleanup();
                resolve(true);
            });

            dismissBtn.addEventListener('click', () => {
                cleanup();
                resolve(false);
            });

            clearBtn.addEventListener('click', async () => {
                cleanup();
                // Call the clear data function
                await this.documentGenerator.handleClearData();
                resolve(false); // Don't load data after clearing
            });

            // Close on outside click
            alertModal.addEventListener('click', (e) => {
                if (e.target === alertModal) {
                    cleanup();
                    resolve(false);
                }
            });

            // Handle Escape key
            const handleKeyPress = (e) => {
                if (e.key === 'Escape') {
                    cleanup();
                    resolve(false);
                    document.removeEventListener('keydown', handleKeyPress);
                }
            };
            document.addEventListener('keydown', handleKeyPress);
        });
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
