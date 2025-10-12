# Tabs Component Implementation Guide

## Overview

The tabs component is the primary UI for collecting document information. All content is dynamically generated via JavaScript - no separate HTML files needed.

## Quick Start

1. **Include CSS files in your HTML:**

   ```html
   <link rel="stylesheet" href="src/color-system/colors.css">
   <link rel="stylesheet" href="src/tabs/tabs.css">
   <link rel="stylesheet" href="src/tabs/tabs-content.css">
   ```

2. **Add the tabs HTML structure:**

   ```html
   <div id="documentTabs" class="tabs-container">
       <div class="tabs-nav" role="tablist">
           <button class="tab-button" role="tab">Intro</button>
           <button class="tab-button" role="tab">Demographics</button>
           <button class="tab-button" role="tab">Jobs</button>
           <button class="tab-button" role="tab">Summary</button>
           <button class="tab-button" role="tab">Preview</button>
       </div>
       <div class="tabs-content">
           <div id="tab-intro" class="tab-panel" role="tabpanel"></div>
           <div id="tab-demographics" class="tab-panel" role="tabpanel"></div>
           <div id="tab-jobs" class="tab-panel" role="tabpanel"></div>
           <div id="tab-summary" class="tab-panel" role="tabpanel"></div>
           <div id="tab-preview" class="tab-panel" role="tabpanel"></div>
       </div>
   </div>
   ```

3. **Load JavaScript files:**

   ```html
   <script src="src/tabs/tabs.js"></script>
   <script src="src/tabs/intro/intro.js"></script>
   <script src="src/tabs/demographics/demographics.js"></script>
   <script src="src/tabs/jobs/jobs.js"></script>
   <script src="src/tabs/summary/summary.js"></script>
   <script src="src/tabs/preview/preview.js"></script>
   <script src="src/tabs/tabs-manager.js"></script>
   ```

4. **Initialize the tabs:**

   ```javascript
   const tabsManager = new TabsManager();
   tabsManager.init();
   ```

## File Structure

```text
src/tabs/
├── tabs.css                    # Main tabs navigation styling
├── tabs-content.css            # Content area styling
├── tabs.js                     # Core tabs component (handles switching)
├── tabs-manager.js             # Coordinates all tabs
├── tabs-example.html           # Working example
├── README.md                   # Documentation
├── IMPLEMENTATION-GUIDE.md     # This file
├── intro/
│   └── intro.js                # Cover page content (dynamically generated)
├── demographics/
│   └── demographics.js         # Demographics content (dynamically generated)
├── jobs/
│   └── jobs.js                 # Employment history (dynamically generated)
├── summary/
│   └── summary.js              # Summary content (dynamically generated)
└── preview/
    └── preview.js              # Preview content (dynamically generated)
```

## How It Works

### 1. Dynamic Content Generation

Each tab JavaScript file:

- Takes a container ID in its constructor
- Dynamically generates HTML content via `render()` method
- Manages its own data via `getData()` and `setData()` methods
- Validates its own data via `validate()` method

Example from `intro.js`:

```javascript
class IntroTab {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.render();  // Generates the HTML
        this.init();    // Sets up event listeners
    }
    
    render() {
        this.container.innerHTML = `
            <div class="intro-content">
                <h2>Cover Page Information</h2>
                <!-- Form fields here -->
            </div>
        `;
    }
}
```

### 2. Tabs Manager Coordination

The `TabsManager` class:

- Initializes all tab instances
- Passes correct container IDs to each tab
- Provides centralized data access
- Handles validation across all tabs
- Listens for tab change events

```javascript
class TabsManager {
    init() {
        this.tabs = new Tabs('documentTabs');
        this.introTab = new IntroTab('tab-intro');
        this.demographicsTab = new DemographicsTab('tab-demographics');
        // ... etc
    }
}
```

### 3. Tab Switching

The `Tabs` class handles:

- Click events on tab buttons
- Keyboard navigation (arrow keys, Home, End)
- ARIA attributes for accessibility
- Active state management
- Custom events when tabs change

## API Reference

### TabsManager

#### Methods

**`init()`**
Initializes all tabs and sets up event listeners.

**`getAllData()`**
Returns an object with data from all tabs:

```javascript
{
    intro: { title: '...', author: '...', ... },
    demographics: { name: '...', age: '...', ... },
    jobs: [{ title: '...', company: '...', ... }],
    summary: { text: '...', keywords: '...' }
}
```

**`setAllData(data)`**
Populates all tabs with data:

```javascript
tabsManager.setAllData({
    intro: { title: 'My Document', author: 'John Doe' },
    demographics: { name: 'John Doe', age: 30 },
    jobs: [{ title: 'Developer', company: 'Tech Co' }],
    summary: { text: 'Summary text' }
});
```

**`validateAll()`**
Validates all tabs and returns validation result:

```javascript
{
    isValid: true/false,
    errors: ['Error message 1', 'Error message 2', ...]
}
```

**`switchToTab(tabName)`**
Programmatically switch to a tab:

```javascript
tabsManager.switchToTab('preview');  // 'intro', 'demographics', 'jobs', 'summary', 'preview'
```

### Individual Tab Classes

Each tab class (IntroTab, DemographicsTab, etc.) has:

**`getData()`** - Returns the tab's current data
**`setData(data)`** - Populates the tab with data
**`validate()`** - Returns true if tab data is valid

### Events

**`tabchange` event**
Fired when user switches tabs:

```javascript
document.getElementById('documentTabs').addEventListener('tabchange', (e) => {
    console.log('Switched to:', e.detail.tabId, 'at index:', e.detail.index);
});
```

## Integration Example

```javascript
// Initialize
const tabsManager = new TabsManager();
tabsManager.init();

// When user clicks "Generate Document"
document.getElementById('generate-document-btn').addEventListener('click', () => {
    // Validate all tabs
    const validation = tabsManager.validateAll();
    
    if (!validation.isValid) {
        alert('Please fix errors:\n' + validation.errors.join('\n'));
        return;
    }
    
    // Get all data
    const formData = tabsManager.getAllData();
    
    // Generate document with the data
    generateDocument(formData);
});

// Load saved data
function loadSavedData(savedData) {
    tabsManager.setAllData(savedData);
}
```

## Customization

### Adding a New Tab

1. Create a new directory: `src/tabs/newtab/`
2. Create `newtab.js` with the same structure as other tabs
3. Add the tab button and panel to your HTML
4. Update `TabsManager` to initialize the new tab
5. Update validation and data methods as needed

### Styling

- Modify `tabs.css` for tab navigation appearance
- Modify `tabs-content.css` for content area styling
- All colors use CSS variables from `src/color-system/colors.css`

## Testing

Open `src/tabs/tabs-example.html` in a browser to see the tabs in action.

Console commands available:

- `getAllFormData()` - Get all form data
- `validateAllTabs()` - Validate all tabs
- `tabsManager.switchToTab('preview')` - Switch to a specific tab
