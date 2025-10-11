# Generate Files Model

A web-based document generation tool that creates Word documents from templates using user-provided data. Built with docxtemplater and PizZip for reliable document processing.

## Features

- 📄 Generate Word documents from predefined templates
- 🎨 Clean, responsive web interface
- 📝 Form-based data input with validation
- 💾 Automatic document download
- 🔧 Configurable template variables via JSON

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

## Configuration

### Template Variables

Edit `vars.json` to customize the template variable mappings:

```json
{
  "documentTitle": "{documentTitle}",
  "authorName": "{authorName}",
  "documentDate": "{documentDate}",
  "documentContent": "{documentContent}"
}
```

### Custom Templates

Replace `template_1.docx` with your own Word template file. Ensure your template uses the same placeholder variables defined in `vars.json`.

## Project Structure

```text
generate-files-model/
├── index.html          # Main application interface
├── main.js             # Core application logic
├── main.css            # Styling and responsive design
├── vars.json           # Template variable configuration
├── template_1.docx     # Default Word template
├── package.json        # Project dependencies and scripts
├── LICENSE             # MIT license
└── README.md           # This file
```

## Dependencies

- **docxtemplater** (^3.66.7): Document templating and variable replacement
- **pizzip** (^3.2.0): ZIP file handling for DOCX processing

> **Note:** The bundled JS files (`docxtemplater.js`, `pizzip.js`) are generated from npm packages during setup and should not be committed to version control.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Austin Steil

## Acknowledgments

- [docxtemplater](https://docxtemplater.com/) for the excellent templating engine
- [PizZip](https://github.com/Stuk/jszip) for ZIP file processing capabilities
