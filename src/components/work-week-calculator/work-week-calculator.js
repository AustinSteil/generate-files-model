/**
 * Work Week Calculator Component
 *
 * A reusable component for calculating work week parameters.
 * Allows users to input and automatically calculate:
 * - Weekly hours
 * - Shift length (hours per day)
 * - Number of shifts per week
 *
 * Features:
 * - Three synchronized inputs that auto-calculate each other
 * - Plus/minus buttons for easy adjustment
 * - Configurable default values
 * - Light and dark mode support
 * - Compact single-row layout
 * - Validation and data management
 *
 * @author Austin Steil
 * @version 1.0.0
 */

class WorkWeekCalculator {
    /**
     * Create a new work week calculator component
     * @param {Object} options - Configuration options
     * @param {string} options.containerId - ID of the container element
     * @param {string} options.id - Unique ID for the component
     * @param {string} options.name - Name for data storage
     * @param {string} options.label - Label text for the component
     * @param {number} options.defaultWeeklyHours - Default weekly hours (default: 40)
     * @param {number} options.defaultShiftLength - Default shift length in hours (default: 8)
     * @param {number} options.defaultShiftsPerWeek - Default shifts per week (default: 5)
     * @param {boolean} options.required - Whether the component is required
     * @param {Function} options.onChange - Callback function when values change
     */
    constructor(options = {}) {
        this.options = {
            containerId: options.containerId || null,
            id: options.id || this.generateId(),
            name: options.name || options.id || this.generateId(),
            label: options.label || 'Work Schedule',
            defaultWeeklyHours: options.defaultWeeklyHours !== undefined ? options.defaultWeeklyHours : 40,
            defaultShiftLength: options.defaultShiftLength !== undefined ? options.defaultShiftLength : 8,
            defaultShiftsPerWeek: options.defaultShiftsPerWeek !== undefined ? options.defaultShiftsPerWeek : 5,
            required: options.required || false,
            onChange: options.onChange || null,
            ...options
        };

        this.container = null;
        this.weeklyHoursInput = null;
        this.shiftLengthInput = null;
        this.shiftsPerWeekInput = null;

        // Current values
        this.weeklyHours = this.options.defaultWeeklyHours;
        this.shiftLength = this.options.defaultShiftLength;
        this.shiftsPerWeek = this.options.defaultShiftsPerWeek;

        // Track which field was last edited to avoid circular updates
        this.lastEditedField = null;
        this.isUpdating = false;

        // Click and hold state
        this.holdInterval = null;
        this.holdTimeout = null;

        this.init();
    }

