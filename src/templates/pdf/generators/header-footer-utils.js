/**
 * Header and Footer Utilities for PDF Documents
 *
 * Provides reusable functions for adding headers and footers to PDF pages.
 * Headers include logo, company name, address, and job title.
 * Footers include date (left) and page number (right).
 * Cover page (page 1) has no header/footer.
 *
 * @author Austin Steil
 * @version 1.0.0
 * @license MIT <https://raw.githubusercontent.com/AustinSteil/generate-files-model/refs/heads/main/LICENSE>
 * @copyright 2025 Austin Steil
 * @created October 18, 2025
 * @updated October 18, 2025
 */

class HeaderFooterUtils {
    /**
     * Add headers and footers to all pages except the cover page
     * Should be called after all content is added to the PDF
     *
     * @param {jsPDF} doc - The jsPDF document instance
     * @param {Object} data - Form data containing company info, logo, etc.
     * @param {Object} config - Configuration object with page dimensions
     * @param {number} config.pageWidth - Page width in mm
     * @param {number} config.pageHeight - Page height in mm
     * @param {number} config.margin - Margin size in mm
     * @param {number} config.headerHeight - Height reserved for header in mm (default: 20)
     * @param {number} config.footerHeight - Height reserved for footer in mm (default: 15)
     */
    static addHeadersAndFooters(doc, data, config = {}) {
        const pageWidth = config.pageWidth || 210;
        const pageHeight = config.pageHeight || 297;
        const margin = config.margin || 15;
        const headerHeight = config.headerHeight || 20;
        const footerHeight = config.footerHeight || 15;

        const totalPages = doc.getNumberOfPages();

        // Iterate through all pages
        for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
            doc.setPage(pageNum);

            // Skip header/footer on cover page (page 1)
            if (pageNum > 1) {
                this.addHeader(doc, data, pageWidth, margin, headerHeight);
                this.addFooter(doc, data, pageNum, pageWidth, pageHeight, margin, footerHeight);
            }
        }
    }

    /**
     * Add header to a page
     * Header includes: logo (left), company name/address (center), job title (right)
     * Company name is styled with brand color
     *
     * @param {jsPDF} doc - The jsPDF document instance
     * @param {Object} data - Form data
     * @param {number} pageWidth - Page width in mm
     * @param {number} margin - Margin size in mm
     * @param {number} headerHeight - Height reserved for header in mm
     */
    static addHeader(doc, data, pageWidth, margin, headerHeight) {
        const headerY = margin / 2;
        const logoWidth = 15; // Logo width in mm
        const logoHeight = 15; // Logo height in mm

        // Add logo if available
        if (data.companyLogo && data.companyLogo.length > 0) {
            const logoData = data.companyLogo[0];
            if (logoData && logoData.preview) {
                try {
                    doc.addImage(
                        logoData.preview,
                        'PNG',
                        margin,
                        headerY,
                        logoWidth,
                        logoHeight
                    );
                } catch (e) {
                    console.warn('Failed to add logo to header:', e);
                }
            }
        }

        // Add company info in center with brand color
        const centerX = pageWidth / 2;
        const brandColorRgb = PDFUtils.hexToRgb(data.brandColor || '#003366');
        doc.setTextColor(...brandColorRgb);
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text(data.companyName || 'Company Name', centerX, headerY + 3, { align: 'center' });
        doc.setTextColor(0, 0, 0); // Reset to black

        // Add address below company name
        doc.setFontSize(7);
        doc.setFont(undefined, 'normal');
        const address = this.formatAddress(data);
        if (address) {
            doc.text(address, centerX, headerY + 8, { align: 'center' });
        }

        // Add job title on right
        doc.setFontSize(8);
        doc.setFont(undefined, 'bold');
        const jobTitleX = pageWidth - margin;
        const jobTitle = data.jobTitle || 'Job Title';
        // Wrap job title if too long
        const wrappedJobTitle = doc.splitTextToSize(jobTitle, 30);
        doc.text(wrappedJobTitle, jobTitleX, headerY + 3, { align: 'right' });
    }

    /**
     * Add footer to a page
     * Footer includes: date (left), page number (right)
     * Page numbering starts at 2 for the first content page (cover is page 1 but not numbered)
     *
     * @param {jsPDF} doc - The jsPDF document instance
     * @param {Object} data - Form data
     * @param {number} pageNum - Current page number in document
     * @param {number} pageWidth - Page width in mm
     * @param {number} pageHeight - Page height in mm
     * @param {number} margin - Margin size in mm
     * @param {number} footerHeight - Height reserved for footer in mm
     */
    static addFooter(doc, data, pageNum, pageWidth, pageHeight, margin, footerHeight) {
        const footerY = pageHeight - (margin / 2);

        // Add date on left
        doc.setFontSize(8);
        doc.setFont(undefined, 'normal');
        const dateText = this.formatDateToLongFormat(data.date);
        doc.text(dateText, margin, footerY - 2);

        // Add page number on right (page 2 for first content page, etc.)
        const displayPageNum = pageNum; // Page 2 shows as "2", page 3 shows as "3", etc.
        doc.text(`Page ${displayPageNum}`, pageWidth - margin, footerY - 2, { align: 'right' });
    }

    /**
     * Format date to long format (e.g., "October 21, 2025")
     * Handles ISO date strings (YYYY-MM-DD) and Date objects
     *
     * @param {string|Date} date - Date to format (ISO string or Date object)
     * @returns {string} Formatted date in long format
     */
    static formatDateToLongFormat(date) {
        if (!date) {
            return new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        }

        // If it's a string (ISO format like "2025-10-21"), parse it
        if (typeof date === 'string') {
            const dateObj = new Date(date + 'T00:00:00');
            return dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        }

        // If it's already a Date object
        if (date instanceof Date) {
            return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        }

        // Fallback to today's date
        return new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }

    /**
     * Format company address from data
     * 
     * @param {Object} data - Form data
     * @returns {string} Formatted address
     */
    static formatAddress(data) {
        const parts = [];
        if (data.companyStreet) parts.push(data.companyStreet);
        if (data.companyCity) parts.push(data.companyCity);
        if (data.companyState) parts.push(data.companyState);
        if (data.companyZip) parts.push(data.companyZip);
        return parts.join(', ');
    }
}

// Expose the class to the window object for dynamic loading
window.HeaderFooterUtils = HeaderFooterUtils;

