/**
 * Intro Tab - Cover Page Content
 *
 * Handles the cover page information collection.
 * Dynamically generates and manages the intro tab content.
 *
 * @author Austin Steil
 */

class IntroTab {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Intro tab container with ID "${containerId}" not found`);
            return;
        }
        this.render();
        this.init();
    }

    /**
     * Render the intro tab content
     */
    render() {
        this.container.innerHTML = `
            <div class="intro-content">
                <h2>Cover Page Information</h2>
                <p>This section will collect information for the document cover page.</p>

                <div class="form-group">
                    <label for="intro-title">Document Title:</label>
                    <input type="text" id="intro-title" placeholder="Enter document title">
                </div>

                <div class="form-group">
                    <label for="intro-subtitle">Subtitle:</label>
                    <input type="text" id="intro-subtitle" placeholder="Enter subtitle (optional)">
                </div>

                <div class="form-group">
                    <label for="intro-author">Author:</label>
                    <input type="text" id="intro-author" placeholder="Enter author name">
                </div>

                <div class="form-group">
                    <label for="intro-date">Date:</label>
                    <input type="date" id="intro-date">
                </div>
            </div>
        `;
    }

    init() {
        console.log('Intro tab initialized');
        // Add any intro-specific initialization here
    }

    /**
     * Get data from the intro tab
     * @returns {Object} Intro tab data
     */
    getData() {
        return {
            title: document.getElementById('intro-title')?.value || '',
            subtitle: document.getElementById('intro-subtitle')?.value || '',
            author: document.getElementById('intro-author')?.value || '',
            date: document.getElementById('intro-date')?.value || ''
        };
    }

    /**
     * Set data in the intro tab
     * @param {Object} data - Data to populate the form
     */
    setData(data) {
        if (data.title) document.getElementById('intro-title').value = data.title;
        if (data.subtitle) document.getElementById('intro-subtitle').value = data.subtitle;
        if (data.author) document.getElementById('intro-author').value = data.author;
        if (data.date) document.getElementById('intro-date').value = data.date;
    }

    /**
     * Validate intro tab data
     * @returns {boolean} True if valid
     */
    validate() {
        const data = this.getData();
        return data.title.trim() !== '' && data.author.trim() !== '';
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IntroTab;
}

