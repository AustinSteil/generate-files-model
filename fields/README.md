# Fields Configuration

This folder contains all field configuration and related documentation for the Document Generator application.

## Files in This Folder

### `vars.json` ⭐ **SINGLE SOURCE OF TRUTH**

The main configuration file that defines all document variables. This file controls:

- Which form fields are collected
- Which data gets saved/loaded with "Save Data for Later"
- How form data maps to template variables in Word documents

**This is the only file you need to edit when adding or removing fields.**

### Documentation Files

- **`vars.json.README.md`** - Comprehensive guide to using and configuring `vars.json`
- **`QUICK-START-ADDING-FIELDS.md`** - Quick reference for adding new fields (3-step process)
- **`STORAGE-SYSTEM-IMPROVEMENTS.md`** - Technical documentation about the storage system architecture

## Quick Start

### Adding a New Field

1. **Edit `vars.json`** - Add your new field:

   ```json
   {
     "existingField": "{existingField}",
     "newFieldName": "{newFieldName}"
   }
   ```

2. **Edit `../index.html`** - Add the form element:

   ```html
   <div class="form-group">
       <label for="newFieldName">Label:</label>
       <input type="text" id="newFieldName" name="newFieldName">
   </div>
   ```

3. **Edit your Word template** - Add the placeholder: `{newFieldName}`

That's it! The storage system automatically handles the rest.

## Need Help?

- **Quick guide**: See `QUICK-START-ADDING-FIELDS.md`
- **Detailed docs**: See `vars.json.README.md`
- **Architecture**: See `STORAGE-SYSTEM-IMPROVEMENTS.md`

---

**Note**: All paths in the application have been updated to reference `fields/vars.json` instead of the root-level `vars.json`.
