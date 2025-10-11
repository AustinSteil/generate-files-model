# Generate Files Model

A web-based document generation tool that creates Word documents from templates using user-provided data. Built with docxtemplater and PizZip for reliable document processing.

Live demo: <https://austinsteil.github.io/generate-files-model/>

## Features

- 📄 Generate Word documents from predefined templates
- 🎨 Clean, responsive web interface
- 📝 Form-based data input with validation
- 💾 Automatic document download
- 🔧 Configurable template variables via JSON
- 💾 **Save for Later** - Securely store your form data for future use

### Save for Later Security

The Save for Later feature uses industry-standard security practices to protect your data:

- **🔐 Client-Side Encryption**: All data is encrypted using AES-256-GCM encryption before being stored
- **🔑 Passphrase Protection**: Your data is protected by a user-defined passphrase that never leaves your device
- **🍪 Encrypted Cookies**: Data is stored in encrypted browser cookies, not on external servers
- **⏰ Automatic Expiration**: Saved data automatically expires after a configurable time period
- **🔒 Zero-Knowledge Architecture**: The application cannot access your data without your passphrase
- **🚫 No Server Storage**: All encryption and storage happens locally in your browser

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
   - Your data is encrypted and saved locally as a secure browser cookie

2. **Loading Saved Data:**
   - Click the storage button and select "Load Saved Data"
   - Enter your passphrase to decrypt and restore your form data

3. **Managing Saved Data:**
   - **Update**: Modify your data and click "Update Saved Data"
   - **Clear**: Select "Clear all Saved Data" to permanently delete stored information

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
├── index.html              # Main application interface
├── main.js                 # Core application logic
├── main.css                # Main styling and responsive design
├── vars.json               # Template variable configuration
├── template_1.docx         # Default Word template
├── package.json            # Project dependencies and scripts
├── LICENSE                 # MIT license
├── README.md               # This file
├── docxtemplater.js        # Generated: Document templating library
├── pizzip.js               # Generated: ZIP file handling library
└── src/                    # Source code organization
    ├── components/         # Reusable UI components
    │   ├── tooltip/        # Tooltip component
    │   │   ├── tooltip.js          # Tooltip functionality
    │   │   ├── tooltip.css         # Tooltip styling
    │   │   └── tooltip-example.html # Tooltip demo page
    │   └── dropdown/       # Dropdown component
    │       ├── dropdown.js         # Dropdown functionality
    │       └── dropdown.css        # Dropdown styling
    └── save-data/          # Storage and data management
        ├── secure-storage.js       # Encrypted storage foundation
        ├── phrase-modal.js         # Passphrase modal for security
        ├── storage-data-manager.js # Data management logic
        ├── storage-ui-manager.js   # Storage UI coordination
        └── floating-storage-button.js # Storage button component
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
