/**
 * ColorPicker Component - Native HTML5 Color Input
 *
 * A simple color picker component using the native HTML5 color input:
 * - Native browser color picker UI
 * - Easy to use and interact with
 * - Integration with storage system
 * - Consistent styling with color system
 * - Required/optional field support
 * - Dark mode support
 *
 * @author Austin Steil
 * @version 1.0.0
 * @license MIT <https://raw.githubusercontent.com/AustinSteil/generate-files-model/refs/heads/main/LICENSE>
 * @copyright 2025 Austin Steil
 * @created October 18, 2025
 * @updated October 18, 2025
 */
class ColorPicker {
    constructor(options = {}) {
        this.options = {
            containerId: options.containerId || null,
            id: options.id || this.generateId(),
            name: options.name || options.id || this.generateId(),
            label: options.label || 'Color',
            defaultValue: options.defaultValue || '#003366',
            required: options.required || false,
            onChange: options.onChange || null,
            className: options.className || '',
            style: options.style || '',
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
     * Generate a unique ID for the color picker
     */
    generateId() {
        return 'color-picker-' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Initialize the color picker component
     */
    init() {
        if (this.options.containerId) {
            this.container = document.getElementById(this.options.containerId);
            if (!this.container) {
                console.error(`ColorPicker: Container with ID "${this.options.containerId}" not found`);
                return;
            }
            this.render();
        }
    }

    /**
     * Render the color picker component
     */
    render() {
        if (!this.container) return;

        const formGroupClass = `form-group color-picker-component ${this.options.className}`.trim();
        const styleAttr = this.options.style ? `style="${this.options.style}"` : '';

        this.container.innerHTML = `
            <div class="${formGroupClass}" ${styleAttr}>
                <label for="${this.options.id}">${this.options.label}${this.options.required ? ' *' : ''}</label>
                <div class="color-picker-wrapper">
                    <input
                        type="color"
                        id="${this.options.id}"
                        name="${this.options.name}"
                        value="${this.options.defaultValue}"
                        class="color-picker-input"
                        ${this.options.required ? 'required' : ''}
                    />
                </div>
                ${this.options.helpText ? `<div class="color-picker-help-text">${this.options.helpText}</div>` : ''}
                <div class="color-picker-error" style="display: none;"></div>
            </div>
        `;

        this.inputElement = this.container.querySelector(`#${this.options.id}`);
        this.labelElement = this.container.querySelector('label');
        this.errorElement = this.container.querySelector('.color-picker-error');
        this.helpTextElement = this.container.querySelector('.color-picker-help-text');

        this.attachEventListeners();
    }



    /**
     * Attach event listeners
     */
    attachEventListeners() {
        if (!this.inputElement) return;

        // Color input change
        this.inputElement.addEventListener('input', (e) => {
            // Clear any existing errors
            if (this.errorElement && this.errorElement.style.display !== 'none') {
                this.showError('');
            }

            // Trigger onChange callback
            if (this.options.onChange) {
                this.options.onChange(e.target.value, this);
            }
        });

        // Color input change (for when user confirms selection)
        this.inputElement.addEventListener('change', (e) => {
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
     * Get the current color value
     */
    getValue() {
        return this.inputElement ? this.inputElement.value : '';
    }

    /**
     * Set the color value
     */
    setValue(value) {
        if (this.inputElement) {
            this.inputElement.value = value || this.options.defaultValue;
            this.inputElement.dispatchEvent(new Event('input', { bubbles: true }));
        }
    }

    /**
     * Clear the color value
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
     * Validate the input
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
    module.exports = ColorPicker;
}

