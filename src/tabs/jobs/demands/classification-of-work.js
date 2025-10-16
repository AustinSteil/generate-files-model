/**
 * Classification of Work Section
 *
 * Handles classification of work data collection for job analysis.
 * Includes DOT classification and overall physical demand level.
 *
 * @author Austin Steil
 */

class ClassificationOfWork {
    constructor() {
        this.data = {};
    }

    /**
     * Render the classification of work section
     * @returns {string} HTML content for classification of work
     */
    render() {
        return `
            <div class="demands-section classification-demands">
                <h3>Classification of Work</h3>
                <p class="section-description">
                    Classify the overall physical demand level and DOT classification for this position.
                </p>

                <div class="demand-item">
                    <label>Physical Demand Level (DOT)</label>
                    <select class="form-control" id="classification-physical-level">
                        <option value="">Select level...</option>
                        <option value="sedentary">Sedentary - Sitting most of the time, minimal lifting (up to 10 lbs)</option>
                        <option value="light">Light - Walking/standing frequently, lifting up to 20 lbs</option>
                        <option value="medium">Medium - Lifting up to 50 lbs, frequent lifting/carrying up to 25 lbs</option>
                        <option value="heavy">Heavy - Lifting up to 100 lbs, frequent lifting/carrying up to 50 lbs</option>
                        <option value="very-heavy">Very Heavy - Lifting over 100 lbs, frequent lifting/carrying over 50 lbs</option>
                    </select>
                </div>

                <div class="demand-item">
                    <label>Work Schedule Type</label>
                    <select class="form-control" id="classification-schedule">
                        <option value="">Select schedule...</option>
                        <option value="regular">Regular - Standard business hours</option>
                        <option value="shift">Shift Work - Rotating or fixed shifts</option>
                        <option value="on-call">On-Call - Variable schedule with on-call requirements</option>
                        <option value="flexible">Flexible - Self-directed schedule</option>
                    </select>
                </div>

                <div class="demand-item">
                    <label>Work Pace</label>
                    <select class="form-control" id="classification-pace">
                        <option value="">Select pace...</option>
                        <option value="self-paced">Self-Paced - Worker controls pace</option>
                        <option value="moderate">Moderate - Some time pressure</option>
                        <option value="fast">Fast - Frequent deadlines and time pressure</option>
                        <option value="machine-paced">Machine-Paced - Pace determined by equipment/production line</option>
                    </select>
                </div>

                <div class="demand-item">
                    <label>Supervision Level</label>
                    <select class="form-control" id="classification-supervision">
                        <option value="">Select level...</option>
                        <option value="close">Close - Constant supervision and direction</option>
                        <option value="moderate">Moderate - Regular check-ins and guidance</option>
                        <option value="minimal">Minimal - Occasional oversight</option>
                        <option value="independent">Independent - Self-directed work</option>
                    </select>
                </div>

                <div class="demand-item">
                    <label>Additional Classification Notes</label>
                    <textarea class="form-control" id="classification-additional" rows="4"
                              placeholder="Include any additional classification details, DOT codes, or special considerations..."></textarea>
                </div>
            </div>
        `;
    }

    /**
     * Get data from the classification of work section
     * @returns {Object} Classification of work data
     */
    getData() {
        return {
            physicalLevel: document.getElementById('classification-physical-level')?.value || '',
            schedule: document.getElementById('classification-schedule')?.value || '',
            pace: document.getElementById('classification-pace')?.value || '',
            supervision: document.getElementById('classification-supervision')?.value || '',
            additional: document.getElementById('classification-additional')?.value || ''
        };
    }

    /**
     * Set data for the classification of work section
     * @param {Object} data - Classification of work data
     */
    setData(data) {
        if (!data) return;

        if (data.physicalLevel) {
            const physicalLevelEl = document.getElementById('classification-physical-level');
            if (physicalLevelEl) physicalLevelEl.value = data.physicalLevel;
        }
        if (data.schedule) {
            const scheduleEl = document.getElementById('classification-schedule');
            if (scheduleEl) scheduleEl.value = data.schedule;
        }
        if (data.pace) {
            const paceEl = document.getElementById('classification-pace');
            if (paceEl) paceEl.value = data.pace;
        }
        if (data.supervision) {
            const supervisionEl = document.getElementById('classification-supervision');
            if (supervisionEl) supervisionEl.value = data.supervision;
        }
        if (data.additional) {
            const additionalEl = document.getElementById('classification-additional');
            if (additionalEl) additionalEl.value = data.additional;
        }
    }

    /**
     * Validate classification of work data
     * @returns {boolean} True if validation passes
     */
    validate() {
        // Placeholder validation - can be enhanced as needed
        return true;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ClassificationOfWork;
}
