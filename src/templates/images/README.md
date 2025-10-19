# Template Images

Card preview images for document templates.

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

This directory contains PNG preview images for each of the six available document templates. These images are displayed in the template selection interface to help users visualize and choose which template they want to use for document generation.

## Files

- `template_1.png` - Preview image for Template 1
- `template_2.png` - Preview image for Template 2
- `template_3.png` - Preview image for Template 3
- `template_4.png` - Preview image for Template 4
- `template_5.png` - Preview image for Template 5
- `template_6.png` - Preview image for Template 6

## Subdirectories

- `archived/` - Contains previous versions of template images that are no longer in use

## Usage

These images are referenced by the template selection component to display visual previews of each template option. When a user selects a template, the corresponding Word template from `src/templates/word/` is used for document generation.

## Image Specifications

- Format: PNG
- Purpose: Card preview display
- Used in: Template selection UI component
- Dimensions: Should be consistent across all templates for uniform grid display

## Related Files

- Word templates: `src/templates/word/`
- PDF templates: `src/templates/pdf/`
- Template selection component: `src/tabs/intro/`
