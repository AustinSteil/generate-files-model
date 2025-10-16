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
            headerColumns: ['Not Applicable', 'Occasional', 'Frequent', 'Constant'],
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
            striped: true,
            hoverable: true,
            onChange: (data) => {
                // Optional: Handle data changes
                console.log('Physical demands data changed:', data);
            }
        });

        console.log('Physical demands table initialized');
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
            console.log('Physical demands data set:', data);
        } else {
            console.error('Failed to initialize physical demands table for setData');
        }
    }

    /**
     * Validate physical demands data
     * @returns {boolean} True if validation passes
     */
    validate() {
        if (!this.table) {
            return false;
        }

        // Optional: Add custom validation logic
        // For example, ensure at least one selection per row
        const data = this.table.getData();
        for (let rowIndex in data) {
            const hasSelection = Object.values(data[rowIndex]).some(val => val === true);
            if (!hasSelection) {
                // At least one row has no selection
                // You can make this stricter if needed
            }
        }

        return true;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhysicalDemands;
}
