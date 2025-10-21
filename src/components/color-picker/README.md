# ColorPicker Component

A simple, native HTML5 color picker component that provides an easy-to-use interface for selecting colors.

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

- 🎨 **Native Browser Picker**: Uses the native HTML5 color input for maximum compatibility
- ✅ **Built-in Validation**: Required fields and custom validation
- 🎨 **Consistent Styling**: Uses the centralized color management system
- 💾 **Storage Integration**: Compatible with the save-data system
- 🌙 **Dark Mode**: Full light/dark mode support
- ♿ **Accessible**: Proper labeling and keyboard navigation
- 📱 **Responsive**: Mobile-friendly design
- 🔧 **Simple Configuration**: Minimal options for straightforward usage

## Basic Usage

```javascript
// Simple color picker
const colorPicker = new ColorPicker({
    containerId: 'color-picker-container',
    id: 'brand-color',
    name: 'brandColor',
    label: 'Brand Color',
    defaultValue: '#264653',
    required: true
});
```

## Configuration Options

```javascript
const colorPicker = new ColorPicker({
    // Container element ID where the component will be rendered
    containerId: 'color-picker-container',

    // Unique identifier for the input element
    id: 'brand-color',

    // Name attribute for form submission and storage
    name: 'brandColor',

    // Label text displayed above the input
    label: 'Brand Color',

    // Default color value (hex format)
    defaultValue: '#264653',

    // Whether the field is required
    required: false,

    // Callback function when color changes
    onChange: (color, component) => {
        console.log('Color changed:', color);
    },

    // Additional CSS class names
    className: '',

    // Help text displayed below the input
    helpText: 'Select your brand color'
});
```

## Methods

### getValue()

Get the current color value.

```javascript
const color = colorPicker.getValue();
console.log(color); // e.g., "#264653"
```

### setValue(value)

Set the color value programmatically.

```javascript
colorPicker.setValue('#2a9d8f');
```

### validate()

Validate the input value.

```javascript
if (colorPicker.validate()) {
    console.log('Color is valid');
}
```

### clear()

Clear the color value.

```javascript
colorPicker.clear();
```

### focus()

Focus the input element.

```javascript
colorPicker.focus();
```

### setEnabled(enabled)

Enable or disable the input.

```javascript
colorPicker.setEnabled(false); // Disable
colorPicker.setEnabled(true);  // Enable
```

### getData()

Get data for storage system.

```javascript
const data = colorPicker.getData();
// Returns: { brandColor: '#264653' }
```

### setData(data)

Set data from storage system.

```javascript
colorPicker.setData({ brandColor: '#2a9d8f' });
```

## Storage Integration

The ColorPicker component is fully compatible with the application's storage system. To enable storage:

- Add the field to `src/fields/vars.json`:

```json
{
  "brandColor": "{brandColor}"
}
```

- Add the field to the appropriate tab mapping in `storage-data-manager.js`
- The component will automatically be saved/loaded with other form data

## Styling

The component uses CSS custom properties from the centralized color system:

- `--color-primary`: Primary accent color
- `--color-text-primary`: Primary text color
- `--color-bg-primary`: Primary background color
- `--color-border-medium`: Medium border color
- `--color-error`: Error state color

## Dark Mode

The component automatically adapts to dark mode based on system preferences. Styling adjusts automatically for optimal visibility in both light and dark themes.

## Accessibility

- Proper label associations with `for` attribute
- ARIA labels for screen readers
- Keyboard navigation support
- Color contrast compliance
- Error messages for validation feedback

## Dependencies

- **No external dependencies** - Uses native HTML5 color input

## Browser Support

Works on all modern browsers that support:

- ES6 JavaScript
- CSS Grid and Flexbox
- CSS Custom Properties
- HTML5 Input elements

## License

MIT License - See LICENSE file for details
