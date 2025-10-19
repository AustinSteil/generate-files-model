# Color System Quick Reference

## About

Author: Austin Steil  
Version: 1.0.0
Created October 18, 2025
Updated October 18, 2025

## License & Copyright

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
Live License Page Link: <https://raw.githubusercontent.com/AustinSteil/generate-files-model/refs/heads/main/LICENSE>
Copyright 2025 Austin Steil

## 🚀 Quick Start

```html
<!-- Add to your HTML -->
<link rel="stylesheet" href="src/color-system/colors.css">
```

## 🎨 Most Common Colors

| Variable | Color | Use Case |
|----------|-------|----------|
| `--color-primary` | #007bff | Primary buttons, links, headers |
| `--color-success` | #10b981 | Success messages, confirmations |
| `--color-warning` | #f59e0b | Warnings, cautions |
| `--color-error` | #ef4444 | Errors, destructive actions |
| `--color-info` | #3b82f6 | Information, tips |
| `--color-secondary` | #6c757d | Secondary buttons, muted text |

## 🌈 Gradients (Alert Component Style)

```css
/* Success gradient */
background: var(--gradient-success);
border-left: 4px solid var(--color-success-border);

/* Warning gradient */
background: var(--gradient-warning);
border-left: 4px solid var(--color-warning-border);

/* Error gradient */
background: var(--gradient-error);
border-left: 4px solid var(--color-error-border);

/* Info gradient */
background: var(--gradient-info);
border-left: 4px solid var(--color-info-border);
```

## 📝 Common Patterns

### Button

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

### Card with Gradient

```css
.card {
    background: var(--gradient-success);
    border-left: 4px solid var(--color-success-border);
    border-radius: var(--radius-lg);
    padding: var(--spacing-xl);
    box-shadow: var(--shadow-sm);
}
```

### Overlay

```css
.overlay {
    background-color: rgba(var(--color-primary-rgb), 0.1);
}
```

### Text Colors

```css
.text-primary { color: var(--color-text-primary); }
.text-secondary { color: var(--color-text-secondary); }
.text-success { color: var(--color-success); }

/* Code blocks with proper dark mode contrast */
.code-block {
    background: var(--color-bg-tertiary);
    color: var(--color-text-code);
}
```

## 🎯 Utility Classes

```html
<!-- Backgrounds -->
<div class="bg-success">Success background</div>
<div class="bg-warning">Warning background</div>
<div class="bg-error">Error background</div>

<!-- Text -->
<p class="text-success">Success text</p>
<p class="text-warning">Warning text</p>
<p class="text-error">Error text</p>

<!-- Borders -->
<div class="border-success">Success border</div>
```

## 📏 Spacing & Sizing

```css
/* Spacing */
padding: var(--spacing-sm);   /* 8px */
padding: var(--spacing-md);   /* 12px */
padding: var(--spacing-lg);   /* 16px */
padding: var(--spacing-xl);   /* 20px */

/* Border Radius */
border-radius: var(--radius-md);  /* 6px */
border-radius: var(--radius-lg);  /* 8px */

/* Shadows */
box-shadow: var(--shadow-sm);  /* Small shadow */
box-shadow: var(--shadow-md);  /* Medium shadow */
box-shadow: var(--shadow-lg);  /* Large shadow */

/* Transitions */
transition: all var(--transition-base);  /* 0.2s ease */
```

## 🌙 Dark Mode

All colors automatically adjust for dark mode. No extra code needed!

```css
/* This works in both light and dark mode */
.element {
    background: var(--gradient-success);
    color: var(--color-text-primary);
}
```

## 📋 Complete Variable List

### Colors

- `--color-primary`, `--color-primary-dark`, `--color-primary-light`
- `--color-success`, `--color-success-dark`, `--color-success-light`
- `--color-warning`, `--color-warning-dark`, `--color-warning-light`
- `--color-error`, `--color-error-dark`, `--color-error-light`
- `--color-info`, `--color-info-dark`, `--color-info-light`
- `--color-secondary`, `--color-secondary-dark`, `--color-secondary-light`

### Gradients

- `--gradient-success`, `--gradient-success-solid`, `--gradient-success-subtle`
- `--gradient-warning`, `--gradient-warning-solid`, `--gradient-warning-subtle`
- `--gradient-error`, `--gradient-error-solid`, `--gradient-error-subtle`
- `--gradient-info`, `--gradient-info-solid`, `--gradient-info-subtle`
- `--gradient-secondary`, `--gradient-secondary-solid`

### Grays

- `--color-gray-50` through `--color-gray-900`

### Text

- `--color-text-primary`, `--color-text-secondary`, `--color-text-tertiary`
- `--color-text-light`, `--color-text-white`
- `--color-text-code` (optimized for code blocks with proper dark mode contrast)

### Backgrounds

- `--color-bg-primary`, `--color-bg-secondary`, `--color-bg-tertiary`

### Borders

- `--color-border-light`, `--color-border-medium`, `--color-border-dark`

### Shadows

- `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`

### Spacing

- `--spacing-xs` (4px), `--spacing-sm` (8px), `--spacing-md` (12px)
- `--spacing-lg` (16px), `--spacing-xl` (20px), `--spacing-2xl` (24px), `--spacing-3xl` (32px)

### Border Radius

- `--radius-sm` (4px), `--radius-md` (6px), `--radius-lg` (8px)
- `--radius-xl` (12px), `--radius-full` (9999px)

### Transitions

- `--transition-fast` (0.15s), `--transition-base` (0.2s)
- `--transition-slow` (0.3s), `--transition-cubic` (cubic-bezier)

---

**See full documentation:** [COLOR-SYSTEM.md](COLOR-SYSTEM.md)  
**View demo:** Open `src/color-system-demo.html` in your browser
