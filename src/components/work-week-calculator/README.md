# Work Week Calculator Component

A reusable component for calculating work week parameters with synchronized inputs and plus/minus buttons for easy adjustment.

## About

Author: Austin Steil  
Version: 1.0.0
Created October 18, 2025
Updated October 18, 2025

## License & Copyright

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
Live License Page Link: <https://raw.githubusercontent.com/AustinSteil/generate-files-model/refs/heads/main/LICENSE>
Copyright 2025 Austin Steil

## Features

- **Three Synchronized Inputs**: Weekly hours, shift length, and shifts per week automatically calculate each other
- **Plus/Minus Buttons**: Easy value adjustment without typing
- **Click and Hold**: Hold down plus/minus buttons for rapid increment/decrement
- **Configurable Defaults**: Set custom default values for all three fields
- **Auto-Calculation**: When one value changes, the others update automatically based on the formula: `weeklyHours = shiftLength × shiftsPerWeek`
- **Quarter Hour Precision**: All values round to 0.25 (15-minute increments)
- **Consistent Formatting**: All values display with 2 decimal places (e.g., "40.00") to prevent visual bouncing during rapid changes
- **Compact Layout**: Single-row design that fits neatly in forms
- **Light/Dark Mode**: Full support for both themes using the centralized color system
- **Validation**: Optional required field validation
- **Data Management**: Built-in getData/setData methods for form integration

## Installation

### 1. Add CSS to your HTML

```html
<link rel="stylesheet" href="src/components/work-week-calculator/work-week-calculator.css">
```

### 2. Add JavaScript to your HTML

```html
<script src="src/components/work-week-calculator/work-week-calculator.js"></script>
```

## Basic Usage

```javascript
// Simple work week calculator with defaults (40 hrs/week, 8 hrs/shift, 5 shifts/week)
const workWeekCalc = new WorkWeekCalculator({
    containerId: 'work-week-container',
    id: 'work-schedule',
    name: 'workSchedule',
    label: 'Work Schedule'
});
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `containerId` | string | required | ID of the container element |
| `id` | string | auto-generated | Unique ID for the component |
| `name` | string | same as id | Name for data storage |
| `label` | string | 'Work Schedule' | Label text for the component |
| `defaultWeeklyHours` | number | 40 | Default weekly hours |
| `defaultShiftLength` | number | 8 | Default shift length in hours |
| `defaultShiftsPerWeek` | number | 5 | Default shifts per week |
| `required` | boolean | false | Whether the component is required |
| `onChange` | function | null | Callback when values change |

## Examples

### Custom Defaults

```javascript
// Part-time schedule: 20 hrs/week, 4 hrs/shift, 5 shifts/week
const partTimeCalc = new WorkWeekCalculator({
    containerId: 'part-time-container',
    id: 'part-time-schedule',
    name: 'partTimeSchedule',
    label: 'Part-Time Work Schedule',
    defaultWeeklyHours: 20,
    defaultShiftLength: 4,
    defaultShiftsPerWeek: 5
});
```

### With Change Callback

```javascript
const workWeekCalc = new WorkWeekCalculator({
    containerId: 'work-week-container',
    id: 'work-schedule',
    name: 'workSchedule',
    label: 'Work Schedule',
    onChange: (data) => {
        console.log('Work schedule updated:', data);
        // data = { workSchedule: { weeklyHours: 40, shiftLength: 8, shiftsPerWeek: 5 } }
    }
});
```

### Required Field

```javascript
const workWeekCalc = new WorkWeekCalculator({
    containerId: 'work-week-container',
    id: 'work-schedule',
    name: 'workSchedule',
    label: 'Work Schedule',
    required: true
});

