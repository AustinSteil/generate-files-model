/**
 * Demand Level Selector Component
 *
 * A reusable comparison interface for selecting physical demand levels based on
 * U.S. Department of Labor Physical Demand Characteristics of Work.
 *
 * Features:
 * - Visual comparison of 5 demand levels (Sedentary to Very Heavy)
 * - Color-coded rows using the centralized color system (success → info → warning → error)
 * - Single-select mode with entire row clickable
 * - Weight, frequency, and energy requirement display
 * - Full dark/light mode support
 * - Validation support
 * - Keyboard navigation (Enter/Space to select)
 * - ARIA labels for accessibility
 *
 * Usage:
 * ```javascript
 * const selector = new DemandLevelSelector({
 *     containerId: 'demand-level-container',
 *     required: true,
 *     onChange: (level) => {
 *         // Handle level selection
 *     }
 * });
 * ```
 *
 * @author Austin Steil
 * @version 1.0.0
 * @license MIT <https://raw.githubusercontent.com/AustinSteil/generate-files-model/refs/heads/main/LICENSE>
 * @copyright 2025 Austin Steil
 * @created October 18, 2025
 * @updated October 18, 2025
 */

class DemandLevelSelector {
    /**
     * Create a new DemandLevelSelector instance
     * @param {Object} options - Configuration options
     * @param {string} options.containerId - ID of the container element (required)
     * @param {boolean} [options.required=true] - Whether selection is required for validation
     * @param {Function} [options.onChange] - Callback when selection changes
     * @param {Function} [options.onValidate] - Callback for validation events
     */
    constructor(options = {}) {
        this.options = {
            containerId: options.containerId || null,
            required: options.required !== undefined ? options.required : true,
            onChange: options.onChange || (() => {}),
            onValidate: options.onValidate || null
        };

        this.selectedLevel = null;
        this.container = null;
        this.rowElements = [];
        this.validationErrors = {};

        // Define demand levels based on DOL data
        // Color mapping: sedentary (success) → light (info) → medium (warning) → heavy/very-heavy (error)
        this.demandLevels = [
            {
                level: 'Sedentary',
                value: 'sedentary',
                occasional: '10 lbs',
                frequent: 'Negligible',
                constant: 'Negligible',
                mets: '1.5-2.1',
                color: 'sedentary'
            },
            {
                level: 'Light',
                value: 'light',
                occasional: '20 lbs',
                frequent: '10 lbs and/or walk/stand',
                constant: 'Negligible and/or operate controls',
                mets: '2.2-3.5',
                color: 'light'
            },
            {
                level: 'Medium',
                value: 'medium',
                occasional: '20-50 lbs',
                frequent: '10-25 lbs',
                constant: '10 lbs',
                mets: '3.6-6.3',
                color: 'medium'
            },
            {
                level: 'Heavy',
                value: 'heavy',
                occasional: '50-100 lbs',
                frequent: '25-50 lbs',
                constant: '10-20 lbs',
                mets: '6.4-7.5',
                color: 'heavy'
            },
            {
                level: 'Very Heavy',
                value: 'very_heavy',
                occasional: '> 100 lbs',
                frequent: '> 50 lbs',
                constant: '> 20 lbs',
                mets: '> 7.5',
                color: 'very-heavy'
            }
        ];

        this.init();
    }

    /**
     * Initialize the component
     * @private
     */
    init() {
        if (!this.options.containerId) {
            console.error('DemandLevelSelector requires a containerId');
            return;
        }

        this.container = document.getElementById(this.options.containerId);
        if (!this.container) {
            console.error(`Container with ID "${this.options.containerId}" not found`);
            return;
        }

        this.render();
    }

    /**
     * Render the component
     * Creates the full UI with title, description, and interactive table
     * @private
     */
    render() {
        // Clear container
        this.container.innerHTML = '';

        // Create wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'demand-level-selector-wrapper';

        // Add title and description
        wrapper.appendChild(this.createTitle());
        wrapper.appendChild(this.createDescription());

        // Create and populate table
        const table = this.createTable();
        wrapper.appendChild(table);

        this.container.appendChild(wrapper);
    }

    /**
     * Create the title element
     * @private
     * @returns {HTMLElement} Title element
     */
    createTitle() {
        const title = document.createElement('div');
        title.className = 'demand-level-title';
        title.textContent = '37.02 U.S. Department of Labor Physical Demand Characteristics of Work';
        return title;
    }

    /**
     * Create the description element
     * @private
     * @returns {HTMLElement} Description element
     */
    createDescription() {
        const description = document.createElement('div');
        description.className = 'demand-level-description';
        description.innerHTML = `
            <p>Select the physical demand level that best describes this job.
            Use the weight and frequency information to guide your selection.</p>
        `;
        return description;
    }

