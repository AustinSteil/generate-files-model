/**
 * Template 1 HTML Preview Generator - Classic Template
 *
 * Generates HTML preview for Template 1 that mirrors the PDF layout.
 * Provides instant visual feedback of the document before PDF generation.
 *
 * @author Austin Steil
 * @version 1.0.0
 * @license MIT <https://raw.githubusercontent.com/AustinSteil/generate-files-model/refs/heads/main/LICENSE>
 * @copyright 2025 Austin Steil
 * @created October 18, 2025
 * @updated October 18, 2025
 */

class Template1Preview {
    /**
     * Generate HTML preview
     * @param {Object} data - Form data containing all fields
     * @returns {string} HTML string for preview
     */
    static generate(data) {
        return `
            <div class="pdf-preview-container">
                <!-- Cover Page -->
                <div class="pdf-page">
                    <div class="cover-page">
                        <h1 class="document-title">Job Analysis Report</h1>
                        <h2 class="job-title">Position: ${this.escape(data.jobTitle || 'Not specified')}</h2>

                        <div class="company-info">
                            <p><strong>Company:</strong> ${this.escape(data.companyName || 'Not specified')}</p>
                            ${this.formatAddressHTML(data)}
                        </div>

                        <div class="document-metadata">
                            <h3>Document Information</h3>
                            <p><strong>Author:</strong> ${this.escape(data.author || 'Not specified')}</p>
                            <p><strong>Email:</strong> ${this.escape(data.email || 'Not specified')}</p>
                            <p><strong>Date:</strong> ${this.escape(data.date || new Date().toLocaleDateString())}</p>
                        </div>
                    </div>
                </div>

                <!-- Job Overview Page -->
                <div class="pdf-page">
                    <h2 class="section-header">Job Overview</h2>
                    ${this.formatField('Job Title', data.jobTitle)}
                    ${this.formatField('Job Purpose', data.jobPurpose)}
                </div>

                <!-- Job Functions Page -->
                <div class="pdf-page">
                    <h2 class="section-header">Job Functions</h2>
                    ${this.formatField('Essential Functions', data.essentialFunctions)}
                    ${this.formatField('Marginal Functions', data.marginalFunctions)}
                </div>

                <!-- Work Schedule Page -->
                <div class="pdf-page">
                    <h2 class="section-header">Work Schedule</h2>
                    ${this.formatField('Work Schedule', data.workSchedule)}
                    ${this.formatField('Breaks', data.breaks)}
                    ${this.formatField('Other Shift Information', data.otherShiftInfo)}
                </div>

                <!-- Job Demands Page -->
                <div class="pdf-page">
                    <h2 class="section-header">Job Demands</h2>
                    ${this.formatDemandTable('Physical Demands', data.physicalDemands)}
                    ${this.formatDemandTable('Mobility Demands', data.mobilityDemands)}
                    ${this.formatDemandTable('Cognitive/Sensory Demands', data.cognitiveSensoryDemands)}
                    ${this.formatDemandTable('Environmental Demands', data.environmentalDemands)}
                    ${this.formatDemandTable('Lifting/Pushing/Pulling', data.liftingPushingPulling)}
                </div>

                <!-- Summary Page -->
                <div class="pdf-page">
                    <h2 class="section-header">Summary</h2>
                    ${this.formatField('Classification of Work', this.formatClassification(data.classificationOfWork))}
                    ${this.formatField('Summary Notes', data.summaryText)}
                </div>
            </div>
        `;
    }

    /**
     * Format a field with label and value
     */
    static formatField(label, value) {
        const displayValue = value || '<em>Not specified</em>';
        return `
            <div class="preview-field">
                <strong>${this.escape(label)}:</strong>
                <p>${this.escape(displayValue)}</p>
            </div>
        `;
    }

    /**
     * Format address HTML
     */
    static formatAddressHTML(data) {
        const parts = [];
        if (data.companyStreet) parts.push(data.companyStreet);
        if (data.companyCity) parts.push(data.companyCity);
        if (data.companyState) parts.push(data.companyState);
        if (data.companyZip) parts.push(data.companyZip);

        if (parts.length === 0) return '';
        return `<p><strong>Address:</strong> ${this.escape(parts.join(', '))}</p>`;
    }

    /**
     * Format demand table
     */
    static formatDemandTable(title, data) {
        if (!data || Object.keys(data).length === 0) return '';

        let html = `<div class="demand-section"><h3>${this.escape(title)}</h3><ul>`;
        Object.entries(data).forEach(([key, value]) => {
            const displayKey = key.charAt(0).toUpperCase() + key.slice(1);
            html += `<li><strong>${this.escape(displayKey)}:</strong> ${this.escape(value || 'N/A')}</li>`;
        });
        html += '</ul></div>';
        return html;
    }

    /**
     * Format classification of work
     */
    static formatClassification(classification) {
        if (!classification) return 'Not specified';
        const c = classification;
        return `Physical Level: ${c.physicalLevel || 'N/A'}, Cognitive Level: ${c.cognitiveLevel || 'N/A'}`;
    }

    /**
     * Escape HTML special characters
     */
    static escape(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Expose the class to the window object for dynamic loading
window.Template1Preview = Template1Preview;
console.log('✅ Template1Preview class loaded and exposed to window');