    /**
     * Generate a unique ID
     */
    generateId() {
        return 'work-week-calc-' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Initialize the component
     */
    init() {
        this.container = document.getElementById(this.options.containerId);
        if (!this.container) {
            console.error(`Work week calculator container with ID "${this.options.containerId}" not found`);
            return;
        }

        this.render();
        this.attachEventListeners();
    }

    /**
     * Render the component
     */
    render() {
        if (!this.container) return;

        this.container.innerHTML = `
            <div class="work-week-calculator">
                <label class="work-week-label">
                    ${this.options.label}${this.options.required ? ' *' : ''}
                </label>
                <div class="work-week-inputs">
                    <!-- Weekly Hours -->
                    <div class="work-week-input-group">
                        <label for="${this.options.id}-weekly-hours" class="work-week-input-label">
                            Weekly Hours
                        </label>
                        <div class="work-week-control">
                            <button type="button" class="work-week-btn work-week-btn-minus" data-field="weeklyHours" aria-label="Decrease weekly hours">
                                −
                            </button>
                            <input
                                type="number"
                                id="${this.options.id}-weekly-hours"
                                class="work-week-input"
                                value="${this.weeklyHours.toFixed(2)}"
                                min="0"
                                max="168"
                                step="0.25"
                                data-field="weeklyHours"
                            />
                            <button type="button" class="work-week-btn work-week-btn-plus" data-field="weeklyHours" aria-label="Increase weekly hours">
                                +
                            </button>
                        </div>
                        <span class="work-week-unit">hrs/week</span>
                    </div>

                    <!-- Shift Length -->
                    <div class="work-week-input-group">
                        <label for="${this.options.id}-shift-length" class="work-week-input-label">
                            Shift Length
                        </label>
                        <div class="work-week-control">
                            <button type="button" class="work-week-btn work-week-btn-minus" data-field="shiftLength" aria-label="Decrease shift length">
                                −
                            </button>
                            <input
                                type="number"
                                id="${this.options.id}-shift-length"
                                class="work-week-input"
                                value="${this.shiftLength.toFixed(2)}"
                                min="0"
                                max="24"
                                step="0.25"
                                data-field="shiftLength"
                            />
                            <button type="button" class="work-week-btn work-week-btn-plus" data-field="shiftLength" aria-label="Increase shift length">
                                +
                            </button>
                        </div>
                        <span class="work-week-unit">hrs/shift</span>
                    </div>

                    <!-- Shifts Per Week -->
                    <div class="work-week-input-group">
                        <label for="${this.options.id}-shifts-per-week" class="work-week-input-label">
                            Shifts Per Week
                        </label>
                        <div class="work-week-control">
                            <button type="button" class="work-week-btn work-week-btn-minus" data-field="shiftsPerWeek" aria-label="Decrease shifts per week">
                                −
                            </button>
                            <input
                                type="number"
                                id="${this.options.id}-shifts-per-week"
                                class="work-week-input"
                                value="${this.shiftsPerWeek.toFixed(2)}"
                                min="0"
                                max="7"
                                step="0.25"
                                data-field="shiftsPerWeek"
                            />
                            <button type="button" class="work-week-btn work-week-btn-plus" data-field="shiftsPerWeek" aria-label="Increase shifts per week">
                                +
                            </button>
                        </div>
                        <span class="work-week-unit">shifts/week</span>
                    </div>
                </div>
            </div>
        `;

        // Get references to inputs
        this.weeklyHoursInput = this.container.querySelector(`#${this.options.id}-weekly-hours`);
        this.shiftLengthInput = this.container.querySelector(`#${this.options.id}-shift-length`);
        this.shiftsPerWeekInput = this.container.querySelector(`#${this.options.id}-shifts-per-week`);
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        if (!this.container) return;

        // Input change events
        const inputs = this.container.querySelectorAll('.work-week-input');
        inputs.forEach(input => {
            input.addEventListener('input', (e) => this.handleInputChange(e));
            input.addEventListener('blur', (e) => this.handleInputBlur(e));
        });

        // Plus/minus button events
        const buttons = this.container.querySelectorAll('.work-week-btn');
        buttons.forEach(button => {
            button.addEventListener('mousedown', (e) => this.handleButtonMouseDown(e));
            button.addEventListener('mouseup', (e) => this.handleButtonMouseUp(e));
            button.addEventListener('mouseleave', (e) => this.handleButtonMouseUp(e));
            button.addEventListener('touchstart', (e) => this.handleButtonMouseDown(e));
            button.addEventListener('touchend', (e) => this.handleButtonMouseUp(e));
            button.addEventListener('touchcancel', (e) => this.handleButtonMouseUp(e));
        });
    }

    /**
     * Handle input change
     */
    handleInputChange(e) {
        if (this.isUpdating) return;

        const field = e.target.dataset.field;
        const value = parseFloat(e.target.value) || 0;

        this.lastEditedField = field;
        this[field] = value;

        this.calculateOtherFields(field);
        this.triggerOnChange();
    }

    /**
     * Handle input blur (format the value)
     */
    handleInputBlur(e) {
        const field = e.target.dataset.field;
        const value = parseFloat(e.target.value) || 0;

        // Round to 0.25 (quarter hour increments)
        const roundedValue = Math.round(value * 4) / 4;
        this[field] = roundedValue;
        // Always display with 2 decimal places for consistent width
        e.target.value = roundedValue.toFixed(2);
    }

    /**
     * Handle plus/minus button mouse down (start of click and hold)
     */
    handleButtonMouseDown(e) {
        e.preventDefault(); // Prevent text selection and other default behaviors

        const button = e.currentTarget;
        const field = button.dataset.field;
        const isMinus = button.classList.contains('work-week-btn-minus');

        // Immediately increment/decrement once
        this.incrementField(field, isMinus);

        // Start hold timeout (wait 500ms before starting rapid increment)
        this.holdTimeout = setTimeout(() => {
            // Start rapid increment (every 100ms)
            this.holdInterval = setInterval(() => {
                this.incrementField(field, isMinus);
            }, 100);
        }, 500);
    }

    /**
     * Handle plus/minus button mouse up (end of click and hold)
     */
    handleButtonMouseUp() {
        // Clear both timeout and interval
        if (this.holdTimeout) {
            clearTimeout(this.holdTimeout);
            this.holdTimeout = null;
        }
        if (this.holdInterval) {
            clearInterval(this.holdInterval);
            this.holdInterval = null;
        }
    }

    /**
     * Increment or decrement a field value
     */
    incrementField(field, isMinus) {
        const input = this.container.querySelector(`input[data-field="${field}"]`);

        if (!input) return;

        const currentValue = parseFloat(input.value) || 0;
        const step = 0.25; // Use 0.25 for all fields
        const min = parseFloat(input.min);
        const max = parseFloat(input.max);

        let newValue = isMinus ? currentValue - step : currentValue + step;

        // Enforce min/max
        if (!isNaN(min)) newValue = Math.max(min, newValue);
        if (!isNaN(max)) newValue = Math.min(max, newValue);

        // Round to 0.25 (quarter hour increments)
        newValue = Math.round(newValue * 4) / 4;

        // Always display with 2 decimal places for consistent width
        input.value = newValue.toFixed(2);
        this.lastEditedField = field;
        this[field] = newValue;

        this.calculateOtherFields(field);
        this.triggerOnChange();
    }

    /**
     * Calculate the other two fields based on the edited field
     * Formula: weeklyHours = shiftLength * shiftsPerWeek
     */
    calculateOtherFields(editedField) {
        this.isUpdating = true;

        if (editedField === 'weeklyHours') {
            // If weekly hours changed, recalculate shift length
            // Keep shifts per week constant
            if (this.shiftsPerWeek > 0) {
                this.shiftLength = Math.round((this.weeklyHours / this.shiftsPerWeek) * 4) / 4;
                this.shiftLengthInput.value = this.shiftLength.toFixed(2);
            }
        } else if (editedField === 'shiftLength') {
            // If shift length changed, recalculate weekly hours
            // Keep shifts per week constant
            this.weeklyHours = Math.round((this.shiftLength * this.shiftsPerWeek) * 4) / 4;
            this.weeklyHoursInput.value = this.weeklyHours.toFixed(2);
        } else if (editedField === 'shiftsPerWeek') {
            // If shifts per week changed, recalculate shift length
            // Keep weekly hours constant
            if (this.shiftsPerWeek > 0) {
                this.shiftLength = Math.round((this.weeklyHours / this.shiftsPerWeek) * 4) / 4;
                this.shiftLengthInput.value = this.shiftLength.toFixed(2);
            }
        }

        this.isUpdating = false;
    }

    /**
     * Trigger onChange callback
     */
    triggerOnChange() {
        if (this.options.onChange && typeof this.options.onChange === 'function') {
            this.options.onChange(this.getData(), this);
        }
    }

    /**
     * Get data from the component
     * @returns {Object} Component data
     */
    getData() {
        return {
            [this.options.name]: {
                weeklyHours: this.weeklyHours,
                shiftLength: this.shiftLength,
                shiftsPerWeek: this.shiftsPerWeek
            }
        };
    }

    /**
     * Set data in the component
     * @param {Object} data - Data to populate
     */
    setData(data) {
        if (!data || !data[this.options.name]) return;

        const workData = data[this.options.name];

        if (workData.weeklyHours !== undefined) {
            this.weeklyHours = workData.weeklyHours;
            if (this.weeklyHoursInput) this.weeklyHoursInput.value = this.weeklyHours.toFixed(2);
        }

        if (workData.shiftLength !== undefined) {
            this.shiftLength = workData.shiftLength;
            if (this.shiftLengthInput) this.shiftLengthInput.value = this.shiftLength.toFixed(2);
        }

        if (workData.shiftsPerWeek !== undefined) {
            this.shiftsPerWeek = workData.shiftsPerWeek;
            if (this.shiftsPerWeekInput) this.shiftsPerWeekInput.value = this.shiftsPerWeek.toFixed(2);
        }
    }

    /**
     * Validate the component
     * @returns {boolean} True if valid
     */
    validate() {
        if (!this.options.required) return true;

        // Check if all values are greater than 0
        return this.weeklyHours > 0 && this.shiftLength > 0 && this.shiftsPerWeek > 0;
    }

    /**
     * Get the component element
     * @returns {HTMLElement} The component element
     */
    getElement() {
        return this.container;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WorkWeekCalculator;
}

