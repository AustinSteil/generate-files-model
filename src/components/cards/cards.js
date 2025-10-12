/**
 * Cards Component - Reusable card selection system
 *
 * A flexible card component that supports:
 * - Multiple cards with configurable titles and content
 * - Single-select or multi-select modes
 * - Required or optional validation
 * - Responsive grid layout (auto-adjusts based on screen size)
 * - Image and text content support
 * - Integration with alert system for validation errors
 * - Full dark/light mode support
 *
 * Features:
 * - Responsive grid: 3x2 or 2x3 layout for 6 cards on desktop
 * - Auto-centering for fewer cards
 * - Click to select/deselect with visual feedback
 * - Keyboard accessible
 * - Event-driven architecture
 * - Validation integration with existing alert system
 *
 * @author Austin Steil
 * @version 1.0.0
 */

class Cards {
    /**
     * Create a new cards component
     * @param {Object} options - Configuration options
     * @param {Array} options.cards - Array of card configurations
     * @param {string} options.cards[].title - Card title
     * @param {string} options.cards[].content - Card content (HTML supported)
     * @param {string} options.cards[].image - Optional image URL
     * @param {string} options.cards[].value - Value to return when selected
     * @param {boolean} options.multiSelect - Allow multiple selections (default: false)
     * @param {boolean} options.required - Whether selection is required (default: false)
     * @param {Function} options.onChange - Callback when selection changes
     * @param {string} options.containerId - ID of container element
     * @param {string} options.gridLayout - Grid layout preference ('auto', '3x2', '2x3')
     */
    constructor(options = {}) {
        // Validate required options
        if (!options.cards || !Array.isArray(options.cards)) {
            throw new Error('Cards component requires an array of card configurations');
        }
        
        if (!options.containerId) {
            throw new Error('Cards component requires a containerId');
        }

        // Configuration
        this.cards = options.cards;
        this.multiSelect = options.multiSelect || false;
        this.required = options.required || false;
        this.onChange = options.onChange || (() => {});
        this.containerId = options.containerId;
        this.gridLayout = options.gridLayout || 'auto';
        
        // State
        this.selectedCards = new Set();
        this.element = null;
        this.cardElements = [];
        
        // Initialize
        this.init();
    }

    /**
     * Initialize the cards component
     */
    init() {
        this.createContainer();
        this.createCards();
        this.setupEventListeners();
        this.updateLayout();
    }

