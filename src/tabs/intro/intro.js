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
        this.render();
        this.init();
    }

    /**
     * Render the intro tab content
     */
    render() {
        this.container.innerHTML = `
            <div class="intro-content">
                <h2>Cover Page Information</h2>
                <p>This section will collect information for the document cover page.</p>

                <div class="form-group">
                    <label for="intro-title">Document Title:</label>
                    <input type="text" id="intro-title" placeholder="Enter document title">
                </div>

                <div class="form-group">
                    <label for="intro-subtitle">Subtitle:</label>
                    <input type="text" id="intro-subtitle" placeholder="Enter subtitle (optional)">
                </div>

                <div class="form-group">
                    <label for="intro-author">Author:</label>
                    <input type="text" id="intro-author" placeholder="Enter author name">
                </div>

                <div class="form-group">
                    <label for="intro-date">Date:</label>
                    <input type="date" id="intro-date">
                </div>

                <div class="form-group">
                    <label for="template-selection">Choose Template:</label>
                    <div id="template-selection-container"></div>
                    <!-- Hidden input for storage system compatibility -->
                    <input type="hidden" id="selectedTemplate" name="selectedTemplate" value="">
                </div>
            </div>
        `;
    }

    init() {
        console.log('Intro tab initialized');
        this.initializeTemplateSelection();
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
        return {
            title: document.getElementById('intro-title')?.value || '',
            subtitle: document.getElementById('intro-subtitle')?.value || '',
            author: document.getElementById('intro-author')?.value || '',
            date: document.getElementById('intro-date')?.value || '',
            template: this.selectedTemplate || ''
        };
    }

    /**
     * Set data in the intro tab
     * @param {Object} data - Data to populate the form
     */
    setData(data) {
        if (data.title) document.getElementById('intro-title').value = data.title;
        if (data.subtitle) document.getElementById('intro-subtitle').value = data.subtitle;
        if (data.author) document.getElementById('intro-author').value = data.author;
        if (data.date) document.getElementById('intro-date').value = data.date;

        // Set template selection if available
        if (data.template && this.templateCards) {
            this.templateCards.setSelection([data.template]);
            this.selectedTemplate = data.template;
            // Update hidden input
            const hiddenInput = document.getElementById('selectedTemplate');
            if (hiddenInput) {
                hiddenInput.value = data.template;
            }
        }

        // Also check for selectedTemplate field (from storage system)
        if (data.selectedTemplate && this.templateCards) {
            this.templateCards.setSelection([data.selectedTemplate]);
            this.selectedTemplate = data.selectedTemplate;
            // Update hidden input
            const hiddenInput = document.getElementById('selectedTemplate');
            if (hiddenInput) {
                hiddenInput.value = data.selectedTemplate;
            }
        }
    }

    /**
     * Validate intro tab data
     * @returns {boolean} True if valid
     */
    validate() {
        const data = this.getData();
        const hasRequiredFields = data.title.trim() !== '' && data.author.trim() !== '';
        const hasTemplate = data.template !== '';

        // Show validation error for template if missing
        if (hasRequiredFields && !hasTemplate && this.templateCards) {
            this.templateCards.showValidationError('Please select a template to continue');
        }

        return hasRequiredFields && hasTemplate;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IntroTab;
}

