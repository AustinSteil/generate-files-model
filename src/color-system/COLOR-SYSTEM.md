# Color Management System Documentation

## Overview

This color management system provides a centralized, consistent approach to colors across the entire codebase. It's inspired by the beautiful gradient approach used in the alert component and extends it to all UI elements.

## Features

✅ **Semantic color naming** - Use meaningful names like `success`, `warning`, `error`  
✅ **Gradient backgrounds** - Beautiful gradients for each theme (like the alert component)  
✅ **Light/dark mode support** - Automatic color adjustments for dark mode  
✅ **Opacity variants** - Pre-defined opacity levels for overlays  
✅ **Consistent spacing & transitions** - Bonus utilities for UI consistency  

## Installation

Add the color system to your HTML file **before** any other CSS files:

```html
<link rel="stylesheet" href="src/colors.css">
<link rel="stylesheet" href="main.css">
<!-- other CSS files -->
```

## Color Palette

### Primary Brand Colors

- `--color-primary` - Main brand blue (#007bff)
- `--color-primary-dark` - Darker blue for hovers
- `--color-primary-light` - Light blue for backgrounds

### Success Colors (Green)

- `--color-success` - Main success green (#10b981)
- `--color-success-dark` - Darker green
- `--color-success-light` - Light green background (#f0fdf4)
- `--gradient-success` - Beautiful gradient (135deg, #f0fdf4 → #ffffff)

### Warning Colors (Yellow/Orange)

- `--color-warning` - Main warning orange (#f59e0b)
- `--color-warning-dark` - Darker orange
- `--color-warning-light` - Light orange background (#fffbeb)
- `--gradient-warning` - Beautiful gradient (135deg, #fffbeb → #ffffff)

### Error Colors (Red)

- `--color-error` - Main error red (#ef4444)
- `--color-error-dark` - Darker red
- `--color-error-light` - Light red background (#fef2f2)
- `--gradient-error` - Beautiful gradient (135deg, #fef2f2 → #ffffff)

### Info Colors (Blue)

- `--color-info` - Main info blue (#3b82f6)
- `--color-info-dark` - Darker blue
- `--color-info-light` - Light blue background (#eff6ff)
- `--gradient-info` - Beautiful gradient (135deg, #eff6ff → #ffffff)

### Neutral/Gray Colors

- `--color-gray-50` through `--color-gray-900` - Complete gray scale
- `--color-secondary` - Secondary gray (#6c757d)

## Usage Examples

### 1. Using Solid Colors

```css
.my-button {
    background-color: var(--color-primary);
    color: var(--color-text-white);
}

.my-button:hover {
    background-color: var(--color-primary-dark);
}
```

### 2. Using Gradients (Alert Component Style)

```css
.success-card {
    background: var(--gradient-success);
    border-left: 4px solid var(--color-success-border);
}

.warning-banner {
    background: var(--gradient-warning);
    border-left: 4px solid var(--color-warning-border);
}

.error-message {
    background: var(--gradient-error);
    border-left: 4px solid var(--color-error-border);
}
```

### 3. Using RGB Values (for opacity)

```css
.overlay {
    background-color: rgba(var(--color-primary-rgb), 0.1);
}

.hover-effect:hover {
    background-color: rgba(var(--color-success-rgb), var(--opacity-10));
}
```

### 4. Using Shadows

```css
.card {
    box-shadow: var(--shadow-md);
}

.modal {
    box-shadow: var(--shadow-xl);
}
```

### 5. Using Utility Classes

```html
<!-- Background gradients -->
<div class="bg-success">Success background with gradient</div>
<div class="bg-warning">Warning background with gradient</div>
<div class="bg-error">Error background with gradient</div>

<!-- Text colors -->
<p class="text-success">Success text</p>
<p class="text-warning">Warning text</p>
<p class="text-error">Error text</p>

<!-- Border colors -->
<div class="border-success">Success border</div>
```

## Migration Guide

### Before (hardcoded colors)

```css
.btn-primary {
    background-color: #007bff;
    color: white;
}

.btn-primary:hover {
    background-color: #0056b3;
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
}
```

### After (using color system)

```css
.btn-primary {
    background-color: var(--color-primary);
    color: var(--color-text-white);
}

.btn-primary:hover {
    background-color: var(--color-primary-dark);
    box-shadow: var(--shadow-md);
}
```

## Gradient Patterns

All gradients follow the same pattern as the alert component:

```css
/* Subtle gradient (light → white) */
--gradient-success: linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%);

/* Solid gradient (color → darker color) */
--gradient-success-solid: linear-gradient(135deg, #10b981 0%, #059669 100%);

/* Subtle gradient (light → lighter) */
--gradient-success-subtle: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
```

## Best Practices

### ✅ DO

- Use semantic color names (`--color-success` instead of `--color-green`)
- Use gradients for backgrounds to match the alert component style
- Use RGB variants when you need opacity
- Use the pre-defined shadows for consistency
- Use spacing and radius variables for UI consistency

### ❌ DON'T

- Hardcode color values in your CSS
- Create new color variables without adding them to `colors.css`
- Use different gradient angles (stick with 135deg for consistency)
- Mix hardcoded colors with CSS variables

## Dark Mode

The color system automatically adjusts for dark mode using `@media (prefers-color-scheme: dark)`. All colors have dark mode variants that are automatically applied.

```css
/* This automatically works in both light and dark mode */
.my-element {
    background: var(--gradient-success);
    color: var(--color-text-primary);
}
```

## Bonus Utilities

### Spacing

```css
padding: var(--spacing-md);  /* 12px */
margin: var(--spacing-lg);   /* 16px */
gap: var(--spacing-xl);      /* 20px */
```

### Border Radius

```css
border-radius: var(--radius-md);  /* 6px */
border-radius: var(--radius-lg);  /* 8px */
```

### Transitions

```css
transition: all var(--transition-base);  /* 0.2s ease */
transition: all var(--transition-cubic); /* 0.3s cubic-bezier */
```

## Examples from Your Codebase

### Alert Component (already using this pattern!)

```css
.alert-success {
    border-left-color: var(--color-success-border);
    background: var(--gradient-success);
}
```

### Privacy Notice (can be updated to use)

```css
.privacy-notice {
    background: var(--gradient-info);
    border-left: 4px solid var(--color-info-border);
}
```

### Template Info (can be updated to use)

```css
.template-info {
    border: 2px solid var(--color-success-border);
    background: var(--gradient-success-subtle);
}
```

### Buttons (can be updated to use)

```css
.btn-success {
    background: var(--gradient-success-solid);
    color: var(--color-text-white);
}

.btn-success:hover {
    background-color: var(--color-success-dark);
    box-shadow: var(--shadow-md);
}
```

## Support

For questions or to add new colors to the system, edit `src/colors.css` and follow the existing patterns.

---

**Version:** 1.0.0  
**Author:** Austin Steil  
**Last Updated:** Oct 11, 2025
