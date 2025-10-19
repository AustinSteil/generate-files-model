# Address Component

A comprehensive, reusable address input component that integrates multiple form elements for collecting US addresses. Built using the existing TextInput and Dropdown components for consistency.

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

- 🏠 **Complete Address Collection**: Street, City, State, ZIP code
- 🇺🇸 **US States Dropdown**: All 50 states with abbreviations
- ✅ **Built-in Validation**: ZIP code format, required fields
- 🎨 **Consistent Styling**: Uses the centralized color management system
- 📱 **Responsive Design**: Mobile-friendly layout that stacks on small screens
- 🌙 **Dark Mode**: Full light/dark mode support
- 🔧 **Compact Mode**: Tighter spacing for dense forms
- 💾 **Form Integration**: Compatible with the save-data system
- ♿ **Accessible**: Proper labeling and keyboard navigation

## Basic Usage

```javascript
// Simple address component
const address = new Address({
    containerId: 'address-container',
    label: 'Billing Address',
    required: true
});

// Compact address for dense forms
const compactAddress = new Address({
    containerId: 'shipping-address',
    label: 'Shipping Address',
    compact: true,
    required: false
});
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `containerId` | string | null | ID of container element |
| `id` | string | auto-generated | Component element ID |
| `label` | string | 'Address' | Label for the address section |
| `required` | boolean | false | Whether all fields are required |
| `compact` | boolean | false | Use compact spacing |
| `showLabel` | boolean | true | Show the main address label |
| `onChange` | function | null | Callback when any field changes |
| `className` | string | '' | Additional CSS classes |

## Methods

### Data Management

```javascript
// Get all address data
const addressData = address.getData();
// Returns: { street: '', city: '', state: '', zip: '' }

// Set address data
address.setData({
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zip: '12345'
});

// Clear all fields
address.clear();
```

### Validation

```javascript
// Validate all fields
const isValid = address.validate();

// Check if currently valid
const isCurrentlyValid = address.isValidAddress();
```

### Lifecycle

```javascript
// Destroy the component
address.destroy();
```

## Field Details

### Street Address

- **Type**: Text input
- **Validation**: Required if component is required
- **Placeholder**: "Enter street address"

### City

- **Type**: Text input
- **Validation**: Required if component is required
- **Placeholder**: "City"

### State

- **Type**: Dropdown
- **Options**: All 50 US states
- **Values**: 2-letter state abbreviations (AL, AK, AZ, etc.)
- **Validation**: Required if component is required

### ZIP Code

- **Type**: Text input
- **Validation**: Must be exactly 5 digits
- **Placeholder**: "12345"
- **Pattern**: `/^\d{5}$/`

## Layout Behavior

### Desktop Layout

```text
┌─────────────────────────────────────┐
│ Street Address                      │
├─────────────────┬─────────┬─────────┤
│ City            │ State   │ ZIP     │
└─────────────────┴─────────┴─────────┘
```

### Mobile Layout (< 768px)

```text
┌─────────────────────────────────────┐
│ Street Address                      │
├─────────────────────────────────────┤
│ City                                │
├─────────────────────────────────────┤
│ State                               │
├─────────────────────────────────────┤
│ ZIP                                 │
└─────────────────────────────────────┘
```

## Examples

### Basic Address Form

```javascript
const billingAddress = new Address({
    containerId: 'billing-address-container',
    label: 'Billing Address',
    required: true,
    onChange: (data, component) => {
        console.log('Address changed:', data);
        
        // Auto-save or validate
        if (component.isValidAddress()) {
            console.log('Address is complete and valid');
        }
    }
});
```

### Compact Address for Cards

```javascript
const cardAddress = new Address({
    containerId: 'card-address',
    label: 'Address',
    compact: true,
    required: false,
    className: 'card-address-component'
});
```

### Form Integration

```javascript
class MyForm {
    constructor() {
        this.address = new Address({
            containerId: 'address-section',
            label: 'Your Address',
            required: true
        });
    }
    
    validateForm() {
        return this.address.validate();
    }
    
    getFormData() {
        return {
            ...this.address.getData()
        };
    }
    
    setFormData(data) {
        this.address.setData(data);
    }
}
```

### Storage System Integration

```javascript
// The component works seamlessly with the save-data system
const address = new Address({
    containerId: 'user-address',
    onChange: (data) => {
        // Auto-save to storage
        storageManager.updateData(data);
    }
});

// Load saved data
const savedData = storageManager.getData();
address.setData(savedData);
```

## Styling

The component uses the centralized color management system and includes:

- Responsive grid layout
- Hover and focus states
- Error state styling
- Dark mode support
- Compact mode variants
- Mobile-responsive design

### Custom Styling

```css
/* Custom address styling */
.my-custom-address .address-label {
    color: var(--color-primary);
    font-size: 18px;
}

.my-custom-address .address-fields {
    border: 1px solid var(--color-border-medium);
    padding: var(--spacing-lg);
    border-radius: var(--radius-lg);
}
```

## Dependencies

- Requires `TextInput` component
- Requires `Dropdown` component  
- Requires `src/color-system/colors.css` for color variables
- Compatible with existing form validation systems

## Browser Support

Works in all modern browsers that support:

- CSS Grid
- CSS Custom Properties
- ES6 Classes
- Modern DOM APIs

## Accessibility

- Proper ARIA labels for all fields
- Keyboard navigation support
- Screen reader friendly
- High contrast mode support
- Focus management
- Semantic HTML structure
