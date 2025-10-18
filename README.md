# Generate Files Model

A web-based document generation tool that creates Word documents from templates using user-provided data. Built with docxtemplater and PizZip for reliable document processing.

Live demo: <https://austinsteil.github.io/generate-files-model/>

## About

Author: Austin Steil  
Version: 1.0.0
Created October 11, 2025
Updated October 18, 2025

## License & Copyright

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
Live License Page Link: <https://raw.githubusercontent.com/AustinSteil/generate-files-model/refs/heads/main/LICENSE>
Copyright 2025 Austin Steil

## Features

- 📄 Generate Word documents from predefined templates
- 🎨 Clean, responsive web interface
- 📝 Form-based data input with validation
- 💾 Automatic document download
- 🔧 Configurable template variables via JSON
- 🃏 Card Selection - Interactive card-based choice system with responsive layouts
- 💾 **Save for Later** - Securely store your form data for future use
- 🎨 **Color System** - Centralized color management for consistent UI
- 🌙 **Dark Mode** - Toggleable dark mode for improved readability

### Save for Later Security

The Save for Later feature uses industry-standard security practices to protect your data:

- **🔐 Client-Side Encryption**: All data is encrypted using AES-256-GCM encryption before being stored
- **🔑 Passphrase Protection**: Your data is protected by a user-defined passphrase that never leaves your device
- **💾 Browser Storage**: Data is stored in encrypted browser localStorage (5-10 MB capacity), not on external servers
- **⏰ Automatic Expiration**: Saved data automatically expires after a configurable time period (default: 30 days)
- **🔒 Zero-Knowledge Architecture**: The application cannot access your data without your passphrase
- **🚫 No Server Storage**: All encryption and storage happens locally in your browser

**How it works:**

1. Enter your form data and click "Save Data for Later"
2. Create a secure passphrase (never stored anywhere)
3. Data is encrypted using AES-256-GCM and saved in browser localStorage
4. To retrieve: Click "Load Saved Data" and enter your passphrase
5. The data is decrypted client-side and restored to the form

### Color System

The color system provides a centralized, consistent approach to colors across the entire application:

- **Semantic color naming** - Use meaningful names like `success`, `warning`, `error` instead of arbitrary color values
- **Beautiful gradients** - Smooth gradient backgrounds for alerts and UI elements
- **Light/dark mode support** - All colors automatically adjust for dark mode with proper contrast ratios
- **Opacity variants** - Pre-defined opacity levels for overlays and backgrounds
- **Consistent spacing & transitions** - Standardized spacing and animation timing

The color system ensures visual consistency across all components and makes it easy to maintain a cohesive design. For detailed documentation, see [`src/color-system/COLOR-SYSTEM.md`](src/color-system/COLOR-SYSTEM.md).

### Dark Mode

The dark mode feature provides an enhanced viewing experience in low-light environments:

- **🌙 System preference detection** - Automatically detects your OS dark mode setting on first visit
- **💾 Persistent preference** - Your choice is saved to localStorage and remembered across sessions
- **🎨 Seamless integration** - Works with the color system to ensure proper contrast and readability
- **🎯 Floating toggle** - Convenient toggle button in the bottom-right corner
- **📱 Responsive design** - Adapts to mobile screens with a compact layout
- **♿ Accessible** - Keyboard accessible and respects `prefers-reduced-motion`

The toggle button shows the current mode and allows instant switching between light and dark themes. All UI components automatically adapt their colors when dark mode is enabled.

## Prerequisites

- Node.js (version 14.0.0 or higher)
- A local web server (Live Server extension for VS Code recommended)

## Installation

1. Clone the repository.

2. Install dependencies and set up the project:

   ```bash
   npm install && npm run setup
   ```

## Usage

### Running the Application

1. **Using VS Code Live Server (Recommended):**
   - Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
   - Right-click on `index.html` and select "Open with Live Server"
   - The application will open at `http://127.0.0.1:5500/`

