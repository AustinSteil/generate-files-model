/**
 * Preview Utilities - Shared functions for HTML previews
 *
 * This module contains shared utilities for generating HTML previews
 * that mirror the PDF layout without generating actual PDFs.
 *
 * @author Austin Steil
 * @version 1.0.0
 * @license MIT <https://raw.githubusercontent.com/AustinSteil/generate-files-model/refs/heads/main/LICENSE>
 * @copyright 2025 Austin Steil
 * @created October 18, 2025
 * @updated October 18, 2025
 */

class PreviewUtils {
    /**
     * Escape HTML special characters
     * @param {string} text - Text to escape
     * @returns {string} Escaped HTML
     */
    static escape(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = String(text);
        return div.innerHTML;
    }

    /**
     * Get display value for a field
     * @param {*} value - Value to display
     * @param {string} defaultText - Default text if empty
     * @returns {string} Display value
     */
    static getDisplayValue(value, defaultText = 'Not specified') {
        if (value === null || value === undefined || value === '') return defaultText;
        return String(value);
    }

    /**
     * Format a date string
     * @param {string|Date} date - Date to format
     * @returns {string} Formatted date
     */
    static formatDate(date) {
        if (!date) return new Date().toLocaleDateString();
        if (typeof date === 'string') return date;
        if (date instanceof Date) return date.toLocaleDateString();
        return new Date().toLocaleDateString();
    }

    /**
     * Format an address from components
     * @param {Object} addressData - Address components
     * @returns {string} Formatted address
     */
    static formatAddress(addressData) {
        const parts = [];
        if (addressData?.street) parts.push(addressData.street);
        if (addressData?.city) parts.push(addressData.city);
        if (addressData?.state) parts.push(addressData.state);
        if (addressData?.zip) parts.push(addressData.zip);
        return parts.join(', ') || 'Not specified';
    }

    /**
     * Format classification of work
     * @param {Object} classification - Classification data
     * @returns {string} Formatted classification
     */
    static formatClassification(classification) {
        if (!classification) return 'Not specified';
        const parts = [];
        if (classification.physicalLevel) parts.push(`Physical: ${classification.physicalLevel}`);
        if (classification.cognitiveLevel) parts.push(`Cognitive: ${classification.cognitiveLevel}`);
        return parts.length > 0 ? parts.join(', ') : 'Not specified';
    }

    /**
     * Check if an object is empty
     * @param {Object} obj - Object to check
     * @returns {boolean} True if empty
     */
    static isEmpty(obj) {
        if (!obj) return true;
        if (typeof obj !== 'object') return false;
        return Object.keys(obj).length === 0;
    }

    /**
     * Create a field HTML element
     * @param {string} label - Field label
     * @param {*} value - Field value
     * @returns {string} HTML string
     */
    static createField(label, value) {
        const displayValue = this.getDisplayValue(value);
        return `
            <div class="preview-field">
                <strong>${this.escape(label)}:</strong>
                <p>${this.escape(displayValue)}</p>
            </div>
        `;
    }

    /**
     * Create a section header
     * @param {string} title - Section title
     * @returns {string} HTML string
     */
    static createSectionHeader(title) {
        return `<h2 class="section-header">${this.escape(title)}</h2>`;
    }

    /**
     * Create a demand table section
     * @param {string} title - Table title
     * @param {Object} data - Demand data
     * @returns {string} HTML string
     */
    static createDemandTable(title, data) {
        if (this.isEmpty(data)) return '';

        let html = `<div class="demand-section"><h3>${this.escape(title)}</h3><ul>`;
        Object.entries(data).forEach(([key, value]) => {
            const displayKey = key.charAt(0).toUpperCase() + key.slice(1);
            html += `<li><strong>${this.escape(displayKey)}:</strong> ${this.escape(this.getDisplayValue(value))}</li>`;
        });
        html += '</ul></div>';
        return html;
    }

    /**
     * Create a page break element
     * @returns {string} HTML string
     */
    static createPageBreak() {
        return '<div class="page-break"></div>';
    }

    /**
     * Wrap content in a PDF page container
     * @param {string} content - Page content
     * @returns {string} HTML string
     */
    static wrapPage(content) {
        return `<div class="pdf-page">${content}</div>`;
    }

    /**
     * Create a complete preview container
     * @param {string} content - Preview content
     * @returns {string} HTML string
     */
    static wrapPreview(content) {
        return `<div class="pdf-preview-container">${content}</div>`;
    }
}

