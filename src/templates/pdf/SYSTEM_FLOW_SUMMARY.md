# Complete PDF Generation System Flow - Detailed Summary

## Overview

This document outlines the complete flow from template selection through PDF generation, using Template 1 (Classic Template) as the detailed example.

## About

Author: Austin Steil
Version: 1.0.0
Created October 18, 2025
Updated October 18, 2025

## License & Copyright

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
Live License Page Link: <https://raw.githubusercontent.com/AustinSteil/generate-files-model/refs/heads/main/LICENSE>
Copyright 2025 Austin Steil

---

## 1. TEMPLATE SELECTION PHASE (Intro Tab)

### User Action

User navigates to the **Intro Tab** and selects a template card.

### File: `src/tabs/intro/intro.js`

#### Template Card Configuration (Lines 172-227)

Each template card contains metadata that drives the entire system:

```javascript
{
    title: 'Classic Template',
    content: 'Traditional professional document layout',
    image: 'src/templates/images/template_1.png',
    pdf: 'src/templates/pdf/template_1.pdf',
    value: 'template_1',                          // ← Template identifier
    generator: 'Template1Generator',              // ← PDF generator class name
    preview: 'Template1Preview'                   // ← HTML preview class name
}
```

#### Selection Flow

1. User clicks on "Classic Template" card
2. `Cards` component triggers `onChange` callback (Line 235)
3. `this.selectedTemplate` is set to `'template_1'` (Line 237)
4. Hidden input `#selectedTemplate` is updated with value `'template_1'` (Lines 239-241)
5. Console logs: `'Selected template: template_1'`

#### Data Collection

When user fills in intro form fields:

- Document Title → `data.title`
- Company Name → `data.companyName`
- Company Address → `data.companyStreet`, `data.companyCity`, `data.companyState`, `data.companyZip`
- Author Name → `data.author`
- Author Email → `data.email`
- Document Date → `data.date`

#### Key Method: `getSelectedTemplateClasses()` (Lines 260-276)

```javascript
getSelectedTemplateClasses() {
    // Returns: { generator: 'Template1Generator', preview: 'Template1Preview' }
    // This is the bridge between template selection and file loading
}
```

---

## 2. PREVIEW TAB INITIALIZATION PHASE

### File: `src/tabs/preview/preview.js`

### When User Navigates to Preview Tab

#### Step 1: `updatePreview()` is called (Lines 168-176)

```javascript
updatePreview() {
    // Calls renderPDFPreview() to generate HTML preview
    this.renderPDFPreview();
}
```

#### Step 2: `renderPDFPreview()` Executes (Lines 100-140)

2a. Get Template Classes

```javascript
const templateClasses = this.tabsManager.introTab?.getSelectedTemplateClasses();
// Returns: { generator: 'Template1Generator', preview: 'Template1Preview' }
```

2b. Get Preview Class from Window

```javascript
const PreviewClass = window['Template1Preview'];
// Accesses the Template1Preview class loaded from:
// src/templates/pdf/previews/template_1_preview.js
```

2c. Collect All Form Data

```javascript
const allData = this.collectAllFormData();
// Merges data from all tabs:
// - Intro Tab: title, companyName, author, email, date, etc.
// - Demographics Tab: jobTitle, jobPurpose, etc.
// - Jobs Tab: essentialFunctions, marginalFunctions, workSchedule, etc.
// - Summary Tab: classificationOfWork, summaryText, etc.
```

2d. Generate HTML Preview

```javascript
const previewHTML = Template1Preview.generate(allData);
// Calls static method that returns HTML string
```

2e. Render to DOM

```javascript
previewContainer.innerHTML = previewHTML;
// Displays HTML preview in #pdf-preview-container
```

---

## 3. HTML PREVIEW GENERATION PHASE

### File: `src/templates/pdf/previews/template_1_preview.js`

### Static Method: `Template1Preview.generate(data)` (Lines 21-84)

Returns multi-page HTML structure:

```text
Page 1: Cover Page
├── Title: "Job Analysis Report"
├── Job Title: data.jobTitle
├── Company Info: data.companyName + address
└── Metadata: author, email, date

Page 2: Job Overview
├── Job Title: data.jobTitle
└── Job Purpose: data.jobPurpose

Page 3: Job Functions
├── Essential Functions: data.essentialFunctions
└── Marginal Functions: data.marginalFunctions

Page 4: Work Schedule
├── Work Schedule: data.workSchedule
├── Breaks: data.breaks
└── Other Shift Info: data.otherShiftInfo

Page 5: Job Demands
├── Physical Demands: data.physicalDemands (table)
├── Mobility Demands: data.mobilityDemands (table)
├── Cognitive/Sensory: data.cognitiveSensoryDemands (table)
├── Environmental: data.environmentalDemands (table)
└── Lifting/Pushing/Pulling: data.liftingPushingPulling (table)

Page 6: Summary
├── Classification: data.classificationOfWork
└── Summary Notes: data.summaryText
```

### Helper Methods

- `escape(value)` - XSS protection
- `formatField(label, value)` - Single field formatting
- `formatAddressHTML(data)` - Address formatting
- `formatDemandTable(label, data)` - Table formatting
- `formatClassification(data)` - Classification formatting

---

## 4. PDF GENERATION PHASE

### File: `src/templates/pdf/generators/template_1.js`

### When User Clicks "Generate Document" Button

#### Step 1: `main.js` calls `generateDocument()`

```javascript
// Validates form data
// Calls generatePDFWithTemplate()
```

#### Step 2: `generatePDFWithTemplate()` (in main.js)

