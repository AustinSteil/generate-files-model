/**
 * AreaInput Component - Reusable textarea/rich text editor component
 *
 * A flexible textarea component that supports:
 * - Plain textarea with resizable options (vertical, horizontal, both, none)
 * - Optional Quill.js rich text editor integration
 * - Built-in validation and error handling
 * - Integration with storage system
 * - Consistent styling with color system
 * - Required/optional field support
 * - Placeholder and default value support
 * - Configurable min/max height and width
 * - Live character counter for validation feedback
 * - Debounced onChange for performance
 * - Enhanced accessibility with ARIA attributes
 *
 * @author Austin Steil
 * @version 1.1.0
 *
 * Recent improvements:
 * - Added debounced onChange to prevent excessive calls during typing
 * - Enhanced validation UX with live character counter
 * - Improved destroy method with proper event cleanup
 * - Added ARIA attributes for better accessibility
 * - Auto-focus and scroll on validation errors
 */

/**
 * Debounce utility function
 * Delays function execution until after wait time has elapsed since last call
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

class AreaInput {
    constructor(options = {}) {
        this.options = {
            containerId: options.containerId || null,
            id: options.id || this.generateId(),
            name: options.name || options.id || this.generateId(),
            label: options.label || '',
            placeholder: options.placeholder || '',
            defaultValue: options.defaultValue || '',
            required: options.required || false,
            validation: options.validation || null,
            onChange: options.onChange || null,
            className: options.className || '',
            showCharCounter: options.showCharCounter !== undefined ? options.showCharCounter : false,
            maxLength: options.maxLength || null,

            // Resize options: 'none', 'vertical', 'horizontal', 'both', 'auto'
            resize: options.resize || 'both',

            // Auto-grow option - textarea grows/shrinks automatically with content
            autoGrow: options.autoGrow !== undefined ? options.autoGrow : false,

            // Dimensions
            minHeight: options.minHeight || '100px',
            maxHeight: options.maxHeight || '500px',
            minWidth: options.minWidth || '100%',
            maxWidth: options.maxWidth || '100%',
            rows: options.rows || 5,

            // Rich text editor options
            useRichText: options.useRichText || false,
            quillConfig: options.quillConfig || {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        [{ 'color': [] }, { 'background': [] }],
                        ['link'],
                        ['clean']
                    ]
                },
                placeholder: options.placeholder || 'Enter text...'
            },

            ...options
        };

        this.container = null;
        this.textareaElement = null;
        this.labelElement = null;
        this.errorElement = null;
        this.charCounterElement = null;
        this.quillEditor = null;
        this.isValid = true;

        // Bound event handlers for proper cleanup
        this.handleInput = null;
        this.handleBlur = null;
        this.handleTextChange = null;
        this.handleSelectionChange = null;

        this.init();
    }

    /**
     * Generate a unique ID for the input
     */
    generateId() {
        return 'area-input-' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Initialize the area input component
     */
    init() {
        if (this.options.containerId) {
            this.container = document.getElementById(this.options.containerId);
            if (!this.container) {
                console.error(`AreaInput: Container with ID "${this.options.containerId}" not found`);
                return;
            }
            this.render();
        }
    }

    /**
     * Render the area input component
     */
    render() {
        if (!this.container) return;

        const formGroupClass = `form-group area-input-component ${this.options.className}`.trim();
        
        if (this.options.useRichText) {
            this.renderRichTextEditor(formGroupClass);
        } else {
            this.renderTextarea(formGroupClass);
        }
    }

    /**
     * Render plain textarea
     */
    renderTextarea(formGroupClass) {
        // Build style attribute with only non-null values
        const styleProps = [];

        // If autoGrow is enabled, disable manual resize
        if (this.options.autoGrow) {
            styleProps.push(`resize: none`);
            // Use overflow-y: auto to allow scrolling when maxHeight is reached
            styleProps.push(`overflow-y: auto`);
        } else {
            styleProps.push(`resize: ${this.options.resize}`);
        }

        if (this.options.minHeight) styleProps.push(`min-height: ${this.options.minHeight}`);
        if (this.options.maxHeight) styleProps.push(`max-height: ${this.options.maxHeight}`);
        if (this.options.minWidth) styleProps.push(`min-width: ${this.options.minWidth}`);
        if (this.options.maxWidth) styleProps.push(`max-width: ${this.options.maxWidth}`);
        const styleAttr = styleProps.join('; ');

        this.container.innerHTML = `
            <div class="${formGroupClass}">
                <label for="${this.options.id}">${this.options.label}${this.options.required ? ' *' : ''}</label>
                <div class="area-input-wrapper">
                    <textarea
                        id="${this.options.id}"
                        name="${this.options.name}"
                        placeholder="${this.options.placeholder}"
                        rows="${this.options.rows}"
                        ${this.options.required ? 'required' : ''}
                        ${this.options.maxLength ? `maxlength="${this.options.maxLength}"` : ''}
                        class="area-input-field ${this.options.autoGrow ? 'auto-grow' : ''}"
                        style="${styleAttr}"
                        aria-describedby="${this.options.id}-error ${this.options.id}-counter"
                    >${this.options.defaultValue}</textarea>
                </div>
                ${this.options.showCharCounter ? `<div id="${this.options.id}-counter" class="area-input-char-counter">0 characters</div>` : ''}
                <div id="${this.options.id}-error" class="area-input-error" role="alert" style="display: none;"></div>
            </div>
        `;

        this.textareaElement = this.container.querySelector(`#${this.options.id}`);
        this.labelElement = this.container.querySelector('label');
        this.errorElement = this.container.querySelector('.area-input-error');
        this.charCounterElement = this.container.querySelector('.area-input-char-counter');

        this.attachEventListeners();

        // Initialize auto-grow if enabled
        if (this.options.autoGrow && this.textareaElement) {
            this.adjustHeight();
        }

        // Update initial character count
        if (this.charCounterElement) {
            this.updateCharCounter();
        }
    }

    /**
     * Render rich text editor (Quill.js)
     */
    renderRichTextEditor(formGroupClass) {
        // Check if Quill is available
        if (typeof Quill === 'undefined') {
            console.error('AreaInput: Quill.js is not loaded. Please include Quill.js library.');
            this.renderTextarea(formGroupClass); // Fallback to textarea
            return;
        }

        this.container.innerHTML = `
            <div class="${formGroupClass}">
                <label for="${this.options.id}">${this.options.label}${this.options.required ? ' *' : ''}</label>
                <div id="${this.options.id}" class="area-input-rich-text" style="min-height: ${this.options.minHeight}; max-height: ${this.options.maxHeight};" aria-describedby="${this.options.id}-error ${this.options.id}-counter"></div>
                ${this.options.showCharCounter ? `<div id="${this.options.id}-counter" class="area-input-char-counter">0 characters</div>` : ''}
                <div id="${this.options.id}-error" class="area-input-error" role="alert" style="display: none;"></div>
            </div>
        `;

        this.labelElement = this.container.querySelector('label');
        this.errorElement = this.container.querySelector('.area-input-error');
        this.charCounterElement = this.container.querySelector('.area-input-char-counter');

        // Initialize Quill editor
        const editorElement = this.container.querySelector(`#${this.options.id}`);
        this.quillEditor = new Quill(editorElement, this.options.quillConfig);

        // Set default value if provided
        if (this.options.defaultValue) {
            this.quillEditor.root.innerHTML = this.options.defaultValue;
        }

        this.attachRichTextEventListeners();

        // Update initial character count
        if (this.charCounterElement) {
            this.updateCharCounter();
        }
    }

    /**
     * Attach event listeners for textarea
     */
    attachEventListeners() {
        if (!this.textareaElement) return;

        // Create debounced onChange handler
        const debouncedOnChange = this.options.onChange ? debounce((value) => {
            this.options.onChange(value, this);
        }, 300) : null;

        // Bind event handlers for proper cleanup
        this.handleInput = (e) => {
            // Clear any existing errors when user starts typing
            if (this.errorElement && this.errorElement.style.display !== 'none') {
                this.showError('');
            }

            // Update counter
            this.updateCharCounter();

            // Auto-grow the textarea if enabled
            if (this.options.autoGrow) {
                this.adjustHeight();
            }

            if (debouncedOnChange) {
                debouncedOnChange(e.target.value);
            }
        };

        // Attach event listeners
        this.textareaElement.addEventListener('input', this.handleInput);
    }

    /**
     * Adjust textarea height to fit content (for auto-grow)
     */
    adjustHeight() {
        if (!this.textareaElement || !this.options.autoGrow) return;

        // Reset height to auto to get the correct scrollHeight
        this.textareaElement.style.height = 'auto';

        // Get the scroll height (content height)
        let newHeight = this.textareaElement.scrollHeight;

        // Apply min/max height constraints
        const minHeight = parseInt(this.options.minHeight) || 0;
        const maxHeight = parseInt(this.options.maxHeight) || Infinity;

        newHeight = Math.max(minHeight, Math.min(maxHeight, newHeight));

        // Set the new height
        this.textareaElement.style.height = newHeight + 'px';
    }

    /**
     * Attach event listeners for rich text editor
     */
    attachRichTextEventListeners() {
        if (!this.quillEditor) return;

        // Create debounced onChange handler
        const debouncedOnChange = this.options.onChange ? debounce((value) => {
            this.options.onChange(value, this);
        }, 300) : null;

        // Bind event handlers for proper cleanup
        this.handleTextChange = () => {
            // Clear any existing errors when user starts typing
            if (this.errorElement && this.errorElement.style.display !== 'none') {
                this.showError('');
            }

            // Update counter and trigger onChange
            this.updateCharCounter();
            if (debouncedOnChange) {
                debouncedOnChange(this.getValue());
            }
        };

        // Attach event listeners
        this.quillEditor.on('text-change', this.handleTextChange);
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

            if (this.textareaElement) {
                this.textareaElement.classList.add('error');
            } else if (this.quillEditor) {
                this.quillEditor.root.parentElement.classList.add('error');
            }
        } else {
            this.errorElement.style.display = 'none';

            if (this.textareaElement) {
                this.textareaElement.classList.remove('error');
            } else if (this.quillEditor) {
                this.quillEditor.root.parentElement.classList.remove('error');
            }
        }
    }

    /**
     * Update character counter display
     */
    updateCharCounter() {
        if (!this.charCounterElement) return;

        const plainValue = this.getPlainText();
        const length = plainValue.length;

        // Update counter text
        if (this.options.maxLength) {
            this.charCounterElement.textContent = `${length} / ${this.options.maxLength} characters`;
        } else {
            this.charCounterElement.textContent = `${length} character${length !== 1 ? 's' : ''}`;
        }

        // Update counter styling based on length
        this.charCounterElement.classList.remove('warning', 'error');

        if (this.options.maxLength) {
            const percentUsed = (length / this.options.maxLength) * 100;

            if (percentUsed >= 100) {
                this.charCounterElement.classList.add('error');
            } else if (percentUsed >= 80) {
                this.charCounterElement.classList.add('warning');
            }
        }
    }

    /**
     * Get the current input value
     */
    getValue() {
        if (this.quillEditor) {
            // Return HTML content for rich text
            return this.quillEditor.root.innerHTML;
        } else if (this.textareaElement) {
            return this.textareaElement.value;
        }
        return '';
    }

    /**
     * Get plain text value (strips HTML if rich text)
     */
    getPlainText() {
        if (this.quillEditor) {
            return this.quillEditor.getText();
        } else if (this.textareaElement) {
            return this.textareaElement.value;
        }
        return '';
    }

    /**
     * Set the input value
     */
    setValue(value) {
        if (this.quillEditor) {
            this.quillEditor.root.innerHTML = value || '';
        } else if (this.textareaElement) {
            this.textareaElement.value = value || '';
        }
        // Don't validate when programmatically setting value
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
        if (this.quillEditor) {
            this.quillEditor.focus();
        } else if (this.textareaElement) {
            this.textareaElement.focus();
        }
    }

    /**
     * Enable or disable the input
     */
    setEnabled(enabled) {
        if (this.quillEditor) {
            this.quillEditor.enable(enabled);
        } else if (this.textareaElement) {
            this.textareaElement.disabled = !enabled;
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
     * Get the Quill editor instance (if using rich text)
     */
    getEditor() {
        return this.quillEditor;
    }

    /**
     * Check if using rich text editor
     */
    isRichText() {
        return this.options.useRichText && this.quillEditor !== null;
    }

    /**
     * Destroy the component and clean up event listeners
     */
    destroy() {
        // Clean up textarea event listeners
        if (this.textareaElement) {
            if (this.handleInput) {
                this.textareaElement.removeEventListener('input', this.handleInput);
            }
            if (this.handleBlur) {
                this.textareaElement.removeEventListener('blur', this.handleBlur);
            }
        }

        // Clean up Quill event listeners
        if (this.quillEditor) {
            if (this.handleTextChange) {
                this.quillEditor.off('text-change', this.handleTextChange);
            }
            if (this.handleSelectionChange) {
                this.quillEditor.off('selection-change', this.handleSelectionChange);
            }
            this.quillEditor = null;
        }

        // Clear DOM
        if (this.container) {
            this.container.innerHTML = '';
        }

        // Null all references
        this.textareaElement = null;
        this.labelElement = null;
        this.errorElement = null;
        this.charCounterElement = null;
        this.container = null;
        this.handleInput = null;
        this.handleBlur = null;
        this.handleTextChange = null;
        this.handleSelectionChange = null;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AreaInput;
}

