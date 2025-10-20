/**
 * Template 3 PDF Generator - Minimal Template
 *
 * Generates PDF documents for Template 3 using jsPDF
 * Simple and elegant minimalist approach
 *
 * @author Austin Steil
 * @version 1.0.0
 * @license MIT <https://raw.githubusercontent.com/AustinSteil/generate-files-model/refs/heads/main/LICENSE>
 * @copyright 2025 Austin Steil
 * @created October 18, 2025
 * @updated October 18, 2025
 */

class Template3Generator {
    constructor() {
        this.pageWidth = 210;
        this.pageHeight = 297;
        this.margin = 15;
        this.lineHeight = 7;
        this.currentY = this.margin;
    }

    generate(data) {
        const jsPDF = window.jspdf.jsPDF;
        this.doc = new jsPDF();
        this.data = data;
        this.currentY = this.margin;

        this.addCoverPage();
        this.addJobOverview();
        this.addJobFunctions();
        this.addWorkSchedule();
        this.addJobDemands();
        this.addSummary();

        return this.doc;
    }

    addCoverPage() {
        this.doc.setFontSize(24);
        this.doc.setFont(undefined, 'bold');
        this.doc.text('Job Analysis Report', this.margin, this.currentY);
        this.currentY += 15;

        this.doc.setFontSize(16);
        this.doc.setFont(undefined, 'normal');
        this.doc.text(`Position: ${this.data.jobTitle || 'Not specified'}`, this.margin, this.currentY);
        this.currentY += 12;

        this.doc.setFontSize(11);
        this.doc.text(`Company: ${this.data.companyName || 'Not specified'}`, this.margin, this.currentY);
        this.currentY += 8;

        const address = this.formatAddress();
        if (address) {
            this.doc.text(address, this.margin, this.currentY);
            this.currentY += 8;
        }

        this.currentY += 10;
        this.doc.setFontSize(10);
        this.doc.setFont(undefined, 'bold');
        this.doc.text('Document Information', this.margin, this.currentY);
        this.currentY += 6;

        this.doc.setFont(undefined, 'normal');
        this.doc.setFontSize(9);
        this.doc.text(`Author: ${this.data.author || 'Not specified'}`, this.margin, this.currentY);
        this.currentY += 5;
        this.doc.text(`Email: ${this.data.email || 'Not specified'}`, this.margin, this.currentY);
        this.currentY += 5;
        this.doc.text(`Date: ${this.data.date || new Date().toLocaleDateString()}`, this.margin, this.currentY);

        this.addPageBreak();
    }

    formatAddress() {
        const parts = [];
        if (this.data.companyStreet) parts.push(this.data.companyStreet);
        if (this.data.companyCity) parts.push(this.data.companyCity);
        if (this.data.companyState) parts.push(this.data.companyState);
        if (this.data.companyZip) parts.push(this.data.companyZip);
        return parts.join(', ');
    }

    addJobOverview() {
        this.addSectionHeader('Job Overview');
        this.addField('Job Title', this.data.jobTitle);
        this.addField('Job Purpose', this.data.jobPurpose);
        this.checkPageBreak(20);
    }

    addJobFunctions() {
        this.addSectionHeader('Job Functions');
        this.addField('Essential Functions', this.data.essentialFunctions);
        this.addField('Marginal Functions', this.data.marginalFunctions);
        this.checkPageBreak(20);
    }

    addWorkSchedule() {
        this.addSectionHeader('Work Schedule');
        this.addField('Work Schedule', this.data.workSchedule);
        this.addField('Breaks', this.data.breaks);
        this.addField('Other Shift Information', this.data.otherShiftInfo);
        this.checkPageBreak(20);
    }

    addJobDemands() {
        this.addSectionHeader('Job Demands');
        this.addDemandTable('Physical Demands', this.data.physicalDemands);
        this.addDemandTable('Mobility Demands', this.data.mobilityDemands);
        this.addDemandTable('Cognitive/Sensory Demands', this.data.cognitiveSensoryDemands);
        this.addDemandTable('Environmental Demands', this.data.environmentalDemands);
        this.addDemandTable('Lifting/Pushing/Pulling', this.data.liftingPushingPulling);
        this.checkPageBreak(20);
    }

    addSummary() {
        this.addSectionHeader('Summary');
        this.addField('Classification of Work', this.formatClassification());
        this.addField('Summary Notes', this.data.summaryText);
    }

    formatClassification() {
        if (!this.data.classificationOfWork) return 'Not specified';
        const c = this.data.classificationOfWork;
        return `Physical Level: ${c.physicalLevel || 'N/A'}, Cognitive Level: ${c.cognitiveLevel || 'N/A'}`;
    }

    addSectionHeader(title) {
        this.checkPageBreak(15);
        this.doc.setFontSize(12);
        this.doc.setFont(undefined, 'bold');
        this.doc.text(title, this.margin, this.currentY);
        this.currentY += 8;
        this.doc.setDrawColor(0);
        this.doc.line(this.margin, this.currentY - 2, this.pageWidth - this.margin, this.currentY - 2);
        this.currentY += 3;
    }

    addField(label, value) {
        this.doc.setFontSize(10);
        this.doc.setFont(undefined, 'bold');
        this.doc.text(`${label}:`, this.margin, this.currentY);
        this.doc.setFont(undefined, 'normal');
        // Ensure value is a string before passing to splitTextToSize
        let fieldValue = value || 'Not specified';
        if (typeof fieldValue !== 'string') {
            fieldValue = JSON.stringify(fieldValue);
        }
        const lines = this.doc.splitTextToSize(fieldValue, this.pageWidth - (this.margin * 2) - 40);
        this.doc.text(lines, this.margin + 40, this.currentY);
        this.currentY += Math.max(5, lines.length * this.lineHeight) + 3;
    }

    addDemandTable(title, data) {
        if (!data || Object.keys(data).length === 0) return;
        this.checkPageBreak(20);
        this.doc.setFontSize(10);
        this.doc.setFont(undefined, 'bold');
        this.doc.text(title, this.margin, this.currentY);
        this.currentY += 6;
        this.doc.setFontSize(9);
        this.doc.setFont(undefined, 'normal');
        Object.entries(data).forEach(([key, value]) => {
            const displayKey = key.charAt(0).toUpperCase() + key.slice(1);
            this.doc.text(`• ${displayKey}: ${value || 'N/A'}`, this.margin + 5, this.currentY);
            this.currentY += 5;
        });
        this.currentY += 3;
    }

    checkPageBreak(spaceNeeded) {
        if (this.currentY + spaceNeeded > this.pageHeight - this.margin) {
            this.addPageBreak();
        }
    }

    addPageBreak() {
        this.doc.addPage();
        this.currentY = this.margin;
    }
}

// Expose the class to the window object for dynamic loading
window.Template3Generator = Template3Generator;
