# Table Component

A flexible, reusable table component designed for physical demands analysis and similar data collection forms. Supports configurable rows, columns, headers, and cell types (selectable or input).

## Features

✅ **Configurable Structure** - Define custom rows and columns
✅ **Header Support** - Top header row and left header column
✅ **Selectable Cells** - Click to select (single or multiple per row)
✅ **Input Cells** - Text input or textarea for data entry
✅ **Validation** - Built-in and custom validation with visual feedback
✅ **Dark Mode** - Full light/dark mode support
✅ **Responsive** - Mobile-friendly design
✅ **Accessible** - ARIA labels and keyboard navigation
✅ **Styling Options** - Striped, hoverable, bordered, compact variants

## Installation

```html
<!-- Add to your HTML -->
<link rel="stylesheet" href="src/components/table/table.css">
<script src="src/components/table/table.js"></script>
```

## Basic Usage

### Selectable Table (Single Selection)

```javascript
const table = new Table({
    containerId: 'my-table-container',
    title: 'Physical Demands',
    description: 'Select the frequency for each demand',
    headerColumns: ['Never', 'Rare', 'Occasional', 'Frequent', 'Constant'],
    headerRows: [
        'Lifting - Floor to Knuckle',
        'Lifting - Over Head',
        'Carrying - with Handles'
    ],
    cellType: 'selectable',
    selectionMode: 'single',
    onChange: (data) => {
        console.log('Data changed:', data);
    }
});
```

### Input Table

