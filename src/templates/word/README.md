# Word Templates

DOCX document templates for generating customized job analysis reports.

## Overview

This directory contains six DOCX (Microsoft Word) templates that serve as the foundation for document generation. These templates are populated with user data collected through the application to create customized job analysis reports.

## Files

- `template_1.docx` - Template 1 document structure
- `template_2.docx` - Template 2 document structure
- `template_3.docx` - Template 3 document structure
- `template_4.docx` - Template 4 document structure
- `template_5.docx` - Template 5 document structure
- `template_6.docx` - Template 6 document structure

## Purpose

Each Word template:

- Defines the structure and layout of the generated document
- Contains placeholder fields for user data
- Includes formatting, styles, and branding
- Serves as the basis for document generation via docxtemplater

## Document Generation Process

1. **User Selection** - User selects a template from the intro tab
2. **Data Collection** - Application collects user data through various tabs
3. **Template Loading** - Selected Word template is loaded
4. **Data Binding** - User data is bound to template placeholders
5. **Document Generation** - docxtemplater generates the final DOCX file
6. **Download** - User downloads the generated document

## Template Structure

Each template typically includes:

- **Header/Footer** - Branding and document metadata
- **Title Section** - Job title and basic information
- **Demographics Section** - Employee and employer information
- **Job Analysis Section** - Detailed job demands and requirements
- **Physical Demands** - Physical requirements table
- **Cognitive/Sensory** - Mental and sensory requirements
- **Environmental** - Work environment conditions
- **Summary** - Overall job classification and notes

## Placeholder Fields

Templates use docxtemplater syntax for placeholders. Common placeholders include:

- `{jobTitle}` - Job title
- `{employeeName}` - Employee name
- `{companyName}` - Company name
- `{physicalDemands}` - Physical demands data
- `{cognitiveRequirements}` - Cognitive requirements
- And many more based on collected data

## Technology

- **Format** - DOCX (Office Open XML)
- **Generation Library** - docxtemplater
- **Placeholder Syntax** - `{fieldName}` for simple fields, `{#array}...{/array}` for loops

## Related Files

- **PNG Previews** - `../images/` - Card preview thumbnails
- **PDF Previews** - `../pdf/` - Full document previews
- **Document Generation** - `../../main.js` - Contains generation logic
- **Template Selection** - `../../tabs/intro/` - UI for selecting templates

## Maintenance and Updates

### To Update a Template

1. Open the DOCX file in Microsoft Word
2. Make desired changes to layout, formatting, or structure
3. Ensure all placeholder fields use correct docxtemplater syntax
4. Save the file
5. Export a PDF version to `../pdf/` for preview
6. Generate a PNG thumbnail to `../images/` for the selection grid
7. Test the template selection and generation process

### Best Practices

- Keep placeholder names consistent with data field names
- Use clear, descriptive placeholder names
- Test all placeholders before deploying
- Maintain consistent formatting across all templates
- Document any custom placeholder logic
- Keep templates organized and well-commented

## Troubleshooting

If documents don't generate correctly:

1. Verify placeholder syntax is correct
2. Check that all required data fields are being collected
3. Ensure template file is not corrupted
4. Test with a simple template first
5. Check browser console for generation errors
6. Verify docxtemplater library is properly loaded

## Future Enhancements

Potential improvements:

- Add more template variations
- Implement template customization UI
- Add template preview before generation
- Support for template inheritance/composition
- Template versioning system
- User-created custom templates
