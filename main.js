/**
 * Document Generator Application
 *
 * A web-based tool for generating Word documents using docxtemplater and PizZip.
 * This application allows users to fill out a form and generate a Word document
 * based on a predefined template with placeholder variables.
 *
 * Dependencies:
 * - docxtemplater: For template processing and variable replacement
 * - PizZip: For handling ZIP file operations (DOCX files are ZIP archives)
 *
 * @author Austin Steil
 * @version 1.0.0
 * @license MIT
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
        // See fields/vars.json.README.md for detailed documentation
        this.varsConfig = {}; // Configuration mapping for template variables

        this.templatePath = 'templates/word/template_1.docx'; // Default template file path
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
        // Check if required libraries are available
        console.log('PizZip available:', typeof window.PizZip);
        console.log('docxtemplater available:', typeof window.docxtemplater);

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
     * Load variable configuration from fields/vars.json file
     * Falls back to default configuration if file cannot be loaded
     */
    async loadVarsConfig() {
        try {
            const response = await fetch('fields/vars.json');
            this.varsConfig = await response.json();
            console.log('Loaded vars config:', this.varsConfig);
        } catch (error) {
            console.warn('Could not load fields/vars.json, using default configuration');
            this.varsConfig = this.getDefaultVarsConfig();
        }
    }

    /**
     * Get default variable configuration if fields/vars.json cannot be loaded
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

        // Set the template path based on selected template
        this.setTemplateFromSelection();

        try {
            // Generate document using docxtemplater
            const generatedDoc = await this.generateDocumentWithTemplate();

            // Trigger download directly
            this.createDownloadLinkForDoc(generatedDoc);

            // Show success message
            showSuccess('Document generated and download started successfully!');

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
     * Set the template path based on the selected template from the intro tab
     */
    setTemplateFromSelection() {
        // Get the selected template from form data
        const selectedTemplate = this.formData.selectedTemplate || this.formData.template;

        if (selectedTemplate) {
            this.templatePath = `templates/word/${selectedTemplate}.docx`;
            console.log('Using template:', this.templatePath);
        } else {
            console.warn('No template selected, using default template');
            this.templatePath = 'templates/word/template_1.docx';
        }
    }

    async generateDocumentWithTemplate() {
        // Check if libraries are loaded
        if (!window.PizZip || !window.docxtemplater) {
            throw new Error('Required libraries (PizZip or docxtemplater) are not loaded');
        }

        // Load the template file from the server
        const templateBuffer = await this.loadTemplateFromPath(this.templatePath);

        // Create a PizZip instance with the template
        const zip = new window.PizZip(templateBuffer);

        // Create docxtemplater instance
        const doc = new window.docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        // Prepare data for template replacement
        const templateData = this.prepareTemplateData();

        try {
            // Render the document (replace placeholders with actual data)
            doc.render(templateData);
        } catch (error) {
            console.error('Template rendering error:', error);
            throw new Error(`Template error: ${error.message}`);
        }

        // Generate the document as a buffer
        const generatedBuffer = doc.getZip().generate({
            type: 'arraybuffer',
            compression: 'DEFLATE',
        });

        return generatedBuffer;
    }

    async loadTemplateFromPath(templatePath) {
        try {
            const response = await fetch(templatePath);
            if (!response.ok) {
                throw new Error(`Failed to load template: ${response.status} ${response.statusText}`);
            }
            return await response.arrayBuffer();
        } catch (error) {
            throw new Error(`Template loading error: ${error.message}`);
        }
    }



    prepareTemplateData() {
        // Map form data to template variables using varsConfig
        const templateData = {};

        Object.entries(this.formData).forEach(([key, value]) => {
            // Remove the curly braces from the variable name in varsConfig
            const templateKey = this.varsConfig[key] ?
                this.varsConfig[key].replace(/[{}]/g, '') : key;

            // Handle nested objects (like workSchedule) by flattening them
            if (key === 'workSchedule' && value && typeof value === 'object' && !Array.isArray(value)) {
                // Flatten workSchedule object for easier template access
                templateData.weeklyHours = value.weeklyHours || 0;
                templateData.shiftLength = value.shiftLength || 0;
                templateData.shiftsPerWeek = value.shiftsPerWeek || 0;
                // Also keep the original nested structure for advanced templates
                templateData[templateKey] = value;
            } else if (key === 'jobsData' && value && typeof value === 'object') {
                // Handle jobs data - convert table data to readable format for templates
                templateData[templateKey] = value;

                // Process physical demands table data into readable format
                if (value.physicalDemands) {
                    templateData.physicalDemandsFormatted = this.formatTableDataForTemplate(
                        value.physicalDemands,
                        ['Not Applicable', 'Occasional', 'Frequent', 'Constant'],
                        [
                            'Awkward position', 'Bending over', 'Carrying', 'Driving',
                            'Fine motor tasks', 'Gripping or grasping', 'Handling', 'Kneeling',
                            'Lifting', 'Lifting overhead', 'Pulling', 'Pushing', 'Reaching',
                            'Sitting', 'Squatting or crouching', 'Standing', 'Talking and hearing',
                            'Twisting or turning', 'Walking'
                        ]
                    );
                }
            } else if (['physicalDemands', 'mobilityDemands', 'cognitiveSensoryDemands',
                        'environmentalDemands', 'liftingPushingPulling', 'classificationOfWork'].includes(key)) {
                // Handle individual demand sections
                templateData[templateKey] = value;
            } else {
                // For arrays and simple values, pass them directly
                templateData[templateKey] = value;
            }
        });

        // Add some additional useful data
        templateData.generatedDate = new Date().toLocaleDateString();
        templateData.generatedTime = new Date().toLocaleTimeString();

        console.log('Template data prepared:', templateData);
        return templateData;
    }

    /**
     * Format table data into a readable structure for Word templates
     * @param {Object} tableData - Raw table data (row/column indices with boolean values)
     * @param {Array} columnHeaders - Column header labels
     * @param {Array} rowHeaders - Row header labels
     * @returns {Array} Formatted array of objects for template consumption
     */
    formatTableDataForTemplate(tableData, columnHeaders, rowHeaders) {
        const formatted = [];

        Object.keys(tableData).forEach(rowIndex => {
            const rowData = tableData[rowIndex];
            const rowLabel = rowHeaders[rowIndex] || `Row ${rowIndex}`;

            // Find which column is selected (true value)
            let selectedColumn = null;
            Object.keys(rowData).forEach(colIndex => {
                if (rowData[colIndex] === true) {
                    selectedColumn = columnHeaders[colIndex] || `Column ${colIndex}`;
                }
            });

            formatted.push({
                activity: rowLabel,
                frequency: selectedColumn || 'Not Selected'
            });
        });

        return formatted;
    }

    createDownloadLinkForDoc(documentBuffer) {
        // Create blob from the generated document buffer
        const blob = new Blob([documentBuffer], {
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        });
        const url = URL.createObjectURL(blob);

        // Create download link dynamically
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = `${this.formData.documentTitle || 'document'}.docx`;
        downloadLink.style.display = 'none'; // Hide the link since we're auto-clicking it

        // Add to document temporarily for download
        document.body.appendChild(downloadLink);

        // Trigger automatic download
        downloadLink.click();

        // Clean up
        setTimeout(() => {
            URL.revokeObjectURL(url);
            document.body.removeChild(downloadLink);
        }, 100);
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