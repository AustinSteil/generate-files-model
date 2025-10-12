/**
 * Floating Storage Button Component
 *
 * A specialized floating button component for storage operations that provides:
 * - Single button mode for initial save operations
 * - Dropdown mode for load/update/clear operations
 * - State-aware UI that adapts based on stored data availability
 *
 * Dependencies:
 * - dropdown.js (Dropdown component)
 *
 * @author Austin Steil
 * @version 1.0.0
 */

/**
 * Floating Storage Button Component
 */
class FloatingStorageButton {
    constructor(documentGenerator) {
        this.documentGenerator = documentGenerator;
        this.hasStoredData = false;
        this.isUnlocked = false; // Track if user has successfully unlocked data
        this.dropdown = null;
        this.init();
    }

    init() {
        this.createButton();
        this.updateButtonState();
    }

    createButton() {
        // Create floating button container
        this.container = document.createElement('div');
        this.container.className = 'floating-storage-button';
        this.container.innerHTML = `
            <div class="storage-button-content">
                <button class="storage-btn" type="button">
                    <span class="storage-icon">💾</span>
                    <span class="storage-text">Remember Info</span>
                </button>
            </div>
        `;

        document.body.appendChild(this.container);

        this.button = this.container.querySelector('.storage-btn');
        this.icon = this.container.querySelector('.storage-icon');
        this.text = this.container.querySelector('.storage-text');
        this.content = this.container.querySelector('.storage-button-content');
    }

    updateButtonState() {
        this.hasStoredData = this.documentGenerator.storageDataManager ?
            this.documentGenerator.storageDataManager.hasStoredData() :
            this.documentGenerator.secureStorage.hasStoredData();

        if (this.hasStoredData) {
            this.createDropdownMode();
        } else {
            this.createSingleButtonMode();
            this.isUnlocked = false; // Reset unlocked state when no data
        }
    }

    createSingleButtonMode() {
        // Remove dropdown if it exists
        if (this.dropdown) {
            this.dropdown = null;
        }

        // Reset to single button
        this.content.innerHTML = `
            <button class="storage-btn single-mode" type="button">
                <span class="storage-icon">💾</span>
                <span class="storage-text">Save for Later</span>
            </button>
        `;

        this.button = this.content.querySelector('.storage-btn');

        // Add click handler
        this.button.addEventListener('click', () => {
            this.documentGenerator.handleSaveData();
        });
    }

    createDropdownMode() {
        this.content.innerHTML = '<div class="storage-dropdown"></div>';
        const dropdownContainer = this.content.querySelector('.storage-dropdown');

        // Create different dropdown items based on unlocked state - always just 2 options
        const dropdownItems = this.isUnlocked ? [
            // When unlocked (user has successfully loaded data)
            { text: '💾 Update Data', action: 'save' },
            { text: '🗑️ Clear Saved Data', action: 'clear' }
        ] : [
            // When locked (user hasn't loaded data yet)
            { text: '📥 Load Saved Data', action: 'load' },
            { text: '🗑️ Clear Saved Data', action: 'clear' }
        ];

        // Determine default action based on unlocked state
        const defaultAction = this.isUnlocked ? '💾 Update Data' : '📥 Load Saved Data';
        const defaultIndex = 0; // Always default to first option

        this.dropdown = new Dropdown(dropdownContainer, {
            items: dropdownItems,
            defaultText: defaultAction,
            splitButton: true, // Enable split-button mode
            onDefaultAction: () => {
                // Handle the default action when main button is clicked
                const defaultItem = dropdownItems[defaultIndex];
                switch (defaultItem.action) {
                    case 'load':
                        this.documentGenerator.handleLoadData();
                        break;
                    case 'save':
                        // This only happens when unlocked - updates the existing save with the same passphrase
                        this.documentGenerator.handleSaveData(true);
                        break;
                    case 'clear':
                        this.documentGenerator.handleClearData();
                        break;
                }
            },
            onSelect: (item) => {
                switch (item.action) {
                    case 'load':
                        this.documentGenerator.handleLoadData();
                        break;
                    case 'save':
                        // This only happens when unlocked - updates the existing save with the same passphrase
                        this.documentGenerator.handleSaveData(true);
                        break;
                    case 'clear':
                        this.documentGenerator.handleClearData();
                        break;
                }
            }
        });

        // Set the correct default selection without triggering the callback
        this.dropdown.selectItem(defaultIndex, false);

        // Apply unlocked styling if data is unlocked
        const trigger = dropdownContainer.querySelector('.dropdown-trigger');
        const mainButton = dropdownContainer.querySelector('.dropdown-main-button');
        const arrowButton = dropdownContainer.querySelector('.dropdown-arrow-button');

        if (this.isUnlocked) {
            trigger.classList.add('unlocked');
        } else {
            trigger.classList.remove('unlocked');
        }

    }

    refresh() {
        this.updateButtonState();
    }

    /**
     * Mark data as unlocked (user successfully entered correct passphrase)
     */
    markAsUnlocked() {
        this.isUnlocked = true;
        // Force refresh the stored data status first
        this.hasStoredData = this.documentGenerator.storageDataManager ?
            this.documentGenerator.storageDataManager.hasStoredData() :
            this.documentGenerator.secureStorage.hasStoredData();

        // Then create dropdown mode with unlocked state
        if (this.hasStoredData) {
            this.createDropdownMode();
        }
    }

    /**
     * Reset unlocked state (when data is cleared or new data is saved)
     */
    resetUnlockedState() {
        this.isUnlocked = false;
        this.updateButtonState();
    }
}


