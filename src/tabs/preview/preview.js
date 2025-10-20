/**
 * Preview Tab - (Hidden from Users)
 *
 * Minimal preview tab implementation. This tab is hidden from users.
 *
 * @author Austin Steil
 * @version 1.0.0
 * @license MIT <https://raw.githubusercontent.com/AustinSteil/generate-files-model/refs/heads/main/LICENSE>
 * @copyright 2025 Austin Steil
 * @created October 18, 2025
 * @updated October 18, 2025
 */

class PreviewTab {
    constructor(containerId, tabsManager) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Preview tab container with ID "${containerId}" not found`);
            return;
        }
        this.tabsManager = tabsManager;
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <div class="preview-content">
                <p>Preview tab is currently disabled.</p>
            </div>
        `;
    }
}
