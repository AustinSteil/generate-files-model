/**
 * Repeater Component - Reusable dynamic array input system
 * 
 * A flexible repeater component that supports:
 * - Dynamic add/remove of rows (minimum 1, no maximum)
 * - Up to 4 configurable input types per row
 * - Integration with TextInput and Dropdown components
 * - Slim, elegant design with add/subtract buttons
 * - Full light/dark mode support
 * - Storage system integration
 * - Validation support
 * 
 * @author Austin Steil
 * @version 1.0.0
 */

class Repeater {
    constructor(options = {}) {
        this.options = {
            containerId: options.containerId || null,
            id: options.id || this.generateId(),
            name: options.name || options.id || this.generateId(),
            label: options.label || '',
            fields: options.fields || [], // Array of field configurations (max 4)
            minRows: 1,
            maxRows: options.maxRows || null, // null = no maximum
            defaultRows: options.defaultRows || 1,
            required: options.required || false,
            onChange: options.onChange || null,
            className: options.className || '',
            showFieldLabels: options.showFieldLabels !== undefined ? options.showFieldLabels : true, // Show/hide field labels
            ...options
        };

        this.container = null;
        this.rows = [];
        this.rowCounter = 0;
        this.isValid = true;

        // Validate fields configuration
        if (this.options.fields.length === 0 || this.options.fields.length > 4) {
            console.error('Repeater: fields must contain 1-4 field configurations');
            return;
        }

        this.init();
    }

