/**
 * Mobility Demands Section
 *
 * Handles mobility demands data collection for job analysis.
 * Includes fields for climbing, balancing, kneeling, and other mobility activities.
 *
 * @author Austin Steil
 */

class MobilityDemands {
    constructor() {
        this.data = {};
    }

    /**
     * Render the mobility demands section
     * @returns {string} HTML content for mobility demands
     */
    render() {
        return `
            <div class="demands-section mobility-demands">
                <h3>Mobility Demands</h3>
                <p class="section-description">
                    Describe the mobility requirements of this position, including frequency of various movements.
                </p>

                <div class="demand-item">
                    <label>Climbing (stairs, ladders, etc.)</label>
                    <select class="form-control" id="mobility-climbing">
                        <option value="">Select frequency...</option>
                        <option value="never">Never</option>
                        <option value="occasionally">Occasionally (0-33%)</option>
                        <option value="frequently">Frequently (34-66%)</option>
                        <option value="constantly">Constantly (67-100%)</option>
                    </select>
                </div>

                <div class="demand-item">
                    <label>Balancing</label>
                    <select class="form-control" id="mobility-balancing">
                        <option value="">Select frequency...</option>
                        <option value="never">Never</option>
                        <option value="occasionally">Occasionally (0-33%)</option>
                        <option value="frequently">Frequently (34-66%)</option>
                        <option value="constantly">Constantly (67-100%)</option>
                    </select>
                </div>

                <div class="demand-item">
                    <label>Kneeling/Crouching</label>
                    <select class="form-control" id="mobility-kneeling">
                        <option value="">Select frequency...</option>
                        <option value="never">Never</option>
                        <option value="occasionally">Occasionally (0-33%)</option>
                        <option value="frequently">Frequently (34-66%)</option>
                        <option value="constantly">Constantly (67-100%)</option>
                    </select>
                </div>

                <div class="demand-item">
                    <label>Reaching/Handling</label>
                    <select class="form-control" id="mobility-reaching">
                        <option value="">Select frequency...</option>
                        <option value="never">Never</option>
                        <option value="occasionally">Occasionally (0-33%)</option>
                        <option value="frequently">Frequently (34-66%)</option>
                        <option value="constantly">Constantly (67-100%)</option>
                    </select>
                </div>

                <div class="demand-item">
                    <label>Additional Mobility Requirements</label>
                    <textarea class="form-control" id="mobility-additional" rows="4"
                              placeholder="Describe any additional mobility demands..."></textarea>
                </div>
            </div>
        `;
    }

    /**
     * Get data from the mobility demands section
     * @returns {Object} Mobility demands data
     */
    getData() {
        return {
            climbing: document.getElementById('mobility-climbing')?.value || '',
            balancing: document.getElementById('mobility-balancing')?.value || '',
            kneeling: document.getElementById('mobility-kneeling')?.value || '',
            reaching: document.getElementById('mobility-reaching')?.value || '',
            additional: document.getElementById('mobility-additional')?.value || ''
        };
    }

    /**
     * Set data for the mobility demands section
     * @param {Object} data - Mobility demands data
     */
    setData(data) {
        if (!data) return;

        if (data.climbing) {
            const climbingEl = document.getElementById('mobility-climbing');
            if (climbingEl) climbingEl.value = data.climbing;
        }
        if (data.balancing) {
            const balancingEl = document.getElementById('mobility-balancing');
            if (balancingEl) balancingEl.value = data.balancing;
        }
        if (data.kneeling) {
            const kneelingEl = document.getElementById('mobility-kneeling');
            if (kneelingEl) kneelingEl.value = data.kneeling;
        }
        if (data.reaching) {
            const reachingEl = document.getElementById('mobility-reaching');
            if (reachingEl) reachingEl.value = data.reaching;
        }
        if (data.additional) {
            const additionalEl = document.getElementById('mobility-additional');
            if (additionalEl) additionalEl.value = data.additional;
        }
    }

    /**
     * Validate mobility demands data
     * @returns {boolean} True if validation passes
     */
    validate() {
        // Placeholder validation - can be enhanced as needed
        return true;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MobilityDemands;
}
