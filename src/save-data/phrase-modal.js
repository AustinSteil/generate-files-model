/**
 * Security Phrase Modal Component
 * 
 * A reusable modal component for securely collecting user phrases for encryption/decryption.
 * Provides a clean, accessible interface with proper keyboard navigation and validation.
 * 
 * @author Austin Steil
 * @version 1.0.0
 */

class PhraseModal {
    constructor() {
        this.modal = null;
        this.isInitialized = false;
        this.currentResolve = null;
        this.minPhraseLength = 4;
        this.init();
    }

    /**
     * Initialize the modal component
     */
    init() {
        if (this.isInitialized) return;
        
        this.createModal();
        this.setupEventListeners();
        this.isInitialized = true;
    }

    /**
     * Create the modal HTML structure
     */
    createModal() {
        // Check if modal already exists
        if (document.getElementById('phraseModal')) {
            this.modal = document.getElementById('phraseModal');
            return;
        }

        // Create modal HTML
        const modalHTML = `
            <div id="phraseModal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <span class="close">&times;</span>
                        <h3 id="modalTitle">Enter Security Phrase</h3>
                    </div>
                    <div class="modal-body">
                        <p id="modalDescription">Enter a phrase to encrypt your information securely.</p>
                        <div class="form-group">
                            <label for="securityPhrase">Security Phrase:</label>
                            <input type="password" id="securityPhrase" placeholder="Enter at least 4 characters" autocomplete="off">
                            <small id="phraseHelpText">This phrase encrypts your data. Remember it to load your information later!</small>
                        </div>
                        <div id="phraseError" class="phrase-error" style="display: none;"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="modalCancel" class="btn btn-secondary">Cancel</button>
                        <button type="button" id="modalConfirm" class="btn btn-primary">Confirm</button>
                    </div>
                </div>
            </div>
        `;

        // Add modal to document
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('phraseModal');
        
        // Get references to modal elements
        this.modalTitle = document.getElementById('modalTitle');
        this.modalDescription = document.getElementById('modalDescription');
        this.phraseInput = document.getElementById('securityPhrase');
        this.phraseError = document.getElementById('phraseError');
        this.phraseHelpText = document.getElementById('phraseHelpText');
        this.confirmBtn = document.getElementById('modalConfirm');
        this.cancelBtn = document.getElementById('modalCancel');
        this.closeBtn = this.modal.querySelector('.close');
    }

