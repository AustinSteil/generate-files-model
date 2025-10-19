# Cards Component

A flexible, reusable card selection component with responsive grid layouts, single/multi-select modes, and comprehensive validation support.

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

- 🎯 **Flexible Selection**: Single-select or multi-select modes
- 📱 **Responsive Design**: Auto-adjusting grid layouts based on screen size
- 🎨 **Rich Content**: Support for images, titles, and custom content
- 🔍 **Image Preview**: Full-screen image preview with expand button
- ✅ **Validation**: Required/optional validation with alert system integration
- 🌙 **Dark Mode**: Full light/dark mode support using color management system
- ♿ **Accessible**: Keyboard navigation and screen reader support
- 🎭 **Customizable**: Configurable layouts and styling

## Grid Layouts

The component automatically adjusts its layout based on the number of cards:

- **1-2 cards**: Centered horizontally and vertically
- **3-4 cards**: 2×2 grid
- **5-6 cards**: 3×2 grid (desktop) or 2×3 grid (configurable)
- **7+ cards**: Auto-flowing responsive grid

## Installation

Include the CSS and JavaScript files in your project:

```html
<link rel="stylesheet" href="src/components/cards/cards.css">
<script src="src/components/cards/cards.js"></script>
```

## Basic Usage

### HTML Structure

```html
<div id="my-cards-container"></div>
```

### JavaScript

```javascript
const cards = new Cards({
    containerId: 'my-cards-container',
    cards: [
        {
            title: 'Option 1',
            content: 'Description for option 1',
            value: 'option1'
        },
        {
            title: 'Option 2',
            content: 'Description for option 2',
            image: 'path/to/image.jpg',
            value: 'option2'
        }
    ],
    multiSelect: false,
    required: true,
    onChange: (selectedCards) => {
        console.log('Selected:', selectedCards);
    }
});
```

## Configuration Options

### Constructor Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `cards` | Array | **required** | Array of card configurations |
| `containerId` | string | **required** | ID of container element |
| `multiSelect` | boolean | `false` | Allow multiple selections |
| `required` | boolean | `false` | Whether selection is required |
| `onChange` | function | `() => {}` | Callback when selection changes |
| `gridLayout` | string | `'auto'` | Grid layout preference |

### Card Configuration

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `title` | string | ✅ | Card title |
| `content` | string | ❌ | Card content (HTML supported) |
| `image` | string | ❌ | Image URL |
| `value` | any | ❌ | Value to return when selected (defaults to index) |

### Grid Layout Options

- `'auto'` - Automatic layout based on card count
- `'3x2'` - 3 columns, 2 rows (for 6 cards)
- `'2x3'` - 2 columns, 3 rows (for 6 cards)
- `'2x2'` - 2 columns, 2 rows (for 4 cards)
- `'center-2'` - Centered layout for 1-2 cards

## Examples

### Single Selection (Required)

```javascript
const singleSelect = new Cards({
    containerId: 'single-select-container',
    cards: [
        { title: 'Basic Plan', content: '$10/month', value: 'basic' },
        { title: 'Pro Plan', content: '$25/month', value: 'pro' },
        { title: 'Enterprise', content: '$50/month', value: 'enterprise' }
    ],
    multiSelect: false,
    required: true,
    onChange: (selection) => {
        if (selection.length > 0) {
            console.log('Selected plan:', selection[0].value);
        }
    }
});
```

### Multi-Selection with Images

```javascript
const multiSelect = new Cards({
    containerId: 'multi-select-container',
    cards: [
        {
            title: 'JavaScript',
            content: 'Modern web development',
            image: 'images/javascript.png',
            value: 'js'
        },
        {
            title: 'Python',
            content: 'Data science and backend',
            image: 'images/python.png',
            value: 'python'
        },
        {
            title: 'React',
            content: 'Frontend framework',
            image: 'images/react.png',
            value: 'react'
        }
    ],
    multiSelect: true,
    required: false,
    gridLayout: '3x2',
    onChange: (selection) => {
        console.log('Selected technologies:', selection.map(s => s.value));
    }
});
```

