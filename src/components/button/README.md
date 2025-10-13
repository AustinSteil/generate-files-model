# Button Component

A flexible, reusable button component with beautiful gradient backgrounds. Built on the centralized color system for consistency.

## Features

- **Gradient Backgrounds**: Beautiful gradients inspired by the alert component
- **Multiple Variants**: primary, secondary, success, info, warning, error
- **Size Options**: small, medium (default), large
- **State Management**: disabled, loading with spinner
- **Accessibility**: proper ARIA labels and focus states
- **Dark Mode**: full dark mode support
- **Responsive**: mobile-friendly sizing

## Basic Usage

```javascript
// Simple button
const saveButton = new Button({
    containerId: 'save-button-container',
    text: 'Save',
    variant: 'primary',
    onClick: () => {
        console.log('Save clicked!');
    }
});

// Button with validation logic
const nextButton = new Button({
    containerId: 'next-button-container',
    text: 'Next',
    variant: 'success',
    onClick: (e, button) => {
        // Validation logic here
        if (isValid) {
            goToNextTab();
        } else {
            button.setDisabled(true);
        }
    }
});
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `containerId` | string | null | ID of container element |
| `id` | string | auto-generated | Button element ID |
| `text` | string | 'Button' | Button text content |
| `variant` | string | 'primary' | Color variant |
| `size` | string | 'medium' | Button size |
| `disabled` | boolean | false | Initial disabled state |
| `loading` | boolean | false | Initial loading state |
| `type` | string | 'button' | HTML button type |
| `onClick` | function | null | Click handler function |
| `className` | string | '' | Additional CSS classes |
| `fullWidth` | boolean | false | Full width button |

## Variants

```javascript
// Primary (default)
new Button({ variant: 'primary' });

// Secondary
new Button({ variant: 'secondary' });

// Success (green)
new Button({ variant: 'success' });

// Info (blue)
new Button({ variant: 'info' });

// Warning (yellow/orange)
new Button({ variant: 'warning' });

// Error (red)
new Button({ variant: 'error' });
```

## Sizes

```javascript
// Small
new Button({ size: 'small' });

// Medium (default)
new Button({ size: 'medium' });

// Large
new Button({ size: 'large' });
```

## Methods

### `setLoading(loading = true)`

Set the loading state of the button.

```javascript
button.setLoading(true);  // Show spinner, disable button
button.setLoading(false); // Hide spinner, enable button
```

### `setDisabled(disabled = true)`

Set the disabled state of the button.

```javascript
button.setDisabled(true);  // Disable button
button.setDisabled(false); // Enable button
```

### `setText(text)`

Update the button text.

```javascript
button.setText('Updated Text');
```

### `setVariant(variant)`

Change the button variant.

```javascript
button.setVariant('success');
```

### `getElement()`

Get the button DOM element.

```javascript
const buttonElement = button.getElement();
```

### `destroy()`

Remove the button from the DOM.

```javascript
button.destroy();
```

## Examples

### Loading Button

```javascript
const submitButton = new Button({
    containerId: 'submit-container',
    text: 'Submit',
    variant: 'primary',
    onClick: async (e, button) => {
        button.setLoading(true);
        button.setText('Submitting...');
        
        try {
            await submitForm();
            button.setText('Success!');
            button.setVariant('success');
        } catch (error) {
            button.setText('Error');
            button.setVariant('error');
        } finally {
            button.setLoading(false);
        }
    }
});
```

### Validation Button

```javascript
const nextButton = new Button({
    containerId: 'next-container',
    text: 'Next',
    variant: 'primary',
    onClick: (e, button) => {
        if (!validateCurrentTab()) {
            showError('Please fill in all required fields');
            return;
        }

        goToNextTab();
    }
});
```

### Right-Aligned Button

```javascript
// Use the form-actions-right class for right alignment
const container = document.getElementById('button-container');
container.className = 'form-actions-right';

const button = new Button({
    containerId: 'button-container',
    text: 'Continue',
    variant: 'success'
});
```

## CSS Integration

The component extends the existing `.btn` styles from main.css and adds:

- Size variants (`.btn-small`, `.btn-large`)
- Additional color variants (`.btn-info`, `.btn-warning`, `.btn-error`)
- Loading state (`.btn-loading`)
- Right alignment utilities (`.form-actions-right`)

## Dependencies

- Requires `src/color-system/colors.css` for color variables
- Extends styles from `main.css` (`.btn`, `.loading`)
- Compatible with existing alert system for error handling
