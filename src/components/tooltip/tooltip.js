/**
 * Tooltip Component - Simple, reusable tooltip system
 *
 * A lightweight tooltip component with two main configurable options:
 * - Position: where the tooltip appears relative to the target (left, right, top, bottom, auto)
 * - Text: the content to display in the tooltip
 *
 * Features:
 * - Smart positioning with automatic boundary detection
 * - Dynamic arrow positioning that always points to the target
 * - Mobile-responsive behavior
 * - Easy integration with simple API
 *
 * @author Austin Steil
 * @version 2.0.0
 */

class Tooltip {
    /**
     * Initialize the tooltip system
     */
    constructor() {
        this.currentTooltip = null;
        this.tooltipContainer = null;
        this.tooltipContent = null;
        this.tooltipArrow = null;

        // Configuration constants
        this.OFFSET = 12; // Distance from target element
        this.MARGIN = 10; // Minimum distance from viewport edges
        this.ARROW_PADDING = 12; // Minimum distance of arrow from tooltip edges

        this.init();
    }

    /**
     * Initialize the tooltip system
     */
    init() {
        this.createTooltipElement();
        this.attachEventListeners();
    }

    /**
     * Create the tooltip DOM element
     */
    createTooltipElement() {
        this.tooltipContainer = document.createElement('div');
        this.tooltipContainer.className = 'tooltip-container';
        this.tooltipContainer.innerHTML = `
            <div class="tooltip-content"></div>
            <div class="tooltip-arrow"></div>
        `;
        this.tooltipContainer.style.display = 'none';
        document.body.appendChild(this.tooltipContainer);

        this.tooltipContent = this.tooltipContainer.querySelector('.tooltip-content');
        this.tooltipArrow = this.tooltipContainer.querySelector('.tooltip-arrow');
    }

