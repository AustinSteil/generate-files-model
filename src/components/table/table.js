/**
 * Reusable Table Component
 *
 * A flexible table component for physical demands analysis and similar data collection.
 * Supports configurable rows, columns, headers, and cell types (selectable or input).
 *
 * Features:
 * - Configurable number of rows and columns
 * - Header row (top) and header column (left)
 * - Selectable cells (single or multiple selection per row)
 * - Text input cells
 * - Full dark mode support
 * - Data export/import
 *
 * @author Austin Steil
 * @version 1.0.0
 */

class Table {
    constructor(options = {}) {
        this.options = {
            containerId: options.containerId || null,
            id: options.id || this.generateId(),
            title: options.title || null,
            description: options.description || null,

            // Table structure
            headerColumns: options.headerColumns || [],
            headerRows: options.headerRows || [],
            rowGroups: options.rowGroups || null, // Optional: array of {category, rows} for grouping

            // Cell configuration
            cellType: options.cellType || 'selectable',
            columnTypes: options.columnTypes || null, // Optional: array of cell types per column
            inputType: options.inputType || 'text',
            selectionMode: options.selectionMode || 'single',

            // Column configuration
            columnWidths: options.columnWidths || null, // Optional: array of widths per column
            rowHeaderWidth: options.rowHeaderWidth || 'auto', // Optional: width of the row header column (default: auto)

            // Styling options
            striped: options.striped !== undefined ? options.striped : true,
            hoverable: options.hoverable !== undefined ? options.hoverable : true,
            bordered: options.bordered !== undefined ? options.bordered : false,
            compact: options.compact !== undefined ? options.compact : false,

            // Validation options
            validation: options.validation || null,
            showValidationErrors: options.showValidationErrors !== undefined ? options.showValidationErrors : true,

            // Callbacks
            onChange: options.onChange || null,
            onValidate: options.onValidate || null,

            // Initial data
            initialData: options.initialData || null
        };

        this.container = null;
        this.tableElement = null;
        this.data = this.initializeData();
        this.validationErrors = {}; // Track validation errors per cell

        this.init();
    }

    /**
     * Generate a unique ID for the table
     */
    generateId() {
        return 'table-' + Math.random().toString(36).substring(2, 11);
    }

    /**
     * Get cell type for a specific column
     * Supports both global cellType and per-column cellType configuration
     */
    getCellType(colIndex) {
        // If columnTypes array is provided, use per-column configuration
        if (this.options.columnTypes && Array.isArray(this.options.columnTypes)) {
            return this.options.columnTypes[colIndex] || this.options.cellType;
        }
        return this.options.cellType;
    }

    /**
     * Initialize data structure
     */
    initializeData() {
        const data = {};

        if (this.options.initialData) {
            return JSON.parse(JSON.stringify(this.options.initialData));
        }

        // Initialize empty data structure
        this.options.headerRows.forEach((rowHeader, rowIndex) => {
            data[rowIndex] = {};
            this.options.headerColumns.forEach((colHeader, colIndex) => {
                const cellType = this.getCellType(colIndex);
                if (cellType === 'selectable') {
                    data[rowIndex][colIndex] = false;
                } else {
                    data[rowIndex][colIndex] = '';
                }
            });
        });

        return data;
    }

    /**
     * Initialize the table component
     */
    init() {
        if (this.options.containerId) {
            this.container = document.getElementById(this.options.containerId);
            if (this.container) {
                this.render();
            }
        }
    }

