/**
 * Template 1 PDF Generator - Classic Template
 *
 * Generates professional PDF documents with demand tables using jsPDF and autoTable.
 * Creates 8.5" x 12" (letter size) PDFs with proper pagination and styling.
 *
 * @author Austin Steil
 * @version 1.0.0
 * @license MIT <https://raw.githubusercontent.com/AustinSteil/generate-files-model/refs/heads/main/LICENSE>
 * @copyright 2025 Austin Steil
 * @created October 18, 2025
 * @updated October 18, 2025
 */

class Template1Generator {
    constructor() {
        this.pageWidth = 215.9; // 8.5" in mm
        this.pageHeight = 304.8; // 12" in mm
        this.margin = 12.7; // 0.5" margins
        this.lineHeight = 5;
        this.currentY = this.margin;

        // Demand table headers and rows
        this.demandHeaders = {
            physicalDemands: {
                columns: ['N/A <1%', 'Occasional 1-33%', 'Frequent 34-66%', 'Constant 67-100%', 'Comments'],
                rows: [
                    'Awkward position', 'Bending over', 'Carrying', 'Driving', 'Fine motor tasks',
                    'Gripping or grasping', 'Handling', 'Kneeling', 'Lifting', 'Lifting overhead',
                    'Pulling', 'Pushing', 'Reaching', 'Sitting', 'Squatting or crouching',
                    'Standing', 'Talking and hearing', 'Twisting or turning', 'Walking'
                ]
            },
            mobilityDemands: {
                columns: ['N/A <1%', 'Occasional 1-33%', 'Frequent 34-66%', 'Constant 67-100%', 'Comments'],
                rows: [
                    'Flexion/Extension', 'Rotation', 'Lateral Flexion/Extension',
                    'Flexion/Extension', 'Abduction/Adduction', 'Internal/External Rotation', 'Elevation/Depression',
                    'Flexion/Extension', 'Supination/Pronation',
                    'Flexion/Extension', 'Ulnar/Radial Deviation', 'Gripping (Power or Pinch)',
                    'Flexion/Extension', 'Rotation', 'Lateral Flexion/Extension',
                    'Flexion/Extension', 'Rotation', 'Lateral Flexion/Extension',
                    'Flexion/Extension', 'Abduction/Adduction', 'Internal/External Rotation',
                    'Flexion/Extension',
                    'Dorsiflexion/Plantarflexion'
                ]
            },
            cognitiveSensoryDemands: {
                columns: ['Required', 'Comments'],
                rows: [
                    'Near Vision', 'Far Vision', 'Peripheral Vision', 'Depth Perception', 'Color Vision',
                    'Perceive Safety/Emergency Indicators',
                    'Distinguish Sounds or Tones', 'Verbal or Electronic Communication', 'Perceive Safety/Emergency Indicators',
                    'Tactile Sense (Touch)', 'Olfactory Sense (Smell)', 'Gustatory Sense (Taste)',
                    'Vestibular Sense (Balance)', 'Kinesthetic Sense (Proprioception)',
                    'Memory (Short or Long Term)', 'Multitasking', 'Decision Making and Reasoning',
                    'Simple Math', 'Time Management', 'Literacy (Reading/Writing)',
                    'Work Independently', 'Work with a Team', 'Supervision of Others'
                ]
            },
            environmentalDemands: {
                columns: ['N/A <1%', 'Occasional 1-33%', 'Frequent 34-66%', 'Constant 67-100%', 'Comments'],
                rows: [
                    'Wet, humid, or slippery surfaces', 'Proximity to moving mechanical parts or machinery',
                    'Working at heights', 'Fumes, odors, dust, or airborne particles',
                    'Hazardous chemicals (toxic or caustic)', 'Extreme temperatures (hot or cold, weather-related or non-weather)',
                    'High noise levels requiring hearing protection', 'Hand-arm vibration (e.g., from power tools)',
                    'Whole-body vibration (e.g., from vehicles or platforms)', 'Electrical hazards',
                    'Radiation exposure (ionizing or non-ionizing)', 'Poor lighting or illumination',
                    'Confined spaces', 'Biological hazards (e.g., pathogens or allergens)'
                ]
            },
            liftingPushingPulling: {
                columns: ['N/A, <1%', 'Occasional 1-33%, <12 reps/hour', 'Frequent 34-66%, 12-60 reps/hour', 'Constant 67-100%, >60 reps/hour', 'Comments'],
                rows: ['Less than 5 lbs', '5-25 lbs', '26-50 lbs', '51-100 lbs', 'Over 100 lbs']
            }
        };
    }