    /**
     * Attach global event listeners
     */
    attachEventListeners() {
        document.addEventListener('mouseover', this.handleMouseOver.bind(this));
        document.addEventListener('mouseout', this.handleMouseOut.bind(this));
        document.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    /**
     * Add tooltip to an element
     * @param {HTMLElement} element - Element to add tooltip to
     * @param {string} text - Tooltip text content
     * @param {string} position - Position relative to element ('top', 'bottom', 'left', 'right', 'auto')
     */
    add(element, text, position = 'auto') {
        if (!element || !text) {
            console.warn('Tooltip: Element and text are required');
            return;
        }

        element.setAttribute('data-tooltip', text);
        element.setAttribute('data-tooltip-position', position);
        element.classList.add('has-tooltip');
    }

    /**
     * Remove tooltip from an element
     * @param {HTMLElement} element - Element to remove tooltip from
     */
    remove(element) {
        if (!element) return;

        element.removeAttribute('data-tooltip');
        element.removeAttribute('data-tooltip-position');
        element.classList.remove('has-tooltip');

        // Hide tooltip if it's currently showing for this element
        if (this.currentTooltip === element) {
            this.hide();
        }
    }

    /**
     * Update tooltip text for an element
     * @param {HTMLElement} element - Element to update
     * @param {string} newText - New tooltip text
     */
    update(element, newText) {
        if (!element || !newText) return;
        element.setAttribute('data-tooltip', newText);
    }

    /**
     * Handle mouse over events
     */
    handleMouseOver(e) {
        const element = e.target.closest('[data-tooltip]');
        if (element && element !== this.currentTooltip) {
            this.show(element);
        }
    }

    /**
     * Handle mouse out events
     */
    handleMouseOut(e) {
        const element = e.target.closest('[data-tooltip]');
        if (element && element === this.currentTooltip) {
            // Check if we're moving to a child element
            if (!element.contains(e.relatedTarget)) {
                this.hide();
            }
        }
    }

    /**
     * Handle scroll events - hide tooltip to prevent positioning issues
     */
    handleScroll() {
        if (this.currentTooltip) {
            this.hide();
        }
    }

    /**
     * Handle resize events - hide tooltip to prevent positioning issues
     */
    handleResize() {
        if (this.currentTooltip) {
            this.hide();
        }
    }

    /**
     * Show tooltip for an element
     * @param {HTMLElement} element - Target element
     */
    show(element) {
        const text = element.getAttribute('data-tooltip');
        const position = element.getAttribute('data-tooltip-position') || 'auto';

        this.tooltipContent.textContent = text;
        this.tooltipContainer.style.display = 'block';
        this.currentTooltip = element;

        // Force reflow to retrigger CSS animation
        // This is necessary because changing display from none to block doesn't retrigger animations
        void this.tooltipContainer.offsetWidth;

        // Position tooltip and arrow
        this.positionTooltip(element, position);
    }

    /**
     * Hide the tooltip
     */
    hide() {
        if (this.tooltipContainer) {
            this.tooltipContainer.style.display = 'none';
        }
        this.currentTooltip = null;
    }

    /**
     * Position the tooltip relative to the target element
     * @param {HTMLElement} element - Target element
     * @param {string} preferredPosition - Preferred position
     */
    positionTooltip(element, preferredPosition) {
        const tooltip = this.tooltipContainer;
        const elementRect = element.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let position = preferredPosition;
        let left, top;

        // Auto-detect best position if 'auto' is specified
        if (position === 'auto') {
            position = this.detectBestPosition(elementRect, tooltipRect);
        }

        // Handle mobile-specific positioning for floating buttons
        const isMobile = viewportWidth <= 768;
        const isFloatingButton = element.closest('.floating-storage-button, .floating-button');

        if (isMobile && isFloatingButton) {
            position = 'top';
        }

        // Calculate initial position
        ({ left, top } = this.calculatePosition(elementRect, tooltipRect, position));

        // Auto-adjust if tooltip would go off-screen
        ({ position, left, top } = this.adjustForViewport(
            elementRect, tooltipRect, position, left, top
        ));

        // Apply final boundary constraints
        left = Math.max(this.MARGIN, Math.min(viewportWidth - tooltipRect.width - this.MARGIN, left));
        top = Math.max(this.MARGIN, Math.min(viewportHeight - tooltipRect.height - this.MARGIN, top));

        // Update tooltip position first
        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';

        // Remove animation class, force reflow, then add it back to retrigger animation
        this.tooltipContainer.className = 'tooltip-container';
        void this.tooltipContainer.offsetWidth; // Force reflow
        this.tooltipContainer.className = `tooltip-container tooltip-${position}`;

        // Position arrow to point at element
        this.positionArrow(element, position, left, top);
    }

    /**
     * Detect the best position for the tooltip based on available space
     * @param {DOMRect} elementRect - Target element bounds
     * @param {DOMRect} tooltipRect - Tooltip bounds
     * @returns {string} Best position
     */
    detectBestPosition(elementRect, tooltipRect) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const spaces = {
            top: elementRect.top - this.MARGIN,
            bottom: viewportHeight - elementRect.bottom - this.MARGIN,
            left: elementRect.left - this.MARGIN,
            right: viewportWidth - elementRect.right - this.MARGIN
        };

        const required = {
            top: tooltipRect.height + this.OFFSET,
            bottom: tooltipRect.height + this.OFFSET,
            left: tooltipRect.width + this.OFFSET,
            right: tooltipRect.width + this.OFFSET
        };

        // Prefer top/bottom over left/right for better readability
        if (spaces.top >= required.top) return 'top';
        if (spaces.bottom >= required.bottom) return 'bottom';
        if (spaces.right >= required.right) return 'right';
        if (spaces.left >= required.left) return 'left';

        // Fallback to position with most space
        const maxSpace = Math.max(...Object.values(spaces));
        return Object.keys(spaces).find(key => spaces[key] === maxSpace);
    }

    /**
     * Calculate tooltip position based on desired placement
     * @param {DOMRect} elementRect - Target element bounds
     * @param {DOMRect} tooltipRect - Tooltip bounds
     * @param {string} position - Desired position
     * @returns {Object} Position coordinates {left, top}
     */
    calculatePosition(elementRect, tooltipRect, position) {
        let left, top;

        switch (position) {
            case 'top':
                left = elementRect.left + (elementRect.width / 2) - (tooltipRect.width / 2);
                top = elementRect.top - tooltipRect.height - this.OFFSET;
                break;
            case 'bottom':
                left = elementRect.left + (elementRect.width / 2) - (tooltipRect.width / 2);
                top = elementRect.bottom + this.OFFSET;
                break;
            case 'left':
                left = elementRect.left - tooltipRect.width - this.OFFSET;
                top = elementRect.top + (elementRect.height / 2) - (tooltipRect.height / 2);
                break;
            case 'right':
                left = elementRect.right + this.OFFSET;
                top = elementRect.top + (elementRect.height / 2) - (tooltipRect.height / 2);
                break;
            default:
                // Default to left
                left = elementRect.left - tooltipRect.width - this.OFFSET;
                top = elementRect.top + (elementRect.height / 2) - (tooltipRect.height / 2);
        }

        return { left, top };
    }

