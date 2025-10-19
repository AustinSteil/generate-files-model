# Alert Component

A flexible floating alert notification system that appears at the top of the page. Supports multiple alert types, auto-dismiss functionality, manual dismissal, and stacking of multiple alerts.

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

- **Color-coded alert types**: Success (green), Warning (yellow), Error (red)
- **Auto-dismiss**: Configurable duration or persistent alerts
- **Manual dismissal**: Optional close button (X icon)
- **Multiple alerts**: Automatic stacking when multiple alerts are shown
- **Smooth animations**: Slide-in/slide-out effects
- **Responsive design**: Works on mobile and desktop
- **Accessibility**: Keyboard navigation and screen reader support
- **Dark mode**: Automatic dark mode support

## Quick Start

**1. Include the CSS and JavaScript files:**

```html
<link rel="stylesheet" href="src/components/alert/alert.css">
<script src="src/components/alert/alert.js"></script>
```

**2. Show alerts using the global convenience functions:**

```javascript
// Basic usage
showSuccess('Operation completed successfully!');
showWarning('Please review your settings.');
showError('An error occurred.');
```

## Configuration Options

### Basic Alert Configuration

```javascript
showAlert({
    message: 'Your alert message',           // Required: Alert text
    type: 'success',                         // 'success', 'warning', 'error'
    autoDisappear: true,                     // Auto-dismiss (default: true)
    duration: 5,                             // Duration in seconds (default: 5)
    closeable: true                          // Show close button (default: true)
});
```

### Alert Types

- **Success** (`'success'`): Green theme for positive feedback
- **Warning** (`'warning'`): Yellow theme for warnings
- **Error** (`'error'`): Red theme for errors

### Auto-Dismiss Options

```javascript
// Auto-dismiss after 3 seconds
showSuccess('Quick message', { duration: 3 });

// Auto-dismiss after 10 seconds
showWarning('Longer message', { duration: 10 });

// Never auto-dismiss (stays until manually closed)
showError('Persistent alert', { autoDisappear: false });
```

### Close Button Options

```javascript
// Closeable (default)
showSuccess('You can close this', { closeable: true });

// Not closeable
showWarning('Cannot close this', { closeable: false });
```

## API Reference

### Global Convenience Functions

```javascript
// Show specific alert types
showSuccess(message, options)    // Green success alert
showWarning(message, options)    // Yellow warning alert
showError(message, options)      // Red error alert

// Show alert with full configuration
showAlert(config)

// Dismiss alerts
dismissAlert(alertId)            // Dismiss specific alert by ID
dismissAllAlerts()               // Dismiss all active alerts
```

### AlertManager Class

```javascript
// Create custom instance
const alerts = new AlertManager();

// Show alerts
const alertId = alerts.show(config);
const alertId = alerts.success(message, options);
const alertId = alerts.warning(message, options);
const alertId = alerts.error(message, options);

// Manage alerts
alerts.dismiss(alertId);
alerts.dismissAll();

// Query alerts
alerts.getActiveCount();         // Number of active alerts
alerts.getActiveAlertIds();      // Array of active alert IDs
alerts.isAlertActive(alertId);   // Check if specific alert is active

// Cleanup
alerts.destroy();
```

## Examples

### Basic Examples

```javascript
// Simple success message
showSuccess('File saved successfully!');

// Warning with custom duration
showWarning('Session expires in 2 minutes', { duration: 8 });

// Persistent error that must be manually closed
showError('Connection failed', { autoDisappear: false });
```

### Advanced Examples

```javascript
// Multiple alerts stack automatically
showSuccess('First operation completed');
showWarning('Second operation has warnings');
showError('Third operation failed');

// Custom configuration
const alertId = showAlert({
    message: 'Processing your request...',
    type: 'warning',
    autoDisappear: false,
    closeable: false
});

// Later, dismiss the specific alert
dismissAlert(alertId);
```

### Manual Alert Management

```javascript
// Store alert ID for later dismissal
const processingAlert = showWarning('Processing...', { 
    autoDisappear: false,
    closeable: false 
});

// When processing is complete
dismissAlert(processingAlert);
showSuccess('Processing completed!');
```

## Styling Customization

The alert component uses CSS custom properties and can be customized by overriding the default styles:

```css
/* Customize alert positioning */
.alert-container {
    top: 10px;  /* Distance from top */
    max-width: 600px;  /* Maximum width */
}

/* Customize alert colors */
.alert-success {
    border-left-color: #your-green-color;
}

.alert-warning {
    border-left-color: #your-yellow-color;
}

.alert-error {
    border-left-color: #your-red-color;
}
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Supports CSS Grid and Flexbox
- Graceful degradation for older browsers

## Accessibility

- Keyboard navigation support
- Screen reader compatible
- High contrast mode support
- Reduced motion support
- Focus management

## Demo

Open `alert-example.html` in your browser to see the component in action with various configuration examples.