    /**
     * Render the table component
     */
    render() {
        if (!this.container) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'table-component-wrapper';
        wrapper.id = this.options.id + '-wrapper';

        // Add title if provided
        if (this.options.title) {
            const title = document.createElement('div');
            title.className = 'table-component-title';
            title.textContent = this.options.title;
            wrapper.appendChild(title);
        }

        // Add description if provided
        if (this.options.description) {
            const description = document.createElement('div');
            description.className = 'table-component-description';
            description.textContent = this.options.description;
            wrapper.appendChild(description);
        }

        // Create table container
        const tableContainer = document.createElement('div');
        tableContainer.className = 'table-component';
        tableContainer.id = this.options.id;

        // Add styling classes
        if (this.options.striped) tableContainer.classList.add('striped');
        if (this.options.hoverable) tableContainer.classList.add('hoverable');
        if (this.options.bordered) tableContainer.classList.add('bordered');
        if (this.options.compact) tableContainer.classList.add('compact');

        // Create table
        const table = document.createElement('table');
        table.setAttribute('role', 'grid');

        // Create header row
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        // Empty cell for top-left corner
        const cornerCell = document.createElement('th');
        cornerCell.className = 'header-row';
        headerRow.appendChild(cornerCell);

        // Add column headers
        this.options.headerColumns.forEach((header, colIndex) => {
            const th = document.createElement('th');

            // Support both string headers and multi-line headers
            if (typeof header === 'string') {
                th.textContent = header;
            } else if (typeof header === 'object' && header.lines) {
                // Multi-line header: {lines: ['Line 1', 'Line 2', ...]}
                th.className = 'multi-line-header';
                header.lines.forEach((line, index) => {
                    if (index > 0) {
                        th.appendChild(document.createElement('br'));
                    }
                    th.appendChild(document.createTextNode(line));
                });
            }

            // Apply column width if specified
            if (this.options.columnWidths && this.options.columnWidths[colIndex]) {
                th.style.width = this.options.columnWidths[colIndex];
            }

            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create table body
        const tbody = document.createElement('tbody');

        // Check if we have row groups
        if (this.options.rowGroups && this.options.rowGroups.length > 0) {
            // Render with row groups
            this.options.rowGroups.forEach(group => {
                // Add category row
                const categoryRow = document.createElement('tr');
                categoryRow.className = 'category-row';

                const categoryCell = document.createElement('td');
                categoryCell.className = 'category-header';
                categoryCell.textContent = group.category;
                categoryCell.setAttribute('colspan', this.options.headerColumns.length + 1);
                categoryRow.appendChild(categoryCell);

                tbody.appendChild(categoryRow);

                // Add data rows for this group
                group.rows.forEach(rowIndex => {
                    const rowHeader = this.options.headerRows[rowIndex];
                    const row = document.createElement('tr');
                    row.className = 'grouped-row';

                    // Add row header
                    const rowHeaderCell = document.createElement('td');
                    rowHeaderCell.className = 'row-header';
                    rowHeaderCell.textContent = rowHeader;

                    // Apply row header width if specified
                    if (this.options.rowHeaderWidth) {
                        rowHeaderCell.style.width = this.options.rowHeaderWidth;
                    }

                    row.appendChild(rowHeaderCell);

                    // Add data cells
                    this.options.headerColumns.forEach((colHeader, colIndex) => {
                        const cell = this.createCell(rowIndex, colIndex);
                        row.appendChild(cell);
                    });

                    // Add data attribute to track row index for validation
                    row.setAttribute('data-row-index', rowIndex);

                    tbody.appendChild(row);
                });
            });
        } else {
            // Render without row groups (original behavior)
            this.options.headerRows.forEach((rowHeader, rowIndex) => {
                const row = document.createElement('tr');

                // Add row header
                const rowHeaderCell = document.createElement('td');
                rowHeaderCell.className = 'row-header';
                rowHeaderCell.textContent = rowHeader;

                // Apply row header width if specified
                if (this.options.rowHeaderWidth) {
                    rowHeaderCell.style.width = this.options.rowHeaderWidth;
                }

                row.appendChild(rowHeaderCell);

                // Add data cells
                this.options.headerColumns.forEach((colHeader, colIndex) => {
                    const cell = this.createCell(rowIndex, colIndex);
                    row.appendChild(cell);
                });

                // Add data attribute to track row index for validation
                row.setAttribute('data-row-index', rowIndex);

                tbody.appendChild(row);
            });
        }

        table.appendChild(tbody);
        tableContainer.appendChild(table);
        wrapper.appendChild(tableContainer);

        // Clear container and add new content
        this.container.innerHTML = '';
        this.container.appendChild(wrapper);

        this.tableElement = tableContainer;

        // Setup column hover effects if hoverable
        if (this.options.hoverable) {
            this.setupColumnHover();
        }
    }

    /**
     * Setup column hover effects
     */
    setupColumnHover() {
        if (!this.tableElement) return;

        const cells = this.tableElement.querySelectorAll('td.selectable, td.input-cell');

        cells.forEach(cell => {
            const colIndex = Array.from(cell.parentElement.children).indexOf(cell);

            cell.addEventListener('mouseenter', () => {
                const allRows = this.tableElement.querySelectorAll('tbody tr');
                allRows.forEach(row => {
                    const targetCell = row.children[colIndex];
                    if (targetCell) {
                        targetCell.setAttribute('data-column-hover', 'true');
                    }
                });
            });

            cell.addEventListener('mouseleave', () => {
                const allCells = this.tableElement.querySelectorAll('[data-column-hover="true"]');
                allCells.forEach(c => c.removeAttribute('data-column-hover'));
            });
        });
    }

    /**
     * Create a table cell based on configuration
     */
    createCell(rowIndex, colIndex) {
        const cell = document.createElement('td');
        const cellType = this.getCellType(colIndex);

        // Apply column width if specified
        if (this.options.columnWidths && this.options.columnWidths[colIndex]) {
            cell.style.width = this.options.columnWidths[colIndex];
        }

        if (cellType === 'selectable') {
            cell.className = 'selectable';
            cell.setAttribute('tabindex', '0');
            cell.setAttribute('role', 'gridcell');
            cell.setAttribute('aria-label', `${this.options.headerRows[rowIndex]} - ${this.getColumnLabel(colIndex)}`);

            // Set initial state
            if (this.data[rowIndex][colIndex]) {
                cell.classList.add('selected');
                cell.setAttribute('aria-selected', 'true');
            } else {
                cell.setAttribute('aria-selected', 'false');
            }

            // Add click handler
            cell.addEventListener('click', () => this.handleCellClick(rowIndex, colIndex, cell));

            // Add keyboard support
            cell.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleCellClick(rowIndex, colIndex, cell);
                }
            });
        } else {
            cell.className = 'input-cell';

            // Create input element
            const input = this.options.inputType === 'textarea'
                ? document.createElement('textarea')
                : document.createElement('input');

            if (this.options.inputType !== 'textarea') {
                input.type = 'text';
            }

            input.value = this.data[rowIndex][colIndex] || '';
            input.setAttribute('aria-label', `${this.options.headerRows[rowIndex]} - ${this.getColumnLabel(colIndex)}`);

            // Add input handler
            input.addEventListener('input', (e) => {
                this.handleInputChange(rowIndex, colIndex, e.target.value);

                // Auto-grow textarea
                if (this.options.inputType === 'textarea') {
                    this.autoGrowTextarea(e.target);
                }
            });

            // Initialize textarea height if needed
            if (this.options.inputType === 'textarea') {
                setTimeout(() => this.autoGrowTextarea(input), 0);
            }

            cell.appendChild(input);
        }

