/**
 * Tabs Manager
 * 
 * Coordinates all tab instances and manages data flow between tabs.
 * Provides a central interface for getting/setting data across all tabs.
 * 
 * @author Austin Steil
 * @version 1.0.0
 * @license MIT <https://raw.githubusercontent.com/AustinSteil/generate-files-model/refs/heads/main/LICENSE>
 * @copyright 2025 Austin Steil
 * @created October 18, 2025
 * @updated October 18, 2025
 */

class TabsManager {
    constructor() {
        this.tabs = null;
        this.introTab = null;
        this.demographicsTab = null;
        this.jobsTab = null;
        this.summaryTab = null;
        this.previewTab = null;
        this.nextButtonManager = null;
    }
    
    /**
     * Initialize all tabs and the tabs component
     */
    init() {
        // Initialize the main tabs component
        this.tabs = new Tabs('documentTabs');

        // Initialize individual tab controllers with their container IDs
        this.introTab = new IntroTab('tab-intro');
        this.demographicsTab = new DemographicsTab('tab-demographics');
        this.jobsTab = new JobsTab('tab-jobs');
        this.summaryTab = new SummaryTab('tab-summary');
        this.previewTab = new PreviewTab('tab-preview', this);

        // Listen for tab changes
        const tabsContainer = document.getElementById('documentTabs');
        if (tabsContainer) {
            tabsContainer.addEventListener('tabchange', (e) => {
                this.onTabChange(e.detail);
            });
        }

        console.log('Tabs Manager initialized');

        // Initialize Next button manager after tabs are set up
        this.initializeNextButtons();
    }

    /**
     * Initialize Next button manager and add Next buttons to tabs
     */
    initializeNextButtons() {
        // Wait for NextButtonManager to be available
        if (typeof NextButtonManager === 'undefined') {
            setTimeout(() => this.initializeNextButtons(), 100);
            return;
        }

        // Create Next button manager
        this.nextButtonManager = new NextButtonManager(this);

        // Add Next buttons to each tab (except preview)
        this.nextButtonManager.addNextButton('intro', 'intro-next-button-container');
        this.nextButtonManager.addNextButton('demographics', 'demographics-next-button-container');
        this.nextButtonManager.addNextButton('jobs', 'jobs-next-button-container');
        this.nextButtonManager.addNextButton('summary', 'summary-next-button-container');

        console.log('Next buttons initialized');
    }
    
    /**
     * Handle tab change events
     * @param {Object} detail - Event detail with tab info
     */
    onTabChange(detail) {
        console.log(`Switched to tab: ${detail.tabId} (index: ${detail.index})`);
        
        // If switching to preview tab, update the preview
        if (detail.tabId === 'tab-preview') {
            this.previewTab.updatePreview();
        }
    }
    
    /**
     * Get all data from all tabs
     * @returns {Object} All tab data
     */
    getAllData() {
        return {
            intro: this.introTab.getData(),
            demographics: this.demographicsTab.getData(),
            jobs: this.jobsTab.getData(),
            summary: this.summaryTab.getData()
        };
    }
    
    /**
     * Set data for all tabs
     * @param {Object} data - Data object with all tab data
     */
    setAllData(data) {
        if (data.intro) this.introTab.setData(data.intro);
        if (data.demographics) this.demographicsTab.setData(data.demographics);
        if (data.jobs) this.jobsTab.setData(data.jobs);
        if (data.summary) this.summaryTab.setData(data.summary);
    }
    
    /**
     * Validate all tabs
     * @returns {Object} Validation results with any errors
     */
    validateAll() {
        const errors = [];
        
        if (!this.introTab.validate()) {
            errors.push('Intro tab: Title and Author are required');
        }
        
        if (!this.demographicsTab.validate()) {
            errors.push('Demographics tab: Name is required');
        }
        
        if (!this.jobsTab.validate()) {
            errors.push('Jobs tab: At least one job entry is required');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
    
    /**
     * Switch to a specific tab by name
     * @param {string} tabName - Name of the tab (intro, demographics, jobs, summary, preview)
     */
    switchToTab(tabName) {
        const tabIds = {
            'intro': 'tab-intro',
            'demographics': 'tab-demographics',
            'jobs': 'tab-jobs',
            'summary': 'tab-summary',
            'preview': 'tab-preview'
        };
        
        const tabId = tabIds[tabName];
        if (tabId && this.tabs) {
            this.tabs.switchToTabById(tabId);
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TabsManager;
}

