/**
 * Security Phrase Modal Component
 *
 * A reusable modal component for securely collecting user phrases for encryption/decryption.
 * Now uses the centralized Modal component for consistent styling and behavior.
 *
 * @author Austin Steil
 * @version 2.0.0
 */

class PhraseModal {
    constructor() {
        this.modal = null;
        this.minPhraseLength = 4;
        this.currentAction = 'save';
    }

    /**
     * Create the form content for the modal
     * @param {string} action - 'save' or 'load'
     * @returns {string} HTML content for the modal body
     */
    createFormContent(action) {
        // Get expiration days for save action
        const expirationDays = window.SecureStorage ? new window.SecureStorage().getExpirationDays() : 30;

        const description = action === 'save'
            ? `<strong>Create a security phrase to encrypt your information.</strong><br>
               This phrase will be used to encrypt your data before storing it in cookies.
               Remember this phrase - you'll need it to load your information later!<br>
               <small>Saved data will expire in ${expirationDays} days.</small>`
            : `<strong>Enter your security phrase to decrypt your saved information.</strong><br>
               Use the same phrase you used when saving your information.`;

        const helpText = action === 'save'
            ? 'Choose a memorable phrase that\'s at least 4 characters long.'
            : 'Enter the exact phrase you used when saving your data.';

        return `
            <p>${description}</p>
            <div class="form-group">
                <label for="securityPhrase">Security Phrase:</label>
                <input type="password" id="securityPhrase" placeholder="Enter at least ${this.minPhraseLength} characters" autocomplete="off">
                <small id="phraseHelpText">${helpText}</small>
            </div>
            <div id="phraseError" class="error" style="display: none;"></div>
        `;
    }

    /**
     * Set up event listeners for the phrase input
     */
    setupInputListeners() {
        const phraseInput = this.modal.modal.querySelector('#securityPhrase');
        const confirmBtn = this.modal.modal.querySelector('[data-action="confirm"]');

        if (!phraseInput || !confirmBtn) return;

        // Real-time validation on input
        phraseInput.addEventListener('input', () => {
            this.validatePhrase();
        });

        // Handle Enter key
        phraseInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (this.isValidPhrase(phraseInput.value.trim())) {
                    confirmBtn.click();
                }
            }
        });

        // Initial validation
        this.validatePhrase();

        // Focus the input
        setTimeout(() => phraseInput.focus(), 100);
    }

    /**
     * Show the modal for a specific action
     * @param {string} action - 'save' or 'load'
     * @returns {Promise<string|null>} User phrase or null if cancelled
     */
    async show(action = 'save') {
        this.currentAction = action;

        // Create modal with reusable Modal component
        this.modal = new Modal({
            title: `${action === 'save' ? 'Save' : 'Load'} Information Securely`,
            content: this.createFormContent(action),
            size: 'medium',
            buttons: [
                {
                    text: 'Cancel',
                    action: 'cancel',
                    variant: 'secondary'
                },
                {
                    text: 'Confirm',
                    action: 'confirm',
                    variant: 'primary',
                    handler: (modal) => {
                        return this.handleConfirm(modal);
                    }
                }
            ],
            onShow: () => {
                this.setupInputListeners();
            }
        });

        const result = await this.modal.show();

        // Return the phrase if confirmed, null otherwise
        if (result === 'confirm') {
            const phraseInput = this.modal.modal.querySelector('#securityPhrase');
            return phraseInput ? phraseInput.value.trim() : null;
        }

        return null;
    }

    /**
     * Handle confirm button click
     * @param {Modal} modal - The modal instance
     * @returns {boolean} False to prevent modal from closing if validation fails
     */
    handleConfirm(modal) {
        const phraseInput = modal.modal.querySelector('#securityPhrase');
        const phrase = phraseInput ? phraseInput.value.trim() : '';

        if (!this.isValidPhrase(phrase)) {
            this.showError(`Please enter a phrase that's at least ${this.minPhraseLength} characters long.`);
            if (phraseInput) phraseInput.focus();
            return false; // Prevent modal from closing
        }

        this.hideError();
        return true; // Allow modal to close
    }

    /**
     * Validate the current phrase
     */
    validatePhrase() {
        if (!this.modal || !this.modal.modal) return false;

        const phraseInput = this.modal.modal.querySelector('#securityPhrase');
        const confirmBtn = this.modal.modal.querySelector('[data-action="confirm"]');

        if (!phraseInput || !confirmBtn) return false;

        const phrase = phraseInput.value.trim();
        const isValid = this.isValidPhrase(phrase);

        // Update confirm button state
        confirmBtn.disabled = !isValid;

        // Update input styling
        if (phrase.length > 0) {
            phraseInput.classList.toggle('valid', isValid);
            phraseInput.classList.toggle('invalid', !isValid);
        } else {
            phraseInput.classList.remove('valid', 'invalid');
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
        if (!this.modal || !this.modal.modal) return;

        const phraseError = this.modal.modal.querySelector('#phraseError');
        const phraseInput = this.modal.modal.querySelector('#securityPhrase');

        if (phraseError) {
            phraseError.textContent = message;
            phraseError.style.display = 'block';
        }

        if (phraseInput) {
            phraseInput.classList.add('invalid');
        }
    }

    /**
     * Hide error message
     */
    hideError() {
        if (!this.modal || !this.modal.modal) return;

        const phraseError = this.modal.modal.querySelector('#phraseError');
        const phraseInput = this.modal.modal.querySelector('#securityPhrase');

        if (phraseError) {
            phraseError.style.display = 'none';
        }

        if (phraseInput) {
            phraseInput.classList.remove('invalid');
        }
    }

    /**
     * Set minimum phrase length
     * @param {number} length - Minimum length
     */
    setMinPhraseLength(length) {
        this.minPhraseLength = Math.max(1, length);
    }

    /**
     * Destroy the modal and clean up
     */
    destroy() {
        if (this.modal) {
            this.modal.destroy();
            this.modal = null;
        }
    }
}

// Create global instance
window.phraseModal = new PhraseModal();
