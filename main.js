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
        this.varsConfig = {}; // Configuration mapping for template variables
        this.templatePath = 'template_1.docx'; // Default template file path
        this.secureStorage = new SecureStorage(); // Secure storage instance
        this.storageUIManager = null; // Storage UI manager instance
        this.storageDataManager = null; // Storage data manager instance

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

        // Set up DOM event listeners
        this.setupEventListeners();

        // Set default date to today's date
        this.setDefaultDate();

        // Initialize storage managers
        this.initializeStorageManagers();
    }

    /**
     * Load variable configuration from vars.json file
     * Falls back to default configuration if file cannot be loaded
     */
    async loadVarsConfig() {
        try {
            const response = await fetch('vars.json');
            this.varsConfig = await response.json();
            console.log('Loaded vars config:', this.varsConfig);
        } catch (error) {
            console.warn('Could not load vars.json, using default configuration');
            this.varsConfig = this.getDefaultVarsConfig();
        }
    }

    /**
     * Get default variable configuration if vars.json cannot be loaded
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
     * Set up all DOM event listeners for form interactions
     */
    setupEventListeners() {
        const form = document.getElementById('documentForm');

        // Handle form submission for document generation
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.generateDocument();
        });

        // Real-time form validation on input changes
        const formInputs = form.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', () => {
                this.validateForm();
            });
        });
    }

    /**
     * Set the date input field to today's date as default
     */
    setDefaultDate() {
        const dateInput = document.getElementById('documentDate');
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
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
     * @returns {Object} The collected form data
     */
    collectFormData() {
        const form = document.getElementById('documentForm');
        const formData = new FormData(form);

        this.formData = {};
        for (let [key, value] of formData.entries()) {
            this.formData[key] = value;
        }

        return this.formData;
    }



    validateForm() {
        const form = document.getElementById('documentForm');
        const generateBtn = document.getElementById('generateBtn');
        const isValid = form.checkValidity();

        generateBtn.disabled = !isValid;
        return isValid;
    }

    async generateDocument() {
        if (!this.validateForm()) {
            showError('Please fill in all required fields');
            return;
        }

        this.collectFormData();

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
            templateData[templateKey] = value;
        });

        // Add some additional useful data
        templateData.generatedDate = new Date().toLocaleDateString();
        templateData.generatedTime = new Date().toLocaleTimeString();

        console.log('Template data prepared:', templateData);
        return templateData;
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
    new DocumentGenerator();
});