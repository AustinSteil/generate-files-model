/**
 * Tabs Component
 * 
 * Manages horizontal tab navigation and content switching.
 * Handles tab activation, content display, and keyboard navigation.
 * 
 * @author Austin Steil
 * @version 1.0.0
 * @license MIT <https://raw.githubusercontent.com/AustinSteil/generate-files-model/refs/heads/main/LICENSE>
 * @copyright 2025 Austin Steil
 * @created October 18, 2025
 * @updated October 18, 2025
 */

class Tabs {
    /**
     * Initialize the tabs component
     * @param {string} containerId - ID of the tabs container element
     */
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Tabs container with ID "${containerId}" not found`);
            return;
        }
        
        this.tabButtons = this.container.querySelectorAll('.tab-button');
        this.tabPanels = this.container.querySelectorAll('.tab-panel');
        this.currentTab = 0;
        
        this.init();
    }
    
    /**
     * Initialize event listeners and set first tab as active
     */
    init() {
        // Add click listeners to all tab buttons
        this.tabButtons.forEach((button, index) => {
            button.addEventListener('click', () => this.switchTab(index));
            
            // Add keyboard navigation
            button.addEventListener('keydown', (e) => this.handleKeyboard(e, index));
        });
        
        // Activate the first tab by default
        if (this.tabButtons.length > 0) {
            this.switchTab(0);
        }
    }
    
    /**
     * Switch to a specific tab
     * @param {number} index - Index of the tab to activate
     */
    switchTab(index) {
        if (index < 0 || index >= this.tabButtons.length) {
            return;
        }
        
        // Deactivate all tabs
        this.tabButtons.forEach(button => {
            button.classList.remove('active');
            button.setAttribute('aria-selected', 'false');
            button.setAttribute('tabindex', '-1');
        });
        
        this.tabPanels.forEach(panel => {
            panel.classList.remove('active');
        });
        
        // Activate selected tab
        this.tabButtons[index].classList.add('active');
        this.tabButtons[index].setAttribute('aria-selected', 'true');
        this.tabButtons[index].setAttribute('tabindex', '0');
        this.tabPanels[index].classList.add('active');
        
        this.currentTab = index;
        
        // Emit custom event for tab change
        this.container.dispatchEvent(new CustomEvent('tabchange', {
            detail: { index, tabId: this.tabPanels[index].id }
        }));
    }
    
    /**
     * Handle keyboard navigation (arrow keys)
     * @param {KeyboardEvent} e - Keyboard event
     * @param {number} currentIndex - Current tab index
     */
    handleKeyboard(e, currentIndex) {
        let newIndex = currentIndex;
        
        switch(e.key) {
            case 'ArrowLeft':
                newIndex = currentIndex > 0 ? currentIndex - 1 : this.tabButtons.length - 1;
                break;
            case 'ArrowRight':
                newIndex = currentIndex < this.tabButtons.length - 1 ? currentIndex + 1 : 0;
                break;
            case 'Home':
                newIndex = 0;
                break;
            case 'End':
                newIndex = this.tabButtons.length - 1;
                break;
            default:
                return; // Don't prevent default for other keys
        }
        
        e.preventDefault();
        this.switchTab(newIndex);
        this.tabButtons[newIndex].focus();
    }
    
    /**
     * Get the currently active tab index
     * @returns {number} Current tab index
     */
    getCurrentTab() {
        return this.currentTab;
    }
    
    /**
     * Programmatically switch to a tab by ID
     * @param {string} tabId - ID of the tab panel to activate
     */
    switchToTabById(tabId) {
        const index = Array.from(this.tabPanels).findIndex(panel => panel.id === tabId);
        if (index !== -1) {
            this.switchTab(index);
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Tabs;
}

