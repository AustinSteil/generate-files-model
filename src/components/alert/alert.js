/**
 * Alert Component - Floating alert notification system
 *
 * A flexible alert component that supports:
 * - Multiple alert types (success, warning, error) with color coding
 * - Configurable auto-dismiss with custom duration
 * - User-dismissible alerts with close button
 * - Multiple alerts stacking vertically
 * - Smooth animations for show/hide
 * - Responsive design
 *
 * Features:
 * - Red, yellow, green color themes
 * - Auto-disappear with configurable seconds
 * - Optional close button for manual dismissal
 * - Multiple alerts stack on top of each other
 * - Array-based alert management
 * - Smooth slide-in/slide-out animations
 *
 * @author Austin Steil
 * @version 1.0.0
 */

class AlertManager {
    /**
     * Initialize the alert system
     */
    constructor() {
        this.alerts = []; // Array to store active alerts
        this.alertContainer = null;
        this.alertIdCounter = 0; // Unique ID generator for alerts

        // Configuration constants
        this.ANIMATION_DURATION = 300; // Animation duration in ms
        this.STACK_SPACING = 2; // Space between stacked alerts (ultra-tight spacing)
        this.DEFAULT_DURATION = 5; // Default auto-dismiss duration in seconds

        this.init();
    }

    /**
     * Initialize the alert system
     */
    init() {
        this.createAlertContainer();
    }

    /**
     * Create the main alert container
     */
    createAlertContainer() {
        this.alertContainer = document.createElement('div');
        this.alertContainer.className = 'alert-container';
        document.body.appendChild(this.alertContainer);
    }

    /**
     * Show an alert with specified configuration
     * @param {Object} config - Alert configuration
     * @param {string} config.message - Alert message text
     * @param {string} config.type - Alert type ('success', 'warning', 'error')
     * @param {boolean} config.autoDisappear - Whether alert auto-dismisses (default: true)
     * @param {number} config.duration - Duration in seconds before auto-dismiss (default: 5)
     * @param {boolean} config.closeable - Whether alert can be manually closed (default: true)
     * @returns {string} Alert ID for manual dismissal
     */
    show(config = {}) {
        const alertConfig = {
            message: config.message || 'Alert message',
            type: config.type || 'success',
            autoDisappear: config.autoDisappear !== false, // Default to true
            duration: config.duration || this.DEFAULT_DURATION,
            closeable: config.closeable !== false, // Default to true
            id: `alert-${++this.alertIdCounter}`
        };

        // Validate alert type
        if (!['success', 'warning', 'error'].includes(alertConfig.type)) {
            console.warn(`Alert: Invalid type "${alertConfig.type}". Using "success" instead.`);
            alertConfig.type = 'success';
        }

        // Create alert element
        const alertElement = this.createAlertElement(alertConfig);

        // Add to alerts array
        this.alerts.push({
            id: alertConfig.id,
            element: alertElement,
            config: alertConfig,
            timeoutId: null
        });

        // Add to DOM
        this.alertContainer.appendChild(alertElement);

        // Position all alerts
        this.repositionAlerts();

        // Trigger show animation
        setTimeout(() => {
            alertElement.classList.add('alert-show');
        }, 10);

        // Set up auto-dismiss if enabled
        if (alertConfig.autoDisappear) {
            this.setAutoDisappear(alertConfig.id, alertConfig.duration);
        }

        return alertConfig.id;
    }

    /**
     * Create an alert DOM element
     * @param {Object} config - Alert configuration
     * @returns {HTMLElement} Alert element
     */
    createAlertElement(config) {
        const alertElement = document.createElement('div');
        alertElement.className = `alert alert-${config.type}`;
        alertElement.setAttribute('data-alert-id', config.id);

        alertElement.innerHTML = `
            <div class="alert-content">
                <span class="alert-icon">${this.getAlertIcon(config.type)}</span>
                <span class="alert-message">${this.escapeHtml(config.message)}</span>
                ${config.closeable ? '<button class="alert-close" type="button">&times;</button>' : ''}
            </div>
        `;

        // Add close button event listener if closeable
        if (config.closeable) {
            const closeButton = alertElement.querySelector('.alert-close');
            closeButton.addEventListener('click', () => {
                this.dismiss(config.id);
            });
        }

        return alertElement;
    }

