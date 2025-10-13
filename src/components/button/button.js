/**
 * Reusable Button Component
 * 
 * A flexible button component based on the existing .btn styles from main.css.
 * Supports different variants, sizes, states, and click handlers.
 * 
 * Features:
 * - Multiple variants (primary, secondary, success, info, warning, error)
 * - Different sizes (small, medium, large)
 * - Disabled state support
 * - Loading state with spinner
 * - Custom click handlers
 * - Accessibility features
 * - Full dark mode support
 * 
 * @author Austin Steil
 */

class Button {
    constructor(options = {}) {
        this.options = {
            containerId: options.containerId || null,
            id: options.id || this.generateId(),
            text: options.text || 'Button',
            variant: options.variant || 'primary', // primary, secondary, success, info, warning, error
            size: options.size || 'medium', // small, medium, large
            disabled: options.disabled || false,
            loading: options.loading || false,
            type: options.type || 'button', // button, submit, reset
            onClick: options.onClick || null,
            className: options.className || '',
            fullWidth: options.fullWidth || false,
            ...options
        };

        this.container = null;
        this.buttonElement = null;
        this.isLoading = this.options.loading;
        this.isDisabled = this.options.disabled;

        this.init();
    }

    /**
     * Generate a unique ID for the button
     */
    generateId() {
        return 'button-' + Math.random().toString(36).substring(2, 11);
    }

    /**
     * Initialize the button component
     */
    init() {
        if (this.options.containerId) {
            this.container = document.getElementById(this.options.containerId);
            if (!this.container) {
                console.error(`Button container with ID "${this.options.containerId}" not found`);
                return;
            }
        }

        this.render();
        this.attachEventListeners();
    }

    /**
     * Render the button component
     */
    render() {
        const buttonClasses = this.getButtonClasses();
        const loadingHtml = this.isLoading ? '<span class="loading"></span>' : '';

        const buttonHtml = `
            <button
                type="${this.options.type}"
                id="${this.options.id}"
                class="${buttonClasses}"
                ${this.isDisabled || this.isLoading ? 'disabled' : ''}
                aria-label="${this.options.text}"
            >
                ${this.isLoading ? loadingHtml : ''}
                <span class="button-text">${this.options.text}</span>
            </button>
        `;

        if (this.container) {
            this.container.innerHTML = buttonHtml;
            this.buttonElement = this.container.querySelector('button');
        } else {
            // Return HTML string if no container specified
            return buttonHtml;
        }
    }

    /**
     * Get the appropriate CSS classes for the button
     */
    getButtonClasses() {
        const classes = ['btn', `btn-${this.options.variant}`];
        
        // Add size class
        if (this.options.size !== 'medium') {
            classes.push(`btn-${this.options.size}`);
        }
        
        // Add full width class
        if (this.options.fullWidth) {
            classes.push('btn-full-width');
        }
        
        // Add loading class
        if (this.isLoading) {
            classes.push('btn-loading');
        }
        
        // Add custom classes
        if (this.options.className) {
            classes.push(this.options.className);
        }
        
        return classes.join(' ');
    }



    /**
     * Attach event listeners
     */
    attachEventListeners() {
        if (!this.buttonElement) return;

        this.buttonElement.addEventListener('click', (e) => {
            if (this.isDisabled || this.isLoading) {
                e.preventDefault();
                return;
            }

            if (this.options.onClick && typeof this.options.onClick === 'function') {
                this.options.onClick(e, this);
            }
        });
    }

    /**
     * Set loading state
     */
    setLoading(loading = true) {
        this.isLoading = loading;
        this.updateButton();
    }

    /**
     * Set disabled state
     */
    setDisabled(disabled = true) {
        this.isDisabled = disabled;
        this.updateButton();
    }

    /**
     * Update button text
     */
    setText(text) {
        this.options.text = text;
        if (this.buttonElement) {
            const textElement = this.buttonElement.querySelector('.button-text');
            if (textElement) {
                textElement.textContent = text;
            }
        }
    }

    /**
     * Update button variant
     */
    setVariant(variant) {
        if (this.buttonElement) {
            // Remove old variant class
            this.buttonElement.classList.remove(`btn-${this.options.variant}`);
            // Add new variant class
            this.options.variant = variant;
            this.buttonElement.classList.add(`btn-${variant}`);
        }
    }

    /**
     * Update the button element
     */
    updateButton() {
        if (!this.buttonElement) return;

        // Update disabled attribute
        if (this.isDisabled || this.isLoading) {
            this.buttonElement.setAttribute('disabled', '');
        } else {
            this.buttonElement.removeAttribute('disabled');
        }

        // Update classes
        this.buttonElement.className = this.getButtonClasses();

        // Update content
        const loadingHtml = this.isLoading ? '<span class="loading"></span>' : '';

        this.buttonElement.innerHTML = `
            ${this.isLoading ? loadingHtml : ''}
            <span class="button-text">${this.options.text}</span>
        `;
    }

    /**
     * Get the button element
     */
    getElement() {
        return this.buttonElement;
    }

    /**
     * Destroy the button component
     */
    destroy() {
        if (this.buttonElement) {
            this.buttonElement.remove();
        }
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Button;
}
