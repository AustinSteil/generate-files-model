/**
 * Cognitive and Sensory Demands Section
 *
 * Handles cognitive and sensory demands data collection for job analysis.
 * Organizes sensory and cognitive requirements by category with grouped rows.
 * Each row has a "Required" checkbox column and a "Comments" text input column.
 *
 * @author Austin Steil
 * @version 1.0.0
 * @license MIT <https://raw.githubusercontent.com/AustinSteil/generate-files-model/refs/heads/main/LICENSE>
 * @copyright 2025 Austin Steil
 * @created October 18, 2025
 * @updated October 18, 2025
 */

class CognitiveSensoryDemands {
    constructor() {
        this.table = null;
        this.containerId = 'cognitive-sensory-demands-table-container';
    }

    /**
     * Render the cognitive and sensory demands section
     * @returns {string} HTML content for cognitive and sensory demands
     */
    render() {
        return `
            <div class="demands-section cognitive-sensory-demands">
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
            console.warn(`Cognitive and sensory demands container ${this.containerId} not found, will retry...`);
            return;
        }

// Define row groups with category names and sensory/cognitive items
const rowGroups = [
    {
        category: 'Vision',
        rows: [0, 1, 2, 3, 4, 5]
    },
    {
        category: 'Hearing',
        rows: [6, 7, 8]
    },
    {
        category: 'Senses',
        rows: [9, 10, 11, 12, 13]
    },
    {
        category: 'Cognitive',
        rows: [14, 15, 16, 17, 18, 19]
    },
    {
        category: 'Psychosocial',
        rows: [20, 21, 22]
    }
];

// Define all rows in order (indices correspond to rowGroups)
const headerRows = [
    // Vision (0-5)
    'Near Vision',  // For detailed work like reading screens or inspecting small parts, including microscopy and microsurgery
    'Far Vision',  // For tasks like driving or monitoring distant objects, including night vision and thermal imaging
    'Peripheral Vision',  // For awareness of surroundings in dynamic environments, including binocular vision and peripheral vision
    'Depth Perception',  // For judging distances in operating equipment
    'Color Vision',  // For distinguishing colors in wiring, signals, or materials
    'Perceive Safety/Emergency Indicators',  // For detecting lights, signs, hazards, alarms, or flashes
    // Hearing (6-8)
    'Distinguish Sounds or Tones',  // Distinguishing sounds like tones or voices in noisy settings
    'Verbal or Electronic Communication',  // Speaking/hearing in direct interactions or via devices like radios/phones
    'Perceive Safety/Emergency Indicators',  // For detecting sirens, beeps, or alerts
    // Senses (9-13)
    'Tactile Sense (Touch)',  // Perceiving texture, temperature, pressure, or vibrations from tools/machinery
    'Olfactory Sense (Smell)',  // Detecting odors for gas leaks or spoilage
    'Gustatory Sense (Taste)',  // Tasting for quality control in food or materials
    'Vestibular Sense (Balance)',  // Maintaining equilibrium on uneven surfaces
    'Kinesthetic Sense (Proprioception)',  // Awareness of body position in manual tasks
    // Cognitive (14-19)
    'Memory (Short or Long Term)',  // Remembering instructions, sequences, or information
    'Multitasking',  // Handling concurrent duties, including attention and concentration, mental endurance, and mental flexibility
    'Decision Making and Reasoning',  // Analyzing issues, logical thinking, and strategy development
    'Simple Math',  // Performing basic calculations
    'Time Management',  // Meeting deadlines or working at a required pace
    'Literacy (Reading/Writing)',  // Comprehending and producing written content
    // Psychosocial (20-22)
    'Work Independently',  // Self-managing without constant oversight, including remotely
    'Work with a Team',  // Collaborating with others
    'Supervision of Others',  // Directing or managing team members
];

        this.table = new Table({
            containerId: this.containerId,
            headerColumns: [
                { lines: ['Required'] },
                { lines: ['Objective Measurements & General Comments'] }  
            ],
            headerRows: headerRows,
            rowGroups: rowGroups,
            cellType: 'selectable', // Default cell type
            columnTypes: ['selectable', 'input'], // Per-column configuration: checkbox, then input
            rowHeaderWidth: '250px', // Row header width for sensory/cognitive items
            columnWidths: ['100px', 'auto'], // Required column narrow, Comments column takes remaining space
            selectionMode: 'multiple',
            striped: true,
            hoverable: true,
            showValidationErrors: false, // No validation - this section is optional
            onChange: (data) => {
                // Handle data changes if needed
            }
        });
    }

    /**
     * Get data from the cognitive and sensory demands section
     * @returns {Object} Cognitive and sensory demands data
     */
    getData() {
        if (!this.table) {
            console.warn('Cognitive and sensory demands table not initialized yet, returning empty data');
            return {};
        }
        return this.table.getData();
    }

    /**
     * Set data for the cognitive and sensory demands section
     * @param {Object} data - Cognitive and sensory demands data
     */
    setData(data) {
        if (!data) return;

        if (!this.table) {
            console.warn('Cognitive and sensory demands table not initialized yet, attempting to initialize...');
            this.init();
        }

        if (this.table) {
            this.table.setData(data);
        } else {
            console.error('Failed to initialize cognitive and sensory demands table for setData');
        }
    }

    /**
     * Clear all data from the cognitive and sensory demands section
     */
    clear() {
        if (this.table) {
            this.table.clear();
        }
    }

    /**
     * Validate cognitive and sensory demands data
     * This section is optional, so validation always passes
     * @returns {boolean} Always returns true since this section is optional
     */
    validate() {
        return true;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CognitiveSensoryDemands;
}


