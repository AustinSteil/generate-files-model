/**
 * Demographics Tab
 *
 * Handles basic demographic information collection.
 * Dynamically generates and manages the demographics tab content.
 *
 * @author Austin Steil
 */

class DemographicsTab {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Demographics tab container with ID "${containerId}" not found`);
            return;
        }

        // Initialize text input instances
        this.jobTitleInput = null;
        this.jobPurposeInput = null;
        this.otherShiftInfoInput = null;

        // Initialize work week calculator
        this.workWeekCalculator = null;

        // Initialize repeater instances
        this.essentialFunctionsRepeater = null;
        this.marginalFunctionsRepeater = null;
        this.breaksRepeater = null;

        this.render();
        this.init();
    }

    /**
     * Render the demographics tab content
     */
    render() {
        this.container.innerHTML = `
            <div class="demographics-content">
                <h2>Demographics</h2>
                <p>This section will collect demographic information.</p>

                <div id="job-title-container"></div>
                <div id="job-purpose-container"></div>

                <!-- Essential Functions Repeater -->
                <div id="essential-functions-repeater-container"></div>

                <!-- Marginal Functions Repeater -->
                <div id="marginal-functions-repeater-container"></div>

                <div id="work-week-calculator-container"></div>
                <div id="breaks-container"></div>
                <div id="other-shift-info-container"></div>

