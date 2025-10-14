# Repeater Component

A flexible, reusable repeater component for dynamic array inputs with add/remove functionality.

## Features

- 🔄 **Dynamic Rows**: Add and remove rows dynamically (minimum 1, configurable maximum)
- 🎯 **Flexible Fields**: Support for 1-4 input fields per row
- 📝 **Multiple Input Types**: Works with TextInput and Dropdown components
- ✅ **Built-in Validation**: Validates all fields in all rows
- 💾 **Storage Integration**: Compatible with the save-data system
- 🎨 **Elegant Design**: Slim, modern UI with smooth animations
- 🌙 **Dark Mode**: Full light/dark mode support
- ♿ **Accessible**: Keyboard navigation and ARIA support
- 📱 **Responsive**: Mobile-friendly grid layout

## Basic Usage

### Single Field Repeater

```javascript
const skillsRepeater = new Repeater({
    containerId: 'skills-container',
    id: 'skills-repeater',
    name: 'skills',
    label: 'Skills',
    fields: [
        {
            name: 'skill',
            label: 'Skill Name',
            type: 'text',
            placeholder: 'Enter skill',
            required: true
        }
    ]
});
```

### Two Field Repeater

```javascript
const experienceRepeater = new Repeater({
    containerId: 'experience-container',
    id: 'experience-repeater',
    name: 'experience',
    label: 'Work Experience',
    fields: [
        {
            name: 'company',
            label: 'Company',
            type: 'text',
            placeholder: 'Company name',
            required: true
        },
        {
            name: 'years',
            label: 'Years',
            type: 'number',
            placeholder: '0',
            required: true
        }
    ]
});
```

### Three Field Repeater

```javascript
const educationRepeater = new Repeater({
    containerId: 'education-container',
    id: 'education-repeater',
    name: 'education',
    label: 'Education',
    fields: [
        {
            name: 'school',
            label: 'School',
            type: 'text',
            placeholder: 'School name',
            required: true
        },
        {
            name: 'degree',
            label: 'Degree',
            type: 'text',
            placeholder: 'Degree type',
            required: true
        },
        {
            name: 'year',
            label: 'Year',
            type: 'number',
            placeholder: 'Graduation year',
            required: false
        }
    ]
});
```

### Four Field Repeater

```javascript
const contactsRepeater = new Repeater({
    containerId: 'contacts-container',
    id: 'contacts-repeater',
    name: 'contacts',
    label: 'Emergency Contacts',
    fields: [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            placeholder: 'Full name',
            required: true
        },
        {
            name: 'relationship',
            label: 'Relationship',
            type: 'text',
            placeholder: 'Relationship',
            required: true
        },
        {
            name: 'phone',
            label: 'Phone',
            type: 'tel',
            placeholder: '(555) 555-5555',
            required: true
        },
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'email@example.com',
            required: false
        }
    ]
});
```

### With Dropdown Fields

```javascript
const tasksRepeater = new Repeater({
    containerId: 'tasks-container',
    id: 'tasks-repeater',
    name: 'tasks',
    label: 'Tasks',
    fields: [
        {
            name: 'task',
            label: 'Task Name',
            type: 'text',
            placeholder: 'Enter task',
            required: true
        },
        {
            name: 'priority',
            label: 'Priority',
            type: 'dropdown',
            options: [
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' }
            ],
            placeholder: 'Select priority',
            required: true
        }
    ]
});
```

## Configuration Options

### Repeater Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `containerId` | string | null | ID of the container element |
| `id` | string | auto-generated | HTML ID for the repeater |
| `name` | string | same as id | Name for storage (data key) |
| `label` | string | '' | Label text for the repeater |
| `fields` | array | [] | Array of field configurations (1-4 fields) |
| `minRows` | number | 1 | Minimum number of rows (cannot be removed below this) |
| `maxRows` | number | null | Maximum number of rows (null = unlimited) |
| `defaultRows` | number | 1 | Number of rows to show initially |
| `required` | boolean | false | Whether at least one row is required |
| `onChange` | function | null | Callback when data changes |
| `className` | string | '' | Additional CSS classes |

