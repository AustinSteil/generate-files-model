/**
 * Address Component - Reusable address input form
 * 
 * A comprehensive address component that integrates multiple form inputs:
 * - Street address (TextInput)
 * - City (TextInput) 
 * - State (Dropdown with all 50 US states)
 * - ZIP code (TextInput with 5-digit validation)
 * 
 * Features:
 * - Compact, responsive layout
 * - Built-in validation for all fields
 * - Dark/light mode support
 * - Form data integration
 * - Required field support
 * - Consistent styling with project components
 * 
 * @author Austin Steil
 * @version 1.0.0
 */

class Address {
    constructor(options = {}) {
        this.options = {
            containerId: options.containerId || null,
            id: options.id || this.generateId(),
            label: options.label || 'Address',
            required: options.required || false,
            onChange: options.onChange || null,
            className: options.className || '',
            compact: options.compact || false,
            showLabel: options.showLabel !== false, // Default to true
            ...options
        };

        this.container = null;
        this.streetInput = null;
        this.cityInput = null;
        this.stateDropdown = null;
        this.zipInput = null;
        this.isValid = true;

        // US States data
        this.states = [
            { text: 'Alabama', value: 'AL' },
            { text: 'Alaska', value: 'AK' },
            { text: 'Arizona', value: 'AZ' },
            { text: 'Arkansas', value: 'AR' },
            { text: 'California', value: 'CA' },
            { text: 'Colorado', value: 'CO' },
            { text: 'Connecticut', value: 'CT' },
            { text: 'Delaware', value: 'DE' },
            { text: 'Florida', value: 'FL' },
            { text: 'Georgia', value: 'GA' },
            { text: 'Hawaii', value: 'HI' },
            { text: 'Idaho', value: 'ID' },
            { text: 'Illinois', value: 'IL' },
            { text: 'Indiana', value: 'IN' },
            { text: 'Iowa', value: 'IA' },
            { text: 'Kansas', value: 'KS' },
            { text: 'Kentucky', value: 'KY' },
            { text: 'Louisiana', value: 'LA' },
            { text: 'Maine', value: 'ME' },
            { text: 'Maryland', value: 'MD' },
            { text: 'Massachusetts', value: 'MA' },
            { text: 'Michigan', value: 'MI' },
            { text: 'Minnesota', value: 'MN' },
            { text: 'Mississippi', value: 'MS' },
            { text: 'Missouri', value: 'MO' },
            { text: 'Montana', value: 'MT' },
            { text: 'Nebraska', value: 'NE' },
            { text: 'Nevada', value: 'NV' },
            { text: 'New Hampshire', value: 'NH' },
            { text: 'New Jersey', value: 'NJ' },
            { text: 'New Mexico', value: 'NM' },
            { text: 'New York', value: 'NY' },
            { text: 'North Carolina', value: 'NC' },
            { text: 'North Dakota', value: 'ND' },
            { text: 'Ohio', value: 'OH' },
            { text: 'Oklahoma', value: 'OK' },
            { text: 'Oregon', value: 'OR' },
            { text: 'Pennsylvania', value: 'PA' },
            { text: 'Rhode Island', value: 'RI' },
            { text: 'South Carolina', value: 'SC' },
            { text: 'South Dakota', value: 'SD' },
            { text: 'Tennessee', value: 'TN' },
            { text: 'Texas', value: 'TX' },
            { text: 'Utah', value: 'UT' },
            { text: 'Vermont', value: 'VT' },
            { text: 'Virginia', value: 'VA' },
            { text: 'Washington', value: 'WA' },
            { text: 'West Virginia', value: 'WV' },
            { text: 'Wisconsin', value: 'WI' },
            { text: 'Wyoming', value: 'WY' }
        ];

        this.init();
    }

    /**
     * Generate a unique ID for the address component
     */
    generateId() {
        return 'address-' + Math.random().toString(36).substring(2, 11);
    }

    /**
     * Initialize the address component
     */
    init() {
        if (this.options.containerId) {
            this.container = document.getElementById(this.options.containerId);
            if (!this.container) {
                console.error(`Address: Container with ID '${this.options.containerId}' not found`);
                return;
            }
        }

        this.render();
        this.initializeComponents();
    }