                <!-- Next button container -->
                <div class="form-actions-right">
                    <div id="demographics-next-button-container"></div>
                </div>
            </div>
        `;
    }

    init() {
        console.log('Demographics tab initialized');
        this.initializeComponents();
    }

    /**
     * Initialize all components (text inputs, work week calculator, and repeaters)
     */
    initializeComponents() {
        // Wait for components to be available
        if (typeof TextInput === 'undefined' || typeof Repeater === 'undefined' || typeof WorkWeekCalculator === 'undefined' || typeof AreaInput === 'undefined') {
            setTimeout(() => this.initializeComponents(), 100);
            return;
        }

        this.initializeTextInputs();
        this.initializeWorkWeekCalculator();
        this.initializeRepeaters();
    }

    /**
     * Initialize all text input components
     */
    initializeTextInputs() {
        // Job Title input
        this.jobTitleInput = new TextInput({
            containerId: 'job-title-container',
            id: 'demo-job-title',
            name: 'jobTitle',
            label: 'Job Title',
            placeholder: 'Enter job title',
            required: true
        });

        // Job Purpose input
        this.jobPurposeInput = new TextInput({
            containerId: 'job-purpose-container',
            id: 'demo-job-purpose',
            name: 'jobPurpose',
            label: 'Job Purpose',
            placeholder: 'Enter job purpose',
            required: true
        });

        // Other Shift Information input
        this.otherShiftInfoInput = new TextInput({
            containerId: 'other-shift-info-container',
            id: 'demo-other-shift-info',
            name: 'otherShiftInfo',
            label: 'Other Shift Information',
            placeholder: 'Any additional shift information...',
            required: false,
            helpText: 'Seasonal changes, weekend volume demands, holiday schedules, etc.'
        });
    }

    /**
     * Initialize work week calculator component
     */
    initializeWorkWeekCalculator() {
        this.workWeekCalculator = new WorkWeekCalculator({
            containerId: 'work-week-calculator-container',
            id: 'demo-work-week',
            name: 'workSchedule',
            label: 'Work Schedule',
            defaultWeeklyHours: 40,
            defaultShiftLength: 8,
            defaultShiftsPerWeek: 5,
            required: false
        });
    }

    /**
     * Initialize repeater components
     */
    initializeRepeaters() {
        // Essential Functions Repeater
        this.essentialFunctionsRepeater = new Repeater({
            containerId: 'essential-functions-repeater-container',
            id: 'essential-functions-repeater',
            name: 'essentialFunctions',
            label: 'Essential Functions',
            fields: [
                {
                    name: 'essentialFunction',
                    label: 'Essential Functions',
                    type: 'text',
                    placeholder: 'Primary Tasks',
                    required: true
                },
                {
                    name: 'essentialFunctionDescription',
                    label: 'Short Description',
                    type: 'area',
                    placeholder: 'Task description',
                    required: true,
                    autoGrow: true,
                    rows: 1,
                    maxLength: 150,
                    showCharCounter: true,
                    minHeight: '52px',
                    maxHeight: '150px',
                    validation: (value) => {
                        if (value.length < 10) {
                            return 'Description must be at least 10 characters';
                        }
                        if (value.length > 150) {
                            return 'Description must be 150 characters or less';
                        }
                        return true;
                    }
                }
            ],
            required: true,
            defaultRows: 1,
            showFieldLabels: false
        });

        // Marginal Functions Repeater
        this.marginalFunctionsRepeater = new Repeater({
            containerId: 'marginal-functions-repeater-container',
            id: 'marginal-functions-repeater',
            name: 'marginalFunctions',
            label: 'Marginal Functions',
            fields: [
                {
                    name: 'marginalFunction',
                    label: 'Marginal Functions',
                    type: 'text',
                    placeholder: 'Secondary Tasks',
                    required: true
                },
                {
                    name: 'marginalFunctionDescription',
                    label: 'Short Description',
                    type: 'area',
                    placeholder: 'Task description',
                    required: true,
                    autoGrow: true,
                    rows: 1,
                    maxLength: 150,
                    showCharCounter: true,
                    minHeight: '52px',
                    maxHeight: '150px',
                    validation: (value) => {
                        if (value.length < 10) {
                            return 'Description must be at least 10 characters';
                        }
                        if (value.length > 150) {
                            return 'Description must be 150 characters or less';
                        }
                        return true;
                    }
                }
            ],
            required: true,
            defaultRows: 1,
            showFieldLabels: false
        });

        // Breaks Repeater
        this.breaksRepeater = new Repeater({
            containerId: 'breaks-container',
            id: 'breaks-repeater',
            name: 'breaks',
            label: 'Breaks',
            fields: [
                {
                    name: 'breakDescription',
                    label: 'Description',
                    type: 'text',
                    placeholder: 'Break information',
                    required: true
                }
            ],
            required: true,
            defaultRows: 1,
            showFieldLabels: false
        });

        // Set default break values after initialization
        // Use setTimeout to ensure the repeater is fully initialized
        setTimeout(() => this.setDefaultBreaks(), 0);
    }

    /**
     * Set default break values
     */
    setDefaultBreaks() {
        if (this.breaksRepeater) {
            this.breaksRepeater.setData({
                breaks: [
                    { breakDescription: 'One 15-minute break at about 10am' },
                    { breakDescription: 'One 30-minute break at about 12pm' },
                    { breakDescription: 'One 15-minute break at about 2pm' }
                ]
            });
        }
    }

    /**
     * Get data from the demographics tab
     * @returns {Object} Demographics tab data
     */
    getData() {
        return {
            ...this.jobTitleInput?.getData(),
            ...this.jobPurposeInput?.getData(),
            ...this.essentialFunctionsRepeater?.getData(),
            ...this.marginalFunctionsRepeater?.getData(),
            ...this.workWeekCalculator?.getData(),
            ...this.breaksRepeater?.getData(),
            ...this.otherShiftInfoInput?.getData()
        };
    }

    /**
     * Set data in the demographics tab
     * @param {Object} data - Data to populate the form
     */
    setData(data) {
        this.jobTitleInput?.setData(data);
        this.jobPurposeInput?.setData(data);
        this.essentialFunctionsRepeater?.setData(data);
        this.marginalFunctionsRepeater?.setData(data);
        this.workWeekCalculator?.setData(data);
        this.breaksRepeater?.setData(data);
        this.otherShiftInfoInput?.setData(data);
    }

    /**
     * Validate demographics tab data
     * @returns {boolean} True if valid
     */
    validate() {
        let isValid = true;

        // Validate required text inputs
        if (this.jobTitleInput && !this.jobTitleInput.validate()) {
            isValid = false;
        }

        if (this.jobPurposeInput && !this.jobPurposeInput.validate()) {
            isValid = false;
        }

        // Validate repeaters
        if (this.essentialFunctionsRepeater && !this.essentialFunctionsRepeater.validate()) {
            isValid = false;
        }

        if (this.marginalFunctionsRepeater && !this.marginalFunctionsRepeater.validate()) {
            isValid = false;
        }

        if (this.breaksRepeater && !this.breaksRepeater.validate()) {
            isValid = false;
        }

        return isValid;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DemographicsTab;
}

