# SubNav Component

A vertical side navigation component with content panel layout.

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

- Vertical side navigation with content panel
- Smooth transitions and animations
- Full light/dark mode support
- Accessible keyboard navigation
- Active state management
- Custom events for section changes
- Elegant gradient styling using the color system

## Usage

### Basic Setup

```javascript
const subNav = new SubNav({
    containerId: 'my-subnav-container',
    sections: [
        {
            id: 'section-1',
            title: 'Section One',
            content: '<p>Content for section one</p>'
        },
        {
            id: 'section-2',
            title: 'Section Two',
            content: '<p>Content for section two</p>'
        }
    ],
    defaultSection: 'section-1' // Optional, defaults to first section
});
```

### Dynamic Content with Functions

```javascript
const subNav = new SubNav({
    containerId: 'my-subnav-container',
    sections: [
        {
            id: 'physical-demands',
            title: 'Physical Demands',
            content: () => this.renderPhysicalDemands() // Function that returns HTML
        },
        {
            id: 'mobility-demands',
            title: 'Mobility Demands',
            content: () => this.renderMobilityDemands()
        }
    ]
});
```

### Listening to Section Changes

```javascript
const container = document.getElementById('my-subnav-container');
container.addEventListener('sectionchange', (e) => {
    console.log('Active section:', e.detail.sectionId);
});
```

### Programmatic Control

```javascript
// Get current active section
const activeSection = subNav.getActiveSection();

// Set active section programmatically
subNav.setActiveSection('section-2');
```

## Configuration Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `containerId` | string | Yes | ID of the container element |
| `sections` | Array | Yes | Array of section objects |
| `defaultSection` | string | No | ID of default active section (defaults to first) |

### Section Object

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | Yes | Unique identifier for the section |
| `title` | string | Yes | Display title for the section |
| `content` | string or function | Yes | HTML content or function returning HTML |

## Layout

- Side navigation appears on the left (220px width, 250px on screens >1200px)
- Content panel appears on the right (remaining space)
- Side navigation is sticky and scrollable
- Only one section visible at a time
- Grid-based layout for clean alignment

## Styling

The component uses the project's color system and follows these design principles:

- Smooth transitions using `var(--transition-cubic)`
- Consistent spacing using `var(--spacing-*)` variables
- Border radius using `var(--radius-*)` variables
- Full dark mode support via `.dark-mode` class
- Gradient backgrounds for depth
- Accessible focus states

## Accessibility

- Proper ARIA attributes (`role`, `aria-selected`, `aria-expanded`, `aria-controls`)
- Keyboard navigation support (Arrow keys, Home, End)
- Focus-visible states for keyboard users
- Semantic HTML structure

## Example: Jobs Tab

See `src/tabs/jobs/jobs.js` for a complete implementation example with 6 demand categories:

- Physical Demands
- Mobility Demands
- Cognitive & Sensory
- Environmental Demands
- Lifting/Pushing/Pulling
- Classification of Work

## Browser Support

Works in all modern browsers that support:

- CSS Grid
- CSS Custom Properties (CSS Variables)
- ES6 Classes
- Arrow Functions

## Files

- `subnav.js` - Component logic
- `subnav.css` - Component styles
- `README.md` - This documentation