    /**
     * Get icon for alert type
     * @param {string} type - Alert type
     * @returns {string} Icon character
     */
    getAlertIcon(type) {
        const icons = {
            success: '✓',
            warning: '⚠',
            error: '✕'
        };
        return icons[type] || icons.success;
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
     * Set auto-disappear timeout for an alert
     * @param {string} alertId - Alert ID
     * @param {number} duration - Duration in seconds
     */
    setAutoDisappear(alertId, duration) {
        const alert = this.alerts.find(a => a.id === alertId);
        if (alert) {
            alert.timeoutId = setTimeout(() => {
                this.dismiss(alertId);
            }, duration * 1000);
        }
    }

    /**
     * Dismiss an alert by ID
     * @param {string} alertId - Alert ID to dismiss
     */
    dismiss(alertId) {
        const alertIndex = this.alerts.findIndex(a => a.id === alertId);
        if (alertIndex === -1) return;

        const alert = this.alerts[alertIndex];

        // Clear timeout if exists
        if (alert.timeoutId) {
            clearTimeout(alert.timeoutId);
        }

        // Add hide animation
        alert.element.classList.add('alert-hide');

        // Remove from DOM after animation
        setTimeout(() => {
            if (alert.element.parentNode) {
                alert.element.parentNode.removeChild(alert.element);
            }

            // Remove from alerts array
            this.alerts.splice(alertIndex, 1);

            // Reposition remaining alerts
            this.repositionAlerts();
        }, this.ANIMATION_DURATION);
    }

    /**
     * Dismiss all alerts
     */
    dismissAll() {
        // Create a copy of the alerts array to avoid issues with array modification during iteration
        const alertsToRemove = [...this.alerts];
        alertsToRemove.forEach(alert => {
            this.dismiss(alert.id);
        });
    }

    /**
     * Reposition all alerts in the stack
     */
    repositionAlerts() {
        let cumulativeTop = 0;
        this.alerts.forEach((alert) => {
            alert.element.style.top = `${cumulativeTop}px`;

            // Calculate the actual height of this alert for the next one
            const alertRect = alert.element.getBoundingClientRect();
            const alertHeight = alertRect.height || this.getDefaultAlertHeight();
            cumulativeTop += alertHeight + this.STACK_SPACING;
        });
    }

    /**
     * Get the default height for alerts when actual height can't be measured
     * @returns {number} Default alert height in pixels
     */
    getDefaultAlertHeight() {
        // Much smaller default height that matches our compact design
        return 44; // Reduced from 60px to match compact padding
    }

    /**
     * Convenience method to show success alert
     * @param {string} message - Success message
     * @param {Object} options - Additional options
     * @returns {string} Alert ID
     */
    success(message, options = {}) {
        return this.show({
            message,
            type: 'success',
            ...options
        });
    }

    /**
     * Convenience method to show warning alert
     * @param {string} message - Warning message
     * @param {Object} options - Additional options
     * @returns {string} Alert ID
     */
    warning(message, options = {}) {
        return this.show({
            message,
            type: 'warning',
            ...options
        });
    }

    /**
     * Convenience method to show error alert
     * @param {string} message - Error message
     * @param {Object} options - Additional options
     * @returns {string} Alert ID
     */
    error(message, options = {}) {
        return this.show({
            message,
            type: 'error',
            ...options
        });
    }

    /**
     * Get count of active alerts
     * @returns {number} Number of active alerts
     */
    getActiveCount() {
        return this.alerts.length;
    }

    /**
     * Get all active alert IDs
     * @returns {Array<string>} Array of alert IDs
     */
    getActiveAlertIds() {
        return this.alerts.map(alert => alert.id);
    }

    /**
     * Check if a specific alert is active
     * @param {string} alertId - Alert ID to check
     * @returns {boolean} Whether the alert is active
     */
    isAlertActive(alertId) {
        return this.alerts.some(alert => alert.id === alertId);
    }

    /**
     * Destroy the alert manager and clean up
     */
    destroy() {
        // Clear all timeouts
        this.alerts.forEach(alert => {
            if (alert.timeoutId) {
                clearTimeout(alert.timeoutId);
            }
        });

        // Remove container from DOM
        if (this.alertContainer && this.alertContainer.parentNode) {
            this.alertContainer.parentNode.removeChild(this.alertContainer);
        }

        // Clear references
        this.alerts = [];
        this.alertContainer = null;
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AlertManager;
}

// Global availability and create default instance
if (typeof window !== 'undefined') {
    window.AlertManager = AlertManager;

    // Create a global instance for easy access
    window.alertManager = new AlertManager();

    // Add convenience methods to window for quick access
    window.showAlert = (config) => window.alertManager.show(config);
    window.showSuccess = (message, options) => window.alertManager.success(message, options);
    window.showWarning = (message, options) => window.alertManager.warning(message, options);
    window.showError = (message, options) => window.alertManager.error(message, options);
    window.dismissAlert = (alertId) => window.alertManager.dismiss(alertId);
    window.dismissAllAlerts = () => window.alertManager.dismissAll();
}