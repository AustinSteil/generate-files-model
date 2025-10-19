/**
 * Preview Tab - Comprehensive Review Page
 *
 * Displays a complete review of all collected data before document generation.
 * Shows ALL fields from vars.json with clear indicators for empty/unfilled fields.
 * Organized by logical sections with elegant styling and full dark/light mode support.
 *
 * Features formatted table data display for all job demands tables (physical, mobility,
 * cognitive/sensory, environmental, and lifting/pushing/pulling) with human-readable
 * frequency levels and comments instead of raw JSON.
 *
 * @author Austin Steil
 * @version 1.0.0
 * @license MIT <https://raw.githubusercontent.com/AustinSteil/generate-files-model/refs/heads/main/LICENSE>
 * @copyright 2025 Austin Steil
 * @created October 18, 2025
 * @updated October 18, 2025
 */

class PreviewTab {
    constructor(containerId, tabsManager) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Preview tab container with ID "${containerId}" not found`);
            return;
        }
        this.tabsManager = tabsManager;
        this.generateButton = null;
        this.render();
        this.init();
    }

    /**
     * Render the preview tab content
     */
    render() {
        this.container.innerHTML = `
            <div class="preview-content">
                <div class="preview-header">
                    <h2>Review Your Information</h2>
                    <p class="preview-subtitle">Please verify all information is correct before generating your document. Fields marked as "Not yet filled" need to be completed.</p>
                </div>

                <!-- Cover Page Section -->
                <div class="review-section">
                    <div class="review-section-header">
                        <h3>Cover Page</h3>
                    </div>
                    <div id="preview-cover" class="review-section-content">
                        <p class="empty-state">Loading...</p>
                    </div>
                </div>

                <!-- Job Overview Section -->
                <div class="review-section">
                    <div class="review-section-header">
                        <h3>Overview</h3>
                    </div>
                    <div id="preview-overview" class="review-section-content">
                        <p class="empty-state">Loading...</p>
                    </div>
                </div>

                <!-- Job Functions Section -->
                <div class="review-section">
                    <div class="review-section-header">
                        <h3>Functions</h3>
                    </div>
                    <div id="preview-functions" class="review-section-content">
                        <p class="empty-state">Loading...</p>
                    </div>
                </div>

                <!-- Work Schedule Section -->
                <div class="review-section">
                    <div class="review-section-header">
                        <h3>Schedule</h3>
                    </div>
                    <div id="preview-schedule" class="review-section-content">
                        <p class="empty-state">Loading...</p>
                    </div>
                </div>

                <!-- Job Demands Section -->
                <div class="review-section">
                    <div class="review-section-header">
                        <h3>Demands</h3>
                    </div>
                    <div id="preview-demands" class="review-section-content">
                        <p class="empty-state">Loading...</p>
                    </div>
                </div>

                <!-- Summary Section -->
                <div class="review-section">
                    <div class="review-section-header">
                        <h3>Summary</h3>
                    </div>
                    <div id="preview-summary" class="review-section-content">
                        <p class="empty-state">Loading...</p>
                    </div>
                </div>

                <!-- Generate Button -->
                <div class="form-actions" id="generate-button-container">
                    <!-- Generate button will be created here by the Button component -->
                </div>
            </div>
        `;
    }

    init() {
        console.log('Preview tab initialized');
        this.createGenerateButton();
    }

    /**
     * Create the generate document button using the reusable Button component
     */
    createGenerateButton() {
        // Check if Button class is available
        if (typeof Button === 'undefined') {
            console.error('Button component not loaded. Make sure to include button.js');
            return;
        }

        // Create the generate button with success variant (green)
        this.generateButton = new Button({
            containerId: 'generate-button-container',
            id: 'generateBtn',
            text: 'Generate Document',
            variant: 'success',
            size: 'medium',
            onClick: (_, __) => {
                console.log('Generate button clicked - waiting for main.js to attach handler');
            }
        });

        console.log('Generate button created with Button component (success variant - green)');
    }

    /**
     * Set the click handler for the generate button
     * This method can be called by main.js to set the actual handler
     */
    setGenerateButtonHandler(handler) {
        if (this.generateButton && typeof handler === 'function') {
            this.generateButton.options.onClick = (_, __) => {
                handler(_, __);
            };
            console.log('Generate button handler updated');
        }
    }


    /**
     * Update the preview with current data from all tabs
     */
    updatePreview() {
        if (!this.tabsManager) {
            console.warn('Tabs manager not available for preview');
            return;
        }

        // Get data from all tabs
        const introData = this.tabsManager.introTab?.getData() || {};
        const demoData = this.tabsManager.demographicsTab?.getData() || {};
        const jobsData = this.tabsManager.jobsTab?.getData() || {};
        const summaryData = this.tabsManager.summaryTab?.getData() || {};

        // Update all sections
        this.updateCoverSection(introData);
        this.updateOverviewSection(demoData);
        this.updateFunctionsSection(demoData);
        this.updateScheduleSection(demoData);
        this.updateDemandsSection(jobsData);
        this.updateSummarySection(summaryData);
    }

    /**
     * Update cover page section - Shows ALL cover page fields in organized groups
     */
    updateCoverSection(data) {
        const section = document.getElementById('preview-cover');
        if (!section) return;

        section.innerHTML = `
            <div class="cover-info-container">
                <!-- Document Info Group -->
                <div class="cover-info-group">
                    <div class="cover-info-grid">
                        ${this.createCompactDataRow('Title', data.title, true)}
                        ${this.createCompactDataRow('Template', data.selectedTemplate, true)}
                        ${this.createCompactDataRow('Date', data.date, true)}
                    </div>
                </div>

