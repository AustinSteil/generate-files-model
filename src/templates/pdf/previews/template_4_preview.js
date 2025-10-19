/**
 * Template 4 HTML Preview Generator - Professional Template
 *
 * Generates HTML preview for Template 4 that mirrors the PDF layout
 * Professional corporate style layout
 *
 * @author Austin Steil
 * @version 1.0.0
 * @license MIT <https://raw.githubusercontent.com/AustinSteil/generate-files-model/refs/heads/main/LICENSE>
 * @copyright 2025 Austin Steil
 * @created October 18, 2025
 * @updated October 18, 2025
 */

class Template4Preview {
    static generate(data) {
        return `
            <div class="preview-content">
                <div class="preview-header">
                    <h2>Job Analysis Report</h2>
                    <p class="preview-subtitle">Professional Template Design</p>
                </div>

                <div class="review-section">
                    <div class="review-section-header">
                        <h3>Cover Information</h3>
                    </div>
                    <div class="review-section-content">
                        <div class="cover-info-container">
                            <div class="cover-info-group">
                                <h4 class="cover-group-title">Position Details</h4>
                                <div class="cover-info-grid">
                                    <div class="cover-info-item">
                                        <span class="cover-label">Job Title</span>
                                        <span class="cover-value">${this.escape(data.jobTitle) || 'Not specified'}</span>
                                    </div>
                                    <div class="cover-info-item">
                                        <span class="cover-label">Company</span>
                                        <span class="cover-value">${this.escape(data.companyName) || 'Not specified'}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="cover-info-group">
                                <h4 class="cover-group-title">Document Information</h4>
                                <div class="cover-info-grid">
                                    <div class="cover-info-item">
                                        <span class="cover-label">Author</span>
                                        <span class="cover-value">${this.escape(data.author) || 'Not specified'}</span>
                                    </div>
                                    <div class="cover-info-item">
                                        <span class="cover-label">Email</span>
                                        <span class="cover-value">${this.escape(data.email) || 'Not specified'}</span>
                                    </div>
                                    <div class="cover-info-item">
                                        <span class="cover-label">Date</span>
                                        <span class="cover-value">${this.escape(data.date) || 'Not specified'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="review-section">
                    <div class="review-section-header">
                        <h3>Job Overview</h3>
                    </div>
                    <div class="review-section-content">
                        <div class="review-row">
                            <span class="review-label">Job Title</span>
                            <span class="review-value">${this.escape(data.jobTitle) || 'Not specified'}</span>
                        </div>
                        <div class="review-row">
                            <span class="review-label">Job Purpose</span>
                            <span class="review-value">${this.escape(data.jobPurpose) || 'Not specified'}</span>
                        </div>
                    </div>
                </div>

                <div class="review-section">
                    <div class="review-section-header">
                        <h3>Job Functions</h3>
                    </div>
                    <div class="review-section-content">
                        <div class="review-row">
                            <span class="review-label">Essential Functions</span>
                            <span class="review-value">${this.escape(data.essentialFunctions) || 'Not specified'}</span>
                        </div>
                        <div class="review-row">
                            <span class="review-label">Marginal Functions</span>
                            <span class="review-value">${this.escape(data.marginalFunctions) || 'Not specified'}</span>
                        </div>
                    </div>
                </div>

                <div class="review-section">
                    <div class="review-section-header">
                        <h3>Work Schedule</h3>
                    </div>
                    <div class="review-section-content">
                        <div class="review-row">
                            <span class="review-label">Work Schedule</span>
                            <span class="review-value">${this.escape(data.workSchedule) || 'Not specified'}</span>
                        </div>
                        <div class="review-row">
                            <span class="review-label">Breaks</span>
                            <span class="review-value">${this.escape(data.breaks) || 'Not specified'}</span>
                        </div>
                        <div class="review-row">
                            <span class="review-label">Other Shift Information</span>
                            <span class="review-value">${this.escape(data.otherShiftInfo) || 'Not specified'}</span>
                        </div>
                    </div>
                </div>

                <div class="review-section">
                    <div class="review-section-header">
                        <h3>Summary</h3>
                    </div>
                    <div class="review-section-content">
                        <div class="review-row">
                            <span class="review-label">Summary Notes</span>
                            <span class="review-value">${this.escape(data.summaryText) || 'Not specified'}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static escape(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Expose the class to the window object for dynamic loading
window.Template4Preview = Template4Preview;
console.log('✅ Template4Preview class loaded and exposed to window');
