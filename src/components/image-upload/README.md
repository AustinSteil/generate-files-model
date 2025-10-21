# ImageUpload Component

A reusable image upload component that supports multiple image uploads with preview thumbnails, drag-and-drop functionality, and file validation.

## About

Author: Austin Steil
Version: 1.0.0
Created October 18, 2025
Updated October 18, 2025

## License & Copyright

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
Live License Page Link: <https://raw.githubusercontent.com/AustinSteil/generate-files-model/refs/heads/main/LICENSE>
Copyright 2025 Austin Steil

## Features

- **Multiple Image Upload**: Upload multiple images at once
- **Drag and Drop**: Drag files directly onto the upload area
- **Image Preview**: Thumbnail previews of uploaded images
- **File Validation**: Validates file type and size
- **Remove Images**: Remove individual images from the preview
- **Storage Integration**: Seamless integration with the storage system
- **Dark Mode Support**: Full light and dark mode compatibility
- **Responsive Design**: Works on all screen sizes

## Usage

### Basic Implementation

```javascript
const imageUpload = new ImageUpload({
    containerId: 'image-upload-container',
    id: 'job-images',
    name: 'jobImages',
    label: 'Upload Job Images',
    required: false,
    maxFiles: 10,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    acceptedFormats: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    helpText: 'Upload images related to the job (optional)',
    onChange: (images, component) => {
        console.log('Images updated:', images);
    }
});
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `containerId` | string | null | ID of the container element |
| `id` | string | auto-generated | Unique ID for the component |
| `name` | string | id value | Name for form data |
| `label` | string | 'Upload Images' | Label text |
| `required` | boolean | false | Whether images are required |
| `maxFiles` | number | 10 | Maximum number of files allowed |
| `maxFileSize` | number | 5MB | Maximum file size in bytes |
| `acceptedFormats` | array | ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] | Accepted MIME types |
| `onChange` | function | null | Callback when images change |
| `helpText` | string | null | Help text displayed below upload area |

### Methods

#### `getImages()`

Returns array of uploaded images with file and preview data.

```javascript
const images = imageUpload.getImages();
```

#### `getData()`

Returns data formatted for storage system.

```javascript
const data = imageUpload.getData();
// Returns: { jobImages: [{name, size, type, preview}, ...] }
```

#### `setData(data)`

Loads image data from storage system.

```javascript
imageUpload.setData({
    jobImages: [
        { name: 'image1.jpg', size: 1024, type: 'image/jpeg', preview: 'data:image/jpeg;...' }
    ]
});
```

#### `clear()`

Removes all uploaded images.

```javascript
imageUpload.clear();
```

#### `validate()`

Validates the component (checks if required images are present).

```javascript
const isValid = imageUpload.validate();
```

#### `destroy()`

Destroys the component and cleans up resources.

```javascript
imageUpload.destroy();
```

## HTML Structure

The component generates the following structure:

```html
<div class="form-group image-upload-component">
    <label>Upload Images *</label>
    <div class="image-upload-input-wrapper">
        <input type="file" multiple accept="image/*" style="display: none;" />
        <label class="image-upload-button">
            <span class="upload-icon">📁</span>
            <span class="upload-text">Click to upload or drag and drop</span>
            <span class="upload-hint">PNG, JPG, GIF, WebP up to 5 MB</span>
        </label>
    </div>
    <div class="image-upload-preview-container">
        <!-- Image previews rendered here -->
    </div>
    <div class="image-upload-help-text">Help text here</div>
    <div class="image-upload-error" style="display: none;"></div>
</div>
```

## Styling

The component uses CSS custom properties from the color system for consistent theming:

- `--color-primary`: Primary accent color
- `--color-text-primary`: Primary text color
- `--color-text-secondary`: Secondary text color
- `--color-text-tertiary`: Tertiary text color
- `--color-border-medium`: Medium border color
- `--color-error`: Error color
- `--color-bg-primary`: Primary background color
- `--color-gray-100`, `--color-gray-800`: Gray shades

## Integration with Storage System

The component integrates seamlessly with the storage system:

```javascript
// Get data for storage
const data = imageUpload.getData();
// Returns: { jobImages: [{name, size, type, preview}, ...] }

// Load data from storage
imageUpload.setData(storedData);
// Restores images from stored data
```

### Storage Behavior

Images are stored as base64-encoded data URLs in the storage system for use in PDF generation. This allows:

- ✅ Images are included in the single source of truth (vars.json)
- ✅ Images are available for PDF generation
- ✅ Images are restored when loading saved data
- ⚠️ Large data sizes if many images are uploaded (localStorage limit: 5-10MB)
- ℹ️ Users receive a warning during save that images are included in storage

### Note on Storage Size

If users upload many large images, the total data size may approach or exceed localStorage limits. A warning is displayed during the save process to inform users about this limitation.

## Events

### onChange Callback

Triggered whenever images are added or removed:

```javascript
onChange: (images, component) => {
    console.log('Current images:', images);
    // images is an array of {file, preview} objects
}
```

## Accessibility

- Proper label associations with `for` attribute
- Keyboard accessible file input
- Clear error messages
- Semantic HTML structure
- ARIA-friendly error handling

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- Images are stored as base64-encoded data URLs in the preview property
- File objects are not persisted in storage (only preview data)
- Maximum file size and count are validated before processing
- Drag-and-drop works on the upload button area