    /**
     * Set up event listeners for the modal
     */
    setupEventListeners() {
        // Real-time validation on input
        this.phraseInput.addEventListener('input', () => {
            this.validatePhrase();
        });

        // Handle Enter and Escape keys
        this.phraseInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.handleConfirm();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                this.handleCancel();
            }
        });

        // Close modal when clicking outside
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.handleCancel();
            }
        });
    }

    /**
     * Show the modal for a specific action
     * @param {string} action - 'save' or 'load'
     * @returns {Promise<string|null>} User phrase or null if cancelled
     */
    async show(action = 'save') {
        return new Promise((resolve) => {
            this.currentResolve = resolve;
            this.setupModalContent(action);
            this.showModal();
        });
    }

    /**
     * Set up modal content based on action
     * @param {string} action - 'save' or 'load'
     */
    setupModalContent(action) {
        // Set modal title
        this.modalTitle.textContent = `${action === 'save' ? 'Save' : 'Load'} Information Securely`;
        
        // Set description based on action
        if (action === 'save') {
            // Get expiration days from secure storage if available
            const expirationDays = window.SecureStorage ? new window.SecureStorage().getExpirationDays() : 30;
            this.modalDescription.innerHTML = `
                <strong>Create a security phrase to encrypt your information.</strong><br>
                This phrase will be used to encrypt your data before storing it in cookies.
                Remember this phrase - you'll need it to load your information later!<br>
                <small>Saved data will expire in ${expirationDays} days.</small>
            `;
            this.phraseHelpText.textContent = 'Choose a memorable phrase that\'s at least 4 characters long.';
        } else {
            this.modalDescription.innerHTML = `
                <strong>Enter your security phrase to decrypt your saved information.</strong><br>
                Use the same phrase you used when saving your information.
            `;
            this.phraseHelpText.textContent = 'Enter the exact phrase you used when saving your data.';
        }

        // Clear previous state
        this.phraseInput.value = '';
        this.hideError();
        this.validatePhrase();
    }

    /**
     * Show the modal
     */
    showModal() {
        this.modal.style.display = 'block';
        this.phraseInput.focus();
        
        // Add event listeners (remove any existing ones first)
        this.removeEventListeners();
        this.confirmBtn.addEventListener('click', this.handleConfirm.bind(this));
        this.cancelBtn.addEventListener('click', this.handleCancel.bind(this));
        this.closeBtn.addEventListener('click', this.handleCancel.bind(this));
        
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    }

    /**
     * Hide the modal
     */
    hideModal() {
        this.modal.style.display = 'none';
        this.removeEventListeners();
        
        // Restore body scroll
        document.body.style.overflow = '';
    }

    /**
     * Remove event listeners
     */
    removeEventListeners() {
        this.confirmBtn.removeEventListener('click', this.handleConfirm.bind(this));
        this.cancelBtn.removeEventListener('click', this.handleCancel.bind(this));
        this.closeBtn.removeEventListener('click', this.handleCancel.bind(this));
    }

    /**
     * Handle confirm button click
     */
    handleConfirm() {
        const phrase = this.phraseInput.value.trim();
        
        if (!this.isValidPhrase(phrase)) {
            this.showError(`Please enter a phrase that's at least ${this.minPhraseLength} characters long.`);
            this.phraseInput.focus();
            return;
        }

        this.hideModal();
        if (this.currentResolve) {
            this.currentResolve(phrase);
            this.currentResolve = null;
        }
    }

    /**
     * Handle cancel/close
     */
    handleCancel() {
        this.hideModal();
        if (this.currentResolve) {
            this.currentResolve(null);
            this.currentResolve = null;
        }
    }

    /**
     * Validate the current phrase
     */
    validatePhrase() {
        const phrase = this.phraseInput.value.trim();
        const isValid = this.isValidPhrase(phrase);
        
        // Update confirm button state
        this.confirmBtn.disabled = !isValid;
        
        // Update input styling
        if (phrase.length > 0) {
            this.phraseInput.classList.toggle('valid', isValid);
            this.phraseInput.classList.toggle('invalid', !isValid);
        } else {
            this.phraseInput.classList.remove('valid', 'invalid');
        }
        
        return isValid;
    }

    /**
     * Check if phrase is valid
     * @param {string} phrase - Phrase to validate
     * @returns {boolean} True if valid
     */
    isValidPhrase(phrase) {
        return phrase && phrase.length >= this.minPhraseLength;
    }

    /**
     * Show error message
     * @param {string} message - Error message to display
     */
    showError(message) {
        this.phraseError.textContent = message;
        this.phraseError.style.display = 'block';
        this.phraseInput.classList.add('error');
    }

    /**
     * Hide error message
     */
    hideError() {
        this.phraseError.style.display = 'none';
        this.phraseInput.classList.remove('error');
    }

    /**
     * Set minimum phrase length
     * @param {number} length - Minimum length
     */
    setMinPhraseLength(length) {
        this.minPhraseLength = Math.max(1, length);
        this.phraseInput.placeholder = `Enter at least ${this.minPhraseLength} characters`;
    }

    /**
     * Destroy the modal and clean up
     */
    destroy() {
        if (this.modal) {
            this.hideModal();
            this.modal.remove();
            this.modal = null;
            this.isInitialized = false;
        }
    }
}

// Create global instance
window.phraseModal = new PhraseModal();