        return cell;
    }

    /**
     * Get column label (supports both string and object headers)
     */
    getColumnLabel(colIndex) {
        const header = this.options.headerColumns[colIndex];
        if (typeof header === 'string') {
            return header;
        } else if (typeof header === 'object' && header.lines) {
            return header.lines[0];
        }
        return '';
    }

    /**
     * Auto-grow textarea to fit content
     */
    autoGrowTextarea(textarea) {
        textarea.style.height = 'auto';
        const newHeight = Math.max(40, textarea.scrollHeight);
        textarea.style.height = newHeight + 'px';

        const cell = textarea.parentElement;
        if (cell) {
            cell.style.height = 'auto';
        }
    }

    /**
     * Handle cell click for selectable cells
     */
    handleCellClick(rowIndex, colIndex, cell) {
        if (this.options.selectionMode === 'single') {
            // Deselect all cells in this row
            const row = cell.parentElement;
            const cells = row.querySelectorAll('td.selectable');
            cells.forEach(c => {
                c.classList.remove('selected');
                c.setAttribute('aria-selected', 'false');
            });

            // Clear all selections in this row
            Object.keys(this.data[rowIndex]).forEach(key => {
                this.data[rowIndex][key] = false;
            });
        }

        // Toggle this cell
        const isSelected = cell.classList.toggle('selected');
        cell.setAttribute('aria-selected', isSelected ? 'true' : 'false');
        this.data[rowIndex][colIndex] = isSelected;

        // Clear validation error for this row when user makes a selection
        if (isSelected) {
            this.clearRowValidationError(rowIndex);
        }

        // Trigger onChange callback
        if (this.options.onChange) {
            this.options.onChange(this.getData());
        }
    }

    /**
     * Handle input change for input cells
     */
    handleInputChange(rowIndex, colIndex, value) {
        this.data[rowIndex][colIndex] = value;

        // Clear validation error for this cell when user starts typing
        if (value && value.trim() !== '') {
            this.clearCellValidationError(rowIndex, colIndex);
        }

        // Trigger onChange callback
        if (this.options.onChange) {
            this.options.onChange(this.getData());
        }
    }

    /**
     * Get current table data
     */
    getData() {
        return JSON.parse(JSON.stringify(this.data));
    }

    /**
     * Set table data
     */
    setData(data) {
        this.data = data;
        this.render();
    }

    /**
     * Clear all selections/inputs
     */
    clear() {
        this.data = this.initializeData();
        this.render();
    }

    /**
     * Validate table data
     */
    validate() {
        this.validationErrors = {};
        let isValid = true;

        // Run custom validation if provided
        if (this.options.validation) {
            const customErrors = this.options.validation(this.getData());
            if (customErrors && Object.keys(customErrors).length > 0) {
                this.validationErrors = customErrors;
                isValid = false;
            }
        }

        // Run built-in validation
        if (this.options.cellType === 'selectable') {
            isValid = this.validateSelectableCells() && isValid;
        } else if (this.options.cellType === 'input') {
            isValid = this.validateInputCells() && isValid;
        }

        // Update UI to show validation state
        if (this.options.showValidationErrors) {
            this.updateValidationUI();
        }

        // Run onValidate callback if provided
        if (this.options.onValidate) {
            return this.options.onValidate(this.getData());
        }

        return isValid;
    }

    /**
     * Validate selectable cells (ensure at least one selection per row if required)
     */
    validateSelectableCells() {
        let isValid = true;

        this.options.headerRows.forEach((rowHeader, rowIndex) => {
            const hasSelection = Object.values(this.data[rowIndex]).some(val => val === true);

            if (!hasSelection) {
                this.validationErrors[`row-${rowIndex}`] = `${rowHeader} requires a selection`;
                isValid = false;
            }
        });

        return isValid;
    }

    /**
     * Validate input cells (ensure required fields are filled)
     */
    validateInputCells() {
        let isValid = true;

        this.options.headerRows.forEach((rowHeader, rowIndex) => {
            this.options.headerColumns.forEach((colHeader, colIndex) => {
                const value = this.data[rowIndex][colIndex];
                const isEmpty = !value || (typeof value === 'string' && value.trim() === '');

                if (isEmpty) {
                    const cellKey = `cell-${rowIndex}-${colIndex}`;
                    this.validationErrors[cellKey] = `${rowHeader} - ${colHeader} is required`;
                    isValid = false;
                }
            });
        });

        return isValid;
    }

    /**
     * Update UI to show validation errors
     */
    updateValidationUI() {
        if (!this.tableElement) return;

        // Clear previous validation states from rows
        this.tableElement.querySelectorAll('tbody tr').forEach(row => {
            row.classList.remove('validation-error', 'validation-success');
            row.setAttribute('data-validation-error', '');
        });

        // Apply validation states to rows
        Object.entries(this.validationErrors).forEach(([key, error]) => {
            if (key.startsWith('row-')) {
                // Row-level error: find row by data-row-index attribute
                const rowIndex = parseInt(key.split('-')[1]);
                const row = this.tableElement.querySelector(`tbody tr[data-row-index="${rowIndex}"]`);
                if (row) {
                    row.classList.add('validation-error');
                    row.setAttribute('data-validation-error', error);
                }
            } else if (key.startsWith('cell-')) {
                // Cell-level error: find row by data-row-index attribute
                const [, rowIndex] = key.split('-').map(Number);
                const row = this.tableElement.querySelector(`tbody tr[data-row-index="${rowIndex}"]`);
                if (row) {
                    row.classList.add('validation-error');
                    row.setAttribute('data-validation-error', error);
                }
            }
        });

        // Mark valid rows if no errors
        if (Object.keys(this.validationErrors).length === 0) {
            this.tableElement.querySelectorAll('tbody tr').forEach(row => {
                row.classList.add('validation-success');
            });
        }
    }

    /**
     * Clear validation error for a specific row
     * @param {number} rowIndex - Index of the row to clear
     */
    clearRowValidationError(rowIndex) {
        const rowKey = `row-${rowIndex}`;
        if (this.validationErrors[rowKey]) {
            delete this.validationErrors[rowKey];

            // Remove validation classes from the row using data-row-index attribute
            if (this.tableElement) {
                const row = this.tableElement.querySelector(`tbody tr[data-row-index="${rowIndex}"]`);
                if (row) {
                    row.classList.remove('validation-error', 'validation-success');
                    row.removeAttribute('data-validation-error');
                }
            }
        }
    }

    /**
     * Clear validation error for a specific cell
     * @param {number} rowIndex - Index of the row
     * @param {number} colIndex - Index of the column
     */
    clearCellValidationError(rowIndex, colIndex) {
        const cellKey = `cell-${rowIndex}-${colIndex}`;
        if (this.validationErrors[cellKey]) {
            delete this.validationErrors[cellKey];

            // Remove validation classes from the row containing this cell using data-row-index attribute
            if (this.tableElement) {
                const row = this.tableElement.querySelector(`tbody tr[data-row-index="${rowIndex}"]`);
                if (row) {
                    row.classList.remove('validation-error', 'validation-success');
                    row.removeAttribute('data-validation-error');
                }
            }
        }
    }

    /**
     * Clear validation errors
     */
    clearValidationErrors() {
        this.validationErrors = {};
        if (this.tableElement) {
            this.tableElement.querySelectorAll('tbody tr').forEach(row => {
                row.classList.remove('validation-error', 'validation-success');
                row.removeAttribute('data-validation-error');
            });
        }
    }

    /**
     * Get validation errors
     */
    getValidationErrors() {
        return JSON.parse(JSON.stringify(this.validationErrors));
    }

    /**
     * Set loading state
     */
    setLoading(isLoading) {
        if (this.tableElement) {
            if (isLoading) {
                this.tableElement.classList.add('loading');
            } else {
                this.tableElement.classList.remove('loading');
            }
        }
    }

    /**
     * Set disabled state
     */
    setDisabled(isDisabled) {
        if (this.tableElement) {
            if (isDisabled) {
                this.tableElement.classList.add('disabled');
            } else {
                this.tableElement.classList.remove('disabled');
            }
        }
    }

    /**
     * Export data to CSV
     */
    exportToCSV() {
        const rows = [];

        // Header row
        const headerRow = ['', ...this.options.headerColumns];
        rows.push(headerRow);

        // Data rows
        this.options.headerRows.forEach((rowHeader, rowIndex) => {
            const row = [rowHeader];
            this.options.headerColumns.forEach((colHeader, colIndex) => {
                const value = this.data[rowIndex][colIndex];
                // Handle boolean values for selectable cells
                row.push(typeof value === 'boolean' ? (value ? 'X' : '') : value);
            });
            rows.push(row);
        });

        // Convert to CSV string
        const csvContent = rows.map(row =>
            row.map(cell => {
                const cellStr = String(cell);
                if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
                    return '"' + cellStr.replace(/"/g, '""') + '"';
                }
                return cellStr;
            }).join(',')
        ).join('\n');

        return csvContent;
    }

    /**
     * Get the table element
     */
    getElement() {
        return this.tableElement;
    }

    /**
     * Destroy the table component
     */
    destroy() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

