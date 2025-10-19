/**
 * Summary Tab
 *
 * Handles summary and additional information collection.
 * Dynamically generates and manages the summary tab content.
 * Uses AreaInput component with rich text editor for summary field.
 *
 * @author Austin Steil
 * @version 1.0.0
 * @license MIT <https://raw.githubusercontent.com/AustinSteil/generate-files-model/refs/heads/main/LICENSE>
 * @copyright 2025 Austin Steil
 * @created October 18, 2025
 * @updated October 18, 2025
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
            id: 'summaryText',
            name: 'summaryText',
            label: 'Summary',
            placeholder: 'Enter a summary or additional notes...',
            useRichText: true,
            resize: 'vertical',
            minHeight: '250px',
            maxHeight: '600px',
            required: true,
            minLength: 10,
            maxLength: 5000,
            showCharCounter: true,
            validation: (value) => {
                if (!value || value.trim().length === 0) {
                    return 'Summary is required';
                }
                if (value.length < 10) {
                    return 'Summary must be at least 10 characters';
                }
                if (value.length > 5000) {
                    return 'Summary cannot exceed 5,000 characters';
                }
                return true;
            },
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
            summaryText: this.summaryInput ? this.summaryInput.getValue() : ''
        };
    }

    /**
     * Set data in the summary tab
     * @param {Object} data - Data to populate the form
     */
    setData(data) {
        if (data.summaryText && this.summaryInput) {
            this.summaryInput.setValue(data.summaryText);
        }
    }

    /**
     * Validate summary tab data
     * @returns {boolean} True if valid (summary is required with 10-5000 chars)
     */
    validate() {
        if (!this.summaryInput) {
            return false;
        }

        // Use the component's validateInput method which displays error messages
        return this.summaryInput.validateInput();
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

