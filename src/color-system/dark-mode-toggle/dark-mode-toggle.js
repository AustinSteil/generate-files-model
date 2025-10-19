/**
 * Dark Mode Toggle Component
 *
 * Manages dark mode state for the application with:
 * - System preference detection
 * - Local storage persistence
 * - Smooth transitions
 * - Manual override capability
 * - Floating toggle button
 *
 * Features:
 * - Detects system dark mode preference on load
 * - Allows user to manually toggle dark mode
 * - Saves preference to localStorage
 * - Applies dark mode class to document
 * - Beautiful floating toggle button
 *
 * @author Austin Steil
 * @version 1.0.0
 * @license MIT <https://raw.githubusercontent.com/AustinSteil/generate-files-model/refs/heads/main/LICENSE>
 * @copyright 2025 Austin Steil
 * @created October 18, 2025
 * @updated October 18, 2025
 */

class DarkModeToggle {
    /**
     * Initialize the dark mode toggle
     */
    constructor() {
        this.darkModeEnabled = false;
        this.toggle = null;
        this.container = null;
        
        // Local storage key
        this.STORAGE_KEY = 'darkModePreference';
        
        this.init();
    }

    /**
     * Initialize dark mode
     */
    init() {
        // Determine initial state
        this.darkModeEnabled = this.getInitialState();
        
        // Apply dark mode if needed
        this.applyDarkMode(this.darkModeEnabled);
        
        // Create the floating toggle button
        this.createFloatingToggle();
        
        // Listen for system preference changes
        this.watchSystemPreference();
    }

    /**
     * Get initial dark mode state
     * Priority: localStorage > system preference > false
     * @returns {boolean} Initial dark mode state
     */
    getInitialState() {
        // Check if user has a saved preference
        const savedPreference = localStorage.getItem(this.STORAGE_KEY);
        
        if (savedPreference !== null) {
            return savedPreference === 'true';
        }
        
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return true;
        }
        
        return false;
    }

    /**
     * Create the floating toggle button
     */
    createFloatingToggle() {
        // Create container
        this.container = document.createElement('div');
        this.container.className = 'floating-dark-mode-toggle';

        // Create button wrapper
        const buttonWrapper = document.createElement('div');
        buttonWrapper.className = 'dark-mode-toggle-btn';

        // Create icon
        const icon = document.createElement('span');
        icon.className = 'dark-mode-icon';
        this.iconElement = icon;

        // Create text
        const text = document.createElement('span');
        text.className = 'dark-mode-text';
        text.textContent = this.darkModeEnabled ? 'Dark Mode' : 'Light Mode';
        this.textElement = text;

        // Create toggle using the Toggle component
        this.toggle = new Toggle({
            label: '',
            initialState: this.darkModeEnabled,
            iconOn: '🌙',
            iconOff: '☀️',
            onChange: (state) => {
                this.setDarkMode(state);
            }
        });

        // Assemble the button
        buttonWrapper.appendChild(icon);
        buttonWrapper.appendChild(this.toggle.getElement());
        buttonWrapper.appendChild(text);

        this.container.appendChild(buttonWrapper);

        // Add to page
        document.body.appendChild(this.container);
    }

    /**
     * Apply dark mode to the document
     * @param {boolean} enabled - Whether dark mode should be enabled
     */
    applyDarkMode(enabled) {
        if (enabled) {
            document.documentElement.classList.add('dark-mode');
        } else {
            document.documentElement.classList.remove('dark-mode');
        }
    }

    /**
     * Set dark mode state
     * @param {boolean} enabled - Whether to enable dark mode
     */
    setDarkMode(enabled) {
        this.darkModeEnabled = enabled;
        
        // Apply to document
        this.applyDarkMode(enabled);
        
        // Save to localStorage
        localStorage.setItem(this.STORAGE_KEY, enabled.toString());
        
        // Update UI
        this.updateUI();
    }

    /**
     * Update the UI to reflect current state
     */
    updateUI() {
        if (this.textElement) {
            this.textElement.textContent = this.darkModeEnabled ? 'Dark Mode' : 'Light Mode';
        }
    }

    /**
     * Toggle dark mode
     */
    toggleDarkMode() {
        this.setDarkMode(!this.darkModeEnabled);
    }

    /**
     * Watch for system preference changes
     */
    watchSystemPreference() {
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            // Listen for changes
            mediaQuery.addEventListener('change', (e) => {
                // Only auto-update if user hasn't set a manual preference
                const savedPreference = localStorage.getItem(this.STORAGE_KEY);
                if (savedPreference === null) {
                    this.setDarkMode(e.matches);
                    if (this.toggle) {
                        this.toggle.setState(e.matches);
                    }
                }
            });
        }
    }

    /**
     * Get current dark mode state
     * @returns {boolean} Current dark mode state
     */
    isDarkMode() {
        return this.darkModeEnabled;
    }

    /**
     * Clear saved preference (revert to system preference)
     */
    clearPreference() {
        localStorage.removeItem(this.STORAGE_KEY);
        const systemPreference = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.setDarkMode(systemPreference);
        if (this.toggle) {
            this.toggle.setState(systemPreference);
        }
    }

    /**
     * Destroy the dark mode toggle
     */
    destroy() {
        if (this.toggle) {
            this.toggle.destroy();
        }
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
        this.container = null;
        this.toggle = null;
    }
}

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.darkModeToggle = new DarkModeToggle();
        });
    } else {
        window.darkModeToggle = new DarkModeToggle();
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DarkModeToggle;
}

