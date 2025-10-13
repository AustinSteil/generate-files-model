/**
 * Summary Tab
 *
 * Handles summary and additional information collection.
 * Dynamically generates and manages the summary tab content.
 *
 * @author Austin Steil
 */

class SummaryTab {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Summary tab container with ID "${containerId}" not found`);
            return;
        }
        this.render();
        this.init();
    }

    /**
     * Render the summary tab content
     */
    render() {
        this.container.innerHTML = `
            <div class="summary-content">
                <h2>Summary</h2>
                <p>This section will provide a summary or additional information.</p>

                <div class="form-group">
                    <label for="summary-text">Summary:</label>
                    <textarea id="summary-text" rows="8" placeholder="Enter a summary or additional notes"></textarea>
                </div>

                <div class="form-group">
                    <label for="summary-keywords">Keywords:</label>
                    <input type="text" id="summary-keywords" placeholder="Enter keywords separated by commas">
                </div>

                <!-- Next button container -->
                <div class="form-actions-right">
                    <div id="summary-next-button-container"></div>
                </div>
            </div>
        `;
    }

    init() {
        console.log('Summary tab initialized');
        // Add any summary-specific initialization here
    }

    /**
     * Get data from the summary tab
     * @returns {Object} Summary tab data
     */
    getData() {
        return {
            text: document.getElementById('summary-text')?.value || '',
            keywords: document.getElementById('summary-keywords')?.value || ''
        };
    }

    /**
     * Set data in the summary tab
     * @param {Object} data - Data to populate the form
     */
    setData(data) {
        if (data.text) document.getElementById('summary-text').value = data.text;
        if (data.keywords) document.getElementById('summary-keywords').value = data.keywords;
    }

    /**
     * Validate summary tab data
     * @returns {boolean} True if valid (summary is optional)
     */
    validate() {
        return true; // Summary is optional
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SummaryTab;
}

