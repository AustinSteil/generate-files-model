/**
 * Preview Tab
 *
 * Displays a preview of all collected data before document generation.
 * Dynamically generates and manages the preview tab content.
 *
 * @author Austin Steil
 * @version 1.0.0
 * @license MIT <https://raw.githubusercontent.com/AustinSteil/generate-files-model/refs/heads/main/LICENSE>
 * @copyright 2025 Austin Steil
 * @created October 18, 2025
 * @updated October 18, 2025
 */

class PreviewTab {
    constructor(containerId, tabsManager) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Preview tab container with ID "${containerId}" not found`);
            return;
        }
        this.tabsManager = tabsManager;
        this.render();
        this.init();
    }

    /**
     * Render the preview tab content
     */
    render() {
        this.container.innerHTML = `
            <div class="preview-content">
                <h2>Preview</h2>
                <p>This section will show a preview of all collected information before generating the document.</p>

                <div class="preview-section">
                    <h3>Cover Page</h3>
                    <div id="preview-intro" class="preview-data">
                        <p><em>No data entered yet</em></p>
                    </div>
                </div>

                <div class="preview-section">
                    <h3>Demographics</h3>
                    <div id="preview-demographics" class="preview-data">
                        <p><em>No data entered yet</em></p>
                    </div>
                </div>

                <div class="preview-section">
                    <h3>Employment History</h3>
                    <div id="preview-jobs" class="preview-data">
                        <p><em>No data entered yet</em></p>
                    </div>
                </div>

                <div class="preview-section">
                    <h3>Summary</h3>
                    <div id="preview-summary" class="preview-data">
                        <p><em>No data entered yet</em></p>
                    </div>
                </div>

                <div class="form-actions" id="generate-button-container">
                    <!-- Generate button will be created here by the Button component -->
                </div>
            </div>
        `;
    }

    init() {
        console.log('Preview tab initialized');
        this.createGenerateButton();
    }

    /**
     * Create the generate document button using the reusable Button component
     */
    createGenerateButton() {
        // Check if Button class is available
        if (typeof Button === 'undefined') {
            console.error('Button component not loaded. Make sure to include button.js');
            return;
        }

        // Create the generate button with success variant (green)
        this.generateButton = new Button({
            containerId: 'generate-button-container',
            id: 'generateBtn', // Keep the same ID for compatibility with main.js
            text: 'Generate Document',
            variant: 'success', // Green button instead of primary blue
            size: 'medium',
            onClick: (e, button) => {
                // The click handler will be set up by main.js
                // This is just a placeholder that will be overridden
                console.log('Generate button clicked - waiting for main.js to attach handler');
            }
        });

        console.log('Generate button created with Button component (success variant - green)');
    }

    /**
     * Set the click handler for the generate button
     * This method can be called by main.js to set the actual handler
     */
    setGenerateButtonHandler(handler) {
        if (this.generateButton && typeof handler === 'function') {
            this.generateButton.options.onClick = (e, button) => {
                handler(e, button);
            };
            console.log('Generate button handler updated');
        }
    }
    
    /**
     * Update the preview with current data from all tabs
     */
    updatePreview() {
        if (!this.tabsManager) {
            console.warn('Tabs manager not available for preview');
            return;
        }

        // Get data from all tabs
        const introData = this.tabsManager.introTab?.getData() || {};
        const demoData = this.tabsManager.demographicsTab?.getData() || {};
        const jobsData = this.tabsManager.jobsTab?.getData() || [];
        const summaryData = this.tabsManager.summaryTab?.getData() || {};

        // Update intro preview
        this.updateIntroPreview(introData);

        // Update demographics preview
        this.updateDemographicsPreview(demoData);

        // Update jobs preview
        this.updateJobsPreview(jobsData);

        // Update summary preview
        this.updateSummaryPreview(summaryData);
    }
    
    /**
     * Update intro section preview
     */
    updateIntroPreview(data) {
        const previewDiv = document.getElementById('preview-intro');
        if (!previewDiv) return;
        
        if (!data.title && !data.author) {
            previewDiv.innerHTML = '<p><em>No data entered yet</em></p>';
            return;
        }
        
        previewDiv.innerHTML = `
            ${data.title ? `<p><strong>Title:</strong> ${data.title}</p>` : ''}
            ${data.companyName ? `<p><strong>Company Name:</strong> ${data.companyName}</p>` : ''}
            ${data.author ? `<p><strong>Author:</strong> ${data.author}</p>` : ''}
            ${data.date ? `<p><strong>Date:</strong> ${data.date}</p>` : ''}
        `;
    }
    
    /**
     * Update demographics section preview
     */
    updateDemographicsPreview(data) {
        const previewDiv = document.getElementById('preview-demographics');
        if (!previewDiv) return;
        
        if (!data.name) {
            previewDiv.innerHTML = '<p><em>No data entered yet</em></p>';
            return;
        }
        
        previewDiv.innerHTML = `
            ${data.name ? `<p><strong>Name:</strong> ${data.name}</p>` : ''}
            ${data.age ? `<p><strong>Age:</strong> ${data.age}</p>` : ''}
            ${data.location ? `<p><strong>Location:</strong> ${data.location}</p>` : ''}
        `;
    }
    
    /**
     * Update jobs section preview
     */
    updateJobsPreview(jobs) {
        const previewDiv = document.getElementById('preview-jobs');
        if (!previewDiv) return;
        
        if (!jobs || jobs.length === 0) {
            previewDiv.innerHTML = '<p><em>No data entered yet</em></p>';
            return;
        }
        
        let html = '';
        jobs.forEach((job, index) => {
            html += `
                <div class="job-preview-item">
                    <h4>Job ${index + 1}</h4>
                    ${job.title ? `<p><strong>Title:</strong> ${job.title}</p>` : ''}
                    ${job.company ? `<p><strong>Company:</strong> ${job.company}</p>` : ''}
                    ${job.duration ? `<p><strong>Duration:</strong> ${job.duration}</p>` : ''}
                    ${job.description ? `<p><strong>Description:</strong> ${job.description}</p>` : ''}
                </div>
            `;
        });
        
        previewDiv.innerHTML = html;
    }
    
    /**
     * Update summary section preview
     */
    updateSummaryPreview(data) {
        const previewDiv = document.getElementById('preview-summary');
        if (!previewDiv) return;
        
        if (!data.text && !data.keywords) {
            previewDiv.innerHTML = '<p><em>No data entered yet</em></p>';
            return;
        }
        
        previewDiv.innerHTML = `
            ${data.text ? `<p><strong>Summary:</strong> ${data.text}</p>` : ''}
            ${data.keywords ? `<p><strong>Keywords:</strong> ${data.keywords}</p>` : ''}
        `;
    }
    
    /**
     * Get all data for document generation
     * @returns {Object} All collected data
     */
    getData() {
        return {
            intro: this.tabsManager.introTab?.getData() || {},
            demographics: this.tabsManager.demographicsTab?.getData() || {},
            jobs: this.tabsManager.jobsTab?.getData() || [],
            summary: this.tabsManager.summaryTab?.getData() || {}
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PreviewTab;
}