2. **Using any local web server:**

   ```bash
   # Python 3
   python -m http.server 8000

   # Node.js (if you have http-server installed)
   npx http-server
   ```

### Using the Document Generator

1. Fill out the form with your document information:
   - Document Title
   - Author Name
   - Date
   - Content

2. Click "Generate Document" to create and download your Word document

### Using Save for Later

1. **Saving Your Data:**
   - Fill out the form with some information
   - Choose "Save Data for Later" button in the top-right corner
   - Create a secure passphrase when prompted
   - Your data is encrypted and saved locally in browser storage

2. **Loading Saved Data:**
   - Click the storage button and select "Load Saved Data"
   - Enter your passphrase to decrypt and restore your form data

3. **Managing Saved Data:**
   - **Update**: Modify your data and click "Update Saved Data"
   - **Clear**: Select "Clear all Saved Data" to permanently delete stored information

## Demos & Examples

The project includes interactive demo pages for testing and showcasing components:

- **[Color System Demo](https://austinsteil.github.io/generate-files-model/src/color-system/color-system-demo.html)** - Interactive showcase of the entire color palette with light/dark mode
- **[Contrast Test Tool](https://austinsteil.github.io/generate-files-model/src/color-system/contrast-test.html)** - Accessibility testing tool for color contrast ratios
- **[Alert Component Demo](https://austinsteil.github.io/generate-files-model/src/components/alert/alert-example.html)** - Examples of alert notifications with different colors and configurations
- **[Cards Component Demo](https://austinsteil.github.io/generate-files-model/src/components/cards/cards-example.html)** - Interactive card selection examples with responsive layouts, PDF preview, and validation
- **[Tooltip Component Demo](https://austinsteil.github.io/generate-files-model/src/components/tooltip/tooltip-example.html)** - Interactive tooltip examples with different positions
- **[Area Input Demo](https://austinsteil.github.io/generate-files-model/src/components/area-input/area-input-example.html)** - Multi-line text input with auto-grow, character counter, and rich text editor options
- **[Work Week Calculator Demo](https://austinsteil.github.io/generate-files-model/src/components/work-week-calculator/work-week-calculator-example.html)** - Interactive work schedule calculator with auto-calculating fields
- **[Table Component Demo](https://austinsteil.github.io/generate-files-model/src/components/table/demo.html)** - Flexible table component with selectable cells and input fields for data collection
- **[Demand Level Selector Demo](https://austinsteil.github.io/generate-files-model/src/components/demands-level-selector/demands-level-selector-example.html)** - Comparison interface for selecting physical demand levels

These demo files can be opened directly in your browser or served through a local web server.

## Components

The application includes several reusable UI components:

### Alert Component

Floating alert notifications with color-coded messages:

- **Multiple alerts** - Stack multiple alerts vertically with tight spacing
- **Color coding** - Red (error), yellow (warning), green (success)
- **Auto-dismiss** - Configurable auto-dismiss timing
- **Manual dismiss** - Optional X button for user dismissal
- **Beautiful gradients** - Smooth gradient backgrounds for visual appeal

### Tooltip Component

Contextual help text on hover:

- **Configurable position** - Left, right, top, or bottom placement
- **Simple API** - Just position and text content
- **Consistent styling** - Matches the application's design system
- **Accessible** - Works with keyboard navigation

### Dropdown Component

State-aware dropdown menus:

- **Single button mode** - Shows one button when no data exists
- **Dropdown mode** - Expands to show multiple options when data is loaded
- **Split-button behavior** - Main area triggers default action, arrow opens menu
- **Intuitive labels** - Button text matches actual functionality

### Toggle Component

Customizable toggle switches:

- **Icon support** - Optional icons for on/off states
- **Callback support** - onChange event handler
- **Accessible** - Keyboard and screen reader friendly
- **Smooth animations** - Beautiful transitions

### Cards Component

Interactive card-based selection system with advanced preview capabilities:

- **Flexible selection** - Single-select or multi-select modes
- **Responsive layouts** - Auto-adjusting grids (1-2 cards centered, 3-4 in 2×2, 5-6 in 3×2)
- **Rich content** - Support for images, titles, and custom content
- **Dual preview modes** - Image thumbnails for cards, PDF full-screen preview on expand
- **Secure PDF viewing** - Full-screen PDF preview with disabled download/print
- **Optimized layout** - Full-height PDF viewer (100vh) with document-focused width (70vw)
- **Dark/light mode** - Floating close button optimized for both themes
- **Validation integration** - Required/optional validation with alert system
- **Choice feedback** - Visual selection indicators and hover effects

### Button Component

Customizable button component with gradient backgrounds:

- **Gradient backgrounds** - Beautiful subtle gradients for visual appeal
- **Multiple variants** - Primary, secondary, success, info, warning, error
- **Size options** - Small, medium (default), large
- **State management** - Disabled, loading with spinner
- **Accessibility** - Proper ARIA labels and focus states
- **Dark mode** - Full dark mode support
- **Responsive** - Mobile-friendly sizing

### Area Input Component

Multi-line text input with advanced features:

- **Auto-grow/shrink** - Textarea automatically adjusts height based on content
- **Character counter** - Optional character count display with max length enforcement
- **Rich text editor** - Optional QuillJS integration for formatted text
- **Configurable resize** - Vertical, horizontal, or both resize options
- **Validation support** - Built-in validation with custom rules
- **Dark mode** - Full light/dark mode support with proper contrast

### Work Week Calculator Component

Interactive work schedule calculator with interdependent fields:

- **Auto-calculating fields** - Three fields that automatically update each other (weekly hours, shift length, shifts per week)
- **Increment buttons** - Plus/minus buttons for easy value adjustment
- **Configurable defaults** - Set default values (40hrs/week, 8hrs/day, 5 days/week)
- **Single-row layout** - Compact horizontal layout for space efficiency
- **Validation support** - Ensures valid numeric inputs
- **Dark mode** - Full light/dark mode support

### Repeater Component

Dynamic array input system for collecting multiple rows of data:

- **Flexible fields** - Support for 1-4 input fields per row (TextInput, AreaInput, or Dropdown)
- **Add/Remove rows** - Elegant add (+) and remove (×) buttons with smooth animations
- **Minimum enforcement** - Maintains at least 1 row, optional maximum limit
- **Responsive grid** - Auto-adjusting columns that stack on mobile
- **Validation support** - Validates all fields across all rows
- **Storage integration** - Seamlessly works with save-data system
- **Slim design** - Compact, elegant UI with proper spacing
- **Dark mode** - Full light/dark mode support with proper contrast

### Table Component

Flexible table component for data collection and selection:

- **Configurable structure** - Define custom rows, columns, and headers
- **Selectable cells** - Click to select with single or multiple selection modes
- **Input cells** - Text input or textarea for data entry
- **Styling options** - Striped, hoverable, bordered, and compact variants
- **Validation support** - Custom validation with callbacks
- **Dark mode** - Full light/dark mode support

### SubNav Component

Vertical side navigation with content panel layout:

- **Vertical navigation** - Side navigation with content panel
- **Active state management** - Automatic active section tracking
- **Dynamic content** - Support for HTML strings or functions
- **Smooth transitions** - Elegant animations and gradient styling
- **Accessible** - Full keyboard navigation support
- **Dark mode** - Full light/dark mode support

### Demand Level Selector Component

Comparison interface for selecting physical demand levels:

- **Comparison interface** - Visual comparison of 5 demand levels (Sedentary to Very Heavy)
- **Color-coded rows** - Green (Sedentary) to Red (Heavy) gradient
- **Single-select mode** - Entire row clickable
- **Validation support** - Required field enforcement
- **Dark mode** - Full light/dark mode support

## Configuration

### Template Variables (vars.json)

**`src/fields/vars.json` is the single source of truth** for all document variables in the application. This file controls:

- Which form fields are collected
- Which data gets saved/loaded with "Save Data for Later"
- How form data maps to template variables

Edit `src/fields/vars.json` to customize the template variable mappings:

```json
{
  "documentTitle": "{documentTitle}",
  "authorName": "{authorName}",
  "documentDate": "{documentDate}",
  "documentContent": "{documentContent}"
}
```

**Adding new fields is easy:**

1. Add the field to `src/fields/vars.json`
2. Add the corresponding HTML form element to `index.html`
3. Add the placeholder to your Word template

The storage system automatically adapts to changes in `src/fields/vars.json` - no code changes needed!

For detailed documentation, see [`src/fields/vars.json.README.md`](src/fields/vars.json.README.md).

### Custom Templates

The application supports multiple templates organized in the `src/templates/` folder:

- **Add new templates**: Place files in `src/templates/word/`, `src/templates/pdf/`, and `src/templates/images/`
- **Template naming**: Use consistent naming (e.g., `template_7.docx`, `template_7.pdf`, `template_7.png`)
- **Variable consistency**: Ensure all templates use the same placeholder variables defined in `src/fields/vars.json`
- **Update template cards**: Add new template configurations to `src/tabs/intro/intro.js`

**Template Workflow**:

1. **PNG Image**: Shows as card preview in template selection
2. **PDF File**: Displays in full-screen preview when user clicks expand button
3. **DOCX File**: Used for actual document generation based on user's selection

## Project Structure

```text
generate-files-model/
├── index.html              # Main application interface
├── main.js                 # Core application logic
├── main.css                # Main styling and responsive design
├── package.json            # Project dependencies and scripts
├── LICENSE                 # MIT license
├── README.md               # This file
├── docxtemplater.js        # Generated: Document templating library
├── pizzip.js               # Generated: ZIP file handling library
└── src/                    # Source code organization
    ├── color-system/       # Color management and dark mode
    │   ├── colors.css                      # Color system variables
    │   ├── COLOR-SYSTEM.md                 # Color system documentation
    │   ├── COLOR-QUICK-REFERENCE.md        # Quick reference guide
    │   ├── CONTRAST-AUDIT.md               # Accessibility audit
    │   ├── color-system-demo.html          # Interactive demo
    │   ├── color-system-demo.css           # Demo styling
    │   ├── contrast-test.html              # Contrast testing tool
    │   └── dark-mode-toggle/               # Dark mode feature
    │       ├── dark-mode-toggle.js         # Dark mode logic
    │       ├── dark-mode-toggle.css        # Dark mode toggle styling
    │       └── README.md                   # Dark mode documentation
    ├── components/         # Reusable UI components
    │   ├── alert/          # Alert notification component
    │   │   ├── alert.js            # Alert functionality
    │   │   ├── alert.css           # Alert styling with gradients
    │   │   ├── alert-example.html  # Alert demo page
    │   │   └── README.md           # Alert documentation
    │   ├── cards/          # Card selection component
    │   │   ├── cards.js            # Card functionality
    │   │   ├── cards.css           # Card styling with responsive grids
    │   │   ├── cards-example.html  # Card demo page
    │   │   └── README.md           # Card documentation
    │   ├── tooltip/        # Tooltip component
    │   │   ├── tooltip.js          # Tooltip functionality
    │   │   ├── tooltip.css         # Tooltip styling
    │   │   ├── tooltip-example.html # Tooltip demo page
    │   │   └── README.md           # Tooltip documentation
    │   ├── dropdown/       # Dropdown component
    │   │   ├── dropdown.js         # Dropdown functionality
    │   │   └── dropdown.css        # Dropdown styling
    │   ├── toggle/         # Toggle switch component
    │   │   ├── toggle.js           # Toggle functionality
    │   │   ├── toggle.css          # Toggle styling
    │   │   └── README.md           # Toggle documentation
    │   ├── repeater/       # Dynamic array input component
    │   │   ├── repeater.js         # Repeater functionality
    │   │   ├── repeater.css        # Repeater styling
    │   │   └── README.md           # Repeater documentation
    │   ├── text-input/     # Text input component
    │   │   ├── text-input.js       # Text input functionality
    │   │   ├── text-input.css      # Text input styling
    │   │   └── README.md           # Text input documentation
    │   ├── address/        # Address input component
    │   │   ├── address.js          # Address functionality
    │   │   ├── address.css         # Address styling
    │   │   └── README.md           # Address documentation
    │   ├── area-input/     # Multi-line text input component
    │   │   ├── area-input.js       # Area input functionality
    │   │   ├── area-input.css      # Area input styling
    │   │   ├── area-input-example.html # Area input demo page
    │   │   ├── README.md           # Area input documentation
    │   │   └── QUICK-START.md      # Quick start guide
    │   ├── work-week-calculator/ # Work schedule calculator component
    │   │   ├── work-week-calculator.js # Calculator functionality
    │   │   ├── work-week-calculator.css # Calculator styling
    │   │   ├── work-week-calculator-example.html # Calculator demo page
    │   │   └── README.md           # Calculator documentation
    │   ├── button/         # Button component
    │   │   ├── button.js           # Button functionality
    │   │   ├── button.css          # Button styling
    │   │   └── README.md           # Button documentation
    │   ├── table/          # Table component
    │   │   ├── table.js            # Table functionality
    │   │   ├── table.css           # Table styling
    │   │   ├── demo.html           # Table demo page
    │   │   └── README.md           # Table documentation
    │   ├── modal/          # Modal dialog component
    │   │   ├── modal.js            # Modal functionality
    │   │   ├── modal.css           # Modal styling
    │   │   └── README.md           # Modal documentation
    │   ├── subnav/         # SubNav component
    │   │   ├── subnav.js           # SubNav functionality
    │   │   ├── subnav.css          # SubNav styling
    │   │   └── README.md           # SubNav documentation
    │   └── demands-level-selector/ # Demand Level Selector component
    │       ├── demands-level-selector.js # Selector functionality
    │       ├── demands-level-selector.css # Selector styling
    │       ├── demands-level-selector-example.html # Selector demo page
    │       └── README.md           # Selector documentation
    ├── fields/             # Field configuration and documentation
    │   ├── vars.json           # Template variable configuration (single source of truth)
    │   ├── vars.json.README.md # Detailed vars.json documentation
    │   ├── QUICK-START-ADDING-FIELDS.md # Quick guide for adding fields
    │   ├── README.md           # Fields documentation
    │   └── STORAGE-SYSTEM-IMPROVEMENTS.md # Storage system architecture
    ├── templates/          # Template files organized by type
    │   ├── images/         # PNG preview images for template cards
    │   │   ├── template_1.png          # Classic template preview
    │   │   ├── template_2.png          # Modern template preview
    │   │   ├── template_3.png          # Minimal template preview
    │   │   ├── template_4.png          # Corporate template preview
    │   │   ├── template_5.png          # Creative template preview
    │   │   ├── template_6.png          # Academic template preview
    │   │   └── archived/               # Archived template images
    │   ├── pdf/            # PDF files for full-screen preview
    │   │   ├── template_1.pdf          # Classic template full preview
    │   │   ├── template_2.pdf          # Modern template full preview
    │   │   ├── template_3.pdf          # Minimal template full preview
    │   │   ├── template_4.pdf          # Corporate template full preview
    │   │   ├── template_5.pdf          # Creative template full preview
    │   │   └── template_6.pdf          # Academic template full preview
    │   └── word/           # DOCX templates for document generation
    │       ├── template_1.docx         # Classic template source
    │       ├── template_2.docx         # Modern template source
    │       ├── template_3.docx         # Minimal template source
    │       ├── template_4.docx         # Corporate template source
    │       ├── template_5.docx         # Creative template source
    │       └── template_6.docx         # Academic template source
    ├── tabs/               # Tab-based application structure
    │   ├── tabs.js                 # Tab management and navigation
    │   ├── tabs.css                # Tab styling and layout
    │   ├── tabs-content.css        # Content area styling
    │   ├── tabs-manager.js         # Coordinates all tabs
    │   ├── next-button-manager.js  # Manages next button validation
    │   ├── README.md               # Tabs documentation
    │   ├── intro/          # Intro tab (template selection)
    │   │   └── intro.js            # Template selection with Cards component
    │   ├── demographics/   # Demographics information
    │   │   └── demographics.js     # Demographics form
    │   ├── jobs/           # Jobs tab (job demands analysis)
    │   │   ├── jobs.js             # Jobs tab with SubNav integration
    │   │   └── demands/            # Modular demand section files
    │   │       ├── physical-demands.js # Physical demands section
    │   │       ├── mobility-demands.js # Mobility demands section
    │   │       ├── cognitive-and-sensory-demands.js # Cognitive & sensory section
    │   │       ├── environmental-demands.js # Environmental demands section
    │   │       ├── lifting-pushing-and-pulling.js # Lifting/pushing/pulling section
    │   │       └── classification-of-work.js # Classification of work section
    │   ├── summary/        # Summary and additional info
    │   │   └── summary.js          # Summary form
    │   └── preview/        # Preview all data
    │       └── preview.js          # Preview display
    └── save-data/          # Storage and data management
        ├── secure-storage.js       # Encrypted storage foundation
        ├── phrase-modal.js         # Passphrase modal for security
        ├── storage-data-manager.js # Data management logic
        ├── storage-ui-manager.js   # Storage UI coordination
        ├── floating-storage-button.js # Storage button component
        ├── COOKIE-POLICY.md        # Cookie security policy
        ├── STORAGE-POLICY.md       # Storage security policy
        ├── COOKIE-POLICY.pdf       # Cookie policy PDF
        └── STORAGE-POLICY.pdf      # Storage policy PDF
```

## Dependencies

- **docxtemplater** (^3.66.7): Document templating and variable replacement
- **pizzip** (^3.2.0): ZIP file handling for DOCX processing

> **Note:** The bundled JS files (`docxtemplater.js`, `pizzip.js`) are generated from npm packages during setup and should not be committed to version control.

## Development

### NPM Scripts

- `npm install` - Install dependencies
- `npm run setup` - Copy required libraries from node_modules to project root
- `npm run clean` - Remove generated library files

### Adding New Components

1. Create a new directory in `src/components/` for reusable components
2. Include `.js`, `.css`, and `README.md` files
3. Use the color system variables for consistent styling
4. Add component references to `index.html`
5. Document the component's API and usage

### Code Organization

- **Reusable components** → `src/components/` (alert, cards, tooltip, dropdown, toggle, button, text-input, address, area-input, work-week-calculator, repeater, table, subnav, demands-level-selector)
- **Application-specific features** → `src/` (save-data, tabs)
- **Shared utilities** → `src/color-system/` (color system, dark mode toggle)

## Browser Support

This application works in all modern browsers that support:

- **ES6 JavaScript** (classes, arrow functions, template literals)
- **CSS Custom Properties** (CSS variables)
- **Web Crypto API** (for AES-256-GCM encryption)
- **localStorage** (for dark mode preference)
- **matchMedia API** (for system preference detection)

**Tested browsers:**

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Accessibility

The application follows web accessibility best practices:

- ✅ **Keyboard navigation** - All interactive elements are keyboard accessible
- ✅ **Screen reader support** - Semantic HTML and ARIA labels where appropriate
- ✅ **Color contrast** - WCAG AA compliant contrast ratios (see `src/color-system/CONTRAST-AUDIT.md`)
- ✅ **Reduced motion** - Respects `prefers-reduced-motion` for animations
- ✅ **Focus indicators** - Clear visual focus states for keyboard navigation

## Acknowledgments

- [docxtemplater](https://docxtemplater.com/) for the excellent templating engine
- [PizZip](https://github.com/Stuk/jszip) for ZIP file processing capabilities
