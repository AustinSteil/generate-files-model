/**
 * Summary Tab
 *
 * Handles summary and additional information collection.
 * Dynamically generates and manages the summary tab content.
 * Uses AreaInput component with rich text editor for summary field.
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

        // Component references
        this.summaryInput = null;

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

                <!-- Summary rich text area -->
                <div id="summary-text-container"></div>

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

        // Initialize rich text editor for summary
        this.summaryInput = new AreaInput({
            containerId: 'summary-text-container',
            id: 'summary-text',
            name: 'text',
            label: 'Summary',
            placeholder: 'Enter a summary or additional notes...',
            useRichText: true,
            resize: 'vertical',
            minHeight: '250px',
            maxHeight: '600px',
            required: false,
            quillConfig: {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline'],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        ['link'],
                        ['clean']
                    ]
                },
                placeholder: 'Enter a summary or additional notes...'
            }
        });
    }

    /**
     * Get data from the summary tab
     * @returns {Object} Summary tab data
     */
    getData() {
        return {
            text: this.summaryInput ? this.summaryInput.getValue() : '',
            keywords: document.getElementById('summary-keywords')?.value || ''
        };
    }

    /**
     * Set data in the summary tab
     * @param {Object} data - Data to populate the form
     */
    setData(data) {
        if (data.text && this.summaryInput) {
            this.summaryInput.setValue(data.text);
        }
        if (data.keywords) {
            document.getElementById('summary-keywords').value = data.keywords;
        }
    }

    /**
     * Validate summary tab data
     * @returns {boolean} True if valid (summary is optional)
     */
    validate() {
        // Summary is optional, so always return true
        return true;
    }

    /**
     * Destroy the summary tab and clean up resources
     */
    destroy() {
        if (this.summaryInput) {
            this.summaryInput.destroy();
            this.summaryInput = null;
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SummaryTab;
}

