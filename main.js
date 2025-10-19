/**
 * Document Generator Application
 *
 * A web-based tool for generating PDF documents using jsPDF.
 * This application allows users to fill out a form and generate a PDF document
 * based on a selected template with dynamic data binding.
 *
 * Dependencies:
 * - jsPDF: For PDF document generation and rendering
 *
 * @author Austin Steil
 * @version 1.0.0
 * @license MIT <https://raw.githubusercontent.com/AustinSteil/generate-files-model/refs/heads/main/LICENSE>
 * @copyright 2025 Austin Steil
 * @created October 18, 2025
 * @updated October 18, 2025
 */

/**
 * Main DocumentGenerator class that handles the entire document generation workflow
 */
class DocumentGenerator {
    /**
     * Initialize the DocumentGenerator with default configuration
     */
    constructor() {
        this.formData = {}; // Stores user input from the form

        // varsConfig is the SINGLE SOURCE OF TRUTH for all document variables
        // It defines: which fields to collect, save, load, and map to templates
        // See src/fields/vars.json.README.md for detailed documentation
        this.varsConfig = {}; // Configuration mapping for template variables

        this.secureStorage = new SecureStorage(); // Secure storage instance
        this.storageUIManager = null; // Storage UI manager instance
        this.storageDataManager = null; // Storage data manager instance
        this.tabsManager = null; // Tabs manager instance

        this.init();
    }

    /**
     * Initialize the application by loading configuration and setting up event listeners
     */
    async init() {
        // Load variable configuration from vars.json
        await this.loadVarsConfig();

        // Initialize tabs manager
        this.initializeTabsManager();

        // Set up DOM event listeners
        this.setupEventListeners();

        // Initialize storage managers
        this.initializeStorageManagers();
    }

    /**
     * Load variable configuration from src/fields/vars.json file
     * Falls back to default configuration if file cannot be loaded
     */
    async loadVarsConfig() {
        try {
            const response = await fetch('src/fields/vars.json');
            this.varsConfig = await response.json();
            console.log('Loaded vars config:', this.varsConfig);
        } catch (error) {
            console.warn('Could not load src/fields/vars.json, using default configuration');
            this.varsConfig = this.getDefaultVarsConfig();
        }
    }

    /**
     * Get default variable configuration if src/fields/vars.json cannot be loaded
     * @returns {Object} Default variable mapping configuration
     */
    getDefaultVarsConfig() {
        return {
            "documentTitle": "{documentTitle}",
            "authorName": "{authorName}",
            "documentDate": "{documentDate}",
            "documentContent": "{documentContent}"
        };
    }

    /**
     * Initialize the tabs manager
     */
    initializeTabsManager() {
        if (typeof TabsManager !== 'undefined') {
            this.tabsManager = new TabsManager();
            this.tabsManager.init();
            console.log('Tabs manager initialized');
        } else {
            // Retry if TabsManager isn't loaded yet
            setTimeout(() => this.initializeTabsManager(), 100);
        }
    }

    /**
     * Set up all DOM event listeners for form interactions
     */
    setupEventListeners() {
        // Wait for the preview tab and its generate button to be created
        const setupGenerateButton = () => {
            // Try to access the preview tab through the tabs manager
            if (this.tabsManager && this.tabsManager.previewTab) {
                // Use the new method to set the button handler
                this.tabsManager.previewTab.setGenerateButtonHandler(() => {
                    this.generateDocument();
                });
                console.log('Generate button handler attached via Button component');
            } else {
                // Fallback to the old method if the new approach isn't available
                const generateBtn = document.getElementById('generateBtn');
                if (generateBtn) {
                    generateBtn.addEventListener('click', () => {
                        this.generateDocument();
                    });
                    console.log('Generate button event listener attached (fallback method)');
                } else {
                    // Retry if button isn't created yet
                    setTimeout(setupGenerateButton, 100);
                }
            }
        };

        setupGenerateButton();
    }

    /**
     * Initialize storage managers (UI and Data)
     */
    initializeStorageManagers() {
        // Initialize storage data manager
        if (typeof StorageDataManager !== 'undefined') {
            this.storageDataManager = new StorageDataManager(this);
        }

        // Initialize storage UI manager
        if (typeof StorageUIManager !== 'undefined') {
            this.storageUIManager = new StorageUIManager(this);
            this.storageUIManager.initialize();
        }

        // Retry if managers aren't loaded yet
        if (!this.storageDataManager || !this.storageUIManager) {
            setTimeout(() => this.initializeStorageManagers(), 100);
        }
    }

    /**
     * Refresh storage UI state (called after storage operations)
     */
    refreshStorageUI() {
        if (this.storageUIManager) {
            this.storageUIManager.refreshStorageUI();
        }
    }



