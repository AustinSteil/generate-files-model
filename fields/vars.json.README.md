# vars.json Configuration Guide

## Overview

**`vars.json` is the single source of truth** for all document variables in the Document Generator application. This file controls:

1. **Which form fields exist** and should be collected
2. **Which data gets saved** when using "Save Data for Later"
3. **Which data gets loaded** when using "Load Last Saved Data"
4. **How form data maps** to template variables in the Word document

## How It Works

The application automatically uses `vars.json` to:

- **Collect form data**: Only fields defined in `vars.json` are collected
- **Save data**: Only fields in `vars.json` are saved to encrypted cookies
- **Load data**: Only fields in `vars.json` are populated when loading saved data
- **Generate documents**: Field values are mapped to template variables

## File Format

```json
{
  "fieldName1": "{templateVariable1}",
  "fieldName2": "{templateVariable2}",
  "fieldName3": "{templateVariable3}"
}
```

### Key Components

- **Key (left side)**: The HTML form field `id` and `name` attribute
  - Example: `"documentTitle"`
  - Must match the `id` of an input/textarea/select element in `index.html`

- **Value (right side)**: The template variable name used in the Word document
  - Example: `"{documentTitle}"`
  - Must match the placeholder in your `.docx` template file
  - Curly braces `{}` are required

## Adding New Fields

To add a new field to your document generator:

### Step 1: Add to `vars.json`

```json
{
  "documentTitle": "{documentTitle}",
  "authorName": "{authorName}",
  "documentDate": "{documentDate}",
  "documentContent": "{documentContent}",
  "newFieldName": "{newFieldName}"  // ← Add your new field here
}
```

### Step 2: Add to `index.html`

Add the corresponding form field:

```html
<div class="form-group">
    <label for="newFieldName">New Field Label:</label>
    <input type="text" id="newFieldName" name="newFieldName" placeholder="Enter value" required>
</div>
```

### Step 3: Add to Word Template

Add the placeholder `{newFieldName}` to your `template_1.docx` file where you want the value to appear.

**That's it!** The storage system will automatically:

- ✅ Collect the new field data
- ✅ Save it when using "Save Data for Later"
- ✅ Load it when using "Load Last Saved Data"
- ✅ Include it in generated documents

## Removing Fields

To remove a field:

1. Remove the entry from `vars.json`
2. Remove the form field from `index.html`
3. Remove the placeholder from your Word template

The storage system will automatically stop collecting/saving that field.

## Important Notes

### Field Name Consistency

The field name (key in `vars.json`) **must match**:

- The `id` attribute in the HTML form element
- The `name` attribute in the HTML form element

Example:

```json
// vars.json
{
  "documentTitle": "{documentTitle}"
}
```

```html
<!-- index.html -->
<input type="text" id="documentTitle" name="documentTitle">
```

### Template Variable Format

Template variables in the Word document must:

- Be wrapped in curly braces: `{variableName}`
- Match the value (right side) in `vars.json`
- Use the same case (case-sensitive)

### Backward Compatibility

If you load saved data that contains fields no longer in `vars.json`:

- Those fields will be **ignored** (not populated)
- No errors will occur
- Only current `vars.json` fields will be loaded

If you load saved data that's **missing** new fields in `vars.json`:

- New fields will remain empty
- No errors will occur
- Existing fields will populate normally

## Example Configuration

### Current Default Configuration

```json
{
  "documentTitle": "{documentTitle}",
  "authorName": "{authorName}",
  "documentDate": "{documentDate}",
  "documentContent": "{documentContent}"
}
```

### Extended Example

```json
{
  "documentTitle": "{documentTitle}",
  "authorName": "{authorName}",
  "documentDate": "{documentDate}",
  "documentContent": "{documentContent}",
  "projectName": "{projectName}",
  "clientName": "{clientName}",
  "department": "{department}",
  "version": "{version}",
  "status": "{status}",
  "reviewerName": "{reviewerName}",
  "approvalDate": "{approvalDate}",
  "notes": "{notes}"
}
```

## Technical Details

### How the Storage System Uses vars.json

1. **Data Collection** (`main.js` → `collectFormData()`):

   ```javascript
   // Iterates through vars.json keys
   Object.keys(this.varsConfig).forEach(fieldName => {
       const element = document.getElementById(fieldName);
       if (element) {
           this.formData[fieldName] = element.value;
       }
   });
   ```

2. **Data Population** (`storage-data-manager.js` → `populateForm()`):

   ```javascript
   // Uses vars.json to determine which fields to populate
   Object.keys(varsConfig).forEach(fieldName => {
       if (formData.hasOwnProperty(fieldName)) {
           const element = document.getElementById(fieldName);
           if (element) {
               element.value = formData[fieldName];
           }
       }
   });
   ```

3. **Template Mapping** (`main.js` → `prepareTemplateData()`):

   ```javascript
   // Maps form data to template variables using varsConfig
   Object.entries(this.formData).forEach(([key, value]) => {
       const templateKey = this.varsConfig[key].replace(/[{}]/g, '');
       templateData[templateKey] = value;
   });
   ```

### Benefits of This Approach

✅ **Single Source of Truth**: Only need to update `vars.json` to add/remove fields
✅ **Automatic Storage**: New fields are automatically saved/loaded
✅ **No Code Changes**: Storage system adapts to `vars.json` changes
✅ **Type Safety**: Ensures consistency between form, storage, and templates
✅ **Maintainability**: Easy to understand and modify
✅ **Scalability**: Can easily add dozens of fields without code changes

## Troubleshooting

### Field not being saved/loaded

**Check:**

1. Is the field defined in `vars.json`?
2. Does the HTML element have matching `id` and `name` attributes?
3. Does the field name match exactly (case-sensitive)?

### Field not appearing in generated document

**Check:**

1. Is the template variable in the Word document?
2. Does it match the value in `vars.json` (including curly braces)?
3. Is the template variable spelled correctly?

### Console warnings

If you see warnings like:

```text
Field "fieldName" defined in vars.json but not found in form
```

**This means:**

- The field exists in `vars.json`
- But there's no matching HTML element with that `id`
- Add the HTML element or remove the entry from `vars.json`

## Version History

- **v1.0.0** (Current): Initial implementation with dynamic field collection based on `vars.json`

---

**Last Updated**: 2025-10-12
**Author**: Austin Steil
