/**
 * Job Tab
 *
 * Handles job demands analysis data collection.
 * Uses SubNav component for organizing different demand categories:
 * - Physical Demands
 * - Mobility Demands
 * - Cognitive and Sensory Demands
 * - Environmental Demands
 * - Lifting/Pushing/Pulling
 * - Classification of Work
 *
 * @author Austin Steil
 */

class JobsTab {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Jobs tab container with ID "${containerId}" not found`);
            return;
        }
        this.subNav = null;

        // Initialize demand section instances
        this.physicalDemands = new PhysicalDemands();
        this.mobilityDemands = new MobilityDemands();
        this.cognitiveSensoryDemands = new CognitiveSensoryDemands();
        this.environmentalDemands = new EnvironmentalDemands();
        this.liftingPushingPulling = new LiftingPushingPulling();
        this.classificationOfWork = new ClassificationOfWork();

        this.render();
        this.init();
    }

    /**
     * Render the jobs tab content with SubNav
     */
    render() {
        this.container.innerHTML = `
            <div class="jobs-content">
                <!-- SubNav container -->
                <div id="jobs-subnav-container"></div>

                <!-- Next button container -->
                <div class="form-actions-right">
                    <div id="jobs-next-button-container"></div>
                </div>
            </div>
        `;
    }

    init() {
        console.log('Jobs tab initialized');

        // Initialize SubNav with demand categories
        this.subNav = new SubNav({
            containerId: 'jobs-subnav-container',
            sections: [
                {
                    id: 'physical-demands',
                    title: 'Physical Demands',
                    hideTitle: true,
                    noPadding: true,
                    content: () => this.physicalDemands.render()
                },
                {
                    id: 'mobility-demands',
                    title: 'Mobility Demands',
                    hideTitle: true,
                    noPadding: true,
                    content: () => this.mobilityDemands.render()
                },
                {
                    id: 'cognitive-sensory',
                    title: 'Cognitive & Sensory',
                    hideTitle: true,
                    noPadding: true,
                    content: () => this.cognitiveSensoryDemands.render()
                },
                {
                    id: 'environmental',
                    title: 'Environmental Demands',
                    hideTitle: true,
                    noPadding: true,
                    content: () => this.environmentalDemands.render()
                },
                {
                    id: 'lifting-pushing-pulling',
                    title: 'Lifting/Pushing/Pulling',
                    hideTitle: true,
                    noPadding: true,
                    content: () => this.liftingPushingPulling.render()
                },
                {
                    id: 'classification',
                    title: 'Classification of Work',
                    hideTitle: true,
                    noPadding: true,
                    content: () => this.classificationOfWork.render()
                }
            ],
            defaultSection: 'physical-demands'
        });

        // Initialize table components after SubNav has rendered
        // Use setTimeout to ensure DOM is ready
        setTimeout(() => {
            this.physicalDemands.init();
            this.mobilityDemands.init();
            this.cognitiveSensoryDemands.init();
            this.environmentalDemands.init();
            this.liftingPushingPulling.init();
            this.classificationOfWork.init();
        }, 100);

        // Listen for section changes
        const subNavContainer = document.getElementById('jobs-subnav-container');
        if (subNavContainer) {
            subNavContainer.addEventListener('sectionchange', (e) => {
                console.log('Section changed to:', e.detail.sectionId);
            });
        }
    }

    /**
     * Ensure all demand sections are initialized
     * Call this before getting or setting data
     */
    ensureInitialized() {
        if (!this.physicalDemands.table) {
            this.physicalDemands.init();
        }
    }



    /**
     * Get data from all sections
     * @returns {Object} Object containing all job demands data
     */
    getData() {
        // Ensure physical demands table is initialized before getting data
        this.ensureInitialized();

        const data = {
            activeSection: this.subNav?.getActiveSection() || null,
            physicalDemands: this.physicalDemands.getData(),
            mobilityDemands: this.mobilityDemands.getData(),
            cognitiveSensoryDemands: this.cognitiveSensoryDemands.getData(),
            environmentalDemands: this.environmentalDemands.getData(),
            liftingPushingPulling: this.liftingPushingPulling.getData(),
            classificationOfWork: this.classificationOfWork.getData()
        };

        console.log('Jobs tab getData:', data);
        return data;
    }

    /**
     * Set data for all sections
     * @param {Object} data - Object containing all job demands data
     */
    setData(data) {
        if (!data) return;

        console.log('Jobs tab setData called with:', data);

        // Ensure physical demands table is initialized before setting data
        this.ensureInitialized();

        if (data.activeSection && this.subNav) {
            this.subNav.setActiveSection(data.activeSection);
        }

        if (data.physicalDemands) {
            console.log('Setting physical demands data:', data.physicalDemands);
            this.physicalDemands.setData(data.physicalDemands);
        }
        if (data.mobilityDemands) {
            this.mobilityDemands.setData(data.mobilityDemands);
        }
        if (data.cognitiveSensoryDemands) {
            this.cognitiveSensoryDemands.setData(data.cognitiveSensoryDemands);
        }
        if (data.environmentalDemands) {
            this.environmentalDemands.setData(data.environmentalDemands);
        }
        if (data.liftingPushingPulling) {
            this.liftingPushingPulling.setData(data.liftingPushingPulling);
        }
        if (data.classificationOfWork) {
            this.classificationOfWork.setData(data.classificationOfWork);
        }
    }

    /**
     * Validate jobs tab data
     * @returns {boolean} True if validation passes
     */
    validate() {
        // Validate all demand sections
        const validations = [
            this.physicalDemands.validate(),
            this.mobilityDemands.validate(),
            this.cognitiveSensoryDemands.validate(),
            this.environmentalDemands.validate(),
            this.liftingPushingPulling.validate(),
            this.classificationOfWork.validate()
        ];

        return validations.every(v => v === true);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = JobsTab;
}