```javascript
const table = new Table({
    containerId: 'my-table-container',
    title: 'Comments',
    headerColumns: ['Weight (kg)', 'Comments'],
    headerRows: [
        'Lifting Activity',
        'Carrying Activity'
    ],
    cellType: 'input',
    inputType: 'text'
});
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `containerId` | string | null | ID of the container element |
| `id` | string | auto-generated | Unique ID for the table |
| `title` | string | null | Table title (optional) |
| `description` | string | null | Table description (optional) |
| `headerColumns` | array | [] | Array of column header labels |
| `headerRows` | array | [] | Array of row header labels |
| `cellType` | string | 'selectable' | 'selectable' or 'input' |
| `inputType` | string | 'text' | 'text' or 'textarea' (when cellType is 'input') |
| `selectionMode` | string | 'single' | 'single' or 'multiple' (when cellType is 'selectable') |
| `striped` | boolean | true | Alternate row colors |
| `hoverable` | boolean | true | Highlight rows on hover |
| `bordered` | boolean | false | Add borders to cells |
| `compact` | boolean | false | Reduce padding for compact layout |
| `onChange` | function | null | Callback when data changes |
| `onValidate` | function | null | Callback for custom validation |
| `initialData` | object | null | Pre-populate table with data |

## Methods

### `getData()`

Get current table data as an object.

```javascript
const data = table.getData();
console.log(data);
// Output: { 0: { 0: true, 1: false, 2: false }, 1: { 0: false, 1: true, 2: false } }
```

### `setData(data)`

Set table data programmatically.

```javascript
table.setData({
    0: { 0: true, 1: false },
    1: { 0: false, 1: true }
});
```

### `clear()`

Clear all selections or inputs.

```javascript
table.clear();
```

### `getElement()`

Get the table DOM element.

```javascript
const element = table.getElement();
```

### `destroy()`

Remove the table from the DOM and cleanup event listeners.

```javascript
table.destroy();
```

### `validate()`

Validate table data using the `onValidate` callback.

```javascript
const isValid = table.validate();
if (!isValid) {
    console.log('Validation failed');
}
```

### `setLoading(isLoading)`

Set the loading state of the table.

```javascript
table.setLoading(true);  // Show loading state
// ... perform async operation
table.setLoading(false); // Hide loading state
```

### `setDisabled(isDisabled)`

Set the disabled state of the table.

```javascript
table.setDisabled(true);  // Disable table
table.setDisabled(false); // Enable table
```

### `exportToCSV()`

Export table data to CSV format.

```javascript
const csvData = table.exportToCSV();
// Download or save the CSV data
const blob = new Blob([csvData], { type: 'text/csv' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'table-data.csv';
a.click();
```

## Examples

### Physical Demands Analysis

```javascript
const physicalDemands = new Table({
    containerId: 'physical-demands-table',
    title: 'Physical Demands',
    description: 'Select frequency during shift',
    headerColumns: ['Never', 'Rare', 'Occasional', 'Frequent', 'Constant'],
    headerRows: [
        'Lifting - Floor to Knuckle',
        'Lifting - Knuckle to Waist',
        'Lifting - Over Head',
        'Carrying - with Handles',
        'Carrying - without Handles',
        'Pushing - Upper Extremity',
        'Pulling - Upper Extremity',
        'Reaching - Shoulder or Above',
        'Reaching - Below Shoulder',
        'Handling',
        'Fine Finger Movements'
    ],
    cellType: 'selectable',
    selectionMode: 'single',
    striped: true,
    hoverable: true
});
```

## Validation

The table component includes built-in validation with visual feedback using the project's color system.

### Built-in Validation

**For Selectable Cells:**

- Ensures at least one selection per row
- Highlights rows with missing selections in red (error color)

**For Input Cells:**

- Ensures all cells are filled (no empty values)
- Highlights empty cells in red (error color)

### Custom Validation

Pass a custom validation function to define your own rules:

```javascript
const table = new Table({
    containerId: 'my-table',
    title: 'Data Entry',
    headerColumns: ['Value 1', 'Value 2', 'Value 3'],
    headerRows: ['Row A', 'Row B', 'Row C'],
    cellType: 'input',

    // Custom validation function
    validation: (data) => {
        const errors = {};

        // Example: Validate that Row A, Value 1 is a number
        const value = data[0][0];
        if (isNaN(value) || value === '') {
            errors['cell-0-0'] = 'Must be a valid number';
        }

        return errors; // Return empty object if valid
    },

    showValidationErrors: true
});
```

### Validation Methods

**validate()** - Run validation and update UI

```javascript
const isValid = table.validate();
if (!isValid) {
    console.log('Validation errors:', table.getValidationErrors());
}
```

**getValidationErrors()** - Get current validation errors

```javascript
const errors = table.getValidationErrors();
// Returns: { 'row-0': 'Row A requires a selection', ... }
```

**clearValidationErrors()** - Clear all validation states

```javascript
table.clearValidationErrors();
```

### Validation Configuration

```javascript
const table = new Table({
    // ... other options

    // Enable/disable validation error display
    showValidationErrors: true,

    // Custom validation function
    validation: (data) => {
        // Return object with errors or empty object
        return {};
    }
});
```

### Visual Feedback

- **Error State** (Red): Cells with validation errors show red background with left border accent
- **Success State** (Green): All cells show green background when validation passes
- **Tooltips**: Hover over error cells to see the error message
- **Color System**: Uses `--color-error`, `--color-success`, and their variants from the centralized color system

### Comments Table

```javascript
const commentsTable = new Table({
    containerId: 'comments-table',
    title: 'Activity Details',
    headerColumns: ['Weight (kg)', 'Max (kg)', 'Comments'],
    headerRows: [
        'Lifting - Floor to Knuckle',
        'Carrying - with Handles',
        'Pushing - Upper Extremity'
    ],
    cellType: 'input',
    inputType: 'text',
    onChange: (data) => {
        // Save data or validate
        console.log('Comments updated:', data);
    }
});
```

### Multiple Selection Table

```javascript
const environmentalTable = new Table({
    containerId: 'environmental-table',
    title: 'Environmental Conditions',
    description: 'Select all applicable conditions',
    headerColumns: ['Indoor', 'Outdoor', 'Hot', 'Cold', 'Wet', 'Noisy'],
    headerRows: [
        'Morning Shift',
        'Afternoon Shift',
        'Night Shift'
    ],
    cellType: 'selectable',
    selectionMode: 'multiple',
    compact: true,
    bordered: true
});
```

## Data Structure

### Selectable Cells

Data is stored as a nested object with row and column indices:

```javascript
{
    0: { 0: true, 1: false, 2: false },  // Row 0: Column 0 selected
    1: { 0: false, 1: true, 2: false },  // Row 1: Column 1 selected
    2: { 0: false, 1: false, 2: true }   // Row 2: Column 2 selected
}
```

### Input Cells

Data is stored as strings:

```javascript
{
    0: { 0: "40", 1: "50", 2: "Picking up boxes" },
    1: { 0: "20", 1: "30", 2: "Carrying mail" }
}
```

## Styling

The table component uses the centralized color system and supports all standard CSS custom properties:

- `--color-primary` - Primary color for selections
- `--color-bg-primary` - Background color
- `--color-text-primary` - Text color
- `--color-border-light` - Border color
- And all other color system variables

### Custom Styling

You can add custom classes to style specific tables:

```css
.my-custom-table .table-component th {
    background: var(--gradient-success);
}

.my-custom-table .table-component td.selectable.selected {
    background: var(--color-success-light);
}
```

## Accessibility

- Full keyboard navigation support (Tab, Enter, Space)
- ARIA labels for screen readers
- Focus indicators for keyboard users
- Semantic HTML structure

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Considerations

- **Large Tables**: The component performs well with tables up to 100 rows × 20 columns
- **Input Debouncing**: Input cells automatically debounce onChange callbacks to prevent performance issues
- **Mobile**: Hover effects are automatically disabled on mobile devices for better performance
- **Re-rendering**: Calling `setData()` or `clear()` will re-render the entire table
- **Memory**: The component uses simple JSON cloning for data management - suitable for typical form data

## Demo

See `src/components/table/demo.html` for a complete working demo with multiple examples.

## Author

Austin Steil

## Version

1.0.0
