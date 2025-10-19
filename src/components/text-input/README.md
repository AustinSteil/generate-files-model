# TextInput Component

A flexible, reusable text input component with built-in validation, error handling, and integration with the storage system.

## About

Author: Austin Steil  
Version: 1.0.0
Created October 18, 2025
Updated October 18, 2025

## License & Copyright

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
Live License Page Link: <https://raw.githubusercontent.com/AustinSteil/generate-files-model/refs/heads/main/LICENSE>
Copyright 2025 Austin Steil

## Features

- 🎯 **Multiple Input Types**: text, email, number, date, password, etc.
- ✅ **Built-in Validation**: Required fields and custom validation functions
- 🎨 **Consistent Styling**: Uses the centralized color management system
- 💾 **Storage Integration**: Compatible with the save-data system
- 🌙 **Dark Mode**: Full light/dark mode support
- ♿ **Accessible**: Proper labeling and keyboard navigation
- 📱 **Responsive**: Mobile-friendly design
- 🔧 **Configurable**: Extensive customization options

## Basic Usage

```javascript
// Simple text input
const titleInput = new TextInput({
    containerId: 'title-container',
    id: 'document-title',
    name: 'documentTitle',
    label: 'Document Title',
    placeholder: 'Enter document title',
    required: true
});

// Email input with validation
const emailInput = new TextInput({
    containerId: 'email-container',
    id: 'user-email',
    name: 'userEmail',
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your email',
    required: true,
    validation: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) || 'Please enter a valid email address';
    }
});
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `containerId` | string | null | ID of the container element |
| `id` | string | auto-generated | HTML ID for the input element |
| `name` | string | same as id | HTML name attribute (used for storage) |
| `label` | string | '' | Label text for the input |
| `type` | string | 'text' | Input type (text, email, number, date, etc.) |
| `placeholder` | string | '' | Placeholder text |
| `defaultValue` | string | '' | Initial value |
| `required` | boolean | false | Whether the field is required |
| `validation` | function | null | Custom validation function |
| `onChange` | function | null | Callback when value changes |
| `className` | string | '' | Additional CSS classes |

## Input Types

The component supports all standard HTML input types:

```javascript
// Text input (default)
new TextInput({ type: 'text' });

// Email input
new TextInput({ type: 'email' });

// Number input
new TextInput({ type: 'number' });

// Date input
new TextInput({ type: 'date' });

// Password input
new TextInput({ type: 'password' });
```

## Validation

### Required Fields

```javascript
const input = new TextInput({
    label: 'Required Field',
    required: true
});
```

### Custom Validation

```javascript
const input = new TextInput({
    label: 'Custom Validation',
    validation: (value) => {
        if (value.length < 3) {
            return 'Must be at least 3 characters';
        }
        return true; // Valid
    }
});
```

## Methods

### Getting and Setting Values

```javascript
// Get current value
const value = input.getValue();

// Set value
input.setValue('New value');

// Clear value
input.clear();
```

### Validation Methods

```javascript
// Validate current value
const isValid = input.validate();

// Check if valid without triggering validation
const isCurrentlyValid = input.isValid;
```

### Control

```javascript
// Focus the input
input.focus();

// Enable/disable
input.setEnabled(false);
input.setEnabled(true);
```

### Storage Integration

```javascript
// Get data for storage system
const data = input.getData();
// Returns: { fieldName: 'current value' }

// Set data from storage system
input.setData({ fieldName: 'saved value' });
```

### Cleanup

```javascript
// Destroy the component
input.destroy();
```

## Events

### onChange Callback

```javascript
const input = new TextInput({
    onChange: (value, inputInstance) => {
        console.log('Value changed:', value);
        console.log('Input instance:', inputInstance);
    }
});
```

## Styling

The component uses the centralized color management system and includes:

- Hover and focus states
- Error state styling
- Dark mode support
- Responsive design
- Smooth transitions

### Custom Styling

```javascript
// Add custom CSS classes
const input = new TextInput({
    className: 'my-custom-input compact'
});
```

Available CSS classes:

- `compact` - Smaller padding and font size
- `large` - Larger padding and font size

## Integration with Storage System

The TextInput component is designed to work seamlessly with the save-data system:

```javascript
// In your tab or form component
class MyForm {
    constructor() {
        this.titleInput = new TextInput({
            containerId: 'title-container',
            name: 'documentTitle', // Must match vars.json key
            label: 'Document Title'
        });
    }
    
    getData() {
        return {
            ...this.titleInput.getData()
        };
    }
    
    setData(data) {
        this.titleInput.setData(data);
    }
}
```

## Error Handling

The component provides visual feedback for validation errors:

- Red border on invalid inputs
- Error message display below the input
- Smooth animations for error states
- Automatic validation on blur and input events

## Accessibility

The component includes proper accessibility features:

- Semantic HTML structure
- Proper label association
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Browser Support

Works in all modern browsers that support:

- CSS custom properties (variables)
- ES6 classes
- Modern DOM APIs
