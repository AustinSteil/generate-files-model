/**
 * Demographics Tab
 *
 * Handles basic demographic information collection.
 * Dynamically generates and manages the demographics tab content.
 *
 * @author Austin Steil
 */

class DemographicsTab {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Demographics tab container with ID "${containerId}" not found`);
            return;
        }
        this.render();
        this.init();
    }

    /**
     * Render the demographics tab content
     */
    render() {
        this.container.innerHTML = `
            <div class="demographics-content">
                <h2>Demographics</h2>
                <p>This section will collect demographic information.</p>

                <div class="form-group">
                    <label for="demo-name">Full Name:</label>
                    <input type="text" id="demo-name" placeholder="Enter full name">
                </div>

                <div class="form-group">
                    <label for="demo-age">Age:</label>
                    <input type="number" id="demo-age" placeholder="Enter age">
                </div>

                <div class="form-group">
                    <label for="demo-location">Location:</label>
                    <input type="text" id="demo-location" placeholder="Enter location">
                </div>

                <!-- Next button container -->
                <div class="form-actions-right">
                    <div id="demographics-next-button-container"></div>
                </div>
            </div>
        `;
    }

    init() {
        console.log('Demographics tab initialized');
        // Add any demographics-specific initialization here
    }

    /**
     * Get data from the demographics tab
     * @returns {Object} Demographics tab data
     */
    getData() {
        return {
            name: document.getElementById('demo-name')?.value || '',
            age: document.getElementById('demo-age')?.value || '',
            location: document.getElementById('demo-location')?.value || ''
        };
    }

    /**
     * Set data in the demographics tab
     * @param {Object} data - Data to populate the form
     */
    setData(data) {
        if (data.name) document.getElementById('demo-name').value = data.name;
        if (data.age) document.getElementById('demo-age').value = data.age;
        if (data.location) document.getElementById('demo-location').value = data.location;
    }

    /**
     * Validate demographics tab data
     * @returns {boolean} True if valid
     */
    validate() {
        const data = this.getData();
        return data.name.trim() !== '';
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DemographicsTab;
}