```javascript
const templateClasses = this.tabsManager.introTab?.getSelectedTemplateClasses();
// Gets: { generator: 'Template1Generator', preview: 'Template1Preview' }

const GeneratorClass = window['Template1Generator'];
// Accesses Template1Generator class from:
// src/templates/pdf/generators/template_1.js

const generator = new Template1Generator();
const doc = generator.generate(this.formData);
// Returns jsPDF document object
```

#### Step 3: `Template1Generator.generate(data)` (Lines 29-44)

Creates jsPDF document and builds sections:

```javascript
generate(data) {
    const jsPDF = window.jspdf.jsPDF;
    this.doc = new jsPDF();  // A4 size
    this.data = data;
    
    this.addCoverPage();           // Page 1
    this.addJobOverview();         // Page 2
    this.addJobFunctions();        // Page 3
    this.addWorkSchedule();        // Page 4
    this.addJobDemands();          // Page 5
    this.addSummary();             // Page 6
    
    return this.doc;  // Returns jsPDF object
}
```

#### Step 4: PDF Download

```javascript
// main.js calls createDownloadLinkForPDF(pdfBlob)
const blobUrl = URL.createObjectURL(pdfBlob);
// Creates download link
// File: job-analysis-[timestamp].pdf
```

---

## 5. DATA FLOW DIAGRAM

```text
INTRO TAB
├── User selects "Classic Template" card
├── selectedTemplate = 'template_1'
├── Template metadata stored:
│   ├── generator: 'Template1Generator'
│   └── preview: 'Template1Preview'
└── User fills form fields
    └── Data stored in vars.json structure

        ↓

PREVIEW TAB
├── updatePreview() called
├── getSelectedTemplateClasses() returns:
│   ├── generator: 'Template1Generator'
│   └── preview: 'Template1Preview'
├── collectAllFormData() gathers all tab data
├── Template1Preview.generate(data) creates HTML
└── HTML rendered in #pdf-preview-container

        ↓

USER SEES PREVIEW
└── Can review before generating

        ↓

GENERATE BUTTON CLICKED
├── generatePDFWithTemplate() called
├── getSelectedTemplateClasses() returns classes
├── new Template1Generator() instantiated
├── generator.generate(data) creates PDF
├── PDF blob created
└── File downloaded: job-analysis-[timestamp].pdf
```

---

## 6. SINGLE SOURCE OF TRUTH: vars.json

### File: `src/fields/vars.json`

All form fields are defined here:

```json
{
  "title": "{documentTitle}",
  "companyName": "{documentCompanyName}",
  "companyStreet": "{companyStreet}",
  "companyCity": "{companyCity}",
  "companyState": "{companyState}",
  "companyZip": "{companyZip}",
  "author": "{authorName}",
  "email": "{authorEmail}",
  "date": "{documentDate}",
  "selectedTemplate": "{selectedTemplate}",
  "jobTitle": "{jobTitle}",
  "jobPurpose": "{jobPurpose}",
  "essentialFunctions": "{essentialFunctions}",
  "marginalFunctions": "{marginalFunctions}",
  "workSchedule": "{workSchedule}",
  "breaks": "{breaks}",
  "otherShiftInfo": "{otherShiftInfo}",
  "physicalDemands": "{physicalDemands}",
  "mobilityDemands": "{mobilityDemands}",
  "cognitiveSensoryDemands": "{cognitiveSensoryDemands}",
  "environmentalDemands": "{environmentalDemands}",
  "liftingPushingPulling": "{liftingPushingPulling}",
  "classificationOfWork": "{classificationOfWork}",
  "summaryText": "{summaryText}"
}
```

---

## 7. SCRIPT LOADING ORDER (index.html)

```html
<!-- jsPDF Library -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

<!-- PDF Utilities -->
<script src="src/templates/pdf/generators/pdf-utils.js"></script>
<script src="src/templates/pdf/previews/preview-utils.js"></script>

<!-- PDF Generators (make classes available on window) -->
<script src="src/templates/pdf/generators/template_1.js"></script>
<script src="src/templates/pdf/generators/template_2.js"></script>
<!-- ... template_3 through template_6 ... -->

<!-- Preview Generators (make classes available on window) -->
<script src="src/templates/pdf/previews/template_1_preview.js"></script>
<script src="src/templates/pdf/previews/template_2_preview.js"></script>
<!-- ... template_3_preview through template_6_preview ... -->

<!-- Main Application -->
<script src="main.js"></script>
```

---

## 8. KEY INTEGRATION POINTS

1. **Template Selection** → `intro.js` stores `selectedTemplate` and class names
2. **Preview Rendering** → `preview.js` retrieves class names and calls preview generator
3. **PDF Generation** → `main.js` retrieves class names and calls PDF generator
4. **Dynamic Class Loading** → Classes accessed via `window[className]`
5. **Data Collection** → All tabs contribute to single data object
6. **File Paths** (Template 1 Example):
   - Preview: `src/templates/pdf/previews/template_1_preview.js`
   - Generator: `src/templates/pdf/generators/template_1.js`
   - Utilities: `src/templates/pdf/generators/pdf-utils.js`

---

## NEXT STEPS

1. **Refine Preview Tab CSS** - Style `.pdf-preview-container` and `.pdf-page` classes
2. **Build Template 1 Preview** - Implement all helper methods to use real data from vars.json
3. **Build Template 1 Generator** - Implement PDF generation using real data
4. **Test with Sample Data** - Verify preview and PDF generation work correctly
5. **Implement Templates 2-6** - Repeat for remaining templates
