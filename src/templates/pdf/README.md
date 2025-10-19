# PDF Templates

PDF preview and reference templates for document generation.

## About

Author: Austin Steil  
Version: 1.0.0
Created October 18, 2025
Updated October 18, 2025

## License & Copyright

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
Live License Page Link: <https://raw.githubusercontent.com/AustinSteil/generate-files-model/refs/heads/main/LICENSE>
Copyright 2025 Austin Steil

## Overview

This directory contains PDF versions of the six available document templates. These PDFs serve as:

- Preview/reference documents showing the final output format
- Expandable previews in the template selection interface
- Reference documents for understanding template structure and layout

## Files

- `template_1.pdf` - PDF version of Template 1
- `template_2.pdf` - PDF version of Template 2
- `template_3.pdf` - PDF version of Template 3
- `template_4.pdf` - PDF version of Template 4
- `template_5.pdf` - PDF version of Template 5
- `template_6.pdf` - PDF version of Template 6

## Purpose

Each PDF template:

- Provides a preview of how the final generated document will look
- Can be expanded/viewed in the template selection UI
- Serves as a reference for the corresponding PDF generator
- Shows the layout, formatting, and structure of the generated output

## Usage

These PDFs are referenced by the template selection component to provide users with:

1. **Visual Preview** - Users can see what the final document will look like
2. **Expandable View** - Users can click to expand and view the full PDF preview
3. **Reference** - Users can understand the template structure before selecting it

## Relationship to Other Templates

- **PNG Images** (`../images/`) - Card preview thumbnails for the selection grid
- **PDF Generators** (`./generators/`) - JavaScript classes that generate PDF documents
- **PDF Previews** (`./previews/`) - JavaScript classes that generate HTML previews
- **Template Selection** (`../../tabs/intro/`) - The UI component that displays these templates

## Document Generation Flow

1. User selects a template from the intro tab
2. Template selection component displays PNG preview and PDF preview
3. User confirms selection
4. Corresponding PDF generator class is instantiated
5. Generator creates PDF document populated with user data
6. PDF is downloaded to user's device

## Maintenance

When updating templates:

1. Update the PDF generator class in `./generators/`
2. Update the PDF preview class in `./previews/`
3. Update the PNG preview in `../images/`
4. Test the template selection UI to verify all previews display correctly
5. Test PDF generation to ensure output matches preview
