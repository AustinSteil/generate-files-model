/**
 * Intro Tab - Cover Page Content
 *
 * Handles the cover page information collection.
 * Dynamically generates and manages the intro tab content.
 *
 * @author Austin Steil
 */

class IntroTab {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Intro tab container with ID "${containerId}" not found`);
            return;
        }
        this.templateCards = null;
        this.selectedTemplate = null;
        this.titleInput = null;
        this.companyNameInput = null;
        this.companyAddress = null;
        this.authorInput = null;
        this.emailInput = null;
        this.dateInput = null;
        this.render();
        this.init();
    }

    /**
     * Render the intro tab content
     */
    render() {
        this.container.innerHTML = `
            <div class="intro-content">
                <h2>Pick a Template *</h2>

                <div class="form-group">
                    <label for="template-selection"></label>
                    <div id="template-selection-container"></div>
                    <!-- Hidden input for storage system compatibility -->
                    <input type="hidden" id="selectedTemplate" name="selectedTemplate" value="">
                </div>

                <p>This section will collect information for the document cover page.</p>

                <!-- Two-column layout for form fields -->
                <div class="intro-form-columns">
                    <div class="intro-column-left">
                        <div id="title-input-container"></div>
                        <div id="company-name-input-container"></div>
                        <div id="company-address-container"></div>
                    </div>
                    <div class="intro-column-right">
                        <div id="author-input-container"></div>
                        <div id="email-input-container"></div>
                        <div id="date-input-container"></div>
                    </div>
                </div>

