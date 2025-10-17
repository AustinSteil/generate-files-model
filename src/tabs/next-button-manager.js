/**
 * Next Button Manager
 * 
 * Manages Next button functionality across all tabs with validation and navigation.
 * Integrates with the tabs manager, validation system, and alert system.
 * 
 * Features:
 * - Tab-specific validation before navigation
 * - Error feedback using alert system
 * - Smooth tab transitions
 * - Proper state management
 * 
 * @author Austin Steil
 */

class NextButtonManager {
    constructor(tabsManager) {
        this.tabsManager = tabsManager;
        this.nextButtons = new Map(); // Store button instances by tab name
        
        // Tab order for navigation
        this.tabOrder = ['intro', 'demographics', 'jobs', 'summary', 'preview'];
        
        // Tab validation methods mapping
        this.tabValidators = {
            'intro': () => this.validateIntroTab(),
            'demographics': () => this.validateDemographicsTab(),
            'jobs': () => this.validateJobsTab(),
            'summary': () => this.validateSummaryTab()
        };
        
        // Tab-specific error messages
        this.errorMessages = {
            'intro': 'Please complete all required fields and select a template before continuing.',
            'demographics': 'Please enter your name before continuing.',
            'jobs': 'Please add at least one job entry before continuing.',
            'summary': 'Summary validation passed.' // Summary is optional
        };
    }

    /**
     * Create and add a Next button to a specific tab
     * @param {string} tabName - Name of the tab (intro, demographics, jobs, summary)
     * @param {string} containerId - ID of the container to add the button to
     */
    addNextButton(tabName, containerId) {
        // Don't add Next button to preview tab (it's the final tab)
        if (tabName === 'preview') {
            console.log('Next button not needed for preview tab');
            return;
        }

        // Check if Button class is available
        if (typeof Button === 'undefined') {
            console.error('Button component not loaded. Make sure to include button.js');
            return;
        }

        // Check if container exists, if not, wait and retry
        const container = document.getElementById(containerId);
        if (!container) {
            console.log(`Container ${containerId} not found, retrying in 100ms...`);
            setTimeout(() => this.addNextButton(tabName, containerId), 100);
            return;
        }

        const nextButton = new Button({
            containerId: containerId,
            text: 'Next',
            variant: 'primary',
            icon: 'next',  // Smart icon processing: converts to ▶
            iconPosition: 'left',
            onClick: (_e, button) => this.handleNextClick(tabName, button)
        });

        this.nextButtons.set(tabName, nextButton);
        console.log(`Next button added to ${tabName} tab`);
    }

    /**
     * Handle Next button click with validation and navigation
     * @param {string} currentTabName - Name of the current tab
     * @param {Button} button - Button instance that was clicked
     */
    handleNextClick(currentTabName, button) {
        // Set loading state
        button.setLoading(true);
        button.setText('Validating...');

        try {
            // Special handling for jobs tab - navigate through subnav sections
            if (currentTabName === 'jobs') {
                this.handleJobsTabNavigation(button);
                return;
            }

            // Validate current tab
            const isValid = this.validateCurrentTab(currentTabName);

            if (isValid) {
                // Show success feedback
                button.setText('Success!');
                button.setVariant('success');

                // Navigate to next tab after brief delay
                setTimeout(() => {
                    this.navigateToNextTab(currentTabName);

                    // Reset button state
                    button.setText('Next');
                    button.setVariant('primary');
                    button.setLoading(false);
                }, 800);

            } else {
                // Show error state
                button.setText('Please fix errors');
                button.setVariant('error');

                // Reset button after delay
                setTimeout(() => {
                    button.setText('Next');
                    button.setVariant('primary');
                    button.setLoading(false);
                }, 2000);
            }

        } catch (error) {
            console.error('Error during validation:', error);
            showError('An error occurred during validation. Please try again.');

            // Reset button state
            button.setText('Next');
            button.setVariant('primary');
            button.setLoading(false);
        }
    }

    /**
     * Handle Next button navigation for jobs tab with subnav cycling
     * @param {Button} button - Button instance that was clicked
     */
    handleJobsTabNavigation(button) {
        const jobsTab = this.tabsManager?.jobsTab;
        if (!jobsTab || !jobsTab.subNav) {
            console.error('Jobs tab or SubNav not available');
            button.setText('Next');
            button.setVariant('primary');
            button.setLoading(false);
            return;
        }

        // Get the subnav sections and current active section
        const sections = jobsTab.subNav.sections;
        const currentSectionId = jobsTab.subNav.getActiveSection();
        const currentSectionIndex = sections.findIndex(s => s.id === currentSectionId);

        // Validate current section
        const isValid = this.validateJobsSection(currentSectionId);

        if (isValid) {
            // Show success feedback
            button.setText('Success!');
            button.setVariant('success');

            // Navigate after brief delay
            setTimeout(() => {
                // Check if we're on the last section
                if (currentSectionIndex === sections.length - 1) {
                    // Move to summary tab
                    this.navigateToNextTab('jobs');
                } else {
                    // Move to next subnav section
                    const nextSection = sections[currentSectionIndex + 1];
                    jobsTab.subNav.switchSection(nextSection.id);
                }

                // Reset button state
                button.setText('Next');
                button.setVariant('primary');
                button.setLoading(false);
            }, 800);

        } else {
            // Show error state
            button.setText('Please fix errors');
            button.setVariant('error');

            // Reset button after delay
            setTimeout(() => {
                button.setText('Next');
                button.setVariant('primary');
                button.setLoading(false);
            }, 2000);
        }
    }