                <!-- Company Info Group -->
                <div class="cover-info-group">
                    <h4 class="cover-group-title"></h4>
                    <div class="cover-info-grid">
                        ${this.createCompactDataRow('Company Name', data.companyName, true)}
                        ${this.createCompactDataRow('Street Address', data.companyStreet, true)}
                        ${this.createCompactDataRow('City', data.companyCity, true)}
                        ${this.createCompactDataRow('State', data.companyState, true)}
                        ${this.createCompactDataRow('ZIP Code', data.companyZip, true)}
                    </div>
                </div>

                <!-- Author Info Group -->
                <div class="cover-info-group">
                    <h4 class="cover-group-title"></h4>
                    <div class="cover-info-grid">
                        ${this.createCompactDataRow('Name', data.author, true)}
                        ${this.createCompactDataRow('Email', data.email, true)}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Update job overview section - Shows ALL overview fields
     */
    updateOverviewSection(data) {
        const section = document.getElementById('preview-overview');
        if (!section) return;

        section.innerHTML = `
            <div class="review-grid">
                ${this.createDataRow('Job Title', data.jobTitle, true)}
                ${this.createDataRow('Job Purpose', data.jobPurpose, true)}
            </div>
        `;
    }

    /**
     * Update job functions section - Shows ALL function fields
     */
    updateFunctionsSection(data) {
        const section = document.getElementById('preview-functions');
        if (!section) return;

        // Check if essential functions have actual content
        const hasEssential = data.essentialFunctions &&
                            Array.isArray(data.essentialFunctions) &&
                            data.essentialFunctions.length > 0 &&
                            data.essentialFunctions.some(item => this.extractFunctionText(item).trim() !== '');

        // Check if marginal functions have actual content
        const hasMarginal = data.marginalFunctions &&
                           Array.isArray(data.marginalFunctions) &&
                           data.marginalFunctions.length > 0 &&
                           data.marginalFunctions.some(item => this.extractFunctionText(item).trim() !== '');

        let html = '';

        // Essential Functions
        html += `
            <div class="review-subsection">
                <h4>Essential</h4>
                ${hasEssential ? `
                    <ul class="review-list">
                        ${data.essentialFunctions
                            .map(item => {
                                const text = this.extractFunctionText(item);
                                return text.trim() ? `<li>${this.escapeHtml(text)}</li>` : '';
                            })
                            .filter(item => item !== '')
                            .join('')}
                    </ul>
                ` : `<p class="field-empty">Not yet filled</p>`}
            </div>
        `;

        // Marginal Functions
        html += `
            <div class="review-subsection">
                <h4>Marginal</h4>
                ${hasMarginal ? `
                    <ul class="review-list">
                        ${data.marginalFunctions
                            .map(item => {
                                const text = this.extractFunctionText(item);
                                return text.trim() ? `<li>${this.escapeHtml(text)}</li>` : '';
                            })
                            .filter(item => item !== '')
                            .join('')}
                    </ul>
                ` : `<p class="field-empty">Not yet filled</p>`}
            </div>
        `;

        section.innerHTML = html;
    }

