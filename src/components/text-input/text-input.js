/**
 * TextInput Component - Reusable text input field system
 * 
 * A flexible text input component that supports:
 * - Various input types (text, email, number, date, etc.)
 * - Built-in validation and error handling
 * - Integration with storage system
 * - Consistent styling with color system
 * - Required/optional field support
 * - Placeholder and default value support
 * 
 * @author Austin Steil
 * @version 1.0.0
 * @license MIT <https://raw.githubusercontent.com/AustinSteil/generate-files-model/refs/heads/main/LICENSE>
 * @copyright 2025 Austin Steil
 * @created October 18, 2025
 * @updated October 18, 2025
 */
class TextInput {
    constructor(options = {}) {
        this.options = {
            containerId: options.containerId || null,
            id: options.id || this.generateId(),
            name: options.name || options.id || this.generateId(),
            label: options.label || '',
            type: options.type || 'text',
            placeholder: options.placeholder || '',
            defaultValue: options.defaultValue || '',
            required: options.required || false,
            validation: options.validation || null,
            onChange: options.onChange || null,
            className: options.className || '',
            helpText: options.helpText || null,
            ...options
        };

        this.container = null;
        this.inputElement = null;
        this.labelElement = null;
        this.errorElement = null;
        this.helpTextElement = null;
        this.isValid = true;

        this.init();
    }

    /**
     * Generate a unique ID for the input
     */
    generateId() {
        return 'text-input-' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Initialize the text input component
     */
    init() {
        if (this.options.containerId) {
            this.container = document.getElementById(this.options.containerId);
            if (!this.container) {
                console.error(`TextInput: Container with ID "${this.options.containerId}" not found`);
                return;
            }
            this.render();
        }
    }

    /**
     * Render the text input component
     */
    render() {
        if (!this.container) return;

        const formGroupClass = `form-group text-input-component ${this.options.className}`.trim();

        this.container.innerHTML = `
            <div class="${formGroupClass}">
                <label for="${this.options.id}">${this.options.label}${this.options.required ? ' *' : ''}</label>
                <input
                    type="${this.options.type}"
                    id="${this.options.id}"
                    name="${this.options.name}"
                    placeholder="${this.options.placeholder}"
                    value="${this.options.defaultValue}"
                    ${this.options.required ? 'required' : ''}
                    class="text-input-field"
                />
                ${this.options.helpText ? `<div class="text-input-help-text">${this.options.helpText}</div>` : ''}
                <div class="text-input-error" style="display: none;"></div>
            </div>
        `;

        this.inputElement = this.container.querySelector(`#${this.options.id}`);
        this.labelElement = this.container.querySelector('label');
        this.errorElement = this.container.querySelector('.text-input-error');
        this.helpTextElement = this.container.querySelector('.text-input-help-text');

        this.attachEventListeners();
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        if (!this.inputElement) return;

        // Input change event
        this.inputElement.addEventListener('input', (e) => {
            // Clear any existing errors when user starts typing
            if (this.errorElement && this.errorElement.style.display !== 'none') {
                this.showError('');
            }

            // Trigger onChange callback
            if (this.options.onChange) {
                this.options.onChange(e.target.value, this);
            }
        });
    }

    /**
     * Validate the input value
     */
    validateInput() {
        const value = this.getValue();
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (this.options.required && !value.trim()) {
            isValid = false;
            errorMessage = `${this.options.label} is required`;
        }

        // Custom validation function
        if (isValid && this.options.validation && typeof this.options.validation === 'function') {
            const validationResult = this.options.validation(value);
            if (validationResult !== true) {
                isValid = false;
                errorMessage = validationResult || 'Invalid input';
            }
        }

        this.isValid = isValid;
        this.showError(isValid ? '' : errorMessage);
        
        return isValid;
    }

    /**
     * Show or hide error message
     */
    showError(message) {
        if (!this.errorElement) return;

        if (message) {
            this.errorElement.textContent = message;
            this.errorElement.style.display = 'block';
            this.inputElement.classList.add('error');
        } else {
            this.errorElement.style.display = 'none';
            this.inputElement.classList.remove('error');
        }
    }

    /**
     * Get the current input value
     */
    getValue() {
        return this.inputElement ? this.inputElement.value : '';
    }

    /**
     * Set the input value
     */
    setValue(value) {
        if (this.inputElement) {
            this.inputElement.value = value || '';
            // Don't validate when programmatically setting value
        }
    }

    /**
     * Clear the input value
     */
    clear() {
        this.setValue('');
    }

    /**
     * Focus the input
     */
    focus() {
        if (this.inputElement) {
            this.inputElement.focus();
        }
    }

    /**
     * Enable or disable the input
     */
    setEnabled(enabled) {
        if (this.inputElement) {
            this.inputElement.disabled = !enabled;
        }
    }

    /**
     * Check if the input is valid
     */
    validate() {
        return this.validateInput();
    }

    /**
     * Get input data for storage system
     */
    getData() {
        return {
            [this.options.name]: this.getValue()
        };
    }

    /**
     * Set input data from storage system
     */
    setData(data) {
        if (data && data[this.options.name] !== undefined) {
            this.setValue(data[this.options.name]);
        }
    }

    /**
     * Destroy the component
     */
    destroy() {
        if (this.container) {
            this.container.innerHTML = '';
        }
        this.inputElement = null;
        this.labelElement = null;
        this.errorElement = null;
        this.helpTextElement = null;
        this.container = null;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TextInput;
}
