/**
 * Classification of Work Section
 *
 * Handles classification of work data collection for job analysis.
 * Includes overall physical demand level selection using the DemandLevelSelector component.
 *
 * @author Austin Steil
 * @version 1.0.0
 * @license MIT <https://raw.githubusercontent.com/AustinSteil/generate-files-model/refs/heads/main/LICENSE>
 * @copyright 2025 Austin Steil
 * @created October 18, 2025
 * @updated October 18, 2025
 */

class ClassificationOfWork {
    constructor() {
        this.demandLevelSelector = null;
        this.containerId = 'classification-of-work-container';
    }

    /**
     * Render the classification of work section
     * @returns {string} HTML content for classification of work
     */
    render() {
        return `
            <div id="${this.containerId}" class="classification-of-work-section">
                <div id="demand-level-selector-container"></div>
            </div>
        `;
    }

    /**
     * Initialize the classification of work section
     */
    init() {
        // Wait for DemandLevelSelector component to be available
        if (typeof DemandLevelSelector === 'undefined') {
            setTimeout(() => this.init(), 100);
            return;
        }

        this.demandLevelSelector = new DemandLevelSelector({
            containerId: 'demand-level-selector-container',
            required: true,
            onChange: (selectedLevel) => {
            }
        });
    }

    /**
     * Get classification of work data
     * @returns {Object} Current classification data
     */
    getData() {
        return {
            physicalLevel: this.demandLevelSelector ? this.demandLevelSelector.getSelectedLevel() : null
        };
    }

    /**
     * Set classification of work data
     * @param {Object} data - Data to populate the section
     */
    setData(data) {
        if (!data || !this.demandLevelSelector) return;

        if (data.physicalLevel) {
            this.demandLevelSelector.setSelectedLevel(data.physicalLevel);
        }
    }

    /**
     * Validate the classification of work section
     * @returns {boolean} True if validation passes
     */
    validate() {
        if (!this.demandLevelSelector) return false;
        return this.demandLevelSelector.validate();
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ClassificationOfWork;
}
