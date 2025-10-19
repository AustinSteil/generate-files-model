# Dark Mode Toggle Component

A floating dark mode toggle that automatically detects system preferences and allows manual override.

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

✅ **System preference detection** - Automatically detects user's OS dark mode setting  
✅ **Manual override** - Users can toggle dark mode on/off  
✅ **Persistent** - Saves preference to localStorage  
✅ **Floating button** - Beautiful floating toggle in bottom right corner  
✅ **Responsive** - Adapts to mobile screens  
✅ **Smooth transitions** - Beautiful animations  

## Installation

Include the required files in your HTML:

```html
<!-- CSS -->
<link rel="stylesheet" href="src/color-system/colors.css">
<link rel="stylesheet" href="src/components/toggle/toggle.css">
<link rel="stylesheet" href="src/color-system/dark-mode-toggle/dark-mode-toggle.css">

<!-- JavaScript -->
<script src="src/components/toggle/toggle.js"></script>
<script src="src/color-system/dark-mode-toggle/dark-mode-toggle.js"></script>
```

## How It Works

### Initial State Priority

1. **localStorage** - If user has previously set a preference, use that
2. **System preference** - If no saved preference, detect OS dark mode setting
3. **Default** - Falls back to light mode

### Behavior

- On first visit, matches system preference
- User can manually toggle dark mode
- Manual preference is saved to localStorage
- Preference persists across sessions
- If system preference changes and user hasn't set manual preference, auto-updates

## Usage

The component auto-initializes when the page loads. It's available globally:

```javascript
// Access the dark mode toggle instance
window.darkModeToggle

// Check if dark mode is enabled
const isDark = window.darkModeToggle.isDarkMode();

// Programmatically toggle dark mode
window.darkModeToggle.toggleDarkMode();

// Set dark mode state
window.darkModeToggle.setDarkMode(true);  // Enable
window.darkModeToggle.setDarkMode(false); // Disable

// Clear saved preference (revert to system preference)
window.darkModeToggle.clearPreference();
```

## API Methods

### `isDarkMode()`

Returns the current dark mode state.

```javascript
if (window.darkModeToggle.isDarkMode()) {
    console.log('Dark mode is enabled');
}
```

### `setDarkMode(enabled)`

Set dark mode state programmatically.

```javascript
window.darkModeToggle.setDarkMode(true);  // Enable dark mode
window.darkModeToggle.setDarkMode(false); // Disable dark mode
```

### `toggleDarkMode()`

Toggle between light and dark mode.

```javascript
window.darkModeToggle.toggleDarkMode();
```

### `clearPreference()`

Clear the saved preference and revert to system preference.

```javascript
window.darkModeToggle.clearPreference();
```

### `destroy()`

Remove the toggle and clean up.

```javascript
window.darkModeToggle.destroy();
```

## How Dark Mode is Applied

The component adds/removes the `dark-mode` class on the `<html>` element:

```html
<!-- Light mode -->
<html>

<!-- Dark mode -->
<html class="dark-mode">
```

The color system automatically adjusts all colors when this class is present.

## Customization

### Position

Change the position by modifying the CSS:

```css
.floating-dark-mode-toggle {
    bottom: 20px;  /* Distance from bottom */
    right: 20px;   /* Distance from right */
}
```

### Icons

Modify the icons in the JavaScript:

```javascript
// In dark-mode-toggle.js
this.toggle = new Toggle({
    iconOn: '🌙',   // Dark mode icon
    iconOff: '☀️',  // Light mode icon
    // ...
});
```

### Colors

The component uses the color system variables. Override them if needed:

```css
.dark-mode-toggle-btn {
    background: var(--color-bg-primary);
    border-color: var(--color-border-light);
}
```

## localStorage Key

The preference is saved under the key:

```javascript
localStorage.getItem('darkModePreference') // 'true' or 'false'
```

## Mobile Behavior

On mobile screens (< 768px):

- Text label is hidden
- Only icon and toggle switch are shown
- Smaller padding for compact design

## System Preference Detection

Uses the `prefers-color-scheme` media query:

```javascript
window.matchMedia('(prefers-color-scheme: dark)').matches
```

## Integration with Color System

The dark mode toggle works seamlessly with the color management system:

1. When dark mode is enabled, the `.dark-mode` class is added to `<html>`
2. The color system (`colors.css`) detects this class
3. All CSS variables are automatically updated to dark mode colors
4. All components using the color system automatically adapt

## Example: Custom Integration

```javascript
// Listen for dark mode changes
const originalOnChange = window.darkModeToggle.setDarkMode;
window.darkModeToggle.setDarkMode = function(enabled) {
    originalOnChange.call(this, enabled);
    
    // Your custom logic
    if (enabled) {
        console.log('Switched to dark mode');
        // Update charts, maps, etc.
    } else {
        console.log('Switched to light mode');
    }
};
```

## Accessibility

- Keyboard accessible via the Toggle component
- Screen reader friendly
- Respects `prefers-reduced-motion`
- Clear visual feedback

## Browser Support

Works in all modern browsers that support:

- CSS custom properties
- localStorage
- matchMedia API
- ES6 classes
