/**
 * Job Tab
 *
 * Handles job data collection for the job demands analysis.
 * This is the most complex tab with ability to add/remove different analysis methods.
 * Dynamically generates and manages the job tab content.
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
        this.jobCount = 1;
        this.render();
        this.init();
    }

    /**
     * Render the jobs tab content
     */
    render() {
        this.container.innerHTML = `
            <div class="jobs-content">
                <h2>Employment History</h2>
                <p>This section will collect detailed job history information.</p>

                <div class="jobs-list">
                    <div class="job-entry">
                        <h3>Job Entry 1</h3>

                        <div class="form-group">
                            <label for="job-1-title">Job Title:</label>
                            <input type="text" id="job-1-title" placeholder="Enter job title">
                        </div>

                        <div class="form-group">
                            <label for="job-1-company">Company:</label>
                            <input type="text" id="job-1-company" placeholder="Enter company name">
                        </div>

                        <div class="form-group">
                            <label for="job-1-duration">Duration:</label>
                            <input type="text" id="job-1-duration" placeholder="e.g., Jan 2020 - Dec 2022">
                        </div>

                        <div class="form-group">
                            <label for="job-1-description">Description:</label>
                            <textarea id="job-1-description" rows="4" placeholder="Describe your responsibilities and achievements"></textarea>
                        </div>
                    </div>
                </div>

                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" id="add-job-btn">+ Add Another Job</button>
                </div>

                <!-- Next button container -->
                <div class="form-actions-right">
                    <div id="jobs-next-button-container"></div>
                </div>
            </div>
        `;
    }

    init() {
        console.log('Jobs tab initialized');

        // Add event listener for adding new jobs
        const addJobBtn = document.getElementById('add-job-btn');
        if (addJobBtn) {
            addJobBtn.addEventListener('click', () => this.addJobEntry());
        }
    }
    
    /**
     * Add a new job entry to the form
     */
    addJobEntry() {
        this.jobCount++;
        const jobsList = document.querySelector('.jobs-list');
        
        const newJobEntry = document.createElement('div');
        newJobEntry.className = 'job-entry';
        newJobEntry.innerHTML = `
            <h3>Job Entry ${this.jobCount}</h3>
            
            <div class="form-group">
                <label for="job-${this.jobCount}-title">Job Title:</label>
                <input type="text" id="job-${this.jobCount}-title" placeholder="Enter job title">
            </div>
            
            <div class="form-group">
                <label for="job-${this.jobCount}-company">Company:</label>
                <input type="text" id="job-${this.jobCount}-company" placeholder="Enter company name">
            </div>
            
            <div class="form-group">
                <label for="job-${this.jobCount}-duration">Duration:</label>
                <input type="text" id="job-${this.jobCount}-duration" placeholder="e.g., Jan 2020 - Dec 2022">
            </div>
            
            <div class="form-group">
                <label for="job-${this.jobCount}-description">Description:</label>
                <textarea id="job-${this.jobCount}-description" rows="4" placeholder="Describe your responsibilities and achievements"></textarea>
            </div>
            
            <button type="button" class="btn btn-warning remove-job-btn" data-job-number="${this.jobCount}">Remove This Job</button>
        `;
        
        jobsList.appendChild(newJobEntry);
        
        // Add event listener to remove button
        const removeBtn = newJobEntry.querySelector('.remove-job-btn');
        removeBtn.addEventListener('click', (e) => {
            newJobEntry.remove();
        });
    }
    
    /**
     * Get data from all job entries
     * @returns {Array} Array of job objects
     */
    getData() {
        const jobs = [];
        const jobEntries = document.querySelectorAll('.job-entry');
        
        jobEntries.forEach((entry, index) => {
            const jobNumber = index + 1;
            const title = document.getElementById(`job-${jobNumber}-title`)?.value || '';
            const company = document.getElementById(`job-${jobNumber}-company`)?.value || '';
            const duration = document.getElementById(`job-${jobNumber}-duration`)?.value || '';
            const description = document.getElementById(`job-${jobNumber}-description`)?.value || '';
            
            if (title || company || duration || description) {
                jobs.push({ title, company, duration, description });
            }
        });
        
        return jobs;
    }
    
    /**
     * Set data for job entries
     * @param {Array} jobs - Array of job objects
     */
    setData(jobs) {
        if (!Array.isArray(jobs) || jobs.length === 0) return;
        
        // Clear existing entries except the first one
        const jobsList = document.querySelector('.jobs-list');
        jobsList.innerHTML = '';
        this.jobCount = 0;
        
        // Add job entries
        jobs.forEach((job, index) => {
            if (index === 0) {
                // Use existing first entry
                this.jobCount = 1;
                this.addFirstJobEntry(job);
            } else {
                this.addJobEntry();
                const jobNumber = this.jobCount;
                if (job.title) document.getElementById(`job-${jobNumber}-title`).value = job.title;
                if (job.company) document.getElementById(`job-${jobNumber}-company`).value = job.company;
                if (job.duration) document.getElementById(`job-${jobNumber}-duration`).value = job.duration;
                if (job.description) document.getElementById(`job-${jobNumber}-description`).value = job.description;
            }
        });
    }
    
    /**
     * Add the first job entry (helper for setData)
     */
    addFirstJobEntry(job) {
        const jobsList = document.querySelector('.jobs-list');
        const firstEntry = document.createElement('div');
        firstEntry.className = 'job-entry';
        firstEntry.innerHTML = `
            <h3>Job Entry 1</h3>
            
            <div class="form-group">
                <label for="job-1-title">Job Title:</label>
                <input type="text" id="job-1-title" placeholder="Enter job title" value="${job.title || ''}">
            </div>
            
            <div class="form-group">
                <label for="job-1-company">Company:</label>
                <input type="text" id="job-1-company" placeholder="Enter company name" value="${job.company || ''}">
            </div>
            
            <div class="form-group">
                <label for="job-1-duration">Duration:</label>
                <input type="text" id="job-1-duration" placeholder="e.g., Jan 2020 - Dec 2022" value="${job.duration || ''}">
            </div>
            
            <div class="form-group">
                <label for="job-1-description">Description:</label>
                <textarea id="job-1-description" rows="4" placeholder="Describe your responsibilities and achievements">${job.description || ''}</textarea>
            </div>
        `;
        jobsList.appendChild(firstEntry);
    }
    
    /**
     * Validate jobs tab data
     * @returns {boolean} True if at least one job has data
     */
    validate() {
        const jobs = this.getData();
        return jobs.length > 0;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = JobsTab;
}

