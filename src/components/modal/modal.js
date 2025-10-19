/**
 * Modal Component - Reusable modal dialog system
 *
 * A flexible modal component that supports:
 * - Multiple modal types (dialog, fullscreen, custom)
 * - Configurable content (header, body, footer)
 * - Keyboard navigation (Esc to close, Tab trapping)
 * - Backdrop click to close
 * - Smooth animations
 * - Accessibility features (ARIA attributes, focus management)
 * - Mobile-responsive design
 *
 * Features:
 * - Promise-based API for user interactions
 * - Customizable buttons and actions
 * - Form integration support
 * - Auto-focus management
 * - Body scroll prevention
 * - Z-index management
 *
 * @author Austin Steil
 * @version 1.0.0
 * @license MIT <https://raw.githubusercontent.com/AustinSteil/generate-files-model/refs/heads/main/LICENSE>
 * @copyright 2025 Austin Steil
 * @created October 18, 2025
 * @updated October 18, 2025
 */

class Modal {
    constructor(config = {}) {
        this.config = {
            type: config.type || 'dialog', // 'dialog', 'fullscreen', 'custom'
            title: config.title || '',
            content: config.content || '',
            size: config.size || 'medium', // 'small', 'medium', 'large'
            closeable: config.closeable !== false, // Default to true
            backdrop: config.backdrop !== false, // Default to true (close on backdrop click)
            keyboard: config.keyboard !== false, // Default to true (close on Esc)
            buttons: config.buttons || [], // Array of button configs
            onShow: config.onShow || null,
            onHide: config.onHide || null,
            className: config.className || '',
            ...config
        };

        this.modal = null;
        this.isVisible = false;
        this.currentResolve = null;
        this.focusableElements = [];
        this.previousActiveElement = null;

        this.init();
    }

    /**
     * Initialize the modal component
     */
    init() {
        this.createModal();
        this.setupEventListeners();
    }

    /**
     * Create the modal HTML structure
     */
    createModal() {
        // Create modal container
        this.modal = document.createElement('div');
        this.modal.className = `modal modal-${this.config.type} ${this.config.className}`;
        this.modal.setAttribute('role', 'dialog');
        this.modal.setAttribute('aria-modal', 'true');
        this.modal.setAttribute('tabindex', '-1');
        
        if (this.config.title) {
            this.modal.setAttribute('aria-labelledby', 'modal-title');
        }

        // Create modal structure
        const modalHTML = `
            ${this.config.backdrop ? '<div class="modal-backdrop"></div>' : ''}
            <div class="modal-content modal-${this.config.size}">
                ${this.config.closeable ? '<button class="modal-close" type="button" aria-label="Close modal" title="Close (Esc)"><span class="close-icon">✕</span></button>' : ''}
                ${this.config.title ? `<div class="modal-header"><h3 id="modal-title">${this.escapeHtml(this.config.title)}</h3></div>` : ''}
                <div class="modal-body">${this.config.content}</div>
                ${this.config.buttons.length > 0 ? this.createFooter() : ''}
            </div>
        `;

        this.modal.innerHTML = modalHTML;

        // Get references to key elements
        this.backdrop = this.modal.querySelector('.modal-backdrop');
        this.content = this.modal.querySelector('.modal-content');
        this.closeBtn = this.modal.querySelector('.modal-close');
        this.header = this.modal.querySelector('.modal-header');
        this.body = this.modal.querySelector('.modal-body');
        this.footer = this.modal.querySelector('.modal-footer');
    }

    /**
     * Create footer with buttons
     */
    createFooter() {
        const buttons = this.config.buttons.map(btn => {
            const variant = btn.variant || 'secondary';
            const disabled = btn.disabled ? 'disabled' : '';
            return `<button type="button" class="btn btn-${variant}" data-action="${btn.action}" ${disabled}>${this.escapeHtml(btn.text)}</button>`;
        }).join('');

        return `<div class="modal-footer">${buttons}</div>`;
    }

    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Backdrop click
        if (this.backdrop && this.config.backdrop) {
            this.backdrop.addEventListener('click', () => this.hide());
        }

