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
        this.subtitleInput = null;
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
                <h2>Pick a Template</h2>

                <div class="form-group">
                    <label for="template-selection"></label>
                    <div id="template-selection-container"></div>
                    <!-- Hidden input for storage system compatibility -->
                    <input type="hidden" id="selectedTemplate" name="selectedTemplate" value="">
                </div>

                <p>This section will collect information for the document cover page.</p>

                <div id="title-input-container"></div>
                <div id="subtitle-input-container"></div>
                <div id="author-input-container"></div>
                <div id="email-input-container"></div>
                <div id="date-input-container"></div>

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

        // Subtitle input
        this.subtitleInput = new TextInput({
            containerId: 'subtitle-input-container',
            id: 'intro-subtitle',
            name: 'subtitle',
            label: 'Subtitle',
            placeholder: 'Enter subtitle (optional)'
        });

        // Author input
        this.authorInput = new TextInput({
            containerId: 'author-input-container',
            id: 'intro-author',
            name: 'author',
            label: 'Your Name',
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

        // Date input
        this.dateInput = new TextInput({
            containerId: 'date-input-container',
            id: 'intro-date',
            name: 'date',
            label: 'Date',
            type: 'date',
            defaultValue: new Date().toISOString().split('T')[0],
            required: true
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
                image: 'templates/images/template_1.png',
                pdf: 'templates/pdf/template_1.pdf',
                value: 'template_1'
            },
            {
                title: 'Modern Template',
                content: 'Clean contemporary design with bold headers',
                image: 'templates/images/template_2.png',
                pdf: 'templates/pdf/template_2.pdf',
                value: 'template_2'
            },
            {
                title: 'Minimal Template',
                content: 'Simple and elegant minimalist approach',
                image: 'templates/images/template_3.png',
                pdf: 'templates/pdf/template_3.pdf',
                value: 'template_3'
            },
            {
                title: 'Corporate Template',
                content: 'Professional business document format',
                image: 'templates/images/template_4.png',
                pdf: 'templates/pdf/template_4.pdf',
                value: 'template_4'
            },
            {
                title: 'Creative Template',
                content: 'Artistic layout with creative elements',
                image: 'templates/images/template_5.png',
                pdf: 'templates/pdf/template_5.pdf',
                value: 'template_5'
            },
            {
                title: 'Academic Template',
                content: 'Structured format for academic documents',
                image: 'templates/images/template_6.png',
                pdf: 'templates/pdf/template_6.pdf',
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
        if (this.subtitleInput) Object.assign(data, this.subtitleInput.getData());
        if (this.authorInput) Object.assign(data, this.authorInput.getData());
        if (this.emailInput) Object.assign(data, this.emailInput.getData());
        if (this.dateInput) Object.assign(data, this.dateInput.getData());

        return data;
    }

    /**
     * Set data in the intro tab
     * @param {Object} data - Data to populate the form
     */
    setData(data) {
        // Set data in TextInput components
        if (this.titleInput) this.titleInput.setData(data);
        if (this.subtitleInput) this.subtitleInput.setData(data);
        if (this.authorInput) this.authorInput.setData(data);
        if (this.emailInput) this.emailInput.setData(data);
        if (this.dateInput) this.dateInput.setData(data);

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
        if (this.subtitleInput && !this.subtitleInput.validate()) isValid = false;
        if (this.authorInput && !this.authorInput.validate()) isValid = false;
        if (this.emailInput && !this.emailInput.validate()) isValid = false;
        if (this.dateInput && !this.dateInput.validate()) isValid = false;

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

