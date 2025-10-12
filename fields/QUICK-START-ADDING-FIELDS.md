# Quick Start: Adding New Document Fields

This guide shows you how to add new fields to your document generator in 3 simple steps.

## The 3-Step Process

### Step 1: Add to `vars.json`

Open `vars.json` and add your new field:

```json
{
  "documentTitle": "{documentTitle}",
  "authorName": "{authorName}",
  "documentDate": "{documentDate}",
  "documentContent": "{documentContent}",
  "yourNewField": "{yourNewField}"  // ← Add here
}
```

**Format:**

- **Key** (left): The HTML element ID (use camelCase)
- **Value** (right): The template variable (wrapped in `{}`)

### Step 2: Add to `index.html`

Add the form field to your HTML:

```html
<div class="form-group">
    <label for="yourNewField">Your Field Label:</label>
    <input type="text" id="yourNewField" name="yourNewField" placeholder="Enter value" required>
</div>
```

**Important:**

- `id` must match the key in `vars.json`
- `name` must match the key in `vars.json`
- Use the same name for both attributes

**Field Types:**

```html
<!-- Text Input -->
<input type="text" id="fieldName" name="fieldName">

<!-- Number Input -->
<input type="number" id="fieldName" name="fieldName">

<!-- Date Input -->
<input type="date" id="fieldName" name="fieldName">

<!-- Email Input -->
<input type="email" id="fieldName" name="fieldName">

<!-- Textarea (multi-line) -->
<textarea id="fieldName" name="fieldName" rows="4"></textarea>

<!-- Select Dropdown -->
<select id="fieldName" name="fieldName">
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
</select>
```

### Step 3: Add to Word Template

1. Open `template_1.docx` in Microsoft Word
2. Add the placeholder where you want the value to appear: `{yourNewField}`
3. Save the template

**Example:**

```text
Project Name: {projectName}
Client: {clientName}
Date: {documentDate}
```

## That's It! 🎉

The storage system will automatically:

- ✅ Collect the new field when saving data
- ✅ Store the new field in encrypted cookies
- ✅ Load the new field when restoring data
- ✅ Include the new field in generated documents

**No code changes needed!**

## Common Field Examples

### Project Information

```json
{
  "projectName": "{projectName}",
  "projectCode": "{projectCode}",
  "projectManager": "{projectManager}",
  "startDate": "{startDate}",
  "endDate": "{endDate}"
}
```

### Client Information

```json
{
  "clientName": "{clientName}",
  "clientEmail": "{clientEmail}",
  "clientPhone": "{clientPhone}",
  "clientAddress": "{clientAddress}"
}
```

### Document Metadata

```json
{
  "documentTitle": "{documentTitle}",
  "documentVersion": "{documentVersion}",
  "documentStatus": "{documentStatus}",
  "authorName": "{authorName}",
  "reviewerName": "{reviewerName}",
  "approvalDate": "{approvalDate}"
}
```

### Financial Information

```json
{
  "invoiceNumber": "{invoiceNumber}",
  "totalAmount": "{totalAmount}",
  "currency": "{currency}",
  "paymentTerms": "{paymentTerms}",
  "dueDate": "{dueDate}"
}
```

## Complete Example: Adding "Project Name"

### 1. Update `vars.json`

```json
{
  "documentTitle": "{documentTitle}",
  "authorName": "{authorName}",
  "documentDate": "{documentDate}",
  "documentContent": "{documentContent}",
  "projectName": "{projectName}"
}
```

### 2. Update `index.html`

Add after the existing fields:

```html
<div class="form-group">
    <label for="projectName">Project Name:</label>
    <input type="text" id="projectName" name="projectName" placeholder="Enter project name" required>
</div>
```

### 3. Update `template_1.docx`

Add to your Word template:

```text
Document Title: {documentTitle}
Project: {projectName}
Author: {authorName}
Date: {documentDate}

{documentContent}
```

### 4. Test It

1. Open the application
2. Fill in all fields including "Project Name"
3. Click "Generate Document" - verify the project name appears
4. Click "Save Data for Later" - save your data
5. Refresh the page
6. Click "Load Saved Data" - verify the project name loads correctly

## Troubleshooting

### Field not saving/loading

**Check:**

- [ ] Field is in `vars.json`
- [ ] HTML element has matching `id` and `name`
- [ ] Field names match exactly (case-sensitive)

### Field not in generated document

**Check:**

- [ ] Template variable is in Word document
- [ ] Template variable matches `vars.json` value
- [ ] Template variable has curly braces: `{fieldName}`

### Console warnings

If you see:

```text
Field "fieldName" defined in vars.json but not found in form
```

**Fix:**

- Add the HTML element with matching `id`, OR
- Remove the field from `vars.json`

## Tips & Best Practices

### Naming Conventions

✅ **Good:**

- `projectName` (camelCase)
- `clientEmail` (descriptive)
- `startDate` (clear purpose)

❌ **Avoid:**

- `project_name` (use camelCase, not snake_case) (use camelCase)
- `field1` (not descriptive)
- `data` (too generic)

### Field Organization

Group related fields together in both `vars.json` and `index.html`:

```json
{
  // Document Info
  "documentTitle": "{documentTitle}",
  "documentDate": "{documentDate}",
  
  // Author Info
  "authorName": "{authorName}",
  "authorEmail": "{authorEmail}",
  
  // Project Info
  "projectName": "{projectName}",
  "projectCode": "{projectCode}"
}
```

### Required vs Optional

Use HTML5 validation:

```html
<!-- Required field -->
<input type="text" id="fieldName" name="fieldName" required>

<!-- Optional field -->
<input type="text" id="fieldName" name="fieldName">
```

### Default Values

Set default values in HTML:

```html
<!-- Default text -->
<input type="text" id="status" name="status" value="Draft">

<!-- Default date (today) -->
<input type="date" id="documentDate" name="documentDate">
```

Then in `main.js`, set today's date:

```javascript
// Already implemented in the application
document.getElementById('documentDate').value = new Date().toISOString().split('T')[0];
```

## Need More Help?

- **Detailed documentation**: See `vars.json.README.md` (in this same folder)
- **Architecture overview**: See `STORAGE-SYSTEM-IMPROVEMENTS.md` (in this same folder)
- **Main README**: See `../README.md`

---

**Last Updated**: 2025-10-12
**Author**: Austin Steil