    /**
     * Generate a unique ID
     */
    generateId() {
        return 'repeater-' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Initialize the repeater component
     */
    init() {
        if (this.options.containerId) {
            this.container = document.getElementById(this.options.containerId);
            if (!this.container) {
                console.error(`Repeater: Container with ID "${this.options.containerId}" not found`);
                return;
            }
            this.render();
        }
    }

    /**
     * Render the repeater component
     */
    render() {
        if (!this.container) return;

        const repeaterClass = `repeater-component ${this.options.className}`.trim();

        // Build column headers HTML
        const columnHeadersHTML = this.options.fields.map(field =>
            `<div class="repeater-column-header">${field.label}${field.required ? ' *' : ''}</div>`
        ).join('');

        // Add class for hiding field labels if needed
        const hideLabelsClass = !this.options.showFieldLabels ? 'hide-field-labels' : '';

        this.container.innerHTML = `
            <div class="${repeaterClass} ${hideLabelsClass}" data-field-count="${this.options.fields.length}">
                <div class="repeater-header">
                    <label class="repeater-label">${this.options.label}${this.options.required ? ' *' : ''}</label>
                </div>
                <div class="repeater-table">
                    <div class="repeater-column-headers">
                        <div class="repeater-row-number-header">#</div>
                        ${columnHeadersHTML}
                        <div class="repeater-actions-header"></div>
                    </div>
                    <div class="repeater-rows" id="${this.options.id}-rows"></div>
                </div>
                <button type="button" class="repeater-add-btn" title="Add row">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    <span>Add ${this.options.label.replace(/s$/, '')}</span>
                </button>
            </div>
        `;

        this.rowsContainer = this.container.querySelector(`#${this.options.id}-rows`);
        this.addButton = this.container.querySelector('.repeater-add-btn');

        this.attachEventListeners();
        this.initializeDefaultRows();
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        if (this.addButton) {
            this.addButton.addEventListener('click', () => this.addRow());
        }
    }

    /**
     * Initialize default rows
     */
    initializeDefaultRows() {
        const rowCount = Math.max(this.options.minRows, this.options.defaultRows);
        for (let i = 0; i < rowCount; i++) {
            this.addRow();
        }
    }

    /**
     * Add a new row
     */
    addRow(data = null) {
        // Check max rows limit
        if (this.options.maxRows && this.rows.length >= this.options.maxRows) {
            return;
        }

        const rowId = `${this.options.id}-row-${this.rowCounter++}`;
        const rowData = {
            id: rowId,
            element: null,
            inputs: []
        };

        // Create row element
        const rowElement = document.createElement('div');
        rowElement.className = 'repeater-row';
        rowElement.id = rowId;

        // Create row number
        const rowNumber = document.createElement('div');
        rowNumber.className = 'repeater-row-number';
        rowNumber.textContent = this.rows.length + 1;
        rowElement.appendChild(rowNumber);

        // Create each field directly in the row
        this.options.fields.forEach((_, index) => {
            const fieldContainer = document.createElement('div');
            fieldContainer.className = 'repeater-field';
            fieldContainer.id = `${rowId}-field-${index}`;
            rowElement.appendChild(fieldContainer);
        });

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.className = 'repeater-remove-btn';
        removeButton.title = 'Remove row';
        removeButton.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
        `;
        removeButton.addEventListener('click', () => this.removeRow(rowId));
        rowElement.appendChild(removeButton);

        // Append to container
        this.rowsContainer.appendChild(rowElement);

        rowData.element = rowElement;
        this.rows.push(rowData);

        // Initialize field components
        this.initializeRowFields(rowData, data);

        // Update remove button states and row numbers
        this.updateRemoveButtons();
        this.updateRowNumbers();

        // Trigger change event
        if (this.options.onChange) {
            this.options.onChange(this.getData(), this);
        }
    }

    /**
     * Initialize field components for a row
     */
    initializeRowFields(rowData, data = null) {
        // Wait for components to be available
        if (typeof TextInput === 'undefined' || typeof Dropdown === 'undefined') {
            setTimeout(() => this.initializeRowFields(rowData, data), 100);
            return;
        }

        this.options.fields.forEach((fieldConfig, index) => {
            const containerId = `${rowData.id}-field-${index}`;
            const fieldId = `${rowData.id}-${fieldConfig.name}`;

            let component;

            if (fieldConfig.type === 'dropdown') {
                component = new Dropdown({
                    containerId: containerId,
                    id: fieldId,
                    name: fieldConfig.name,
                    label: fieldConfig.label || '',
                    options: fieldConfig.options || [],
                    placeholder: fieldConfig.placeholder || 'Select...',
                    required: fieldConfig.required || false,
                    onChange: () => this.handleFieldChange()
                });
            } else if (fieldConfig.type === 'area' || fieldConfig.type === 'textarea') {
                // AreaInput component
                if (typeof AreaInput === 'undefined') {
                    console.warn('AreaInput component not loaded, falling back to TextInput');
                    component = new TextInput({
                        containerId: containerId,
                        id: fieldId,
                        name: fieldConfig.name,
                        label: fieldConfig.label || '',
                        type: 'text',
                        placeholder: fieldConfig.placeholder || '',
                        required: fieldConfig.required || false,
                        validation: fieldConfig.validation || null,
                        onChange: () => this.handleFieldChange()
                    });
                } else {
                    component = new AreaInput({
                        containerId: containerId,
                        id: fieldId,
                        name: fieldConfig.name,
                        label: fieldConfig.label || '',
                        placeholder: fieldConfig.placeholder || '',
                        required: fieldConfig.required || false,
                        validation: fieldConfig.validation || null,
                        autoGrow: fieldConfig.autoGrow !== undefined ? fieldConfig.autoGrow : false,
                        resize: fieldConfig.resize || 'vertical',
                        rows: fieldConfig.rows || 3,
                        maxLength: fieldConfig.maxLength || null,
                        showCharCounter: fieldConfig.showCharCounter !== undefined ? fieldConfig.showCharCounter : false,
                        minHeight: fieldConfig.minHeight || null,
                        maxHeight: fieldConfig.maxHeight || null,
                        onChange: () => this.handleFieldChange()
                    });
                }
            } else {
                // Default to TextInput
                component = new TextInput({
                    containerId: containerId,
                    id: fieldId,
                    name: fieldConfig.name,
                    label: fieldConfig.label || '',
                    type: fieldConfig.type || 'text',
                    placeholder: fieldConfig.placeholder || '',
                    required: fieldConfig.required || false,
                    validation: fieldConfig.validation || null,
                    onChange: () => this.handleFieldChange()
                });
            }

            rowData.inputs.push({
                name: fieldConfig.name,
                component: component
            });

            // Set data if provided
            if (data && data[fieldConfig.name] !== undefined) {
                component.setValue ? component.setValue(data[fieldConfig.name]) : component.setData({ [fieldConfig.name]: data[fieldConfig.name] });
            }
        });
    }

    /**
     * Remove a row
     */
    removeRow(rowId) {
        // Don't allow removing if at minimum
        if (this.rows.length <= this.options.minRows) {
            return;
        }

        const rowIndex = this.rows.findIndex(row => row.id === rowId);
        if (rowIndex === -1) return;

        const row = this.rows[rowIndex];

        // Destroy components
        row.inputs.forEach(input => {
            if (input.component && input.component.destroy) {
                input.component.destroy();
            }
        });

        // Remove element
        if (row.element && row.element.parentNode) {
            row.element.parentNode.removeChild(row.element);
        }

        // Remove from array
        this.rows.splice(rowIndex, 1);

        // Update remove button states and row numbers
        this.updateRemoveButtons();
        this.updateRowNumbers();

        // Trigger change event
        if (this.options.onChange) {
            this.options.onChange(this.getData(), this);
        }
    }

    /**
     * Update row numbers after add/remove
     */
    updateRowNumbers() {
        this.rows.forEach((row, index) => {
            const numberElement = row.element.querySelector('.repeater-row-number');
            if (numberElement) {
                numberElement.textContent = index + 1;
            }
        });
    }

    /**
     * Update remove button states (disable if at minimum)
     */
    updateRemoveButtons() {
        const atMinimum = this.rows.length <= this.options.minRows;
        this.rows.forEach(row => {
            const removeBtn = row.element.querySelector('.repeater-remove-btn');
            if (removeBtn) {
                removeBtn.disabled = atMinimum;
                removeBtn.style.opacity = atMinimum ? '0.3' : '1';
                removeBtn.style.cursor = atMinimum ? 'not-allowed' : 'pointer';
            }
        });
    }

    /**
     * Handle field change events
     */
    handleFieldChange() {
        this.validate();
        if (this.options.onChange) {
            this.options.onChange(this.getData(), this);
        }
    }

    /**
     * Get data from all rows
     */
    getData() {
        return {
            [this.options.name]: this.rows.map(row => {
                const rowData = {};
                row.inputs.forEach(input => {
                    const value = input.component.getValue ? input.component.getValue() : 
                                 (input.component.getData ? Object.values(input.component.getData())[0] : '');
                    rowData[input.name] = value;
                });
                return rowData;
            })
        };
    }

    /**
     * Set data for all rows
     */
    setData(data) {
        if (!data || !data[this.options.name]) return;

        const rowsData = data[this.options.name];

        // Clear existing rows - force removal by temporarily setting minRows to 0
        const originalMinRows = this.options.minRows;
        this.options.minRows = 0;

        while (this.rows.length > 0) {
            this.removeRow(this.rows[0].id);
        }

        // Restore original minRows
        this.options.minRows = originalMinRows;

        // Add rows with data
        rowsData.forEach(rowData => {
            this.addRow(rowData);
        });
    }

    /**
     * Validate all rows
     */
    validate() {
        let isValid = true;

        this.rows.forEach(row => {
            row.inputs.forEach(input => {
                if (input.component.validate && !input.component.validate()) {
                    isValid = false;
                }
            });
        });

        this.isValid = isValid;
        return isValid;
    }

    /**
     * Clear all rows (reset to minimum)
     */
    clear() {
        while (this.rows.length > this.options.minRows) {
            this.removeRow(this.rows[this.rows.length - 1].id);
        }
        this.rows.forEach(row => {
            row.inputs.forEach(input => {
                if (input.component.clear) {
                    input.component.clear();
                }
            });
        });
    }

    /**
     * Destroy the component
     */
    destroy() {
        this.rows.forEach(row => {
            row.inputs.forEach(input => {
                if (input.component && input.component.destroy) {
                    input.component.destroy();
                }
            });
        });
        
        if (this.container) {
            this.container.innerHTML = '';
        }
        
        this.rows = [];
        this.container = null;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Repeater;
}

