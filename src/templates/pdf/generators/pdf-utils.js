/**
 * PDF Utilities - Shared functions for PDF generation
 *
 * This module contains shared utilities used across all PDF templates,
 * including formatting functions, color definitions, and common layout helpers.
 *
 * @author Austin Steil
 * @version 1.0.0
 * @license MIT <https://raw.githubusercontent.com/AustinSteil/generate-files-model/refs/heads/main/LICENSE>
 * @copyright 2025 Austin Steil
 * @created October 18, 2025
 * @updated October 18, 2025
 */

class PDFUtils {
    /**
     * Color palette for PDF documents
     */
    static COLORS = {
        primary: [41, 128, 185],      // Blue
        secondary: [52, 73, 94],      // Dark gray
        accent: [231, 76, 60],        // Red
        success: [39, 174, 96],       // Green
        warning: [241, 196, 15],      // Yellow
        light: [236, 240, 241],       // Light gray
        dark: [44, 62, 80],           // Very dark gray
        text: [0, 0, 0],              // Black
        lightText: [127, 140, 141]    // Light text
    };

    /**
     * Standard font sizes
     */
    static FONT_SIZES = {
        title: 24,
        heading1: 16,
        heading2: 12,
        heading3: 10,
        body: 10,
        small: 9,
        tiny: 8
    };

    /**
     * Standard spacing values (in mm)
     */
    static SPACING = {
        margin: 15,
        sectionGap: 10,
        lineHeight: 7,
        fieldGap: 5
    };

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
     * Truncate text to a maximum length
     * @param {string} text - Text to truncate
     * @param {number} maxLength - Maximum length
     * @returns {string} Truncated text
     */
    static truncate(text, maxLength = 100) {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
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
     * Escape special characters for safe display
     * @param {string} text - Text to escape
     * @returns {string} Escaped text
     */
    static escape(text) {
        if (!text) return '';
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    /**
     * Get display value for a field (handles null/undefined)
     * @param {*} value - Value to display
     * @param {string} defaultText - Default text if value is empty
     * @returns {string} Display value
     */
    static getDisplayValue(value, defaultText = 'Not specified') {
        if (value === null || value === undefined || value === '') return defaultText;
        return String(value);
    }

    /**
     * Convert array of objects to simple key-value pairs for display
     * @param {Array} array - Array to convert
     * @returns {Object} Key-value pairs
     */
    static arrayToObject(array) {
        if (!Array.isArray(array)) return {};
        const obj = {};
        array.forEach((item, index) => {
            if (typeof item === 'object') {
                Object.assign(obj, item);
            } else {
                obj[`item_${index}`] = item;
            }
        });
        return obj;
    }

    /**
     * Convert hex color to RGB array for jsPDF
     * @param {string} hexColor - Hex color string (e.g., '#003366' or '003366')
     * @returns {Array} RGB array [r, g, b] with values 0-255
     */
    static hexToRgb(hexColor) {
        if (!hexColor) return [0, 0, 0]; // Default to black

        // Remove # if present
        const hex = hexColor.replace('#', '');

        // Handle 3-digit hex colors (e.g., #fff -> #ffffff)
        const fullHex = hex.length === 3
            ? hex.split('').map(char => char + char).join('')
            : hex;

        // Convert to RGB
        const r = parseInt(fullHex.substring(0, 2), 16);
        const g = parseInt(fullHex.substring(2, 4), 16);
        const b = parseInt(fullHex.substring(4, 6), 16);

        // Validate and return
        if (isNaN(r) || isNaN(g) || isNaN(b)) {
            return [0, 0, 0]; // Default to black if invalid
        }

        return [r, g, b];
    }
}