    /**
     * Create the table with header and data rows
     * @private
     * @returns {HTMLElement} Table element
     */
    createTable() {
        const table = document.createElement('div');
        table.className = 'demand-level-table';

        // Create header row
        table.appendChild(this.createHeaderRow());

        // Create data rows
        this.rowElements = [];
        this.demandLevels.forEach((level, index) => {
            table.appendChild(this.createDataRow(level, index));
        });

        return table;
    }

    /**
     * Create the header row
     * @private
     * @returns {HTMLElement} Header row element
     */
    createHeaderRow() {
        const headerRow = document.createElement('div');
        headerRow.className = 'demand-level-header-row';
        headerRow.innerHTML = `
            <div class="demand-level-header-cell demand-level-header-level">Level</div>
            <div class="demand-level-header-cell">Occasional (0-33%)</div>
            <div class="demand-level-header-cell">Frequent (34-66%)</div>
            <div class="demand-level-header-cell">Constant (67-100%)</div>
            <div class="demand-level-header-cell">Energy Required (METS)</div>
        `;
        return headerRow;
    }

    /**
     * Create a data row for a demand level
     * @private
     * @param {Object} level - Demand level data
     * @param {number} index - Row index
     * @returns {HTMLElement} Data row element
     */
    createDataRow(level, index) {
        const row = document.createElement('div');
        row.className = `demand-level-row demand-level-${level.color}`;
        row.setAttribute('data-level-value', level.value);
        row.setAttribute('data-level-index', index);
        row.setAttribute('tabindex', '0');
        row.setAttribute('role', 'button');
        row.setAttribute('aria-pressed', 'false');

        row.innerHTML = `
            <div class="demand-level-cell demand-level-level-name">${level.level}</div>
            <div class="demand-level-cell">${level.occasional}</div>
            <div class="demand-level-cell">${level.frequent}</div>
            <div class="demand-level-cell">${level.constant}</div>
            <div class="demand-level-cell">${level.mets}</div>
        `;

        // Add event listeners
        row.addEventListener('click', () => this.selectLevel(index));
        row.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.selectLevel(index);
            }
        });

        this.rowElements.push(row);
        return row;
    }

    /**
     * Select a demand level by index
     * Updates UI, clears validation errors, and triggers onChange callback
     * @private
     * @param {number} index - Index of the level to select
     */
    selectLevel(index) {
        // Clear all selections
        this.rowElements.forEach(row => {
            row.classList.remove('demand-level-selected');
            row.setAttribute('aria-pressed', 'false');
        });

        // Select the clicked row
        this.rowElements[index].classList.add('demand-level-selected');
        this.rowElements[index].setAttribute('aria-pressed', 'true');

        // Update selected level
        this.selectedLevel = this.demandLevels[index].value;

        // Clear validation errors
        this.validationErrors = {};
        this.clearValidationError();

        // Trigger change callback
        this.options.onChange(this.selectedLevel);
    }

    /**
     * Get the currently selected demand level value
     * @returns {string|null} Selected level value or null if nothing selected
     */
    getSelectedLevel() {
        return this.selectedLevel;
    }

    /**
     * Set the selected demand level by value
     * @param {string} levelValue - The value of the level to select (e.g., 'sedentary', 'light')
     */
    setSelectedLevel(levelValue) {
        const levelIndex = this.demandLevels.findIndex(l => l.value === levelValue);
        if (levelIndex >= 0) {
            this.selectLevel(levelIndex);
        }
    }

    /**
     * Validate the component
     * Checks if a level is selected when required
     * @returns {boolean} True if valid, false otherwise
     */
    validate() {
        this.validationErrors = {};

        if (this.options.required && !this.selectedLevel) {
            this.validationErrors['demand-level'] = 'Please select a demand level.';
            this.showValidationError();
            return false;
        }

        this.clearValidationError();
        return true;
    }

    /**
     * Show validation error by adding error class to table
     * @private
     */
    showValidationError() {
        const table = this.container.querySelector('.demand-level-table');
        if (table) {
            table.classList.add('demand-level-error');
        }
    }

    /**
     * Clear validation error by removing error class from table
     * @private
     */
    clearValidationError() {
        const table = this.container.querySelector('.demand-level-table');
        if (table) {
            table.classList.remove('demand-level-error');
        }
    }

    /**
     * Get validation errors
     * @returns {Object} Object containing validation errors
     */
    getValidationErrors() {
        return JSON.parse(JSON.stringify(this.validationErrors));
    }

    /**
     * Clear the current selection and validation errors
     */
    clear() {
        this.rowElements.forEach(row => {
            row.classList.remove('demand-level-selected');
            row.setAttribute('aria-pressed', 'false');
        });
        this.selectedLevel = null;
        this.validationErrors = {};
        this.clearValidationError();
    }

    /**
     * Destroy the component and clean up
     */
    destroy() {
        if (this.container) {
            this.container.innerHTML = '';
        }
        this.rowElements = [];
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DemandLevelSelector;
}