### Field Configuration

Each field in the `fields` array can have:

| Option | Type | Description |
|--------|------|-------------|
| `name` | string | Field name (required) |
| `label` | string | Field label |
| `type` | string | Input type: 'text', 'email', 'number', 'date', 'tel', 'dropdown', etc. |
| `placeholder` | string | Placeholder text |
| `required` | boolean | Whether the field is required |
| `validation` | function | Custom validation function (for TextInput) |
| `options` | array | Options array (for dropdown type) |

## Methods

### Getting and Setting Data

```javascript
// Get all rows data
const data = repeater.getData();
// Returns: { fieldName: [{ field1: 'value1', field2: 'value2' }, ...] }

// Set data (replaces all rows)
repeater.setData({
    skills: [
        { skill: 'JavaScript' },
        { skill: 'Python' },
        { skill: 'React' }
    ]
});

// Clear all rows (reset to minimum)
repeater.clear();
```

### Validation

```javascript
// Validate all rows
const isValid = repeater.validate();

// Check if currently valid
const currentlyValid = repeater.isValid;
```

### Manual Row Management

```javascript
// Add a row programmatically
repeater.addRow();

// Add a row with data
repeater.addRow({ skill: 'TypeScript' });

// Remove a specific row (by row ID)
repeater.removeRow(rowId);
```

### Cleanup

```javascript
// Destroy the component
repeater.destroy();
```

## Events

### onChange Callback

```javascript
const repeater = new Repeater({
    onChange: (data, repeaterInstance) => {
        console.log('Data changed:', data);
        console.log('Repeater instance:', repeaterInstance);
    }
});
```

## Styling

The component uses the centralized color management system and includes:

- Smooth animations for adding/removing rows
- Hover and focus states
- Error state styling
- Dark mode support
- Responsive grid layout
- Compact variant

### Custom Styling

```javascript
// Add custom CSS classes
const repeater = new Repeater({
    className: 'compact custom-repeater'
});
```

Available CSS classes:

- `compact` - Smaller padding and spacing

## Integration with Storage System

The Repeater component is designed to work seamlessly with the save-data system:

```javascript
// In your tab or form component
class MyForm {
    constructor() {
        this.skillsRepeater = new Repeater({
            containerId: 'skills-container',
            name: 'skills', // Must match vars.json key
            label: 'Skills',
            fields: [
                { name: 'skill', label: 'Skill', type: 'text', required: true }
            ]
        });
    }
    
    getData() {
        return {
            ...this.skillsRepeater.getData()
        };
    }
    
    setData(data) {
        this.skillsRepeater.setData(data);
    }
    
    validate() {
        return this.skillsRepeater.validate();
    }
}
```

## Responsive Behavior

- **Desktop**: Fields display in configured columns (1-4)
- **Tablet/Mobile**: Fields stack vertically for better usability
- **Touch-friendly**: Buttons are sized for easy touch interaction

## Accessibility

- Proper ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Screen reader friendly
- Disabled state handling

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ (with polyfills for CSS variables)

## Examples

See the component in action in the demographics tab or create a test page:

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="../../color-system/colors.css">
    <link rel="stylesheet" href="../text-input/text-input.css">
    <link rel="stylesheet" href="../dropdown/dropdown.css">
    <link rel="stylesheet" href="repeater.css">
</head>
<body>
    <div id="my-repeater"></div>
    
    <script src="../text-input/text-input.js"></script>
    <script src="../dropdown/dropdown.js"></script>
    <script src="repeater.js"></script>
    <script>
        const repeater = new Repeater({
            containerId: 'my-repeater',
            name: 'items',
            label: 'Items',
            fields: [
                { name: 'item', label: 'Item', type: 'text', required: true }
            ]
        });
    </script>
</body>
</html>
```