    /**
     * Adjust tooltip position if it would go off-screen
     * @param {DOMRect} elementRect - Target element bounds
     * @param {DOMRect} tooltipRect - Tooltip bounds
     * @param {string} position - Current position
     * @param {number} left - Current left position
     * @param {number} top - Current top position
     * @returns {Object} Adjusted position and coordinates {position, left, top}
     */
    adjustForViewport(elementRect, tooltipRect, position, left, top) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Check horizontal positions
        if ((position === 'left' && left < this.MARGIN) ||
            (position === 'right' && left + tooltipRect.width > viewportWidth - this.MARGIN)) {

            // Try switching to opposite horizontal position
            if (position === 'left' && elementRect.right + tooltipRect.width + this.OFFSET < viewportWidth - this.MARGIN) {
                position = 'right';
                ({ left, top } = this.calculatePosition(elementRect, tooltipRect, position));
            } else if (position === 'right' && elementRect.left - tooltipRect.width - this.OFFSET > this.MARGIN) {
                position = 'left';
                ({ left, top } = this.calculatePosition(elementRect, tooltipRect, position));
            } else {
                // Fall back to vertical position
                position = elementRect.top - tooltipRect.height - this.OFFSET > this.MARGIN ? 'top' : 'bottom';
                ({ left, top } = this.calculatePosition(elementRect, tooltipRect, position));
            }
        }

        // Check vertical positions
        if ((position === 'top' && top < this.MARGIN) ||
            (position === 'bottom' && top + tooltipRect.height > viewportHeight - this.MARGIN)) {

            // Try switching to opposite vertical position
            if (position === 'top' && elementRect.bottom + tooltipRect.height + this.OFFSET < viewportHeight - this.MARGIN) {
                position = 'bottom';
                ({ left, top } = this.calculatePosition(elementRect, tooltipRect, position));
            } else if (position === 'bottom' && elementRect.top - tooltipRect.height - this.OFFSET > this.MARGIN) {
                position = 'top';
                ({ left, top } = this.calculatePosition(elementRect, tooltipRect, position));
            }
        }

        return { position, left, top };
    }

    /**
     * Position the tooltip arrow to point accurately at the target element
     * @param {HTMLElement} element - Target element
     * @param {string} position - Tooltip position
     * @param {number} tooltipLeft - Final tooltip left position
     * @param {number} tooltipTop - Final tooltip top position
     */
    positionArrow(element, position, tooltipLeft, tooltipTop) {
        const elementRect = element.getBoundingClientRect();
        const tooltipRect = this.tooltipContainer.getBoundingClientRect();
        const arrow = this.tooltipArrow;

        // Reset arrow styles
        arrow.style.left = '';
        arrow.style.right = '';
        arrow.style.top = '';
        arrow.style.bottom = '';
        arrow.style.transform = '';

        switch (position) {
            case 'top':
            case 'bottom':
                // Arrow points horizontally to element center
                const elementCenterX = elementRect.left + (elementRect.width / 2);
                const arrowLeft = elementCenterX - tooltipLeft;
                const constrainedArrowLeft = Math.max(
                    this.ARROW_PADDING,
                    Math.min(tooltipRect.width - this.ARROW_PADDING, arrowLeft)
                );

                arrow.style.left = constrainedArrowLeft + 'px';
                arrow.style.transform = 'translateX(-50%)';

                if (position === 'top') {
                    arrow.style.bottom = '-8px';
                } else {
                    arrow.style.top = '-8px';
                }
                break;

            case 'left':
            case 'right':
                // Arrow points vertically to element center
                const elementCenterY = elementRect.top + (elementRect.height / 2);
                const arrowTop = elementCenterY - tooltipTop;
                const constrainedArrowTop = Math.max(
                    this.ARROW_PADDING,
                    Math.min(tooltipRect.height - this.ARROW_PADDING, arrowTop)
                );

                arrow.style.top = constrainedArrowTop + 'px';
                arrow.style.transform = 'translateY(-50%)';

                if (position === 'left') {
                    arrow.style.right = '-8px';
                } else {
                    arrow.style.left = '-8px';
                }
                break;
        }
    }

    /**
     * Destroy the tooltip instance and clean up
     */
    destroy() {
        // Remove event listeners
        document.removeEventListener('mouseover', this.handleMouseOver.bind(this));
        document.removeEventListener('mouseout', this.handleMouseOut.bind(this));
        document.removeEventListener('scroll', this.handleScroll.bind(this));
        window.removeEventListener('resize', this.handleResize.bind(this));

        // Remove tooltip element
        if (this.tooltipContainer && this.tooltipContainer.parentNode) {
            this.tooltipContainer.parentNode.removeChild(this.tooltipContainer);
        }

        // Clear references
        this.tooltipContainer = null;
        this.tooltipContent = null;
        this.tooltipArrow = null;
        this.currentTooltip = null;
    }


}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Tooltip;
}

// Global instance for backward compatibility
if (typeof window !== 'undefined') {
    window.Tooltip = Tooltip;
}
