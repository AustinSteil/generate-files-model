/**
 * Lifting, Pushing, and Pulling Demands Section
 *
 * Handles lifting, pushing, and pulling demands data collection for job analysis.
 * Includes fields for weight requirements and frequency of these activities.
 *
 * @author Austin Steil
 * @version 1.0.0
 * @license MIT <https://raw.githubusercontent.com/AustinSteil/generate-files-model/refs/heads/main/LICENSE>
 * @copyright 2025 Austin Steil
 * @created October 18, 2025
 * @updated October 18, 2025
 */

class LiftingPushingPulling {
    constructor() {
        this.table = null;
        this.containerId = 'lifting-pushing-pulling-table-container';
    }

    /**
     * Render the lifting, pushing, and pulling demands section
     * @returns {string} HTML content for lifting, pushing, and pulling demands
     */
    render() {
        return `
            <div class="demands-section lifting-pushing-pulling-demands">
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
            console.warn(`Lifting, pushing, and pulling demands container ${this.containerId} not found, will retry...`);
            return;
        }

        // Define all weight rows
        const headerRows = [
            'Less than 5 lbs',
            '5-25 lbs',
            '26-50 lbs',
            '51-100 lbs',
            'Over 100 lbs'
        ];

        this.table = new Table({
            containerId: this.containerId,
            headerColumns: [
                { lines: ['N/A', 'or None'] },
                { lines: ['Occasional', '1-33%', '<12 reps/hour'] },
                { lines: ['Frequent', '34-66%', '12-60 reps/hour'] },
                { lines: ['Constant', '67-100%', '>60 reps/hour'] },
                { lines: ['Objective Measurements', '& General Comments'] }
            ],
            headerRows: headerRows,
            cellType: 'selectable',
            selectionMode: 'single',
            rowHeaderWidth: 'auto',
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
     * Get data from the lifting, pushing, and pulling demands section
     * @returns {Object} Lifting, pushing, and pulling demands data
     */
    getData() {
        if (!this.table) {
            console.warn('Lifting, pushing, and pulling demands table not initialized yet, returning empty data');
            return {};
        }
        return this.table.getData();
    }

    /**
     * Set data for the lifting, pushing, and pulling demands section
     * @param {Object} data - Lifting, pushing, and pulling demands data
     */
    setData(data) {
        if (!data) return;

        if (!this.table) {
            console.warn('Lifting, pushing, and pulling demands table not initialized yet, attempting to initialize...');
            this.init();
        }

        if (this.table) {
            this.table.setData(data);
        } else {
            console.error('Failed to initialize lifting, pushing, and pulling demands table for setData');
        }
    }

    /**
     * Clear all data from the lifting, pushing, and pulling demands section
     */
    clear() {
        if (this.table) {
            this.table.clear();
        }
    }

    /**
     * Validate lifting, pushing, and pulling demands data
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
    module.exports = LiftingPushingPulling;
}
