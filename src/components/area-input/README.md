# AreaInput Component

A flexible, reusable textarea and rich text editor component with built-in validation, resizing options, and optional Quill.js integration.

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

- 📝 **Plain Textarea Mode** - Simple, resizable textarea for basic text input
- ✨ **Rich Text Editor Mode** - Optional Quill.js integration for formatted text
- 🔄 **Configurable Resize** - Control resize behavior (none, vertical, horizontal, both)
- ✅ **Built-in Validation** - Required fields and custom validation functions
- 📊 **Live Character Counter** - Real-time character count with visual feedback
- ⚡ **Debounced onChange** - Performance-optimized change events
- 🎨 **Consistent Styling** - Uses the centralized color management system
- 💾 **Storage Integration** - Compatible with the save-data system
- 🌙 **Dark Mode** - Full light/dark mode support with deduplicated CSS
- ♿ **Accessible** - ARIA attributes and keyboard navigation
- 📱 **Responsive** - Mobile-friendly with enhanced touch targets
- 🔧 **Configurable** - Extensive customization options

## Installation

### 1. Include the Component Files

```html
<!-- CSS -->
<link rel="stylesheet" href="src/components/area-input/area-input.css">

<!-- JavaScript -->
<script src="src/components/area-input/area-input.js"></script>
```

### 2. Optional: Include Quill.js (for Rich Text Mode)

```html
<!-- Quill.js CSS -->
<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">

<!-- Quill.js JavaScript -->
<script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
```

## Basic Usage

### Plain Textarea

```javascript
// Simple textarea
const descriptionInput = new AreaInput({
    containerId: 'description-container',
    id: 'description',
    name: 'description',
    label: 'Description',
    placeholder: 'Enter description here...',
    required: true,
    resize: 'vertical',
    rows: 5
});
```

### Rich Text Editor

```javascript
// Rich text editor with Quill.js
const notesInput = new AreaInput({
    containerId: 'notes-container',
    id: 'notes',
    name: 'notes',
    label: 'Notes',
    placeholder: 'Enter formatted notes...',
    useRichText: true,
    required: false,
    minHeight: '200px',
    maxHeight: '600px'
});
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `containerId` | string | null | ID of container element |
| `id` | string | auto-generated | Input element ID |
| `name` | string | auto-generated | Input name (for storage) |
| `label` | string | '' | Label text |
| `placeholder` | string | '' | Placeholder text |
| `defaultValue` | string | '' | Initial value |
| `required` | boolean | false | Whether field is required |
| `validation` | function | null | Custom validation function |
| `onChange` | function | null | Change event callback (debounced 300ms) |
| `className` | string | '' | Additional CSS classes |
| `showCharCounter` | boolean | false | **NEW:** Show live character counter |
| `maxLength` | number | null | **NEW:** Maximum character length |
| `resize` | string | 'both' | Resize mode: 'none', 'vertical', 'horizontal', 'both' |
| `minHeight` | string | '100px' | Minimum height |
| `maxHeight` | string | '500px' | Maximum height |
| `minWidth` | string | '100%' | Minimum width |
| `maxWidth` | string | '100%' | Maximum width |
| `rows` | number | 5 | Number of visible rows (textarea only) |
| `useRichText` | boolean | false | Enable Quill.js rich text editor |
| `quillConfig` | object | see below | Quill.js configuration |

## Resize Options

Control how users can resize the textarea:

```javascript
// No resizing
new AreaInput({ resize: 'none' });

// Vertical only (recommended for most cases)
new AreaInput({ resize: 'vertical' });

// Horizontal only
new AreaInput({ resize: 'horizontal' });

