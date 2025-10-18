/**
 * Environmental Demands Section
 *
 * Handles environmental demands data collection for job analysis.
 * Captures exposure to various environmental hazards and conditions including
 * wet surfaces, machinery, heights, chemicals, temperatures, noise, vibration,
 * electrical hazards, radiation, lighting, confined spaces, and biological hazards.
 *
 * @author Austin Steil
 * @version 1.0.0
 * @license MIT <https://raw.githubusercontent.com/AustinSteil/generate-files-model/refs/heads/main/LICENSE>
 * @copyright 2025 Austin Steil
 * @created October 18, 2025
 * @updated October 18, 2025
 */

class EnvironmentalDemands {
    constructor() {
        this.table = null;
        this.containerId = 'environmental-demands-table-container';
    }

    /**
     * Render the environmental demands section
     * @returns {string} HTML content for environmental demands
     */
    render() {
        return `
            <div class="demands-section environmental-demands">
                <div id="${this.containerId}"></div>
            </div>
        `;
    }

    /**
     * Initialize the table component after render
     * Call this after the HTML has been inserted into the DOM
     */
    init() {
        // Ensure container exists before initializing
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.warn(`Environmental demands container ${this.containerId} not found, will retry...`);
            return;
        }

        // Define all environmental hazard rows
        const headerRows = [
            'Wet, humid, or slippery surfaces',
            'Proximity to moving mechanical parts or machinery',
            'Working at heights',
            'Fumes, odors, dust, or airborne particles',
            'Hazardous chemicals (toxic or caustic)',
            'Extreme temperatures (hot or cold, weather-related or non-weather)',
            'High noise levels requiring hearing protection',
            'Hand-arm vibration (e.g., from power tools)',
            'Whole-body vibration (e.g., from vehicles or platforms)',
            'Electrical hazards',
            'Radiation exposure (ionizing or non-ionizing)',
            'Poor lighting or illumination',
            'Confined spaces',
            'Biological hazards (e.g., pathogens or allergens)'
        ];

        this.table = new Table({
            containerId: this.containerId,
            headerColumns: [
                { lines: ['Not Applicable', '0%'] },
                { lines: ['Occasional', '1-33%'] },
                { lines: ['Frequent', '34-66%'] },
                { lines: ['Constant', '67-100%'] },
                { lines: ['Objective Measurements', '& General Comments'] }
            ],
            headerRows: headerRows,
            cellType: 'selectable',
            selectionMode: 'single',
            rowHeaderWidth: '200px',
            columnWidths: ['auto', 'auto', 'auto', 'auto', 'auto'],
            columnTypes: ['selectable', 'selectable', 'selectable', 'selectable', 'input'],
            striped: true,
            hoverable: true,
            showValidationErrors: true,
            onChange: (data) => {
                // Handle data changes if needed
            }
        });
    }

    /**
     * Get data from the environmental demands section
     * @returns {Object} Environmental demands data
     */
    getData() {
        if (!this.table) {
            console.warn('Environmental demands table not initialized yet, returning empty data');
            return {};
        }
        return this.table.getData();
    }

    /**
     * Set data for the environmental demands section
     * @param {Object} data - Environmental demands data
     */
    setData(data) {
        if (!data) return;

        if (!this.table) {
            console.warn('Environmental demands table not initialized yet, attempting to initialize...');
            this.init();
        }

        if (this.table) {
            this.table.setData(data);
        } else {
            console.error('Failed to initialize environmental demands table for setData');
        }
    }

    /**
     * Clear all data from the environmental demands section
     */
    clear() {
        if (this.table) {
            this.table.clear();
        }
    }

    /**
     * Validate environmental demands data
     * Ensures each row has at least one selection
     * @returns {boolean} True if validation passes
     */
    validate() {
        if (!this.table) {
            return false;
        }
        return this.table.validate();
    }

    /**
     * Get validation errors from the table
     * @returns {Object} Object containing validation errors
     */
    getValidationErrors() {
        if (!this.table) {
            return {};
        }
        return this.table.getValidationErrors();
    }

    /**
     * Clear validation errors from the table
     */
    clearValidationErrors() {
        if (this.table) {
            this.table.clearValidationErrors();
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EnvironmentalDemands;
}
