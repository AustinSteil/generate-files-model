/**
 * Toggle Component - Reusable toggle switch
 *
 * A flexible toggle component that supports:
 * - On/off states
 * - Custom icons
 * - Labels
 * - Callbacks on state change
 * - Accessible keyboard navigation
 * - Initial state configuration
 *
 * Features:
 * - Clean, modern design
 * - Smooth animations
 * - Keyboard accessible (Space/Enter to toggle)
 * - Screen reader friendly
 * - Event-driven architecture
 *
 * @author Austin Steil
 * @version 1.0.0
 */

class Toggle {
    /**
     * Create a new toggle component
     * @param {Object} options - Configuration options
     * @param {string} options.label - Label text for the toggle
     * @param {boolean} options.initialState - Initial state (true = on, false = off)
     * @param {string} options.iconOn - Icon to show when toggle is on (emoji or text)
     * @param {string} options.iconOff - Icon to show when toggle is off (emoji or text)
     * @param {Function} options.onChange - Callback function when state changes
     * @param {boolean} options.disabled - Whether the toggle is disabled
     */
    constructor(options = {}) {
        this.label = options.label || '';
        this.state = options.initialState !== undefined ? options.initialState : false;
        this.iconOn = options.iconOn || '✓';
        this.iconOff = options.iconOff || '';
        this.onChange = options.onChange || (() => {});
        this.disabled = options.disabled || false;
        
        this.element = null;
        this.switchElement = null;
        this.inputElement = null;
        
        this.init();
    }

    /**
     * Initialize the toggle component
     */
    init() {
        this.createElement();
        this.attachEventListeners();
        this.updateUI();
    }

    /**
     * Create the toggle DOM element
     */
    createElement() {
        // Create container
        this.element = document.createElement('div');
        this.element.className = 'toggle-container';
        if (this.disabled) {
            this.element.classList.add('disabled');
        }

        // Create hidden checkbox for accessibility
        this.inputElement = document.createElement('input');
        this.inputElement.type = 'checkbox';
        this.inputElement.className = 'toggle-input';
        this.inputElement.checked = this.state;
        this.inputElement.disabled = this.disabled;
        this.inputElement.setAttribute('role', 'switch');
        this.inputElement.setAttribute('aria-checked', this.state);

        // Create switch element
        this.switchElement = document.createElement('div');
        this.switchElement.className = 'toggle-switch';
        if (this.state) {
            this.switchElement.classList.add('active');
        }

        // Create thumb with icons
        const thumb = document.createElement('div');
        thumb.className = 'toggle-thumb';

        const iconOffElement = document.createElement('span');
        iconOffElement.className = 'toggle-icon toggle-icon-off';
        iconOffElement.textContent = this.iconOff;

        const iconOnElement = document.createElement('span');
        iconOnElement.className = 'toggle-icon toggle-icon-on';
        iconOnElement.textContent = this.iconOn;

        thumb.appendChild(iconOffElement);
        thumb.appendChild(iconOnElement);
        this.switchElement.appendChild(thumb);

        // Create label if provided
        if (this.label) {
            const labelElement = document.createElement('span');
            labelElement.className = 'toggle-label';
            labelElement.textContent = this.label;
            this.element.appendChild(labelElement);
        }

        // Assemble the component
        this.element.appendChild(this.inputElement);
        this.element.appendChild(this.switchElement);
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Click event
        this.element.addEventListener('click', (e) => {
            if (!this.disabled) {
                this.toggle();
            }
        });

        // Keyboard events
        this.element.addEventListener('keydown', (e) => {
            if (!this.disabled && (e.key === ' ' || e.key === 'Enter')) {
                e.preventDefault();
                this.toggle();
            }
        });

        // Make focusable
        this.element.setAttribute('tabindex', '0');
    }

    /**
     * Toggle the state
     */
    toggle() {
        this.setState(!this.state);
    }

    /**
     * Set the state
     * @param {boolean} newState - New state value
     */
    setState(newState) {
        if (this.disabled) return;

        const oldState = this.state;
        this.state = newState;
        this.updateUI();

        // Call onChange callback if state actually changed
        if (oldState !== newState) {
            this.onChange(this.state);
        }
    }

    /**
     * Update the UI to reflect current state
     */
    updateUI() {
        if (this.state) {
            this.switchElement.classList.add('active');
        } else {
            this.switchElement.classList.remove('active');
        }

        this.inputElement.checked = this.state;
        this.inputElement.setAttribute('aria-checked', this.state);
    }

    /**
     * Get current state
     * @returns {boolean} Current state
     */
    getState() {
        return this.state;
    }

    /**
     * Enable the toggle
     */
    enable() {
        this.disabled = false;
        this.element.classList.remove('disabled');
        this.inputElement.disabled = false;
    }

    /**
     * Disable the toggle
     */
    disable() {
        this.disabled = true;
        this.element.classList.add('disabled');
        this.inputElement.disabled = true;
    }

    /**
     * Get the DOM element
     * @returns {HTMLElement} The toggle element
     */
    getElement() {
        return this.element;
    }

    /**
     * Destroy the toggle and clean up
     */
    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        this.element = null;
        this.switchElement = null;
        this.inputElement = null;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Toggle;
}

