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
 */

class Dropdown {
    /**
     * Create a dropdown instance
     * @param {HTMLElement} container - Container element for the dropdown
     * @param {Object} options - Configuration options
     * @param {Array} options.items - Array of dropdown items {text: string, action?: string}
     * @param {string} options.defaultText - Default text to display (default: 'Select...')
     * @param {Function} options.onSelect - Callback when item is selected (item, index)
     * @param {Function} options.onDefaultAction - Callback for split-button default action
     * @param {boolean} options.splitButton - Enable split-button mode (default: false)
     */
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            items: [],
            defaultText: 'Select...',
            onSelect: () => {},
            onDefaultAction: null,
            splitButton: false,
            ...options
        };
        this.isOpen = false;
        this.selectedIndex = 0;
        this.init();
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
        this.selectItem(0, false); // Select first item by default without triggering callback
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
        `;

        this.trigger = this.container.querySelector('.dropdown-trigger');
        this.menu = this.container.querySelector('.dropdown-menu');
        this.text = this.container.querySelector('.dropdown-text');
        this.arrow = this.container.querySelector('.dropdown-arrow');
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
    }

    /**
     * Close the dropdown
     */
    close() {
        this.isOpen = false;
        this.menu.style.display = 'none';
        this.arrow.textContent = '▼';
        this.container.classList.remove('dropdown-open');
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
        this.selectItem(0, false); // Don't trigger callback when updating items
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
