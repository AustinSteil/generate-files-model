/**
 * Preview Tab - PDF Preview and Generation
 *
 * Displays a live HTML preview of the PDF document that will be generated.
 * Shows what the final PDF will look like before the user generates it.
 * Includes the generate button to create and download the PDF.
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
        this.generateButton = null;
        this.render();
        this.init();
    }

    /**
     * Render the preview tab content
     */
    render() {
        this.container.innerHTML = `
            <div class="preview-content">
                <div class="preview-header">
                    <h2>PDF Preview</h2>
                    <p class="preview-subtitle">This is a preview of your PDF document. Review it below, then click "Generate Document" to download.</p>
                </div>

                <!-- PDF Preview Container -->
                <div id="pdf-preview-container" class="pdf-preview-section">
                    <p class="empty-state">Loading preview...</p>
                </div>

                <!-- Generate Button -->
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
            id: 'generateBtn',
            text: 'Generate Document',
            variant: 'success',
            size: 'medium',
            onClick: (_, __) => {
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
            this.generateButton.options.onClick = (_, __) => {
                handler(_, __);
            };
            console.log('Generate button handler updated');
        }
    }

    /**
     * Render the PDF preview using the selected template's preview class
     * This shows an HTML representation of what the PDF will look like
     */
    renderPDFPreview() {
        console.log('=== renderPDFPreview() called ===');

        if (!this.tabsManager) {
            console.error('❌ Tabs manager not available for PDF preview');
            return;
        }
        console.log('✅ Tabs manager available');

        // Get the selected template's preview class
        const templateClasses = this.tabsManager.introTab?.getSelectedTemplateClasses();
        console.log('Template classes:', templateClasses);

        if (!templateClasses || !templateClasses.preview) {
            console.error('❌ No preview class available for selected template');
            console.log('templateClasses:', templateClasses);
            return;
        }
        console.log('✅ Preview class name found:', templateClasses.preview);

        // Get the preview class from window
        const PreviewClass = window[templateClasses.preview];
        console.log('PreviewClass from window:', PreviewClass);

        if (!PreviewClass) {
            console.error(`❌ Preview class ${templateClasses.preview} not found in window`);
            console.log('Available window classes:', Object.keys(window).filter(key => key.includes('Preview')));
            return;
        }
        console.log('✅ Preview class found in window');

        // Collect all form data
        const allData = this.collectAllFormData();
        console.log('Collected form data:', allData);

        // Generate the preview HTML
        try {
            console.log('Calling PreviewClass.generate()...');
            const previewHTML = PreviewClass.generate(allData);
            console.log('✅ Preview HTML generated, length:', previewHTML.length);

            // Get the preview container
            const previewContainer = document.getElementById('pdf-preview-container');
            if (previewContainer) {
                previewContainer.innerHTML = previewHTML;
                console.log('✅ PDF preview rendered successfully');
            } else {
                console.error('❌ Preview container not found');
            }
        } catch (error) {
            console.error('❌ Error rendering PDF preview:', error);
            console.error('Error stack:', error.stack);
            const previewContainer = document.getElementById('pdf-preview-container');
            if (previewContainer) {
                previewContainer.innerHTML = `<p class="error-state">Error rendering preview: ${error.message}</p>`;
            }
        }
    }

    /**
     * Collect all form data from all tabs
     * @returns {Object} Combined form data
     */
    collectAllFormData() {
        console.log('=== collectAllFormData() called ===');
        const allData = {};

        if (this.tabsManager.introTab) {
            const introData = this.tabsManager.introTab.getData();
            console.log('Intro data:', introData);
            Object.assign(allData, introData);
        } else {
            console.warn('⚠️ Intro tab not available');
        }

        if (this.tabsManager.demographicsTab) {
            const demoData = this.tabsManager.demographicsTab.getData();
            console.log('Demographics data:', demoData);
            Object.assign(allData, demoData);
        } else {
            console.warn('⚠️ Demographics tab not available');
        }

        if (this.tabsManager.jobsTab) {
            const jobsData = this.tabsManager.jobsTab.getData();
            console.log('Jobs data:', jobsData);
            Object.assign(allData, jobsData);
        } else {
            console.warn('⚠️ Jobs tab not available');
        }

        if (this.tabsManager.summaryTab) {
            const summaryData = this.tabsManager.summaryTab.getData();
            console.log('Summary data:', summaryData);
            Object.assign(allData, summaryData);
        } else {
            console.warn('⚠️ Summary tab not available');
        }

        console.log('Final combined data:', allData);
        return allData;
    }

    /**
     * Update the preview with current data from all tabs
     */
    updatePreview() {
        if (!this.tabsManager) {
            console.warn('Tabs manager not available for preview');
            return;
        }

        // Render the PDF preview using the selected template's preview class
        this.renderPDFPreview();
    }
}