                <!-- Next button container -->
                <div class="form-actions-right">
                    <div id="intro-next-button-container"></div>
                </div>
            </div>
        `;
    }

    init() {
        console.log('Intro tab initialized');
        this.initializeTextInputs();
        this.initializeAddressComponent();
        this.initializeTemplateSelection();
    }

    /**
     * Initialize all text input components
     */
    initializeTextInputs() {
        // Wait for TextInput component to be available
        if (typeof TextInput === 'undefined') {
            setTimeout(() => this.initializeTextInputs(), 100);
            return;
        }

        // Title input
        this.titleInput = new TextInput({
            containerId: 'title-input-container',
            id: 'intro-title',
            name: 'title',
            label: 'Document Title',
            placeholder: 'Enter document title',
            defaultValue: 'Job Demands Analysis',
            required: true
        });

        // Company Name input
        this.companyNameInput = new TextInput({
            containerId: 'company-name-input-container',
            id: 'intro-company-name',
            name: 'companyName',
            label: 'Company Name',
            placeholder: 'Enter company name',
            required: true
        });

        // Author input (Your Name)
        this.authorInput = new TextInput({
            containerId: 'author-input-container',
            id: 'intro-author',
            name: 'author',
            label: 'Your Name (Author)',
            placeholder: 'First Last',
            required: true
        });

        // Email input
        this.emailInput = new TextInput({
            containerId: 'email-input-container',
            id: 'intro-email',
            name: 'email',
            label: 'Your Email Address',
            placeholder: 'example@example.com',
            type: 'email',
            required: true
        });

        // Date input - Today's Date
        this.dateInput = new TextInput({
            containerId: 'date-input-container',
            id: 'intro-date',
            name: 'date',
            label: 'Today\'s Date',
            type: 'date',
            defaultValue: new Date().toISOString().split('T')[0],
            required: true
        });
    }

    /**
     * Initialize the address component
     */
    initializeAddressComponent() {
        // Wait for Address component to be available
        if (typeof Address === 'undefined') {
            setTimeout(() => this.initializeAddressComponent(), 100);
            return;
        }

        this.companyAddress = new Address({
            containerId: 'company-address-container',
            compact: false,
            required: true,
            showLabel: false
        });
    }

    /**
     * Initialize the template selection cards
     */
    initializeTemplateSelection() {
        // Wait for Cards component to be available
        if (typeof Cards === 'undefined') {
            setTimeout(() => this.initializeTemplateSelection(), 100);
            return;
        }

        const templateCards = [
            {
                title: 'Classic Template',
                content: 'Traditional professional document layout',
                image: 'src/templates/images/template_1.png',
                pdf: 'src/templates/pdf/template_1.pdf',
                value: 'template_1'
            },
            {
                title: 'Modern Template',
                content: 'Clean contemporary design with bold headers',
                image: 'src/templates/images/template_2.png',
                pdf: 'src/templates/pdf/template_2.pdf',
                value: 'template_2'
            },
            {
                title: 'Minimal Template',
                content: 'Simple and elegant minimalist approach',
                image: 'src/templates/images/template_3.png',
                pdf: 'src/templates/pdf/template_3.pdf',
                value: 'template_3'
            },
            {
                title: 'Corporate Template',
                content: 'Professional business document format',
                image: 'src/templates/images/template_4.png',
                pdf: 'src/templates/pdf/template_4.pdf',
                value: 'template_4'
            },
            {
                title: 'Creative Template',
                content: 'Artistic layout with creative elements',
                image: 'src/templates/images/template_5.png',
                pdf: 'src/templates/pdf/template_5.pdf',
                value: 'template_5'
            },
            {
                title: 'Academic Template',
                content: 'Structured format for academic documents',
                image: 'src/templates/images/template_6.png',
                pdf: 'src/templates/pdf/template_6.pdf',
                value: 'template_6'
            }
        ];

        this.templateCards = new Cards({
            containerId: 'template-selection-container',
            cards: templateCards,
            multiSelect: false,
            required: true,
            gridLayout: '3x2',
            onChange: (selection) => {
                if (selection.length > 0) {
                    this.selectedTemplate = selection[0].value;
                    // Update hidden input for storage system
                    const hiddenInput = document.getElementById('selectedTemplate');
                    if (hiddenInput) {
                        hiddenInput.value = this.selectedTemplate;
                    }
                    console.log('Selected template:', this.selectedTemplate);
                } else {
                    this.selectedTemplate = null;
                    // Clear hidden input
                    const hiddenInput = document.getElementById('selectedTemplate');
                    if (hiddenInput) {
                        hiddenInput.value = '';
                    }
                }
            }
        });
    }

    /**
     * Get data from the intro tab
     * @returns {Object} Intro tab data
     */
    getData() {
        const data = {
            template: this.selectedTemplate || '',
            selectedTemplate: this.selectedTemplate || '' // For storage system compatibility
        };

        // Get data from TextInput components
        if (this.titleInput) Object.assign(data, this.titleInput.getData());
        if (this.companyNameInput) Object.assign(data, this.companyNameInput.getData());
        if (this.authorInput) Object.assign(data, this.authorInput.getData());
        if (this.emailInput) Object.assign(data, this.emailInput.getData());
        if (this.dateInput) Object.assign(data, this.dateInput.getData());

        // Get data from Address component
        if (this.companyAddress) {
            const addressData = this.companyAddress.getData();
            // Prefix address fields with 'company' for clarity
            data.companyStreet = addressData.street;
            data.companyCity = addressData.city;
            data.companyState = addressData.state;
            data.companyZip = addressData.zip;
        }

        return data;
    }

    /**
     * Set data in the intro tab
     * @param {Object} data - Data to populate the form
     */
    setData(data) {
        // Set data in TextInput components
        if (this.titleInput) this.titleInput.setData(data);
        if (this.companyNameInput) this.companyNameInput.setData(data);
        if (this.authorInput) this.authorInput.setData(data);
        if (this.emailInput) this.emailInput.setData(data);
        if (this.dateInput) this.dateInput.setData(data);

        // Set data in Address component
        if (this.companyAddress) {
            const addressData = {
                street: data.companyStreet || '',
                city: data.companyCity || '',
                state: data.companyState || '',
                zip: data.companyZip || ''
            };
            this.companyAddress.setData(addressData);
        }

        // Set template selection if available
        const templateValue = data.template || data.selectedTemplate;
        if (templateValue && this.templateCards) {
            this.templateCards.setSelection([templateValue]);
            this.selectedTemplate = templateValue;
            // Update hidden input
            const hiddenInput = document.getElementById('selectedTemplate');
            if (hiddenInput) {
                hiddenInput.value = templateValue;
            }
        }
    }

    /**
     * Validate intro tab data
     * @returns {boolean} True if valid
     */
    validate() {
        let isValid = true;

        // Validate TextInput components
        if (this.titleInput && !this.titleInput.validate()) isValid = false;
        if (this.companyNameInput && !this.companyNameInput.validate()) isValid = false;
        if (this.authorInput && !this.authorInput.validate()) isValid = false;
        if (this.emailInput && !this.emailInput.validate()) isValid = false;
        if (this.dateInput && !this.dateInput.validate()) isValid = false;

        // Validate Address component
        if (this.companyAddress && !this.companyAddress.validate()) isValid = false;

        // Validate template selection
        const hasTemplate = this.selectedTemplate !== null && this.selectedTemplate !== '';
        if (!hasTemplate && this.templateCards) {
            this.templateCards.showValidationError('Please select a template to continue');
            isValid = false;
        }

        return isValid;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IntroTab;
}

