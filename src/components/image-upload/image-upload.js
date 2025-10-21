/**
 * ImageUpload Component - Reusable image upload field system
 * 
 * A flexible image upload component that supports:
 * - Multiple image uploads at once
 * - Image preview with thumbnails
 * - File validation (type and size)
 * - Remove individual images
 * - Integration with storage system
 * - Consistent styling with color system
 * - Required/optional field support
 * 
 * @author Austin Steil
 * @version 1.0.0
 * @license MIT <https://raw.githubusercontent.com/AustinSteil/generate-files-model/refs/heads/main/LICENSE>
 * @copyright 2025 Austin Steil
 * @created October 18, 2025
 * @updated October 18, 2025
 */
class ImageUpload {
    constructor(options = {}) {
        this.options = {
            containerId: options.containerId || null,
            id: options.id || this.generateId(),
            name: options.name || options.id || this.generateId(),
            label: options.label || 'Upload Images',
            required: options.required || false,
            maxFiles: options.maxFiles || 10,
            maxFileSize: options.maxFileSize || 5 * 1024 * 1024, // 5MB default
            acceptedFormats: options.acceptedFormats || ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'],
            onChange: options.onChange || null,
            helpText: options.helpText || null,
            ...options
        };

        this.container = null;
        this.fileInput = null;
        this.previewContainer = null;
        this.errorElement = null;
        this.images = []; // Array of {file, preview}
        this.isValid = true;

        this.init();
    }

    /**
     * Generate a unique ID for the component
     */
    generateId() {
        return 'image-upload-' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Initialize the image upload component
     */
    init() {
        if (this.options.containerId) {
            this.container = document.getElementById(this.options.containerId);
            if (!this.container) {
                console.error(`ImageUpload: Container with ID "${this.options.containerId}" not found`);
                return;
            }
            this.render();
        }
    }

    /**
     * Render the image upload component
     */
    render() {
        if (!this.container) return;

        const formGroupClass = `form-group image-upload-component`;

        this.container.innerHTML = `
            <div class="${formGroupClass}">
                <label>${this.options.label}${this.options.required ? ' *' : ''}</label>
                <div class="image-upload-input-wrapper">
                    <input
                        type="file"
                        id="${this.options.id}"
                        name="${this.options.name}"
                        multiple
                        accept="${this.options.acceptedFormats.join(',')}"
                        class="image-upload-input"
                        style="display: none;"
                    />
                    <label for="${this.options.id}" class="image-upload-button">
                        <span class="upload-icon">📁</span>
                        <span class="upload-text">Click to upload or drag and drop</span>
                        <span class="upload-hint">JPEG, JPG, PNG, SVG up to ${this.formatFileSize(this.options.maxFileSize)}</span>
                    </label>
                </div>
                <div class="image-upload-preview-container"></div>
                ${this.options.helpText ? `<div class="image-upload-help-text">${this.options.helpText}</div>` : ''}
                <div class="image-upload-error" style="display: none;"></div>
            </div>
        `;

        this.fileInput = this.container.querySelector(`#${this.options.id}`);
        this.previewContainer = this.container.querySelector('.image-upload-preview-container');
        this.errorElement = this.container.querySelector('.image-upload-error');
        const uploadButton = this.container.querySelector('.image-upload-button');

        this.attachEventListeners(uploadButton);
    }

    /**
     * Attach event listeners
     */
    attachEventListeners(uploadButton) {
        if (!this.fileInput) return;

        // File input change
        this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e.target.files));

        // Drag and drop
        uploadButton.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadButton.classList.add('drag-over');
        });

        uploadButton.addEventListener('dragleave', () => {
            uploadButton.classList.remove('drag-over');
        });

        uploadButton.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadButton.classList.remove('drag-over');
            this.handleFileSelect(e.dataTransfer.files);
        });
    }

    /**
     * Handle file selection
     */
    handleFileSelect(files) {
        this.showError('');
        const newFiles = Array.from(files);

        // Check total file count
        if (this.images.length + newFiles.length > this.options.maxFiles) {
            this.showError(`Maximum ${this.options.maxFiles} images allowed`);
            return;
        }

        // Validate and add files
        for (const file of newFiles) {
            if (!this.validateFile(file)) {
                continue;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                this.images.push({
                    file: file,
                    preview: e.target.result
                });
                this.renderPreviews();
                if (this.options.onChange) {
                    this.options.onChange(this.images, this);
                }
            };
            reader.readAsDataURL(file);
        }
    }

    /**
     * Validate a single file
     */
    validateFile(file) {
        if (!this.options.acceptedFormats.includes(file.type)) {
            this.showError(`Invalid file type: ${file.name}. Accepted: JPEG, JPG, PNG, SVG`);
            return false;
        }

        if (file.size > this.options.maxFileSize) {
            this.showError(`File too large: ${file.name}. Max size: ${this.formatFileSize(this.options.maxFileSize)}`);
            return false;
        }

        return true;
    }

    /**
     * Render image previews
     */
    renderPreviews() {
        if (!this.previewContainer) return;

        if (this.images.length === 0) {
            this.previewContainer.innerHTML = '';
            return;
        }

        this.previewContainer.innerHTML = this.images.map((img, index) => `
            <div class="image-preview-item">
                <img src="${img.preview}" alt="Preview ${index + 1}" />
                <button type="button" class="image-remove-btn" data-index="${index}" title="Remove image">
                    ✕
                </button>
            </div>
        `).join('');

        // Attach remove button listeners
        this.previewContainer.querySelectorAll('.image-remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const index = parseInt(btn.dataset.index);
                this.removeImage(index);
            });
        });
    }

    /**
     * Remove an image by index
     */
    removeImage(index) {
        this.images.splice(index, 1);
        this.renderPreviews();
        if (this.options.onChange) {
            this.options.onChange(this.images, this);
        }
    }

    /**
     * Format file size for display
     */
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    /**
     * Show or hide error message
     */
    showError(message) {
        if (!this.errorElement) return;

        if (message) {
            this.errorElement.textContent = message;
            this.errorElement.style.display = 'block';
        } else {
            this.errorElement.style.display = 'none';
        }
    }

    /**
     * Get the uploaded images
     */
    getImages() {
        return this.images;
    }

    /**
     * Get image data for storage (base64 encoded)
     * Note: Images are stored as base64 data URLs for use in PDF generation.
     * This may result in large data sizes if many images are uploaded.
     */
    getData() {
        return {
            [this.options.name]: this.images.map(img => ({
                name: img.file.name,
                size: img.file.size,
                type: img.file.type,
                preview: img.preview
            }))
        };
    }

    /**
     * Set image data from storage
     */
    setData(data) {
        if (data && data[this.options.name] && Array.isArray(data[this.options.name])) {
            this.images = data[this.options.name].map(imgData => ({
                file: null, // File object not available from storage
                preview: imgData.preview
            }));
            this.renderPreviews();
        }
    }

    /**
     * Clear all images
     */
    clear() {
        this.images = [];
        this.renderPreviews();
        if (this.fileInput) {
            this.fileInput.value = '';
        }
    }

    /**
     * Validate the component
     */
    validate() {
        if (this.options.required && this.images.length === 0) {
            this.showError(`${this.options.label} is required`);
            this.isValid = false;
            return false;
        }
        this.isValid = true;
        return true;
    }

    /**
     * Destroy the component
     */
    destroy() {
        if (this.container) {
            this.container.innerHTML = '';
        }
        this.fileInput = null;
        this.previewContainer = null;
        this.errorElement = null;
        this.images = [];
        this.container = null;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ImageUpload;
}

