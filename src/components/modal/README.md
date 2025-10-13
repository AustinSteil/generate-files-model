# Modal Component

A flexible, reusable modal dialog component with beautiful styling and comprehensive accessibility features. Built on the centralized color system for consistency.

## Features

- **Multiple Types**: dialog (default), fullscreen, custom
- **Size Variants**: small, medium (default), large
- **Promise-based API**: Easy async/await usage
- **Accessibility**: ARIA attributes, focus management, keyboard navigation
- **Responsive Design**: Mobile-friendly with adaptive layouts
- **Customizable**: Configurable buttons, content, and styling
- **Dark Mode**: Full dark mode support
- **Animations**: Smooth fade and scale transitions

## Basic Usage

```javascript
// Simple confirmation dialog
const modal = new Modal({
    title: 'Confirm Action',
    content: 'Are you sure you want to proceed?',
    buttons: [
        { text: 'Cancel', action: 'cancel', variant: 'secondary' },
        { text: 'Confirm', action: 'confirm', variant: 'primary' }
    ]
});

const result = await modal.show();
if (result === 'confirm') {
    console.log('User confirmed!');
}
```

## Advanced Usage

### Custom Form Modal

```javascript
const modal = new Modal({
    title: 'Enter Information',
    content: `
        <div class="form-group">
            <label for="userInput">Your Input:</label>
            <input type="text" id="userInput" placeholder="Enter something...">
            <small>This field is required</small>
        </div>
    `,
    size: 'medium',
    buttons: [
        { text: 'Cancel', action: 'cancel' },
        { 
            text: 'Submit', 
            action: 'submit', 
            variant: 'primary',
            handler: (modal) => {
                const input = modal.modal.querySelector('#userInput');
                if (!input.value.trim()) {
                    input.classList.add('invalid');
                    return false; // Prevent modal from closing
                }
                // Process the input
                console.log('Input:', input.value);
                return true; // Allow modal to close
            }
        }
    ]
});
```

### Fullscreen Modal

```javascript
const modal = new Modal({
    type: 'fullscreen',
    title: 'Full Screen Content',
    content: '<iframe src="document.pdf" style="width:100%;height:400px;"></iframe>',
    closeable: true
});

await modal.show();
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | string | 'dialog' | Modal type: 'dialog', 'fullscreen', 'custom' |
| `title` | string | '' | Modal title text |
| `content` | string | '' | Modal body content (HTML) |
| `size` | string | 'medium' | Size: 'small', 'medium', 'large' |
| `closeable` | boolean | true | Show close button |
| `backdrop` | boolean | true | Close on backdrop click |
| `keyboard` | boolean | true | Close on Escape key |
| `buttons` | array | [] | Array of button configurations |
| `className` | string | '' | Additional CSS classes |
| `onShow` | function | null | Callback when modal is shown |
| `onHide` | function | null | Callback when modal is hidden |

## Button Configuration

```javascript
{
    text: 'Button Text',        // Required: button label
    action: 'button-action',    // Required: action identifier
    variant: 'primary',         // Optional: button style variant
    disabled: false,            // Optional: disable button
    handler: (modal) => {       // Optional: custom click handler
        // Return false to prevent modal from closing
        // Return true or undefined to allow closing
    }
}
```

## Button Variants

- `primary` - Primary action button (blue gradient)
- `secondary` - Secondary action button (gray)
- `success` - Success action button (green gradient)
- `warning` - Warning action button (yellow gradient)
- `error` - Error/destructive action button (red gradient)
- `info` - Information action button (blue gradient)

## Methods

### `show()`

Shows the modal and returns a Promise that resolves with the user's action.

```javascript
const result = await modal.show();
// result will be the action of the clicked button, or null if dismissed
```

### `hide()`

Programmatically hide the modal.

```javascript
modal.hide();
```

### `updateContent(content)`

Update the modal body content.

```javascript
modal.updateContent('<p>New content here</p>');
```

### `updateTitle(title)`

Update the modal title.

```javascript
modal.updateTitle('New Title');
```

### `destroy()`

Destroy the modal and clean up resources.

```javascript
modal.destroy();
```

## Accessibility Features

- **ARIA Attributes**: Proper `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
- **Focus Management**: Auto-focus first interactive element, focus trapping
- **Keyboard Navigation**: Escape to close, Tab navigation within modal
- **Screen Reader Support**: Proper labeling and announcements

## Styling

The modal uses the centralized color system and follows the same design patterns as other components:

```css
/* Custom modal styling */
.my-custom-modal .modal-content {
    border: 2px solid var(--color-primary);
}

.my-custom-modal .modal-header {
    background: var(--gradient-primary-subtle);
}
```

## Examples

### Confirmation Dialog

```javascript
const confirmed = await new Modal({
    title: 'Delete Item',
    content: 'This action cannot be undone. Are you sure?',
    buttons: [
        { text: 'Cancel', action: 'cancel' },
        { text: 'Delete', action: 'delete', variant: 'error' }
    ]
}).show();
```

### Information Modal

```javascript
await new Modal({
    title: 'Information',
    content: 'Your changes have been saved successfully.',
    buttons: [{ text: 'OK', action: 'ok', variant: 'primary' }]
}).show();
```

### Form Validation

```javascript
const modal = new Modal({
    title: 'User Registration',
    content: `
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" required>
        </div>
        <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" required>
        </div>
    `,
    buttons: [
        { text: 'Cancel', action: 'cancel' },
        { 
            text: 'Register', 
            action: 'register', 
            variant: 'primary',
            handler: (modal) => {
                const email = modal.modal.querySelector('#email');
                const password = modal.modal.querySelector('#password');
                
                // Validation
                if (!email.value || !password.value) {
                    modal.updateContent(modal.config.content + '<div class="error">All fields are required</div>');
                    return false;
                }
                
                // Process registration
                return true;
            }
        }
    ]
});
```

## Browser Support

Works in all modern browsers that support:

- CSS Custom Properties (variables)
- ES6 Classes and Promises
- CSS Grid and Flexbox
- CSS Transitions and Transforms
