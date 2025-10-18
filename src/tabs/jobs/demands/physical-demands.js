/**
 * Physical Demands Section
 *
 * Handles physical demands data collection for job analysis.
 * Uses the reusable Table component for frequency selection.
 *
 * @author Austin Steil
 */

class PhysicalDemands {
    constructor() {
        this.table = null;
        this.containerId = 'physical-demands-table-container';
    }

    /**
     * Render the physical demands section
     * @returns {string} HTML content for physical demands
     */
    render() {
        return `
            <div class="demands-section physical-demands">
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
            console.warn(`Physical demands container ${this.containerId} not found, will retry...`);
            return;
        }

        this.table = new Table({
            containerId: this.containerId,
            headerColumns: [
                { lines: ['Not Applicable', '0%'] },
                { lines: ['Occasional', '1-33%'] },
                { lines: ['Frequent', '34-66%'] },
                { lines: ['Constant', '67-100%'] }, 
                { lines: ['Objective Measurements', '& General Comments'] }
            ],         
            headerRows: [
                'Awkward position',
                'Bending over',
                'Carrying',
                'Driving',
                'Fine motor tasks',
                'Gripping or grasping',
                'Handling',
                'Kneeling',
                'Lifting',
                'Lifting overhead',
                'Pulling',
                'Pushing',
                'Reaching',
                'Sitting',
                'Squatting or crouching',
                'Standing',
                'Talking and hearing',
                'Twisting or turning',
                'Walking'
            ],
            cellType: 'selectable',
            selectionMode: 'single',
            rowHeaderWidth: '200px',
            columnWidths: ['auto', 'auto', 'auto', 'auto', 'auto'],
            columnTypes: ['selectable', 'selectable', 'selectable', 'selectable', 'input'],
            striped: true,
            hoverable: true,
            showValidationErrors: true
        });
    }

    /**
     * Get data from the physical demands section
     * @returns {Object} Physical demands data
     */
    getData() {
        if (!this.table) {
            console.warn('Physical demands table not initialized yet, returning empty data');
            return {};
        }
        return this.table.getData();
    }

    /**
     * Set data for the physical demands section
     * @param {Object} data - Physical demands data
     */
    setData(data) {
        if (!data) return;

        if (!this.table) {
            console.warn('Physical demands table not initialized yet, attempting to initialize...');
            this.init();
        }

        if (this.table) {
            this.table.setData(data);
        } else {
            console.error('Failed to initialize physical demands table for setData');
        }
    }

    /**
     * Validate physical demands data
     * Uses the table component's built-in validation system
     * @returns {boolean} True if validation passes
     */
    validate() {
        if (!this.table) {
            return false;
        }

        // Use the table's built-in validation
        // This ensures each row has at least one selection
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
    module.exports = PhysicalDemands;
}