        // Close button
        if (this.closeBtn && this.config.closeable) {
            this.closeBtn.addEventListener('click', () => this.hide());
        }

        // Keyboard events
        if (this.config.keyboard) {
            this.modal.addEventListener('keydown', (e) => this.handleKeydown(e));
        }

        // Button clicks
        if (this.footer) {
            this.footer.addEventListener('click', (e) => {
                const button = e.target.closest('[data-action]');
                if (button) {
                    const action = button.getAttribute('data-action');
                    this.handleButtonClick(action, button);
                }
            });
        }
    }

    /**
     * Handle keyboard events
     */
    handleKeydown(e) {
        if (e.key === 'Escape' && this.config.keyboard) {
            e.preventDefault();
            this.hide();
        } else if (e.key === 'Tab') {
            this.trapFocus(e);
        }
    }

    /**
     * Trap focus within modal
     */
    trapFocus(e) {
        if (this.focusableElements.length === 0) return;

        const firstElement = this.focusableElements[0];
        const lastElement = this.focusableElements[this.focusableElements.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }

    /**
     * Handle button clicks
     */
    handleButtonClick(action, button) {
        const buttonConfig = this.config.buttons.find(btn => btn.action === action);
        
        if (buttonConfig && buttonConfig.handler) {
            const result = buttonConfig.handler(this);
            if (result === false) return; // Don't close modal if handler returns false
        }

        // Resolve promise with action
        if (this.currentResolve) {
            this.currentResolve(action);
            this.currentResolve = null;
        }

        this.hide();
    }

    /**
     * Show the modal
     * @returns {Promise} Promise that resolves with user action
     */
    show() {
        return new Promise((resolve) => {
            this.currentResolve = resolve;
            
            // Store current active element
            this.previousActiveElement = document.activeElement;
            
            // Add to DOM
            document.body.appendChild(this.modal);
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
            
            // Show modal
            this.modal.style.display = 'flex';
            this.isVisible = true;
            
            // Trigger animation
            setTimeout(() => {
                this.modal.classList.add('modal-show');
            }, 10);
            
            // Set up focus management
            this.setupFocusManagement();
            
            // Call onShow callback
            if (this.config.onShow) {
                this.config.onShow(this);
            }
        });
    }

    /**
     * Hide the modal
     */
    hide() {
        if (!this.isVisible) return;

        this.modal.classList.add('modal-hide');
        this.modal.classList.remove('modal-show');
        
        setTimeout(() => {
            if (this.modal && this.modal.parentNode) {
                this.modal.parentNode.removeChild(this.modal);
            }
            
            // Restore body scroll
            document.body.style.overflow = '';
            
            // Restore focus
            if (this.previousActiveElement) {
                this.previousActiveElement.focus();
            }
            
            this.isVisible = false;
            
            // Call onHide callback
            if (this.config.onHide) {
                this.config.onHide(this);
            }
            
            // Resolve with null if no action was taken
            if (this.currentResolve) {
                this.currentResolve(null);
                this.currentResolve = null;
            }
        }, 300); // Match CSS animation duration
    }

    /**
     * Set up focus management
     */
    setupFocusManagement() {
        // Get all focusable elements
        this.focusableElements = this.modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        // Focus first focusable element or modal itself
        if (this.focusableElements.length > 0) {
            this.focusableElements[0].focus();
        } else {
            this.modal.focus();
        }
    }

    /**
     * Update modal content
     */
    updateContent(content) {
        if (this.body) {
            this.body.innerHTML = content;
            this.setupFocusManagement(); // Refresh focus management
        }
    }

    /**
     * Update modal title
     */
    updateTitle(title) {
        const titleElement = this.modal.querySelector('#modal-title');
        if (titleElement) {
            titleElement.textContent = title;
        }
    }

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Destroy the modal and clean up
     */
    destroy() {
        if (this.isVisible) {
            this.hide();
        }
        
        setTimeout(() => {
            if (this.modal && this.modal.parentNode) {
                this.modal.parentNode.removeChild(this.modal);
            }
        }, 350);
    }
}

// Global availability
if (typeof window !== 'undefined') {
    window.Modal = Modal;
}