    /**
     * Update work schedule section - Shows ALL schedule fields
     */
    updateScheduleSection(data) {
        const section = document.getElementById('preview-schedule');
        if (!section) return;

        let html = `<div class="review-grid">`;

        // Work Schedule - format the calculator data
        if (data.workSchedule && !this.isDefaultWorkSchedule(data.workSchedule)) {
            html += this.createWorkScheduleRow(data.workSchedule);
        } else {
            html += this.createDataRow('Work Schedule', null, true);
        }

        // Breaks - can be an array
        if (data.breaks && Array.isArray(data.breaks) && data.breaks.length > 0) {
            const hasFilledBreaks = data.breaks.some(breakItem => {
                const breakText = typeof breakItem === 'string' ? breakItem : breakItem.breakDescription || '';
                return breakText.trim() !== '';
            });

            if (hasFilledBreaks) {
                html += `
                    <div class="review-row">
                        <span class="review-label">Breaks</span>
                        <ul class="review-list-inline">
                            ${data.breaks.map(breakItem => {
                                const breakText = typeof breakItem === 'string' ? breakItem : breakItem.breakDescription || '';
                                return breakText.trim() ? `<li>${this.escapeHtml(breakText)}</li>` : '';
                            }).join('')}
                        </ul>
                    </div>
                `;
            } else {
                html += this.createDataRow('Breaks', null, true);
            }
        } else {
            html += this.createDataRow('Breaks', null, true);
        }

        // Other Shift Information
        html += this.createDataRow('Other Shift Information', data.otherShiftInfo, true);

        html += `</div>`;
        section.innerHTML = html;
    }

    /**
     * Update job demands section - Shows ALL demand fields in condensed format
     */
    updateDemandsSection(data) {
        const section = document.getElementById('preview-demands');
        if (!section) return;

        // Define all demand types to process
        const demandTypes = [
            { key: 'physicalDemands', label: 'Physical Demands', type: 'physical' },
            { key: 'mobilityDemands', label: 'Mobility Demands', type: 'mobility' },
            { key: 'cognitiveSensoryDemands', label: 'Cognitive & Sensory Demands', type: 'cognitive' },
            { key: 'environmentalDemands', label: 'Environmental Demands', type: 'environmental' },
            { key: 'liftingPushingPulling', label: 'Lifting/Pushing/Pulling', type: 'lifting' }
        ];

        // Build condensed demands list
        let html = '<div class="demands-list">';

        demandTypes.forEach(demand => {
            const tableData = data[demand.key];
            if (!this.isEmptyTableData(tableData)) {
                html += this.createCondensedDemandSection(demand.label, tableData, demand.type);
            }
        });

        // Add Classification of Work if present
        if (data.classificationOfWork && data.classificationOfWork.physicalLevel) {
            html += this.createClassificationSection(data.classificationOfWork);
        }

        // Show empty state if no demands filled
        if (html === '<div class="demands-list">') {
            html += '<p class="field-empty">No job demands have been filled yet</p>';
        }

        html += '</div>';
        section.innerHTML = html;
    }

    /**
     * Update summary section - Shows summary field
     */
    updateSummarySection(data) {
        const section = document.getElementById('preview-summary');
        if (!section) return;

        // Check if summary has actual content (not just empty HTML tags)
        const hasContent = data.summaryText && this.hasActualContent(data.summaryText);

        if (!hasContent) {
            section.innerHTML = `<p class="field-empty">Not yet filled</p>`;
            return;
        }

        // Extract plain text to check length
        const plainText = data.summaryText.replace(/<[^>]*>/g, '').trim();
        const isIncomplete = plainText.length < 10;

        if (isIncomplete) {
            section.innerHTML = `
                <div class="review-summary-content field-incomplete">
                    <div class="summary-text">${data.summaryText}</div>
                    <p class="incomplete-notice">⚠️ Summary is incomplete (minimum 10 characters required)</p>
                </div>
            `;
        } else {
            section.innerHTML = `
                <div class="review-summary-content">
                    <div class="summary-text">${data.summaryText}</div>
                </div>
            `;
        }
    }

