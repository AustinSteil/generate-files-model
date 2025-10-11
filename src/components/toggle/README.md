# Toggle Component

A reusable, accessible toggle switch component with smooth animations and clean design.

## Features

✅ **Accessible** - Keyboard navigation (Space/Enter), screen reader friendly  
✅ **Customizable** - Icons, labels, initial state  
✅ **Event-driven** - onChange callback for state changes  
✅ **Responsive** - Mobile-friendly design  
✅ **Smooth animations** - Beautiful transitions  
✅ **Disabled state** - Support for disabled toggles  

## Installation

Include the CSS and JavaScript files in your HTML:

```html
<link rel="stylesheet" href="src/components/toggle/toggle.css">
<script src="src/components/toggle/toggle.js"></script>
```

## Basic Usage

```javascript
// Create a simple toggle
const myToggle = new Toggle({
    label: 'Enable notifications',
    initialState: false,
    onChange: (state) => {
        console.log('Toggle state:', state);
    }
});

// Add to page
document.body.appendChild(myToggle.getElement());
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `label` | string | `''` | Label text displayed next to toggle |
| `initialState` | boolean | `false` | Initial on/off state |
| `iconOn` | string | `'✓'` | Icon shown when toggle is on |
| `iconOff` | string | `''` | Icon shown when toggle is off |
| `onChange` | function | `() => {}` | Callback when state changes |
| `disabled` | boolean | `false` | Whether toggle is disabled |

## Examples

### Toggle with Custom Icons

```javascript
const darkModeToggle = new Toggle({
    label: 'Dark Mode',
    initialState: false,
    iconOn: '🌙',
    iconOff: '☀️',
    onChange: (state) => {
        document.body.classList.toggle('dark-mode', state);
    }
});
```

### Toggle without Label

```javascript
const compactToggle = new Toggle({
    initialState: true,
    iconOn: '✓',
    iconOff: '✕',
    onChange: (state) => {
        console.log('State:', state);
    }
});
```

### Disabled Toggle

```javascript
const disabledToggle = new Toggle({
    label: 'Coming Soon',
    initialState: false,
    disabled: true
});
```

## API Methods

### `toggle()`
Toggle the current state.

```javascript
myToggle.toggle();
```

### `setState(newState)`
Set the state programmatically.

```javascript
myToggle.setState(true);  // Turn on
myToggle.setState(false); // Turn off
```

### `getState()`
Get the current state.

```javascript
const isOn = myToggle.getState();
```

### `enable()`
Enable a disabled toggle.

```javascript
myToggle.enable();
```

### `disable()`
Disable the toggle.

```javascript
myToggle.disable();
```

### `getElement()`
Get the DOM element.

```javascript
const element = myToggle.getElement();
document.body.appendChild(element);
```

### `destroy()`
Remove the toggle and clean up.

```javascript
myToggle.destroy();
```

## Keyboard Navigation

- **Space** or **Enter** - Toggle the switch
- **Tab** - Focus the toggle

## Styling

The component uses the centralized color management system. You can customize colors by overriding CSS variables:

```css
.toggle-switch.active {
    background: var(--gradient-primary-solid);
}
```

## Accessibility

- Uses proper ARIA attributes (`role="switch"`, `aria-checked`)
- Keyboard accessible
- Screen reader friendly
- Respects `prefers-reduced-motion`
- High contrast mode support

## Browser Support

Works in all modern browsers that support:
- CSS custom properties
- ES6 classes
- Flexbox

---

**Version:** 1.0.0  
**Author:** Austin Steil

