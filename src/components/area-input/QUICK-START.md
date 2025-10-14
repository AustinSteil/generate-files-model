# AreaInput Component - Quick Start Guide

Get up and running with the AreaInput component in 3 simple steps!

## 🚀 Quick Start

### Step 1: Add to Your HTML

```html
<!-- In your <head> section -->
<link rel="stylesheet" href="src/components/area-input/area-input.css">

<!-- Before closing </body> tag -->
<script src="src/components/area-input/area-input.js"></script>
```

### Step 2: Add a Container

```html
<div id="my-textarea-container"></div>
```

### Step 3: Initialize the Component

```javascript
const myTextarea = new AreaInput({
    containerId: 'my-textarea-container',
    name: 'myField',
    label: 'Description',
    placeholder: 'Enter text here...',
    resize: 'vertical'
});
```

That's it! You now have a fully functional textarea component.

---

## 📝 Common Use Cases

### Simple Textarea

```javascript
new AreaInput({
    containerId: 'description-container',
    name: 'description',
    label: 'Description',
    placeholder: 'Enter description...',
    resize: 'vertical',
    rows: 5
});
```

### Required Field

```javascript
new AreaInput({
    containerId: 'comments-container',
    name: 'comments',
    label: 'Comments',
    placeholder: 'Enter your comments...',
    required: true,
    resize: 'vertical'
});
```

### With Character Counter and Limit

```javascript
new AreaInput({
    containerId: 'bio-container',
    name: 'bio',
    label: 'Biography (max 500 characters)',
    placeholder: 'Tell us about yourself...',
    resize: 'vertical',
    showCharCounter: true,  // NEW: Shows live character count
    maxLength: 500,         // NEW: Enforces maximum length
    validation: (value) => {
        if (value.length > 500) {
            return 'Biography must be 500 characters or less';
        }
        return true;
    }
});
```

### Rich Text Editor (Requires Quill.js)

First, add Quill.js to your HTML:

```html
<!-- In <head> -->
<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">

<!-- Before closing </body> -->
<script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
```

Then create the editor:

```javascript
new AreaInput({
    containerId: 'editor-container',
    name: 'content',
    label: 'Article Content',
    useRichText: true,
    minHeight: '300px'
});
```

---

## 🎨 Resize Options

```javascript
// No resizing (fixed size)
resize: 'none'

// Vertical only (recommended)
resize: 'vertical'

// Horizontal only
resize: 'horizontal'

// Both directions
resize: 'both'
```

---

## ✅ Validation Examples

### Required Field

```javascript
required: true
```

### Minimum Length

```javascript
validation: (value) => {
    if (value.length < 10) {
        return 'Must be at least 10 characters';
    }
    return true;
}
```

### Maximum Length

```javascript
validation: (value) => {
    if (value.length > 200) {
        return 'Must be less than 200 characters';
    }
    return true;
}
```

### Word Count

```javascript
validation: (value) => {
    const wordCount = value.trim().split(/\s+/).length;
    if (wordCount < 50) {
        return `Need at least 50 words (currently ${wordCount})`;
    }
    return true;
}
```

---

## 🔧 Common Methods

### Get Value

```javascript
const value = myTextarea.getValue();
```

### Set Value

```javascript
myTextarea.setValue('New content');
```

### Clear

```javascript
myTextarea.clear();
```

### Validate

```javascript
const isValid = myTextarea.validate();
```

### Focus

```javascript
myTextarea.focus();
```

### Enable/Disable

```javascript
myTextarea.setEnabled(false); // Disable
myTextarea.setEnabled(true);  // Enable
```

---

## 💾 Storage Integration

The component works seamlessly with your save-data system:

```javascript
// Create the component
const descriptionInput = new AreaInput({
    containerId: 'description-container',
    name: 'description', // Must match vars.json key
    label: 'Description'
});

// Get data for saving
const data = descriptionInput.getData();
// Returns: { description: 'user entered text' }

// Load saved data
descriptionInput.setData({ description: 'saved text' });
```

---

## 🎯 Configuration Cheat Sheet

| What You Want | Configuration |
|---------------|---------------|
| Simple textarea | `resize: 'vertical'` |
| Fixed size | `resize: 'none'` |
| Required field | `required: true` |
| Rich text editor | `useRichText: true` |
| Custom height | `minHeight: '200px', maxHeight: '400px'` |
| Character limit | Use `validation` function |
| Change callback | `onChange: (value) => { ... }` |

---

## 🌙 Dark Mode

Dark mode is automatically supported! The component uses your color system and will adapt to:
- System preferences (`prefers-color-scheme: dark`)
- Manual dark mode toggle (`.dark-mode` class)

No additional configuration needed!

---

## 📱 Responsive Design

The component is mobile-friendly out of the box:
- Touch-friendly resize handles
- Proper font sizing (prevents iOS zoom)
- Responsive padding and spacing

---

## 🐛 Troubleshooting

### Rich Text Editor Not Working

**Problem**: Rich text editor doesn't appear  
**Solution**: Make sure Quill.js is loaded before initializing the component

```html
<!-- Add these BEFORE your component initialization -->
<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
<script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
```

### Container Not Found Error

**Problem**: Console error about container not found  
**Solution**: Make sure the container element exists in your HTML before initializing

```html
<!-- Container must exist first -->
<div id="my-container"></div>

<script>
    // Then initialize
    new AreaInput({ containerId: 'my-container', ... });
</script>
```

### Validation Not Working

**Problem**: Validation doesn't trigger  
**Solution**: Call `validate()` method or validation happens automatically on blur

```javascript
// Manual validation
const isValid = myTextarea.validate();

// Or validation happens automatically when user leaves the field
```

---

## 📚 Need More Help?

- See [README.md](README.md) for complete documentation
- Check [area-input-example.html](area-input-example.html) for live examples
- Review the [TextInput component](../text-input/README.md) for similar patterns

---

## 🎉 You're Ready!

You now know everything you need to use the AreaInput component. Start simple and add features as needed!

**Simplest possible example:**

```javascript
new AreaInput({
    containerId: 'my-container',
    name: 'myField',
    label: 'My Field'
});
```

Happy coding! 🚀

