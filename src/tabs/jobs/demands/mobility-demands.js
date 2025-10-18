/**
 * Mobility Demands Section
 *
 * Handles mobility demands data collection for job analysis.
 * Organizes body movements by anatomical region with grouped categories.
 *
 * @author Austin Steil
 * @version 1.0.0
 * @license MIT <https://raw.githubusercontent.com/AustinSteil/generate-files-model/refs/heads/main/LICENSE>
 * @copyright 2025 Austin Steil
 * @created October 18, 2025
 * @updated October 18, 2025
 */

class MobilityDemands {
    constructor() {
        this.table = null;
        this.containerId = 'mobility-demands-table-container';
    }

    /**
     * Render the mobility demands section
     * @returns {string} HTML content for mobility demands
     */
    render() {
        return `
            <div class="demands-section mobility-demands">
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
            console.warn(`Mobility demands container ${this.containerId} not found, will retry...`);
            return;
        }

        // Define row groups with category names and movements
        const rowGroups = [
            {
                category: 'Neck',
                rows: [0, 1, 2]
            },
            {
                category: 'Shoulder',
                rows: [3, 4, 5, 6]
            },
            {
                category: 'Elbow and Forearm',
                rows: [7, 8]
            },
            {
                category: 'Wrist and Fingers',
                rows: [9, 10, 11]
            },
            {
                category: 'Thorax and Upper Back',
                rows: [12, 13, 14]
            },
            {
                category: 'Lower Back and Abdomen',
                rows: [15, 16, 17]
            },
            {
                category: 'Hip and Upper Thigh',
                rows: [18, 19, 20]
            },
            {
                category: 'Knees and Lower Legs',
                rows: [21]
            },
            {
                category: 'Ankle, Foot, and Toes',
                rows: [22]
            }
        ];

        // Define all rows in order (indices correspond to rowGroups)
        const headerRows = [
            'Flexion/Extension',
            'Rotation',
            'Lateral Flexion/Extension',
            'Flexion/Extension',
            'Abduction/Adduction',
            'Internal/External Rotation',
            'Elevation/Depression',
            'Flexion/Extension',
            'Supination/Pronation',
            'Flexion/Extension',
            'Ulnar/Radial Deviation',
            'Gripping (Power or Pinch)',
            'Flexion/Extension',
            'Rotation',
            'Lateral Flexion/Extension',
            'Flexion/Extension',
            'Rotation',
            'Lateral Flexion/Extension',
            'Flexion/Extension',
            'Abduction/Adduction',
            'Internal/External Rotation',
            'Flexion/Extension',
            'Dorsiflexion/Plantarflexion'
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
            rowGroups: rowGroups,
            cellType: 'selectable',
            selectionMode: 'single',
            rowHeaderWidth: '200px',
            columnTypes: ['selectable', 'selectable', 'selectable', 'selectable', 'input'],
            columnWidths: ['auto', 'auto', 'auto', 'auto', 'auto'],
            striped: true,
            hoverable: true,
            showValidationErrors: true,
            onChange: (data) => {
                // Handle data changes if needed
            }
        });
    }

    /**
     * Get data from the mobility demands section
     * @returns {Object} Mobility demands data
     */
    getData() {
        if (!this.table) {
            console.warn('Mobility demands table not initialized yet, returning empty data');
            return {};
        }
        return this.table.getData();
    }

    /**
     * Set data for the mobility demands section
     * @param {Object} data - Mobility demands data
     */
    setData(data) {
        if (!data) return;

        if (!this.table) {
            console.warn('Mobility demands table not initialized yet, attempting to initialize...');
            this.init();
        }

        if (this.table) {
            this.table.setData(data);
        } else {
            console.error('Failed to initialize mobility demands table for setData');
        }
    }

    /**
     * Clear all data from the mobility demands section
     */
    clear() {
        if (this.table) {
            this.table.clear();
        }
    }

    /**
     * Validate mobility demands data
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
    module.exports = MobilityDemands;
}