    /**
     * Collect all form data and store it in this.formData
     * Gets data from tabs manager instead of form elements
     * @returns {Object} The collected form data
     */
    collectFormData() {
        if (!this.tabsManager) {
            console.error('Tabs manager not initialized');
            return {};
        }

        // Get all data from tabs
        const allTabData = this.tabsManager.getAllData();

        console.log('=== COLLECT FORM DATA DEBUG ===');
        console.log('All tab data:', allTabData);
        console.log('Jobs data from tabs:', allTabData.jobs);

        // Flatten the tab data structure into formData
        this.formData = {
            ...allTabData.intro,
            ...allTabData.demographics,
            ...allTabData.summary,
            // Store jobs data as a nested object for easy access
            jobsData: allTabData.jobs,
            // Also flatten individual demand sections for vars.json compatibility
            physicalDemands: allTabData.jobs?.physicalDemands || {},
            mobilityDemands: allTabData.jobs?.mobilityDemands || {},
            cognitiveSensoryDemands: allTabData.jobs?.cognitiveSensoryDemands || {},
            environmentalDemands: allTabData.jobs?.environmentalDemands || {},
            liftingPushingPulling: allTabData.jobs?.liftingPushingPulling || {},
            classificationOfWork: allTabData.jobs?.classificationOfWork || {}
        };

        console.log('Collected form data from tabs:', this.formData);
        console.log('Physical demands in formData:', this.formData.physicalDemands);
        console.log('Mobility demands in formData:', this.formData.mobilityDemands);
        console.log('Cognitive sensory demands in formData:', this.formData.cognitiveSensoryDemands);
        console.log('Environmental demands in formData:', this.formData.environmentalDemands);
        console.log('Lifting pushing pulling in formData:', this.formData.liftingPushingPulling);
        console.log('Classification of work in formData:', this.formData.classificationOfWork);
        return this.formData;
    }



    validateForm() {
        if (!this.tabsManager) {
            return false;
        }

        // Use tabs manager validation
        const validation = this.tabsManager.validateAll();
        return validation.isValid;
    }

    /**
     * Temporarily disable the generate button for a few seconds
     */
    temporarilyDisableButton() {
        const button = this.getGenerateButton();
        if (!button) return;

        // Disable for 3 seconds
        button.setDisabled(true);

        setTimeout(() => {
            button.setDisabled(false);
        }, 3000);
    }

    /**
     * Get the generate button (Button component or fallback)
     */
    getGenerateButton() {
        // Try Button component first
        if (this.tabsManager?.previewTab?.generateButton) {
            return this.tabsManager.previewTab.generateButton;
        }

        // Fallback to DOM element
        const domButton = document.getElementById('generateBtn');
        if (domButton) {
            return {
                setDisabled: (disabled) => { domButton.disabled = disabled; },
                setLoading: (loading) => {
                    domButton.disabled = loading;
                    domButton.textContent = loading ? 'Generating...' : 'Generate Document';
                },
                setText: (text) => { domButton.textContent = text; }
            };
        }

        return null;
    }

    async generateDocument() {
        if (!this.validateForm()) {
            showError('Please fill in all required fields');
            this.temporarilyDisableButton();
            return;
        }

        const button = this.getGenerateButton();

        // Set button to loading state
        if (button) {
            button.setLoading(true);
            button.setText('Generating...');
        }

        this.collectFormData();

        try {
            // Generate PDF using the selected template's generator
            const generatedPDF = await this.generatePDFWithTemplate();

            // Trigger download directly
            this.createDownloadLinkForPDF(generatedPDF);

            // Show success message
            showSuccess('PDF generated and download started successfully!');

        } catch (error) {
            console.error('Document generation failed:', error);
            showError(`Failed to generate document: ${error.message}`);
            this.temporarilyDisableButton();
        } finally {
            // Reset button to normal state
            if (button) {
                button.setLoading(false);
                button.setText('Generate Document');
            }
        }
    }

    /**
     * Generate PDF using the selected template's generator class
     */
    async generatePDFWithTemplate() {
        // Get the selected template
        const selectedTemplate = this.formData.selectedTemplate || this.formData.template;
        if (!selectedTemplate) {
            throw new Error('No template selected');
        }

        // Get the generator class name from the intro tab
        const templateClasses = this.tabsManager.introTab?.getSelectedTemplateClasses();
        if (!templateClasses || !templateClasses.generator) {
            throw new Error('Generator class not found for selected template');
        }

        // Get the generator class from window
        const GeneratorClass = window[templateClasses.generator];
        if (!GeneratorClass) {
            throw new Error(`Generator class ${templateClasses.generator} not found`);
        }

        // Create an instance of the generator
        const generator = new GeneratorClass();

        // Generate the PDF
        const doc = generator.generate(this.formData);

        // Return the PDF as a blob
        return doc.output('blob');
    }

    /**
     * Create a download link for the generated PDF and trigger download
     */
    createDownloadLinkForPDF(pdfBlob) {
        // Create a blob URL
        const blobUrl = URL.createObjectURL(pdfBlob);

        // Create a temporary link element
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `job-analysis-${new Date().getTime()}.pdf`;

        // Trigger the download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up the blob URL
        URL.revokeObjectURL(blobUrl);
    }



    // Removed old showAlert method - now using global alert component

    /**
     * Handle saving form data securely
     * @param {boolean} isUpdate - Whether this is an update to existing unlocked data
     */
    async handleSaveData(isUpdate = false) {
        if (this.storageDataManager) {
            return await this.storageDataManager.handleSaveData(isUpdate);
        } else {
            showError('Storage system not initialized. Please try again.');
            return false;
        }
    }

    /**
     * Handle loading saved form data
     */
    async handleLoadData() {
        if (this.storageDataManager) {
            return await this.storageDataManager.handleLoadData();
        } else {
            showError('Storage system not initialized. Please try again.');
            return false;
        }
    }

    /**
     * Handle clearing saved data
     */
    async handleClearData() {
        if (this.storageDataManager) {
            return await this.storageDataManager.handleClearData();
        } else {
            showError('Storage system not initialized. Please try again.');
            return false;
        }
    }


}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.documentGenerator = new DocumentGenerator();
});