    /**
     * Helper: Create a table-style demand section (visual table display)
     * @param {string} title - Section title
     * @param {Object} tableData - Raw table data
     * @param {string} type - Table type (physical, mobility, cognitive, environmental, lifting)
     */
    createCondensedDemandSection(title, tableData, type) {
        const formattedData = this.formatTableData(tableData, type);

        // Count filled items
        const filledCount = formattedData.length;

        // Create table rows with alternating backgrounds
        const tableRows = formattedData.map((item, index) => `
            <div class="demand-table-row ${index % 2 === 0 ? 'even' : 'odd'}">
                <div class="demand-table-cell demand-label">${this.escapeHtml(item.label)}</div>
                <div class="demand-table-cell demand-value">${this.escapeHtml(item.value)}</div>
            </div>
        `).join('');

        return `
            <div class="demand-category">
                <div class="demand-header">
                    <h4>${title}</h4>
                    <span class="demand-count">${filledCount} item${filledCount !== 1 ? 's' : ''}</span>
                </div>
                <div class="demand-table">
                    <div class="demand-table-header">
                        <div class="demand-table-cell demand-label-header">Demand</div>
                        <div class="demand-table-cell demand-value-header">Frequency / Level</div>
                    </div>
                    <div class="demand-table-body">
                        ${tableRows}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Helper: Create classification of work section (table-style)
     * @param {Object} data - Classification data
     */
    createClassificationSection(data) {
        const levelMap = {
            'sedentary': 'Sedentary',
            'light': 'Light',
            'medium': 'Medium',
            'heavy': 'Heavy',
            'veryHeavy': 'Very Heavy'
        };

        const level = levelMap[data.physicalLevel] || data.physicalLevel || 'Not Selected';

        return `
            <div class="demand-category">
                <div class="demand-header">
                    <h4>Classification of Work</h4>
                    <span class="demand-count">1 item</span>
                </div>
                <div class="demand-table">
                    <div class="demand-table-header">
                        <div class="demand-table-cell demand-label-header">Category</div>
                        <div class="demand-table-cell demand-value-header">Level</div>
                    </div>
                    <div class="demand-table-body">
                        <div class="demand-table-row even">
                            <div class="demand-table-cell demand-label">Physical Demand Level</div>
                            <div class="demand-table-cell demand-value">${this.escapeHtml(level)}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Helper: Create a formatted work schedule row
     * @param {Object} workScheduleData - Work schedule data with weeklyHours, shiftLength, shiftsPerWeek
     */
    createWorkScheduleRow(workScheduleData) {
        if (!workScheduleData) {
            return this.createDataRow('Work Schedule', null, true);
        }

        const weeklyHours = workScheduleData.weeklyHours || 0;
        const shiftLength = workScheduleData.shiftLength || 0;
        const shiftsPerWeek = workScheduleData.shiftsPerWeek || 0;

        const displayValue = `${weeklyHours} hrs/week, ${shiftLength} hrs/shift, ${shiftsPerWeek} shifts/week`;

        return `
            <div class="review-row">
                <span class="review-label">Work Schedule</span>
                <span class="review-value">${this.escapeHtml(displayValue)}</span>
            </div>
        `;
    }

    /**
     * Helper: Format table data based on type
     * @param {Object} tableData - Raw table data
     * @param {string} type - Table type
     * @returns {Array} Formatted array of {label, value} objects
     */
    formatTableData(tableData, type) {
        const formatted = [];

        // Define row and column headers for each table type
        const config = {
            physical: {
                columns: ['Not Applicable', 'Occasional', 'Frequent', 'Constant', 'Comments'],
                rows: [
                    'Awkward position', 'Bending over', 'Carrying', 'Driving',
                    'Fine motor tasks', 'Gripping or grasping', 'Handling', 'Kneeling',
                    'Lifting', 'Lifting overhead', 'Pulling', 'Pushing', 'Reaching',
                    'Sitting', 'Squatting or crouching', 'Standing', 'Talking and hearing',
                    'Twisting or turning', 'Walking'
                ]
            },
            mobility: {
                columns: ['Not Applicable', 'Occasional', 'Frequent', 'Constant', 'Comments'],
                rows: [
                    'Neck - Flexion/Extension', 'Neck - Rotation', 'Neck - Lateral Flexion/Extension',
                    'Shoulder - Flexion/Extension', 'Shoulder - Abduction/Adduction', 'Shoulder - Internal/External Rotation', 'Shoulder - Elevation/Depression',
                    'Elbow and Forearm - Flexion/Extension', 'Elbow and Forearm - Supination/Pronation',
                    'Wrist and Fingers - Flexion/Extension', 'Wrist and Fingers - Ulnar/Radial Deviation', 'Wrist and Fingers - Gripping (Power or Pinch)',
                    'Thorax and Upper Back - Flexion/Extension', 'Thorax and Upper Back - Rotation', 'Thorax and Upper Back - Lateral Flexion/Extension',
                    'Lower Back and Abdomen - Flexion/Extension', 'Lower Back and Abdomen - Rotation', 'Lower Back and Abdomen - Lateral Flexion/Extension',
                    'Hip and Upper Thigh - Flexion/Extension', 'Hip and Upper Thigh - Abduction/Adduction', 'Hip and Upper Thigh - Internal/External Rotation',
                    'Knees and Lower Legs - Flexion/Extension',
                    'Ankle, Foot, and Toes - Dorsiflexion/Plantarflexion'
                ]
            },
            cognitive: {
                columns: ['Required', 'Comments'],
                rows: [
                    'Vision - Near Vision', 'Vision - Far Vision', 'Vision - Peripheral Vision', 'Vision - Depth Perception', 'Vision - Color Vision', 'Vision - Perceive Safety/Emergency Indicators',
                    'Hearing - Distinguish Sounds or Tones', 'Hearing - Verbal or Electronic Communication', 'Hearing - Perceive Safety/Emergency Indicators',
                    'Senses - Tactile Sense (Touch)', 'Senses - Olfactory Sense (Smell)', 'Senses - Gustatory Sense (Taste)', 'Senses - Vestibular Sense (Balance)', 'Senses - Kinesthetic Sense (Proprioception)',
                    'Cognitive - Memory (Short or Long Term)', 'Cognitive - Multitasking', 'Cognitive - Decision Making and Reasoning', 'Cognitive - Simple Math', 'Cognitive - Time Management', 'Cognitive - Literacy (Reading/Writing)',
                    'Psychosocial - Work Independently', 'Psychosocial - Work with a Team', 'Psychosocial - Supervision of Others'
                ]
            },
            environmental: {
                columns: ['Not Applicable', 'Occasional', 'Frequent', 'Constant', 'Comments'],
                rows: [
                    'Wet, humid, or slippery surfaces',
                    'Proximity to moving mechanical parts or machinery',
                    'Working at heights',
                    'Fumes, odors, dust, or airborne particles',
                    'Hazardous chemicals (toxic or caustic)',
                    'Extreme temperatures (hot or cold, weather-related or non-weather)',
                    'High noise levels requiring hearing protection',
                    'Hand-arm vibration (e.g., from power tools)',
                    'Whole-body vibration (e.g., from vehicles or platforms)',
                    'Electrical hazards',
                    'Radiation exposure (ionizing or non-ionizing)',
                    'Poor lighting or illumination',
                    'Confined spaces',
                    'Biological hazards (e.g., pathogens or allergens)'
                ]
            },
            lifting: {
                columns: ['N/A or None', 'Occasional', 'Frequent', 'Constant', 'Comments'],
                rows: [
                    'Less than 5 lbs',
                    '5-25 lbs',
                    '26-50 lbs',
                    '51-100 lbs',
                    'Over 100 lbs'
                ]
            }
        };

        const typeConfig = config[type];
        if (!typeConfig) return formatted;

        // Process each row
        Object.keys(tableData).forEach(rowIndex => {
            const rowData = tableData[rowIndex];
            const rowLabel = typeConfig.rows[rowIndex] || `Row ${rowIndex}`;

            // Find selected column and comments
            let selectedColumn = null;
            let comments = '';

            Object.keys(rowData).forEach(colIndex => {
                const value = rowData[colIndex];

                if (value === true) {
                    selectedColumn = typeConfig.columns[colIndex] || `Column ${colIndex}`;
                } else if (typeof value === 'string' && value.trim() !== '') {
                    comments = value;
                }
            });

            // Build display value
            let displayValue = selectedColumn || 'Not Selected';
            if (comments) {
                displayValue += ` (${comments})`;
            }

            formatted.push({
                label: rowLabel,
                value: displayValue
            });
        });

        return formatted;
    }

    /**
     * Helper: Create a data row for display
     * @param {string} label - Field label
     * @param {*} value - Field value
     * @param {boolean} showEmpty - Whether to show "Not yet filled" for empty values
     */
    createDataRow(label, value, showEmpty = false) {
        // Handle empty/null/undefined values
        if (!value && value !== 0 && value !== false) {
            if (showEmpty) {
                return `
                    <div class="review-row field-not-filled">
                        <span class="review-label">${label}</span>
                        <span class="review-value-empty">Not yet filled</span>
                    </div>
                `;
            }
            return '';
        }

        // Handle arrays (convert to comma-separated or list)
        let displayValue = value;
        if (Array.isArray(value)) {
            displayValue = value.join(', ');
        }

        // Handle objects - don't convert to JSON, just show as-is
        // (table data objects should be handled by createTableSection instead)
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            displayValue = String(value);
        }

        return `
            <div class="review-row">
                <span class="review-label">${label}</span>
                <span class="review-value">${this.escapeHtml(String(displayValue))}</span>
            </div>
        `;
    }