    /**
     * Generate the complete PDF document
     * @param {Object} data - Form data containing all fields
     * @returns {jsPDF} Generated PDF document
     */
    generate(data) {
        const jsPDF = window.jspdf.jsPDF;
        // Create PDF with custom page size: 8.5" x 12" (letter width x 12" height)
        this.doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: [215.9, 304.8] // 8.5" x 12" in mm
        });
        this.data = data;
        this.currentY = this.margin;

        // Generate document sections
        this.addCoverPage();
        this.addJobOverview();
        this.addJobFunctions();
        this.addWorkSchedule();
        this.addJobDemands();
        this.addSummary();

        return this.doc;
    }

    /**
     * Add cover page with document title and metadata
     */
    addCoverPage() {
        // Title
        this.doc.setFontSize(24);
        this.doc.setFont(undefined, 'bold');
        this.doc.text('Job Analysis Report', this.margin, this.currentY);
        this.currentY += 15;

        // Job Title
        this.doc.setFontSize(16);
        this.doc.setFont(undefined, 'normal');
        this.doc.text(`Position: ${this.data.jobTitle || 'Not specified'}`, this.margin, this.currentY);
        this.currentY += 12;

        // Company Info
        this.doc.setFontSize(11);
        this.doc.text(`Company: ${this.data.companyName || 'Not specified'}`, this.margin, this.currentY);
        this.currentY += 8;

        // Address
        const address = this.formatAddress();
        if (address) {
            this.doc.text(address, this.margin, this.currentY);
            this.currentY += 8;
        }

        // Metadata
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

    /**
     * Format company address
     */
    formatAddress() {
        const parts = [];
        if (this.data.companyStreet) parts.push(this.data.companyStreet);
        if (this.data.companyCity) parts.push(this.data.companyCity);
        if (this.data.companyState) parts.push(this.data.companyState);
        if (this.data.companyZip) parts.push(this.data.companyZip);
        return parts.join(', ');
    }

    /**
     * Add job overview section
     */
    addJobOverview() {
        this.addSectionHeader('Job Overview');

        this.addField('Job Title', this.data.jobTitle);
        this.addField('Job Purpose', this.data.jobPurpose);

        this.checkPageBreak(20);
    }

    /**
     * Add job functions section
     */
    addJobFunctions() {
        this.addSectionHeader('Job Functions');

        this.addField('Essential Functions', this.data.essentialFunctions);
        this.addField('Marginal Functions', this.data.marginalFunctions);

        this.checkPageBreak(20);
    }

    /**
     * Add work schedule section
     */
    addWorkSchedule() {
        this.addSectionHeader('Work Schedule');

        this.addField('Work Schedule', this.data.workSchedule);
        this.addField('Breaks', this.data.breaks);
        this.addField('Other Shift Information', this.data.otherShiftInfo);

        this.checkPageBreak(20);
    }

    /**
     * Add job demands section
     */
    addJobDemands() {
        this.addSectionHeader('Job Demands');

        this.addDemandTable('Physical Demands', this.data.physicalDemands);
        this.addDemandTable('Mobility Demands', this.data.mobilityDemands);
        this.addDemandTable('Cognitive/Sensory Demands', this.data.cognitiveSensoryDemands);
        this.addDemandTable('Environmental Demands', this.data.environmentalDemands);
        this.addDemandTable('Lifting/Pushing/Pulling', this.data.liftingPushingPulling);

        this.checkPageBreak(20);
    }

    /**
     * Add summary section
     */
    addSummary() {
        this.addSectionHeader('Summary');

        this.addField('Classification of Work', this.formatClassification());
        this.addField('Summary Notes', this.data.summaryText);
    }

    /**
     * Format classification of work
     */
    formatClassification() {
        if (!this.data.classificationOfWork) return 'Not specified';
        const c = this.data.classificationOfWork;
        return `Physical Level: ${c.physicalLevel || 'N/A'}, Cognitive Level: ${c.cognitiveLevel || 'N/A'}`;
    }

    /**
     * Add a section header
     */
    addSectionHeader(title) {
        this.checkPageBreak(15);
        this.doc.setFontSize(12);
        this.doc.setFont(undefined, 'bold');
        this.doc.text(title, this.margin, this.currentY);
        this.currentY += 8;

        // Underline
        this.doc.setDrawColor(0);
        this.doc.line(this.margin, this.currentY - 2, this.pageWidth - this.margin, this.currentY - 2);
        this.currentY += 3;
    }

    /**
     * Add a field with label and value
     */
    addField(label, value) {
        this.doc.setFontSize(10);
        this.doc.setFont(undefined, 'bold');
        this.doc.text(`${label}:`, this.margin, this.currentY);

        this.doc.setFont(undefined, 'normal');

        // Format the value based on its type
        let fieldValue = this.formatFieldValue(value);

        const lines = this.doc.splitTextToSize(fieldValue, this.pageWidth - (this.margin * 2) - 40);
        this.doc.text(lines, this.margin + 40, this.currentY);

        this.currentY += Math.max(5, lines.length * this.lineHeight) + 3;
    }

    /**
     * Format field value based on its type
     */
    formatFieldValue(value) {
        if (!value) return 'Not specified';

        // Handle arrays
        if (Array.isArray(value)) {
            return this.formatArray(value);
        }

        // Handle objects
        if (typeof value === 'object') {
            return this.formatObject(value);
        }

        // Handle strings
        return String(value);
    }

    /**
     * Format array values
     */
    formatArray(arr) {
        if (arr.length === 0) return 'Not specified';

        return arr.map((item) => {
            if (typeof item === 'object') {
                // For objects in arrays, extract meaningful values
                const values = Object.values(item).filter(v => v && v.trim && v.trim().length > 0);
                return values.join(' - ');
            }
            return String(item);
        }).join('; ');
    }

    /**
     * Format object values
     */
    formatObject(obj) {
        const entries = Object.entries(obj);
        if (entries.length === 0) return 'Not specified';

        // Special handling for work schedule
        if (obj.weeklyHours !== undefined) {
            return `${obj.weeklyHours} hours/week, ${obj.shiftLength} hour shifts, ${obj.shiftsPerWeek} shifts/week`;
        }

        // General object formatting
        return entries
            .map(([key, value]) => {
                const formattedKey = key.replace(/([A-Z])/g, ' $1').trim();
                return `${formattedKey}: ${value}`;
            })
            .join('; ');
    }

    /**
     * Add a demand table using autoTable
     * @param {string} title - Table title
     * @param {Object} data - Table data indexed by row and column
     */
    addDemandTable(title, data) {
        if (!data || Object.keys(data).length === 0) return;

        // Get headers for this demand type
        const demandType = this.getDemandTypeFromTitle(title);
        const headers = this.demandHeaders[demandType];
        if (!headers) return;

        this.checkPageBreak(30);

        // Add title
        this.doc.setFontSize(11);
        this.doc.setFont(undefined, 'bold');
        this.doc.text(title, this.margin, this.currentY);
        this.currentY += 6;

        // Build table rows from data
        const rows = this.buildDemandTableRows(data, headers);

        // Calculate column widths - give more space to activity and comments columns
        const pageContentWidth = this.pageWidth - (this.margin * 2);
        const numFrequencyColumns = headers.columns.length - 2; // All columns except activity and comments
        const frequencyColWidth = pageContentWidth * 0.12; // Each frequency column gets 12% of width
        const activityColWidth = pageContentWidth * 0.25; // Activity column gets 25%
        const commentsColWidth = pageContentWidth - activityColWidth - (frequencyColWidth * numFrequencyColumns); // Comments gets remainder

        // Build column configuration with explicit widths
        // Include "Activity" as first column header, then all the data column headers
        const columns = [
            { header: 'Activity', width: activityColWidth },
            ...headers.columns.map((col, index) => {
                let width;
                if (index === headers.columns.length - 1) {
                    width = commentsColWidth;
                } else {
                    width = frequencyColWidth;
                }
                return {
                    header: col,
                    width: width
                };
            })
        ];

        // Use autoTable to render the table
        this.doc.autoTable({
            columns: columns,
            body: rows,
            startY: this.currentY,
            margin: this.margin,
            theme: 'grid',
            styles: {
                fontSize: 8,
                cellPadding: 2.5,
                overflow: 'linebreak',
                halign: 'center',
                valign: 'top'
            },
            headStyles: {
                fillColor: [41, 128, 185],
                textColor: 255,
                fontStyle: 'bold',
                halign: 'center',
                valign: 'middle'
            },
            bodyStyles: {
                halign: 'center',
                valign: 'top'
            },
            columnStyles: {
                0: { halign: 'left', valign: 'top' }, // Activity column left-aligned
                [columns.length - 1]: { halign: 'left', valign: 'top' } // Comments column left-aligned
            },
            alternateRowStyles: {
                fillColor: [245, 245, 245]
            },
            didDrawPage: (data) => {
                this.currentY = data.cursor.y + 3;
            }
        });

        // Update currentY after table
        this.currentY = this.doc.lastAutoTable.finalY + 5;
    }

    /**
     * Get demand type from title
     */
    getDemandTypeFromTitle(title) {
        const titleMap = {
            'Physical Demands': 'physicalDemands',
            'Mobility Demands': 'mobilityDemands',
            'Cognitive/Sensory Demands': 'cognitiveSensoryDemands',
            'Environmental Demands': 'environmentalDemands',
            'Lifting/Pushing/Pulling': 'liftingPushingPulling'
        };
        return titleMap[title] || null;
    }

    /**
     * Build table rows from indexed data
     * Data structure: { rowIndex: { colIndex: value } }
     * Note: First column in row array is the activity name (not from data)
     *       Remaining columns map directly to data columns (0-indexed)
     */
    buildDemandTableRows(data, headers) {
        const rows = [];

        headers.rows.forEach((rowLabel, rowIndex) => {
            const row = [rowLabel]; // First column is the activity name

            // Add all data columns for this row (0 to numColumns-1)
            for (let colIndex = 0; colIndex < headers.columns.length; colIndex++) {
                const cellValue = data[rowIndex]?.[colIndex];

                // For checkbox columns, show X if true (more compatible with PDF fonts)
                if (typeof cellValue === 'boolean') {
                    row.push(cellValue ? 'X' : '');
                } else if (typeof cellValue === 'string') {
                    row.push(cellValue);
                } else {
                    row.push('');
                }
            }

            rows.push(row);
        });

        return rows;
    }

    /**
     * Check if page break is needed
     */
    checkPageBreak(spaceNeeded) {
        if (this.currentY + spaceNeeded > this.pageHeight - this.margin) {
            this.addPageBreak();
        }
    }

    /**
     * Add a page break
     */
    addPageBreak() {
        this.doc.addPage();
        this.currentY = this.margin;
    }
}

// Expose the class to the window object for dynamic loading
window.Template1Generator = Template1Generator;