    /**
     * Create the main container element
     */
    createContainer() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            throw new Error(`Container element with ID "${this.containerId}" not found`);
        }

        this.element = document.createElement('div');
        this.element.className = 'cards-component';
        this.element.setAttribute('data-grid-layout', this.gridLayout);
        this.element.setAttribute('data-card-count', this.cards.length);
        
        container.appendChild(this.element);
    }

    /**
     * Create individual card elements
     */
    createCards() {
        this.cardElements = [];
        
        this.cards.forEach((cardConfig, index) => {
            const cardElement = this.createCardElement(cardConfig, index);
            this.cardElements.push(cardElement);
            this.element.appendChild(cardElement);
        });
    }

    /**
     * Create a single card element
     * @param {Object} cardConfig - Card configuration
     * @param {number} index - Card index
     * @returns {HTMLElement} Card element
     */
    createCardElement(cardConfig, index) {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-card-index', index);
        card.setAttribute('data-card-value', cardConfig.value || index);
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-pressed', 'false');

        const cardContent = `
            <div class="card-inner">
                ${cardConfig.image ? `<div class="card-image">
                    <img src="${this.escapeHtml(cardConfig.image)}" alt="${this.escapeHtml(cardConfig.title)}" />
                    ${cardConfig.pdf ? `<button class="card-expand-btn" type="button" aria-label="View full PDF" title="View full PDF">
                        <span class="expand-icon">📄</span>
                    </button>` : cardConfig.image ? `<button class="card-expand-btn" type="button" aria-label="View full image" title="View full image">
                        <span class="expand-icon">⛶</span>
                    </button>` : ''}
                </div>` : ''}
                <div class="card-content">
                    <h3 class="card-title">${this.escapeHtml(cardConfig.title)}</h3>
                    ${cardConfig.content ? `<div class="card-text">${cardConfig.content}</div>` : ''}
                </div>
                <div class="card-selection-indicator">
                    <span class="selection-icon">✓</span>
                </div>
            </div>
        `;

        card.innerHTML = cardContent;
        return card;
    }

    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Click handlers for cards and expand buttons
        this.element.addEventListener('click', (e) => {
            // Check if expand button was clicked
            const expandBtn = e.target.closest('.card-expand-btn');
            if (expandBtn) {
                e.stopPropagation(); // Prevent card selection
                this.handleExpandClick(expandBtn);
                return;
            }

            // Handle card selection
            const card = e.target.closest('.card');
            if (card) {
                this.handleCardClick(card);
            }
        });

        // Keyboard handlers
        this.element.addEventListener('keydown', (e) => {
            const expandBtn = e.target.closest('.card-expand-btn');
            if (expandBtn && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                e.stopPropagation();
                this.handleExpandClick(expandBtn);
                return;
            }

            const card = e.target.closest('.card');
            if (card && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                this.handleCardClick(card);
            }
        });
    }

    /**
     * Handle expand button click
     * @param {HTMLElement} expandBtn - Clicked expand button
     */
    handleExpandClick(expandBtn) {
        const card = expandBtn.closest('.card');
        const cardIndex = parseInt(card.getAttribute('data-card-index'));
        const cardConfig = this.cards[cardIndex];

        if (cardConfig.pdf) {
            this.showFullScreenPDF(cardConfig.pdf, cardConfig.title);
        } else if (cardConfig.image) {
            this.showFullScreenImage(cardConfig.image, cardConfig.title);
        }
    }

    /**
     * Show full-screen image modal
     * @param {string} imageSrc - Image source URL
     * @param {string} imageTitle - Image title for accessibility
     */
    showFullScreenImage(imageSrc, imageTitle) {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'card-image-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-label', `Full screen view of ${imageTitle}`);

        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <button class="modal-close" type="button" aria-label="Close full screen view" title="Close (Esc)">
                    <span class="close-icon">✕</span>
                </button>
                <img src="${this.escapeHtml(imageSrc)}" alt="${this.escapeHtml(imageTitle)}" class="modal-image" />
                <div class="modal-title">${this.escapeHtml(imageTitle)}</div>
            </div>
        `;

        // Add to document
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        // Focus the modal for accessibility
        modal.focus();

        // Event listeners for closing
        const closeModal = () => {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        };

        // Close on backdrop click
        modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);

        // Close on close button click
        modal.querySelector('.modal-close').addEventListener('click', closeModal);

        // Close on Escape key
        const handleKeydown = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleKeydown);
            }
        };
        document.addEventListener('keydown', handleKeydown);

        // Remove event listener when modal is closed
        modal.addEventListener('DOMNodeRemoved', () => {
            document.removeEventListener('keydown', handleKeydown);
        });
    }

    /**
     * Show full-screen PDF modal
     * @param {string} pdfSrc - PDF source URL
     * @param {string} pdfTitle - PDF title for accessibility
     */
    showFullScreenPDF(pdfSrc, pdfTitle) {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'card-pdf-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-label', `Full screen view of ${pdfTitle}`);

        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <button class="modal-close" type="button" aria-label="Close full screen view" title="Close (Esc)">
                    <span class="close-icon">✕</span>
                </button>
                <iframe src="${this.escapeHtml(pdfSrc)}#toolbar=0&navpanes=0&scrollbar=0" class="modal-pdf" title="${this.escapeHtml(pdfTitle)}"></iframe>
            </div>
        `;

        // Add to document
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        // Focus the modal for accessibility
        modal.focus();

        // Event listeners for closing
        const closeModal = () => {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        };

        // Close on backdrop click
        modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);

        // Close on close button click
        modal.querySelector('.modal-close').addEventListener('click', closeModal);

        // Close on Escape key
        const handleKeydown = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleKeydown);
            }
        };
        document.addEventListener('keydown', handleKeydown);

        // Remove event listener when modal is closed
        modal.addEventListener('DOMNodeRemoved', () => {
            document.removeEventListener('keydown', handleKeydown);
        });
    }

    /**
     * Handle card click/selection
     * @param {HTMLElement} cardElement - Clicked card element
     */
    handleCardClick(cardElement) {
        const cardIndex = parseInt(cardElement.getAttribute('data-card-index'));

        if (this.multiSelect) {
            // Multi-select mode
            if (this.selectedCards.has(cardIndex)) {
                this.deselectCard(cardIndex);
            } else {
                this.selectCard(cardIndex);
            }
        } else {
            // Single-select mode
            if (this.selectedCards.has(cardIndex)) {
                // Clicking same card - deselect
                this.deselectCard(cardIndex);
            } else {
                // Clicking different card - clear others and select this one
                this.clearSelection();
                this.selectCard(cardIndex);
            }
        }

        this.updateVisualState();
        this.triggerChange();
    }

    /**
     * Select a card
     * @param {number} cardIndex - Index of card to select
     */
    selectCard(cardIndex) {
        this.selectedCards.add(cardIndex);
        const cardElement = this.cardElements[cardIndex];
        cardElement.classList.add('selected');
        cardElement.setAttribute('aria-pressed', 'true');
    }

    /**
     * Deselect a card
     * @param {number} cardIndex - Index of card to deselect
     */
    deselectCard(cardIndex) {
        this.selectedCards.delete(cardIndex);
        const cardElement = this.cardElements[cardIndex];
        cardElement.classList.remove('selected');
        cardElement.setAttribute('aria-pressed', 'false');
    }

    /**
     * Clear all selections
     */
    clearSelection() {
        this.selectedCards.clear();
        this.cardElements.forEach(card => {
            card.classList.remove('selected');
            card.setAttribute('aria-pressed', 'false');
        });
    }

    /**
     * Update visual state of all cards
     */
    updateVisualState() {
        this.cardElements.forEach((card, index) => {
            if (this.selectedCards.has(index)) {
                card.classList.add('selected');
                card.setAttribute('aria-pressed', 'true');
            } else {
                card.classList.remove('selected');
                card.setAttribute('aria-pressed', 'false');
            }
        });
    }

    /**
     * Update grid layout based on card count and screen size
     */
    updateLayout() {
        const cardCount = this.cards.length;
        let layoutClass = 'cards-auto';
        
        if (this.gridLayout === 'auto') {
            if (cardCount <= 2) {
                layoutClass = 'cards-center-2';
            } else if (cardCount <= 4) {
                layoutClass = 'cards-2x2';
            } else if (cardCount <= 6) {
                layoutClass = 'cards-3x2';
            } else {
                layoutClass = 'cards-auto';
            }
        } else {
            layoutClass = `cards-${this.gridLayout}`;
        }
        
        this.element.className = `cards-component ${layoutClass}`;
    }

    /**
     * Trigger onChange callback
     */
    triggerChange() {
        const selectedValues = Array.from(this.selectedCards).map(index => {
            return {
                index: index,
                value: this.cards[index].value || index,
                title: this.cards[index].title,
                card: this.cards[index]
            };
        });
        
        this.onChange(selectedValues, this.selectedCards);
    }

    /**
     * Validate selection based on required setting
     * @returns {boolean} True if valid
     */
    validate() {
        if (this.required && this.selectedCards.size === 0) {
            return false;
        }
        return true;
    }

    /**
     * Show validation error using alert system
     * @param {string} message - Custom error message
     */
    showValidationError(message = 'Please select at least one option') {
        if (typeof window.showError === 'function') {
            window.showError(message);
        } else {
            console.error('Alert system not available:', message);
        }
    }

    /**
     * Get current selection
     * @returns {Array} Array of selected card data
     */
    getSelection() {
        return Array.from(this.selectedCards).map(index => ({
            index: index,
            value: this.cards[index].value || index,
            title: this.cards[index].title,
            card: this.cards[index]
        }));
    }

    /**
     * Set selection programmatically
     * @param {Array} values - Array of values or indices to select
     */
    setSelection(values) {
        this.clearSelection();
        
        values.forEach(value => {
            // Find card by value or index
            const cardIndex = this.cards.findIndex((card, index) => 
                (card.value || index) === value || index === value
            );
            
            if (cardIndex !== -1) {
                this.selectCard(cardIndex);
            }
        });
        
        this.updateVisualState();
        this.triggerChange();
    }

    /**
     * Escape HTML to prevent XSS
     * @param {string} text - Text to escape
     * @returns {string} Escaped text
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Destroy the component
     */
    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        this.selectedCards.clear();
        this.cardElements = [];
        this.element = null;
    }
}

// Global availability
if (typeof window !== 'undefined') {
    window.Cards = Cards;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Cards;
}
