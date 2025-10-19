/**
 * Dropdown Component - Reusable dropdown menu system
 * 
 * A flexible dropdown component that supports:
 * - Standard dropdown mode (entire button opens menu)
 * - Split-button mode (main button for default action, arrow for menu)
 * - Customizable items and callbacks
 * - Responsive design
 * - State management (selected items, unlocked states)
 * 
 * @author Austin Steil
 * @version 1.0.0
 * @license MIT <https://raw.githubusercontent.com/AustinSteil/generate-files-model/refs/heads/main/LICENSE>
 * @copyright 2025 Austin Steil
 * @created October 18, 2025
 * @updated October 18, 2025
 */

class Dropdown {
    /**
     * Create a dropdown instance
     * @param {HTMLElement} container - Container element for the dropdown
     * @param {Object} options - Configuration options
     * @param {Array} options.items - Array of dropdown items {text: string, value?: string, action?: string}
     * @param {string} options.defaultText - Default text to display (default: 'Select...')
     * @param {Function} options.onSelect - Callback when item is selected (item, index)
     * @param {Function} options.onDefaultAction - Callback for split-button default action
     * @param {boolean} options.splitButton - Enable split-button mode (default: false)
     * @param {boolean} options.required - Whether selection is required (default: false)
     * @param {string} options.label - Label for the dropdown (for form integration)
     * @param {string} options.name - Name attribute for form data
     * @param {string} options.id - ID for the dropdown
     */
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            items: [],
            defaultText: 'Select...',
            onSelect: () => {},
            onDefaultAction: null,
            splitButton: false,
            required: false,
            label: '',
            name: '',
            id: options.id || this.generateId(),
            ...options
        };
        this.isOpen = false;
        this.selectedIndex = -1; // Start with no selection
        this.isValid = true;
        this.init();
    }

    /**
     * Generate a unique ID for the dropdown
     */
    generateId() {
        return 'dropdown-' + Math.random().toString(36).substring(2, 11);
    }

    /**
     * Initialize the dropdown
     */
    init() {
        this.container.className = 'dropdown-container';

        if (this.options.splitButton) {
            this.createSplitButton();
        } else {
            this.createStandardDropdown();
        }

        this.setupEventListeners();
        // Don't auto-select first item for form dropdowns
        if (this.options.items.length > 0 && !this.options.required) {
            this.selectItem(0, false);
        }
    }

    /**
     * Create split-button mode dropdown
     */
    createSplitButton() {
        this.container.innerHTML = `
            <div class="dropdown-trigger split-button" type="button">
                <button class="dropdown-main-button" type="button">
                    <span class="dropdown-text">${this.options.defaultText}</span>
                </button>
                <button class="dropdown-arrow-button" type="button">
                    <span class="dropdown-arrow">▼</span>
                </button>
            </div>
            <div class="dropdown-menu" style="display: none;">
                ${this.options.items.map((item, index) =>
                    `<div class="dropdown-item" data-index="${index}">${item.text}</div>`
                ).join('')}
            </div>
        `;

        this.trigger = this.container.querySelector('.dropdown-trigger');
        this.mainButton = this.container.querySelector('.dropdown-main-button');
        this.arrowButton = this.container.querySelector('.dropdown-arrow-button');
        this.menu = this.container.querySelector('.dropdown-menu');
        this.text = this.container.querySelector('.dropdown-text');
        this.arrow = this.container.querySelector('.dropdown-arrow');
    }

    /**
     * Create standard dropdown mode
     */
    createStandardDropdown() {
        this.container.innerHTML = `
            <button class="dropdown-trigger" type="button">
                <span class="dropdown-text">${this.options.defaultText}</span>
                <span class="dropdown-arrow">▼</span>
            </button>
            <div class="dropdown-menu" style="display: none;">
                ${this.options.items.map((item, index) =>
                    `<div class="dropdown-item" data-index="${index}">${item.text}</div>`
                ).join('')}
            </div>
            <div class="dropdown-error" style="display: none;"></div>
        `;

        this.trigger = this.container.querySelector('.dropdown-trigger');
        this.menu = this.container.querySelector('.dropdown-menu');
        this.text = this.container.querySelector('.dropdown-text');
        this.arrow = this.container.querySelector('.dropdown-arrow');
        this.errorElement = this.container.querySelector('.dropdown-error');
    }

    /**
     * Set up event listeners
     */
    setupEventListeners() {
        if (this.options.splitButton) {
            // Split-button mode: main button triggers default action, arrow opens dropdown
            this.mainButton.addEventListener('click', (e) => {
                e.stopPropagation();
                if (this.options.onDefaultAction) {
                    this.options.onDefaultAction();
                }
            });

            this.arrowButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggle();
            });
        } else {
            // Standard dropdown mode: entire trigger opens dropdown
            this.trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggle();
            });
        }

        // Handle menu item clicks
        this.menu.addEventListener('click', (e) => {
            const item = e.target.closest('.dropdown-item');
            if (item) {
                const index = parseInt(item.getAttribute('data-index'));
                this.selectItem(index);
                this.close();
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            this.close();
        });
    }

    /**
     * Toggle dropdown open/closed
     */
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    /**
     * Open the dropdown
     */
    open() {
        this.isOpen = true;
        this.menu.style.display = 'block';
        this.arrow.textContent = '▲';
        this.container.classList.add('dropdown-open');

        // Call onOpen callback if provided
        if (this.options.onOpen) {
            this.options.onOpen();
        }
    }

    /**
     * Close the dropdown
     */
    close() {
        this.isOpen = false;
        this.menu.style.display = 'none';
        this.arrow.textContent = '▼';
        this.container.classList.remove('dropdown-open');

        // Call onClose callback if provided
        if (this.options.onClose) {
            this.options.onClose();
        }
    }

    /**
     * Select a dropdown item
     * @param {number} index - Index of item to select
     * @param {boolean} triggerCallback - Whether to trigger the onSelect callback
     */
    selectItem(index, triggerCallback = true) {
        if (index >= 0 && index < this.options.items.length) {
            this.selectedIndex = index;
            const item = this.options.items[index];
            this.text.textContent = item.text;

            // Add has-selection class for styling
            this.trigger.classList.add('has-selection');

            // Clear any error state since we now have a valid selection
            this.showError(null);

            // Update visual selection
            this.menu.querySelectorAll('.dropdown-item').forEach((el, i) => {
                el.classList.toggle('selected', i === index);
            });

            // Call selection callback only if explicitly requested
            if (triggerCallback) {
                this.options.onSelect(item, index);
            }
        }
    }

    /**
     * Update dropdown items
     * @param {Array} items - New array of items
     */
    updateItems(items) {
        this.options.items = items;
        this.menu.innerHTML = items.map((item, index) =>
            `<div class="dropdown-item" data-index="${index}">${item.text}</div>`
        ).join('');
        // Clear selection when updating items
        this.clearSelection();
    }

    /**
     * Get the currently selected item
     * @returns {Object} Selected item object
     */
    getSelectedItem() {
        return this.options.items[this.selectedIndex];
    }

    /**
     * Get the selected index
     * @returns {number} Selected index
     */
    getSelectedIndex() {
        return this.selectedIndex;
    }

    /**
     * Clear the current selection
     */
    clearSelection() {
        this.selectedIndex = -1;
        this.text.textContent = this.options.defaultText;
        this.trigger.classList.remove('has-selection');

        // Clear visual selection
        this.menu.querySelectorAll('.dropdown-item').forEach(el => {
            el.classList.remove('selected');
        });
    }

    /**
     * Get the selected value (for form integration)
     * @returns {string} Selected value or empty string
     */
    getValue() {
        if (this.selectedIndex >= 0 && this.selectedIndex < this.options.items.length) {
            const item = this.options.items[this.selectedIndex];
            return item.value || item.text || '';
        }
        return '';
    }

    /**
     * Set the selected value (for form integration)
     * @param {string} value - Value to select
     */
    setValue(value) {
        const index = this.options.items.findIndex(item =>
            (item.value && item.value === value) || item.text === value
        );
        if (index >= 0) {
            this.selectItem(index, false);
        }
    }

    /**
     * Validate the dropdown selection
     * @returns {boolean} True if valid
     */
    validate() {
        if (this.options.required && this.selectedIndex < 0) {
            this.isValid = false;
            this.showError('Please select an option');
            return false;
        }
        this.isValid = true;
        this.showError(null); // Clear any existing error
        return true;
    }

    /**
     * Show or hide error message
     * @param {string|null} message - Error message to show, or null to hide
     */
    showError(message) {
        if (!this.errorElement) return;

        if (message) {
            this.errorElement.textContent = message;
            this.errorElement.style.display = 'block';
            this.trigger.classList.add('error');
        } else {
            this.errorElement.style.display = 'none';
            this.trigger.classList.remove('error');
        }
    }

    /**
     * Get form data (for form integration)
     * @returns {Object} Form data object
     */
    getData() {
        const data = {};
        if (this.options.name) {
            data[this.options.name] = this.getValue();
        }
        return data;
    }

    /**
     * Set form data (for form integration)
     * @param {Object} data - Data object
     */
    setData(data) {
        if (this.options.name && data[this.options.name]) {
            this.setValue(data[this.options.name]);
        }
    }

    /**
     * Set unlocked state (for styling)
     * @param {boolean} unlocked - Whether the dropdown is in unlocked state
     */
    setUnlockedState(unlocked) {
        if (unlocked) {
            this.trigger.classList.add('unlocked');
        } else {
            this.trigger.classList.remove('unlocked');
        }
    }

    /**
     * Update the default text
     * @param {string} text - New default text
     */
    updateDefaultText(text) {
        this.options.defaultText = text;
        this.text.textContent = text;
    }

    /**
     * Destroy the dropdown and clean up event listeners
     */
    destroy() {
        // Remove event listeners
        if (this.options.splitButton) {
            this.mainButton?.removeEventListener('click', this.handleMainButtonClick);
            this.arrowButton?.removeEventListener('click', this.handleArrowButtonClick);
        } else {
            this.trigger?.removeEventListener('click', this.handleTriggerClick);
        }
        
        this.menu?.removeEventListener('click', this.handleMenuClick);
        
        // Clear container
        this.container.innerHTML = '';
        
        // Clear references
        this.trigger = null;
        this.mainButton = null;
        this.arrowButton = null;
        this.menu = null;
        this.text = null;
        this.arrow = null;
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Dropdown;
}

// Global availability
if (typeof window !== 'undefined') {
    window.Dropdown = Dropdown;
}
