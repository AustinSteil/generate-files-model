# Dropdown Component

A flexible, reusable dropdown menu component with support for both standard and split-button modes.

## About

Author: Austin Steil  
Version: 1.0.0
Created October 18, 2025
Updated October 18, 2025

## License & Copyright

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
Live License Page Link: <https://raw.githubusercontent.com/AustinSteil/generate-files-model/refs/heads/main/LICENSE>
Copyright 2025 Austin Steil

## Overview

The Dropdown component provides a robust solution for dropdown menus in forms and UI layouts. It supports two distinct modes of operation and includes comprehensive form integration, validation, and state management capabilities.

## Features

- **Standard Dropdown Mode**: Entire button opens the dropdown menu
- **Split-Button Mode**: Main button triggers a default action, arrow button opens the menu
- **Form Integration**: Full support for form data binding and validation
- **State Management**: Tracks selected items, validation state, and unlocked status
- **Responsive Design**: Mobile-friendly with touch support
- **Accessibility**: Focus states and keyboard navigation support
- **Dark Mode Support**: Full light/dark mode compliance using the color system
- **Error Handling**: Built-in error message display and validation feedback

## Files

- `dropdown.js` - Main component class with all functionality
- `dropdown.css` - Comprehensive styling including responsive and dark mode support

## Usage

### Basic Standard Dropdown

```javascript
const container = document.getElementById('my-dropdown');
const dropdown = new Dropdown(container, {
    items: [
        { text: 'Option 1', value: 'opt1' },
        { text: 'Option 2', value: 'opt2' },
        { text: 'Option 3', value: 'opt3' }
    ],
    defaultText: 'Select an option...',
    onSelect: (item, index) => {
        console.log('Selected:', item);
    }
});
```

### Split-Button Mode

```javascript
const dropdown = new Dropdown(container, {
    items: [
        { text: 'Save', value: 'save' },
        { text: 'Save As', value: 'save-as' },
        { text: 'Export', value: 'export' }
    ],
    splitButton: true,
    onDefaultAction: () => {
        console.log('Default action triggered');
    },
    onSelect: (item, index) => {
        console.log('Menu item selected:', item);
    }
});
```

### Form Integration

```javascript
const dropdown = new Dropdown(container, {
    items: [...],
    name: 'country',
    required: true,
    onSelect: (item) => {
        // Handle selection
    }
});

// Get form data
const data = dropdown.getData(); // { country: 'selected-value' }

// Set form data
dropdown.setData({ country: 'us' });

// Validate
if (dropdown.validate()) {
    // Valid selection
}
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `items` | Array | `[]` | Array of dropdown items with `text`, `value`, and optional `action` properties |
| `defaultText` | String | `'Select...'` | Text displayed when no item is selected |
| `onSelect` | Function | `() => {}` | Callback fired when an item is selected |
| `onDefaultAction` | Function | `null` | Callback for split-button default action |
| `splitButton` | Boolean | `false` | Enable split-button mode |
| `required` | Boolean | `false` | Whether selection is required for validation |
| `label` | String | `''` | Label for form integration |
| `name` | String | `''` | Name attribute for form data |
| `id` | String | Auto-generated | Unique identifier for the dropdown |

## API Methods

### Selection Management

- `selectItem(index, triggerCallback)` - Select an item by index
- `getSelectedItem()` - Get the currently selected item object
- `getSelectedIndex()` - Get the index of the selected item
- `clearSelection()` - Clear the current selection
- `updateItems(items)` - Update the dropdown items

### Value Management

- `getValue()` - Get the selected value (for forms)
- `setValue(value)` - Set the selected value by value or text
- `getData()` - Get form data object
- `setData(data)` - Set form data from object

### State Management

- `open()` - Open the dropdown menu
- `close()` - Close the dropdown menu
- `toggle()` - Toggle open/closed state
- `setUnlockedState(unlocked)` - Set visual unlocked state indicator
- `updateDefaultText(text)` - Update the default text

### Validation

- `validate()` - Validate the dropdown (checks required if set)
- `showError(message)` - Display an error message
- `isValid` - Property indicating current validation state

### Lifecycle

- `destroy()` - Clean up and remove event listeners

## Styling

The component uses CSS custom properties from the centralized color system (`src/color-system/colors.css`). Key style classes:

- `.dropdown-container` - Main container
- `.dropdown-trigger` - Button that opens the menu
- `.dropdown-menu` - The dropdown menu itself
- `.dropdown-item` - Individual menu items
- `.dropdown-error` - Error message display
- `.dropdown-open` - Applied when menu is open
- `.has-selection` - Applied when an item is selected
- `.unlocked` - Applied for unlocked state styling

## Form Field Integration

When used within form contexts (`.text-input-component` or `.form-group`), the dropdown automatically applies enhanced styling with:

- Gradient backgrounds
- Enhanced borders and shadows
- Improved hover and focus states
- Better visual hierarchy

## Accessibility

- Full keyboard navigation support
- Focus states for all interactive elements
- ARIA-compatible structure
- High contrast mode support
- Reduced motion support for animations

## Browser Support

Works in all modern browsers supporting ES6 classes and CSS custom properties.