    /**
     * Helper: Create a compact data row for cover info (condensed format)
     * @param {string} label - Field label
     * @param {*} value - Field value
     * @param {boolean} showEmpty - Whether to show "Not yet filled" for empty values
     */
    createCompactDataRow(label, value, showEmpty = false) {
        // Handle empty/null/undefined values
        if (!value && value !== 0 && value !== false) {
            if (showEmpty) {
                return `
                    <div class="cover-info-item empty">
                        <span class="cover-label">${label}</span>
                        <span class="cover-value-empty">Not filled</span>
                    </div>
                `;
            }
            return '';
        }

        // Handle arrays (convert to comma-separated)
        let displayValue = value;
        if (Array.isArray(value)) {
            displayValue = value.join(', ');
        }

        // Handle objects
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            displayValue = String(value);
        }

        return `
            <div class="cover-info-item">
                <span class="cover-label">${label}</span>
                <span class="cover-value">${this.escapeHtml(String(displayValue))}</span>
            </div>
        `;
    }

    /**
     * Helper: Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Helper: Check if a value is empty
     */
    isEmpty(value) {
        if (value === null || value === undefined) return true;
        if (typeof value === 'string' && value.trim() === '') return true;
        if (Array.isArray(value) && value.length === 0) return true;
        if (typeof value === 'object' && Object.keys(value).length === 0) return true;
        return false;
    }

    /**
     * Helper: Check if table data is empty (all cells are false or empty strings)
     * Table data comes as objects with numeric keys containing [checkbox, text] pairs
     */
    isEmptyTableData(data) {
        if (!data || typeof data !== 'object') return true;

        // Check if it's an empty object
        if (Object.keys(data).length === 0) return true;

        // Check if all rows are empty (all checkboxes false and all text empty)
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const row = data[key];
                // Row is [checkbox, text] format
                if (Array.isArray(row)) {
                    const [isChecked, text] = row;
                    if (isChecked === true || (typeof text === 'string' && text.trim() !== '')) {
                        return false; // Found at least one filled cell
                    }
                } else if (typeof row === 'object' && row !== null) {
                    // Handle object format { "0": false, "1": "" }
                    const values = Object.values(row);
                    const hasChecked = values.some(v => v === true);
                    const hasText = values.some(v => typeof v === 'string' && v.trim() !== '');
                    if (hasChecked || hasText) {
                        return false; // Found at least one filled cell
                    }
                }
            }
        }
        return true; // All cells are empty
    }

    /**
     * Helper: Check if work schedule is just default values (not actually filled)
     */
    isDefaultWorkSchedule(data) {
        if (!data || typeof data !== 'object') return true;

        // Check if it only has the default calculator values with no user input
        const hasOnlyDefaults =
            data.weeklyHours === 40 &&
            data.shiftLength === 8 &&
            data.shiftsPerWeek === 5 &&
            Object.keys(data).length === 3;

        return hasOnlyDefaults;
    }

    /**
     * Helper: Extract text from function item (handles both string and object formats)
     * Functions can be strings or objects with essentialFunction/marginalFunction properties
     */
    extractFunctionText(item) {
        if (typeof item === 'string') {
            return item;
        }
        if (typeof item === 'object' && item !== null) {
            // Try common property names
            return item.essentialFunction || item.marginalFunction || item.text || item.value || '';
        }
        return '';
    }

    /**
     * Helper: Check if text has actual content (not just empty HTML tags)
     * Removes HTML tags and checks if there's any meaningful text left
     */
    hasActualContent(text) {
        if (!text || typeof text !== 'string') return false;

        // Remove HTML tags
        const plainText = text.replace(/<[^>]*>/g, '').trim();

        // Check if there's any non-whitespace content
        return plainText.length > 0;
    }

    /**
     * Get all data for document generation
     * @returns {Object} All collected data
     */
    getData() {
        return {
            intro: this.tabsManager.introTab?.getData() || {},
            demographics: this.tabsManager.demographicsTab?.getData() || {},
            jobs: this.tabsManager.jobsTab?.getData() || {},
            summary: this.tabsManager.summaryTab?.getData() || {}
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PreviewTab;
}
