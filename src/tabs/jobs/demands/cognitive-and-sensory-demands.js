/**
 * Cognitive and Sensory Demands Section
 *
 * Handles cognitive and sensory demands data collection for job analysis.
 * Includes fields for mental concentration, communication, vision, and hearing requirements.
 *
 * @author Austin Steil
 */

class CognitiveSensoryDemands {
    constructor() {
        this.data = {};
    }

    /**
     * Render the cognitive and sensory demands section
     * @returns {string} HTML content for cognitive and sensory demands
     */
    render() {
        return `
            <div class="demands-section cognitive-sensory-demands">
                <h3>Cognitive and Sensory Demands</h3>
                <p class="section-description">
                    Describe the cognitive and sensory requirements of this position.
                </p>

                <div class="demand-item">
                    <label>Mental Concentration/Focus</label>
                    <select class="form-control" id="cognitive-concentration">
                        <option value="">Select level...</option>
                        <option value="low">Low - Simple, repetitive tasks</option>
                        <option value="moderate">Moderate - Some variety and decision-making</option>
                        <option value="high">High - Complex problem-solving required</option>
                        <option value="very-high">Very High - Critical decisions with significant impact</option>
                    </select>
                </div>

                <div class="demand-item">
                    <label>Communication Requirements</label>
                    <select class="form-control" id="cognitive-communication">
                        <option value="">Select level...</option>
                        <option value="minimal">Minimal - Little interaction required</option>
                        <option value="moderate">Moderate - Regular interaction with team</option>
                        <option value="extensive">Extensive - Frequent client/public interaction</option>
                        <option value="critical">Critical - Presentations, negotiations, leadership</option>
                    </select>
                </div>

                <div class="demand-item">
                    <label>Vision Requirements</label>
                    <select class="form-control" id="cognitive-vision">
                        <option value="">Select requirement...</option>
                        <option value="not-required">Not Required</option>
                        <option value="general">General - Normal vision adequate</option>
                        <option value="close">Close Vision - Reading, computer work</option>
                        <option value="distance">Distance Vision - Driving, monitoring</option>
                        <option value="color">Color Vision - Distinguishing colors critical</option>
                        <option value="depth">Depth Perception - Spatial awareness critical</option>
                    </select>
                </div>

                <div class="demand-item">
                    <label>Hearing Requirements</label>
                    <select class="form-control" id="cognitive-hearing">
                        <option value="">Select requirement...</option>
                        <option value="not-required">Not Required</option>
                        <option value="general">General - Normal hearing adequate</option>
                        <option value="conversation">Conversation - Phone/in-person communication</option>
                        <option value="critical">Critical - Safety alerts, alarms, equipment sounds</option>
                    </select>
                </div>

                <div class="demand-item">
                    <label>Additional Cognitive/Sensory Requirements</label>
                    <textarea class="form-control" id="cognitive-additional" rows="4"
                              placeholder="Describe any additional cognitive or sensory demands..."></textarea>
                </div>
            </div>
        `;
    }

    /**
     * Get data from the cognitive and sensory demands section
     * @returns {Object} Cognitive and sensory demands data
     */
    getData() {
        return {
            concentration: document.getElementById('cognitive-concentration')?.value || '',
            communication: document.getElementById('cognitive-communication')?.value || '',
            vision: document.getElementById('cognitive-vision')?.value || '',
            hearing: document.getElementById('cognitive-hearing')?.value || '',
            additional: document.getElementById('cognitive-additional')?.value || ''
        };
    }

    /**
     * Set data for the cognitive and sensory demands section
     * @param {Object} data - Cognitive and sensory demands data
     */
    setData(data) {
        if (!data) return;

        if (data.concentration) {
            const concentrationEl = document.getElementById('cognitive-concentration');
            if (concentrationEl) concentrationEl.value = data.concentration;
        }
        if (data.communication) {
            const communicationEl = document.getElementById('cognitive-communication');
            if (communicationEl) communicationEl.value = data.communication;
        }
        if (data.vision) {
            const visionEl = document.getElementById('cognitive-vision');
            if (visionEl) visionEl.value = data.vision;
        }
        if (data.hearing) {
            const hearingEl = document.getElementById('cognitive-hearing');
            if (hearingEl) hearingEl.value = data.hearing;
        }
        if (data.additional) {
            const additionalEl = document.getElementById('cognitive-additional');
            if (additionalEl) additionalEl.value = data.additional;
        }
    }

    /**
     * Validate cognitive and sensory demands data
     * @returns {boolean} True if validation passes
     */
    validate() {
        // Placeholder validation - can be enhanced as needed
        return true;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CognitiveSensoryDemands;
}