// Later, validate before submission
if (!workWeekCalc.validate()) {
    console.error('Work schedule is required!');
}
```

## Plus/Minus Button Behavior

### Single Click

- Increments or decrements the value by 0.25 (15 minutes)

### Click and Hold

- **Initial click**: Immediately changes value by 0.25
- **After 500ms**: Begins rapid increment/decrement
- **Rapid speed**: Changes value every 100ms (10 times per second)
- **Release**: Stops incrementing/decrementing

This allows users to quickly adjust values without clicking repeatedly.

## How Auto-Calculation Works

The component uses the formula: **weeklyHours = shiftLength × shiftsPerWeek**

All values are rounded to 0.25 (quarter hour increments) for consistency.

### When Weekly Hours Changes

- Shifts per week stays constant
- Shift length is recalculated

**Example**: Change weekly hours from 40 to 30

- Shifts per week: 5 (unchanged)
- Shift length: 30 ÷ 5 = 6 hrs/shift

### When Shift Length Changes

- Shifts per week stays constant
- Weekly hours is recalculated

**Example**: Change shift length from 8 to 10

- Shifts per week: 5 (unchanged)
- Weekly hours: 10 × 5 = 50 hrs/week

### When Shifts Per Week Changes

- Weekly hours stays constant
- Shift length is recalculated

**Example**: Change shifts per week from 5 to 4

- Weekly hours: 40 hrs (unchanged)
- Shift length: 40 ÷ 4 = 10 hrs/shift

## Methods

### getData()

Get the current values from the component.

```javascript
const data = workWeekCalc.getData();
// Returns: { workSchedule: { weeklyHours: 40, shiftLength: 8, shiftsPerWeek: 5 } }
```

### setData(data)

Set values in the component.

```javascript
workWeekCalc.setData({
    workSchedule: {
        weeklyHours: 35,
        shiftLength: 7,
        shiftsPerWeek: 5
    }
});
```

### validate()

Validate the component (checks if all values are greater than 0 when required).

```javascript
const isValid = workWeekCalc.validate();
// Returns: true or false
```

### getElement()

Get the component's DOM element.

```javascript
const element = workWeekCalc.getElement();
```

## HTML Structure

```html
<div id="work-week-container"></div>
```

The component will render:

```html
<div class="work-week-calculator">
    <label class="work-week-label">Work Schedule</label>
    <div class="work-week-inputs">
        <!-- Weekly Hours -->
        <div class="work-week-input-group">
            <label class="work-week-input-label">Weekly Hours</label>
            <div class="work-week-control">
                <button class="work-week-btn work-week-btn-minus">−</button>
                <input type="number" class="work-week-input" value="40" />
                <button class="work-week-btn work-week-btn-plus">+</button>
            </div>
            <span class="work-week-unit">hrs/week</span>
        </div>
        
        <!-- Shift Length -->
        <div class="work-week-input-group">
            <label class="work-week-input-label">Shift Length</label>
            <div class="work-week-control">
                <button class="work-week-btn work-week-btn-minus">−</button>
                <input type="number" class="work-week-input" value="8" />
                <button class="work-week-btn work-week-btn-plus">+</button>
            </div>
            <span class="work-week-unit">hrs/shift</span>
        </div>
        
        <!-- Shifts Per Week -->
        <div class="work-week-input-group">
            <label class="work-week-input-label">Shifts Per Week</label>
            <div class="work-week-control">
                <button class="work-week-btn work-week-btn-minus">−</button>
                <input type="number" class="work-week-input" value="5" />
                <button class="work-week-btn work-week-btn-plus">+</button>
            </div>
            <span class="work-week-unit">shifts/week</span>
        </div>
    </div>
</div>
```

## Integration with Forms

### In Demographics Tab

```javascript
class DemographicsTab {
    constructor(containerId) {
        // ... other code ...
        this.workWeekCalculator = null;
    }

    render() {
        this.container.innerHTML = `
            <div class="demographics-content">
                <!-- Other fields -->
                <div id="work-week-container"></div>
                <!-- More fields -->
            </div>
        `;
    }

    initializeComponents() {
        this.workWeekCalculator = new WorkWeekCalculator({
            containerId: 'work-week-container',
            id: 'demo-work-week',
            name: 'workSchedule',
            label: 'Work Schedule',
            required: false
        });
    }

    getData() {
        return {
            // ... other data ...
            ...this.workWeekCalculator?.getData()
        };
    }

    setData(data) {
        // ... other setData calls ...
        this.workWeekCalculator?.setData(data);
    }

    validate() {
        let isValid = true;
        // ... other validations ...
        if (this.workWeekCalculator && !this.workWeekCalculator.validate()) {
            isValid = false;
        }
        return isValid;
    }
}
```

## Styling

The component uses the centralized color system and automatically supports:

- Light mode
- Dark mode (via `.dark-mode` class)
- Responsive design (mobile-friendly)
- Accessibility features (keyboard navigation, screen readers)
- Reduced motion support
- High contrast mode

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires CSS Grid and Flexbox support

## Dependencies

- Requires `src/color-system/colors.css` for color variables
- No external JavaScript dependencies

## Accessibility

- Proper ARIA labels for buttons
- Keyboard navigation support
- Screen reader friendly
- Focus indicators
- Reduced motion support
- High contrast mode support