// Both directions
new AreaInput({ resize: 'both' });
```

## Rich Text Editor Configuration

### Default Quill Configuration

```javascript
{
    theme: 'snow',
    modules: {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'color': [] }, { 'background': [] }],
            ['link'],
            ['clean']
        ]
    },
    placeholder: 'Enter text...'
}
```

### Custom Quill Configuration

```javascript
const richTextInput = new AreaInput({
    containerId: 'editor-container',
    useRichText: true,
    quillConfig: {
        theme: 'snow',
        modules: {
            toolbar: [
                ['bold', 'italic'],
                ['link', 'image'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }]
            ]
        },
        placeholder: 'Start typing...'
    }
});
```

### Minimal Toolbar

```javascript
const minimalEditor = new AreaInput({
    containerId: 'minimal-container',
    useRichText: true,
    quillConfig: {
        theme: 'snow',
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline'],
                ['link']
            ]
        }
    }
});
```

### Full-Featured Toolbar

```javascript
const fullEditor = new AreaInput({
    containerId: 'full-container',
    useRichText: true,
    quillConfig: {
        theme: 'snow',
        modules: {
            toolbar: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'font': [] }],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'script': 'sub'}, { 'script': 'super' }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'indent': '-1'}, { 'indent': '+1' }],
                [{ 'align': [] }],
                ['blockquote', 'code-block'],
                ['link', 'image', 'video'],
                ['clean']
            ]
        }
    }
});
```

## Validation

### Required Fields

```javascript
const input = new AreaInput({
    label: 'Required Field',
    required: true
});
```

### Custom Validation

```javascript
const input = new AreaInput({
    label: 'Custom Validation',
    validation: (value) => {
        if (value.length < 10) {
            return 'Must be at least 10 characters';
        }
        if (value.length > 500) {
            return 'Must be less than 500 characters';
        }
        return true; // Valid
    }
});
```

### Word Count Validation

```javascript
const input = new AreaInput({
    label: 'Essay',
    validation: (value) => {
        const wordCount = value.trim().split(/\s+/).length;
        if (wordCount < 100) {
            return `Need at least 100 words (currently ${wordCount})`;
        }
        return true;
    }
});
```

## Methods

### getValue()

Get the current value (HTML for rich text, plain text for textarea):

```javascript
const value = input.getValue();
console.log(value);
```

### getPlainText()

Get plain text value (strips HTML if using rich text):

```javascript
const plainText = input.getPlainText();
console.log(plainText);
```

### setValue(value)

Set the input value:

```javascript
input.setValue('New content here');
```

### clear()

Clear the input:

```javascript
input.clear();
```

### focus()

Focus the input:

```javascript
input.focus();
```

### setEnabled(enabled)

Enable or disable the input:

```javascript
input.setEnabled(false); // Disable
input.setEnabled(true);  // Enable
```

### validate()

Manually trigger validation:

```javascript
const isValid = input.validate();
if (isValid) {
    console.log('Input is valid');
}
```

### getData()

Get data for storage system:

```javascript
const data = input.getData();
// Returns: { fieldName: 'value' }
```

### setData(data)

Set data from storage system:

```javascript
input.setData({ description: 'Saved content' });
```

### getEditor()

Get the Quill editor instance (rich text mode only):

```javascript
if (input.isRichText()) {
    const editor = input.getEditor();
    editor.formatText(0, 5, 'bold', true);
}
```

### isRichText()

Check if using rich text mode:

```javascript
if (input.isRichText()) {
    console.log('Using rich text editor');
}
```

### destroy()

Clean up and remove the component:

```javascript
input.destroy();
```

## Events

### onChange Callback

```javascript
const input = new AreaInput({
    onChange: (value, inputInstance) => {
        console.log('Value changed:', value);
        console.log('Character count:', value.length);
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
- Custom resize handle styling

## Integration with Storage System

The AreaInput component works seamlessly with the save-data system:

```javascript
// In your tab or form component
class MyForm {
    constructor() {
        this.descriptionInput = new AreaInput({
            containerId: 'description-container',
            name: 'description', // Must match vars.json key
            label: 'Description',
            resize: 'vertical'
        });
    }
    
    getData() {
        return {
            ...this.descriptionInput.getData()
        };
    }
    
    setData(data) {
        this.descriptionInput.setData(data);
    }
}
```

## Examples

### Basic Textarea with Character Counter

```javascript
const input = new AreaInput({
    containerId: 'bio-container',
    label: 'Biography',
    placeholder: 'Tell us about yourself...',
    resize: 'vertical',
    minHeight: '150px',
    maxHeight: '400px',
    showCharCounter: true,  // NEW: Built-in character counter
    maxLength: 500,         // NEW: Enforces max length
    validation: (value) => {
        if (value.length > 500) {
            return 'Biography must be 500 characters or less';
        }
        return true;
    }
});
```

### Rich Text Editor for Blog Posts

```javascript
const blogEditor = new AreaInput({
    containerId: 'blog-container',
    name: 'blogContent',
    label: 'Blog Post Content',
    useRichText: true,
    required: true,
    minHeight: '400px',
    quillConfig: {
        theme: 'snow',
        modules: {
            toolbar: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link', 'image'],
                ['clean']
            ]
        }
    }
});
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Dependencies

- **Required**: None (for plain textarea mode)
- **Optional**: Quill.js 1.3.6+ (for rich text mode)

## Recent Improvements (v1.1.0)

### CSS Enhancements

- **Deduplicated Dark Mode Rules** - Reduced CSS bloat by ~20% using CSS custom properties
- **Enhanced Resize Handle** - Increased visibility (opacity 0.6 → 0.9 on hover) with subtle scale animation
- **Improved Error States** - Solid backgrounds instead of gradients for less distraction
- **Universal Scrollbar Styling** - Added Firefox/other browser support with `scrollbar-width` and `scrollbar-color`
- **Faster Animations** - Reduced slideDown animation from 0.3s to 0.2s for better mobile performance
- **Better Touch Targets** - Resize handle increased to 24px on mobile devices

### JavaScript Enhancements

- **Debounced onChange** - 300ms debounce prevents excessive calls during typing
- **Live Character Counter** - Real-time feedback with warning/error states at 80%/100% of max length
- **Enhanced Validation UX** - Auto-focus and smooth scroll to errors
- **Improved Accessibility** - Added ARIA attributes (`role="alert"`, `aria-describedby`)
- **Proper Event Cleanup** - Fixed memory leaks in destroy() method with bound event handlers
- **Performance Optimizations** - Added `will-change: transform` for smoother animations

## Notes

- The component automatically falls back to plain textarea if Quill.js is not loaded when `useRichText: true`
- Rich text content is stored as HTML
- Use `getPlainText()` if you need plain text from rich text editor
- The resize handle is styled to match your color system
- Dark mode is automatically applied based on system preferences or manual toggle
- onChange callbacks are debounced by 300ms for better performance
- Character counter changes color at 80% (warning) and 100% (error) of maxLength
