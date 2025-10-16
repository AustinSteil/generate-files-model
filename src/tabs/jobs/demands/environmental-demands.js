/**
 * Environmental Demands Section
 *
 * Handles environmental demands data collection for job analysis.
 * Includes fields for weather exposure, noise levels, hazards, and other environmental factors.
 *
 * @author Austin Steil
 */

class EnvironmentalDemands {
    constructor() {
        this.data = {};
    }

    /**
     * Render the environmental demands section
     * @returns {string} HTML content for environmental demands
     */
    render() {
        return `
            <div class="demands-section environmental-demands">
                <h3>Environmental Demands</h3>
                <p class="section-description">
                    Describe the environmental conditions and exposures associated with this position.
                </p>

                <div class="demand-item">
                    <label>Weather Exposure</label>
                    <select class="form-control" id="environmental-weather">
                        <option value="">Select exposure...</option>
                        <option value="none">None - Climate controlled environment</option>
                        <option value="occasional">Occasional - Brief outdoor exposure</option>
                        <option value="frequent">Frequent - Regular outdoor work</option>
                        <option value="constant">Constant - Primarily outdoor work</option>
                    </select>
                </div>

                <div class="demand-item">
                    <label>Noise Level</label>
                    <select class="form-control" id="environmental-noise">
                        <option value="">Select level...</option>
                        <option value="quiet">Quiet - Library-like environment</option>
                        <option value="moderate">Moderate - Normal office environment</option>
                        <option value="loud">Loud - Machinery, traffic, construction</option>
                        <option value="very-loud">Very Loud - Hearing protection required</option>
                    </select>
                </div>

                <div class="demand-item">
                    <label>Hazard Exposure</label>
                    <select class="form-control" id="environmental-hazards">
                        <option value="">Select exposure...</option>
                        <option value="none">None - Standard office environment</option>
                        <option value="minimal">Minimal - Low risk environment</option>
                        <option value="moderate">Moderate - Some safety precautions required</option>
                        <option value="high">High - Significant safety protocols required</option>
                    </select>
                </div>

                <div class="demand-item">
                    <label>Temperature Extremes</label>
                    <select class="form-control" id="environmental-temperature">
                        <option value="">Select exposure...</option>
                        <option value="none">None - Climate controlled</option>
                        <option value="occasional">Occasional - Brief exposure to extremes</option>
                        <option value="frequent">Frequent - Regular exposure to heat/cold</option>
                        <option value="constant">Constant - Extreme temperatures common</option>
                    </select>
                </div>

                <div class="demand-item">
                    <label>Additional Environmental Factors</label>
                    <textarea class="form-control" id="environmental-additional" rows="4"
                              placeholder="Describe any additional environmental demands (chemicals, dust, fumes, etc.)..."></textarea>
                </div>
            </div>
        `;
    }

    /**
     * Get data from the environmental demands section
     * @returns {Object} Environmental demands data
     */
    getData() {
        return {
            weather: document.getElementById('environmental-weather')?.value || '',
            noise: document.getElementById('environmental-noise')?.value || '',
            hazards: document.getElementById('environmental-hazards')?.value || '',
            temperature: document.getElementById('environmental-temperature')?.value || '',
            additional: document.getElementById('environmental-additional')?.value || ''
        };
    }

    /**
     * Set data for the environmental demands section
     * @param {Object} data - Environmental demands data
     */
    setData(data) {
        if (!data) return;

        if (data.weather) {
            const weatherEl = document.getElementById('environmental-weather');
            if (weatherEl) weatherEl.value = data.weather;
        }
        if (data.noise) {
            const noiseEl = document.getElementById('environmental-noise');
            if (noiseEl) noiseEl.value = data.noise;
        }
        if (data.hazards) {
            const hazardsEl = document.getElementById('environmental-hazards');
            if (hazardsEl) hazardsEl.value = data.hazards;
        }
        if (data.temperature) {
            const temperatureEl = document.getElementById('environmental-temperature');
            if (temperatureEl) temperatureEl.value = data.temperature;
        }
        if (data.additional) {
            const additionalEl = document.getElementById('environmental-additional');
            if (additionalEl) additionalEl.value = data.additional;
        }
    }

    /**
     * Validate environmental demands data
     * @returns {boolean} True if validation passes
     */
    validate() {
        // Placeholder validation - can be enhanced as needed
        return true;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EnvironmentalDemands;
}