    /**
     * Render the address component HTML structure
     */
    render() {
        if (!this.container) return;

        const compactClass = this.options.compact ? 'address-compact' : '';
        const componentClass = `address-component ${this.options.className} ${compactClass}`.trim();
        
        const labelHtml = this.options.showLabel ? 
            `<div class="address-label">${this.options.label}${this.options.required ? ' *' : ''}</div>` : '';

        this.container.innerHTML = `
            <div class="${componentClass}" id="${this.options.id}">
                ${labelHtml}
                <div class="address-fields">
                    <div class="address-row address-street">
                        <div id="${this.options.id}-street-container"></div>
                    </div>
                    <div class="address-row address-city-state-zip">
                        <div class="address-city" id="${this.options.id}-city-container"></div>
                        <div class="address-state" id="${this.options.id}-state-container"></div>
                        <div class="address-zip" id="${this.options.id}-zip-container"></div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Initialize all sub-components
     */
    initializeComponents() {
        // Wait for components to be available
        if (typeof TextInput === 'undefined' || typeof Dropdown === 'undefined') {
            setTimeout(() => this.initializeComponents(), 100);
            return;
        }

        this.initializeStreetInput();
        this.initializeCityInput();
        this.initializeStateDropdown();
        this.initializeZipInput();
    }

    /**
     * Initialize street address input
     */
    initializeStreetInput() {
        this.streetInput = new TextInput({
            containerId: `${this.options.id}-street-container`,
            id: `${this.options.id}-street`,
            name: 'street',
            label: 'Street Address',
            placeholder: 'Enter street address',
            required: this.options.required,
            className: this.options.compact ? 'compact' : '',
            onChange: () => this.handleChange()
        });
    }

    /**
     * Initialize city input
     */
    initializeCityInput() {
        this.cityInput = new TextInput({
            containerId: `${this.options.id}-city-container`,
            id: `${this.options.id}-city`,
            name: 'city',
            label: 'City',
            placeholder: 'City',
            required: this.options.required,
            className: this.options.compact ? 'compact' : '',
            onChange: () => this.handleChange()
        });
    }

    /**
     * Initialize state dropdown
     */
    initializeStateDropdown() {
        const stateContainer = document.getElementById(`${this.options.id}-state-container`);
        if (!stateContainer) return;

        // Create label and dropdown container
        stateContainer.innerHTML = `
            <div class="form-group text-input-component ${this.options.compact ? 'compact' : ''}">
                <label for="${this.options.id}-state">State${this.options.required ? ' *' : ''}</label>
                <div id="${this.options.id}-state-dropdown"></div>
            </div>
        `;

        this.stateDropdown = new Dropdown(
            document.getElementById(`${this.options.id}-state-dropdown`),
            {
                id: `${this.options.id}-state`,
                name: 'state',
                items: this.states,
                defaultText: 'State',
                required: this.options.required,
                onSelect: () => this.handleChange()
            }
        );
    }

    /**
     * Initialize ZIP code input with validation
     */
    initializeZipInput() {
        this.zipInput = new TextInput({
            containerId: `${this.options.id}-zip-container`,
            id: `${this.options.id}-zip`,
            name: 'zip',
            label: 'ZIP Code',
            placeholder: '12345',
            required: this.options.required,
            className: this.options.compact ? 'compact' : '',
            validation: (value) => {
                if (!value && !this.options.required) return true;
                const zipRegex = /^\d{5}$/;
                return zipRegex.test(value) || 'ZIP code must be 5 digits';
            },
            onChange: () => this.handleChange()
        });
    }

    /**
     * Handle change events from sub-components
     */
    handleChange() {
        this.validate();
        if (this.options.onChange) {
            this.options.onChange(this.getData(), this);
        }
    }

    /**
     * Validate all address fields
     * @returns {boolean} True if all fields are valid
     */
    validate() {
        let isValid = true;

        if (this.streetInput && !this.streetInput.validateInput()) {
            isValid = false;
        }
        if (this.cityInput && !this.cityInput.validateInput()) {
            isValid = false;
        }
        if (this.stateDropdown && !this.stateDropdown.validate()) {
            isValid = false;
        }
        if (this.zipInput && !this.zipInput.validateInput()) {
            isValid = false;
        }

        this.isValid = isValid;
        return isValid;
    }

    /**
     * Get all address data
     * @returns {Object} Address data object
     */
    getData() {
        return {
            street: this.streetInput ? this.streetInput.getValue() : '',
            city: this.cityInput ? this.cityInput.getValue() : '',
            state: this.stateDropdown ? this.stateDropdown.getValue() : '',
            zip: this.zipInput ? this.zipInput.getValue() : ''
        };
    }

    /**
     * Set address data
     * @param {Object} data - Address data object
     */
    setData(data) {
        if (this.streetInput && data.street) {
            this.streetInput.setValue(data.street);
        }
        if (this.cityInput && data.city) {
            this.cityInput.setValue(data.city);
        }
        if (this.stateDropdown && data.state) {
            this.stateDropdown.setValue(data.state);
        }
        if (this.zipInput && data.zip) {
            this.zipInput.setValue(data.zip);
        }
    }

    /**
     * Clear all address fields
     */
    clear() {
        if (this.streetInput) this.streetInput.setValue('');
        if (this.cityInput) this.cityInput.setValue('');
        if (this.stateDropdown) this.stateDropdown.setValue('');
        if (this.zipInput) this.zipInput.setValue('');
    }

    /**
     * Check if the address component is valid
     * @returns {boolean} True if valid
     */
    isValidAddress() {
        return this.isValid;
    }

    /**
     * Destroy the component and clean up
     */
    destroy() {
        if (this.streetInput) this.streetInput.destroy();
        if (this.cityInput) this.cityInput.destroy();
        if (this.stateDropdown) this.stateDropdown.destroy();
        if (this.zipInput) this.zipInput.destroy();
        
        if (this.container) {
            this.container.innerHTML = '';
        }
        
        // Clear references
        this.streetInput = null;
        this.cityInput = null;
        this.stateDropdown = null;
        this.zipInput = null;
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Address;
}

// Global availability
if (typeof window !== 'undefined') {
    window.Address = Address;
}