### Validation Example

```javascript
const validatedCards = new Cards({
    containerId: 'validated-container',
    cards: [
        { title: 'Option A', content: 'First choice' },
        { title: 'Option B', content: 'Second choice' }
    ],
    required: true,
    onChange: (selection) => {
        // Validation happens automatically
        // Error alerts are shown via the global alert system
    }
});

// Manual validation
function validateForm() {
    if (!validatedCards.validate()) {
        validatedCards.showValidationError('Please select an option to continue');
        return false;
    }
    return true;
}
```

## Methods

### Selection Methods

```javascript
// Get current selection
const selection = cards.getSelection();

// Set selection programmatically
cards.setSelection(['option1', 'option2']);

// Clear all selections
cards.clearSelection();
```

### Validation Methods

```javascript
// Validate current selection
const isValid = cards.validate();

// Show validation error
cards.showValidationError('Custom error message');
```

### Utility Methods

```javascript
// Destroy the component
cards.destroy();
```

## Events

The `onChange` callback receives two parameters:

```javascript
onChange: (selectedCards, selectedIndices) => {
    // selectedCards: Array of selected card objects with metadata
    // selectedIndices: Set of selected card indices
    
    selectedCards.forEach(card => {
        console.log('Index:', card.index);
        console.log('Value:', card.value);
        console.log('Title:', card.title);
        console.log('Full card config:', card.card);
    });
}
```

## Styling

The component uses the centralized color management system. All colors automatically adapt to light/dark mode.

### CSS Classes

- `.cards-component` - Main container
- `.card` - Individual card
- `.card.selected` - Selected card state
- `.card-image` - Image container
- `.card-content` - Content area
- `.card-title` - Card title
- `.card-text` - Card description
- `.card-selection-indicator` - Selection indicator

### Custom Styling

```css
/* Override card styling */
.cards-component .card {
    border-radius: 16px;
    /* Your custom styles */
}

/* Custom selected state */
.cards-component .card.selected {
    border-color: #your-color;
    background: your-gradient;
}
```

## Preview Functionality

Cards automatically include an expand button for full-screen preview based on content type:

### Image Preview

- **Expand Button**: ⛶ icon appears on hover for cards with `image` property
- **Full-Screen Modal**: Click to view the image in a full-screen overlay with title
- **Image Optimization**: Responsive image scaling with proper aspect ratio

### PDF Preview

- **Expand Button**: 📄 icon appears on hover for cards with `pdf` property
- **Full-Screen PDF Viewer**: Click to view PDF in embedded viewer
- **Optimized Layout**: Full-height display (100vh) with narrower width (70vw) for vertical documents
- **Floating Close Button**: Close button overlays the viewer in the top-right corner
- **Clean Interface**: PDF displays without toolbar, navigation panes, or download options
- **Secure Viewing**: Print and download functionality disabled in viewer

### General Features

- **Keyboard Support**: Use Tab to focus the expand button, Enter/Space to activate
- **Close Options**: Click backdrop, close button, or press Escape to close
- **Mobile Optimized**: Responsive modal that works on all screen sizes
- **Non-Intrusive**: Expand functionality doesn't interfere with card selection

The expand functionality is automatically enabled for any card with an `image` or `pdf` property.

## Accessibility

The component includes comprehensive accessibility features:

- **Keyboard Navigation**: Tab to focus, Space/Enter to select cards and expand buttons
- **ARIA Labels**: Proper `role`, `aria-pressed`, and `aria-label` attributes
- **Screen Reader Support**: Descriptive labels and state announcements
- **Modal Accessibility**: Full-screen image modal includes `role="dialog"` and `aria-modal="true"`
- **Focus Management**: Proper focus handling for modal open/close
- **High Contrast**: Enhanced borders in high contrast mode
- **Reduced Motion**: Respects `prefers-reduced-motion` setting for animations

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ (with polyfills for CSS Grid)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Dependencies

- Color Management System (`src/color-system/colors.css`)
- Alert System (for validation errors)