    /**
     * Validate a specific jobs section
     * @param {string} sectionId - ID of the section to validate
     * @returns {boolean} True if validation passes
     */
    validateJobsSection(sectionId) {
        const jobsTab = this.tabsManager?.jobsTab;
        if (!jobsTab) return false;

        try {
            // Map section IDs to their corresponding demand objects
            const sectionValidators = {
                'physical-demands': () => jobsTab.physicalDemands.validate(),
                'mobility-demands': () => jobsTab.mobilityDemands.validate(),
                'cognitive-sensory': () => jobsTab.cognitiveSensoryDemands.validate(),
                'environmental': () => jobsTab.environmentalDemands.validate(),
                'lifting-pushing-pulling': () => jobsTab.liftingPushingPulling.validate(),
                'classification': () => jobsTab.classificationOfWork.validate()
            };

            const validator = sectionValidators[sectionId];
            if (!validator) {
                console.warn(`No validator found for section: ${sectionId}`);
                return true; // Allow navigation if no validator
            }

            const isValid = validator();

            if (!isValid) {
                showError('Please complete all required fields in this section before continuing.', { duration: 6 });
            }

            return isValid;

        } catch (error) {
            console.error(`Validation error for section ${sectionId}:`, error);
            showError('Validation failed. Please check your inputs and try again.');
            return false;
        }
    }

    /**
     * Validate the current tab
     * @param {string} tabName - Name of the tab to validate
     * @returns {boolean} True if validation passes
     */
    validateCurrentTab(tabName) {
        const validator = this.tabValidators[tabName];

        if (!validator) {
            console.warn(`No validator found for tab: ${tabName}`);
            return true; // Allow navigation if no validator
        }

        try {
            const isValid = validator();

            if (!isValid) {
                // Show error message
                const errorMessage = this.errorMessages[tabName] || 'Please complete all required fields.';
                showError(errorMessage, { duration: 6 });
            }

            return isValid;

        } catch (error) {
            console.error(`Validation error for ${tabName} tab:`, error);
            showError('Validation failed. Please check your inputs and try again.');
            return false;
        }
    }

    /**
     * Navigate to the next tab in sequence
     * @param {string} currentTabName - Name of the current tab
     */
    navigateToNextTab(currentTabName) {
        const currentIndex = this.tabOrder.indexOf(currentTabName);
        
        if (currentIndex === -1) {
            console.error(`Tab "${currentTabName}" not found in tab order`);
            return;
        }
        
        const nextIndex = currentIndex + 1;
        
        if (nextIndex >= this.tabOrder.length) {
            console.log('Already at the last tab');
            return;
        }
        
        const nextTabName = this.tabOrder[nextIndex];
        
        // Use tabs manager to switch tabs
        if (this.tabsManager && this.tabsManager.switchToTab) {
            this.tabsManager.switchToTab(nextTabName);
            console.log(`Navigated from ${currentTabName} to ${nextTabName}`);
        } else {
            console.error('Tabs manager not available or switchToTab method missing');
        }
    }

    /**
     * Validate intro tab
     * @returns {boolean} True if valid
     */
    validateIntroTab() {
        if (!this.tabsManager || !this.tabsManager.introTab) {
            return false;
        }
        
        return this.tabsManager.introTab.validate();
    }

    /**
     * Validate demographics tab
     * @returns {boolean} True if valid
     */
    validateDemographicsTab() {
        if (!this.tabsManager || !this.tabsManager.demographicsTab) {
            return false;
        }
        
        return this.tabsManager.demographicsTab.validate();
    }

    /**
     * Validate jobs tab
     * @returns {boolean} True if valid
     */
    validateJobsTab() {
        if (!this.tabsManager || !this.tabsManager.jobsTab) {
            return false;
        }
        
        return this.tabsManager.jobsTab.validate();
    }

    /**
     * Validate summary tab
     * @returns {boolean} True if valid
     */
    validateSummaryTab() {
        if (!this.tabsManager || !this.tabsManager.summaryTab) {
            return false;
        }
        
        return this.tabsManager.summaryTab.validate();
    }

    /**
     * Get a Next button instance by tab name
     * @param {string} tabName - Name of the tab
     * @returns {Button|null} Button instance or null if not found
     */
    getNextButton(tabName) {
        return this.nextButtons.get(tabName) || null;
    }

    /**
     * Remove a Next button from a specific tab
     * @param {string} tabName - Name of the tab
     */
    removeNextButton(tabName) {
        const button = this.nextButtons.get(tabName);
        if (button) {
            button.destroy();
            this.nextButtons.delete(tabName);
            console.log(`Next button removed from ${tabName} tab`);
        }
    }

    /**
     * Remove all Next buttons
     */
    removeAllNextButtons() {
        for (const [_tabName, button] of this.nextButtons) {
            button.destroy();
        }
        this.nextButtons.clear();
        console.log('All Next buttons removed');
    }

    /**
     * Update button state for a specific tab
     * @param {string} tabName - Name of the tab
     * @param {Object} options - Button options to update
     */
    updateNextButton(tabName, options = {}) {
        const button = this.nextButtons.get(tabName);
        if (!button) {
            console.warn(`Next button not found for tab: ${tabName}`);
            return;
        }

        if (options.text) button.setText(options.text);
        if (options.variant) button.setVariant(options.variant);
        if (options.disabled !== undefined) button.setDisabled(options.disabled);
        if (options.loading !== undefined) button.setLoading(options.loading);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NextButtonManager;
}
