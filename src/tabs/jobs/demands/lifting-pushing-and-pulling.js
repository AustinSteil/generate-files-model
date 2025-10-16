/**
 * Lifting, Pushing, and Pulling Demands Section
 *
 * Handles lifting, pushing, and pulling demands data collection for job analysis.
 * Includes fields for weight requirements and frequency of these activities.
 *
 * @author Austin Steil
 */

class LiftingPushingPulling {
    constructor() {
        this.data = {};
    }

    /**
     * Render the lifting, pushing, and pulling demands section
     * @returns {string} HTML content for lifting, pushing, and pulling demands
     */
    render() {
        return `
            <div class="demands-section lifting-pushing-pulling-demands">
                <h3>Lifting, Pushing, and Pulling Demands</h3>
                <p class="section-description">
                    Describe the lifting, pushing, and pulling requirements of this position.
                </p>

                <div class="demand-item">
                    <label>Maximum Weight Lifted</label>
                    <select class="form-control" id="lifting-max-weight">
                        <option value="">Select weight...</option>
                        <option value="sedentary">Sedentary - Up to 10 lbs occasionally</option>
                        <option value="light">Light - Up to 20 lbs occasionally, 10 lbs frequently</option>
                        <option value="medium">Medium - Up to 50 lbs occasionally, 25 lbs frequently</option>
                        <option value="heavy">Heavy - Up to 100 lbs occasionally, 50 lbs frequently</option>
                        <option value="very-heavy">Very Heavy - Over 100 lbs occasionally, over 50 lbs frequently</option>
                    </select>
                </div>

                <div class="demand-item">
                    <label>Lifting Frequency</label>
                    <select class="form-control" id="lifting-frequency">
                        <option value="">Select frequency...</option>
                        <option value="never">Never</option>
                        <option value="occasionally">Occasionally (0-33%)</option>
                        <option value="frequently">Frequently (34-66%)</option>
                        <option value="constantly">Constantly (67-100%)</option>
                    </select>
                </div>

                <div class="demand-item">
                    <label>Pushing/Pulling Requirements</label>
                    <select class="form-control" id="lifting-pushing-pulling">
                        <option value="">Select requirement...</option>
                        <option value="none">None - No pushing/pulling required</option>
                        <option value="light">Light - Carts, doors, light equipment</option>
                        <option value="moderate">Moderate - Heavy carts, equipment, materials</option>
                        <option value="heavy">Heavy - Industrial equipment, heavy loads</option>
                    </select>
                </div>

                <div class="demand-item">
                    <label>Carrying Requirements</label>
                    <select class="form-control" id="lifting-carrying">
                        <option value="">Select requirement...</option>
                        <option value="never">Never</option>
                        <option value="occasionally">Occasionally - Short distances, light items</option>
                        <option value="frequently">Frequently - Regular carrying of materials</option>
                        <option value="constantly">Constantly - Continuous carrying throughout shift</option>
                    </select>
                </div>

                <div class="demand-item">
                    <label>Additional Lifting/Pushing/Pulling Details</label>
                    <textarea class="form-control" id="lifting-additional" rows="4"
                              placeholder="Describe specific items lifted, distances carried, or other relevant details..."></textarea>
                </div>
            </div>
        `;
    }

    /**
     * Get data from the lifting, pushing, and pulling demands section
     * @returns {Object} Lifting, pushing, and pulling demands data
     */
    getData() {
        return {
            maxWeight: document.getElementById('lifting-max-weight')?.value || '',
            frequency: document.getElementById('lifting-frequency')?.value || '',
            pushingPulling: document.getElementById('lifting-pushing-pulling')?.value || '',
            carrying: document.getElementById('lifting-carrying')?.value || '',
            additional: document.getElementById('lifting-additional')?.value || ''
        };
    }

    /**
     * Set data for the lifting, pushing, and pulling demands section
     * @param {Object} data - Lifting, pushing, and pulling demands data
     */
    setData(data) {
        if (!data) return;

        if (data.maxWeight) {
            const maxWeightEl = document.getElementById('lifting-max-weight');
            if (maxWeightEl) maxWeightEl.value = data.maxWeight;
        }
        if (data.frequency) {
            const frequencyEl = document.getElementById('lifting-frequency');
            if (frequencyEl) frequencyEl.value = data.frequency;
        }
        if (data.pushingPulling) {
            const pushingPullingEl = document.getElementById('lifting-pushing-pulling');
            if (pushingPullingEl) pushingPullingEl.value = data.pushingPulling;
        }
        if (data.carrying) {
            const carryingEl = document.getElementById('lifting-carrying');
            if (carryingEl) carryingEl.value = data.carrying;
        }
        if (data.additional) {
            const additionalEl = document.getElementById('lifting-additional');
            if (additionalEl) additionalEl.value = data.additional;
        }
    }

    /**
     * Validate lifting, pushing, and pulling demands data
     * @returns {boolean} True if validation passes
     */
    validate() {
        // Placeholder validation - can be enhanced as needed
        return true;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LiftingPushingPulling;
}
