# Job Demands Section

Comprehensive job analysis demands collection modules for the Jobs tab. This directory contains specialized form sections for capturing detailed physical, cognitive, environmental, and mobility demands of job positions.

## About

Author: Austin Steil  
Version: 1.0.0
Created October 18, 2025
Updated October 18, 2025

## License & Copyright

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
Live License Page Link: <https://raw.githubusercontent.com/AustinSteil/generate-files-model/refs/heads/main/LICENSE>
Copyright 2025 Austin Steil

## Overview

The demands section is a critical part of the job analysis workflow, allowing users to document the specific physical and cognitive requirements of a position. Each module handles a distinct category of job demands and provides consistent data management through `render()`, `getData()`, `setData()`, and `validate()` methods.

## Modules

### 1. Classification of Work (`classification-of-work.js`)

Handles overall job classification and work characteristics.

**Fields:**

- Physical Demand Level (DOT) - Sedentary, Light, Medium, Heavy, Very Heavy
- Work Schedule Type - Regular, Shift, On-Call, Flexible
- Work Pace - Self-Paced, Moderate, Fast, Machine-Paced
- Supervision Level - Close, Moderate, Minimal, Independent
- Additional Classification Notes - Free-form text for DOT codes and special considerations

**Data Structure:**

```javascript
{
    physicalLevel: 'medium',
    schedule: 'shift',
    pace: 'fast',
    supervision: 'moderate',
    additional: 'Notes about classification...'
}
```

### 2. Cognitive and Sensory Demands (`cognitive-and-sensory-demands.js`)

Captures mental and sensory requirements of the position.

**Fields:**

- Mental Concentration/Focus - Low, Moderate, High, Very High
- Communication Requirements - Minimal, Moderate, Extensive, Critical
- Vision Requirements - Not Required, General, Close, Distance, Color, Depth Perception
- Hearing Requirements - Not Required, General, Conversation, Critical
- Additional Cognitive/Sensory Requirements - Free-form text

**Data Structure:**

```javascript
{
    concentration: 'high',
    communication: 'extensive',
    vision: 'close',
    hearing: 'general',
    additional: 'Additional sensory requirements...'
}
```

### 3. Environmental Demands (`environmental-demands.js`)

Documents environmental conditions and exposures.

**Fields:**

- Weather Exposure - None, Occasional, Frequent, Constant
- Noise Level - Quiet, Moderate, Loud, Very Loud
- Hazard Exposure - None, Minimal, Moderate, High
- Temperature Extremes - None, Occasional, Frequent, Constant
- Additional Environmental Factors - Free-form text for chemicals, dust, fumes, etc.

**Data Structure:**

```javascript
{
    weather: 'frequent',
    noise: 'loud',
    hazards: 'moderate',
    temperature: 'occasional',
    additional: 'Additional environmental factors...'
}
```

### 4. Lifting, Pushing, and Pulling (`lifting-pushing-and-pulling.js`)

Specifies weight and force requirements.

**Fields:**

- Maximum Weight Lifted - Sedentary (10 lbs), Light (20 lbs), Medium (50 lbs), Heavy (100 lbs), Very Heavy (100+ lbs)
- Lifting Frequency - Never, Occasionally (0-33%), Frequently (34-66%), Constantly (67-100%)
- Pushing/Pulling Requirements - None, Light, Moderate, Heavy
- Carrying Requirements - Never, Occasionally, Frequently, Constantly
- Additional Lifting/Pushing/Pulling Details - Free-form text

**Data Structure:**

```javascript
{
    maxWeight: 'heavy',
    frequency: 'frequently',
    pushingPulling: 'moderate',
    carrying: 'frequently',
    additional: 'Specific items and distances...'
}
```

### 5. Mobility Demands (`mobility-demands.js`)

Captures movement and positioning requirements.

**Fields:**

- Climbing (stairs, ladders, etc.) - Never, Occasionally, Frequently, Constantly
- Balancing - Never, Occasionally, Frequently, Constantly
- Kneeling/Crouching - Never, Occasionally, Frequently, Constantly
- Reaching/Handling - Never, Occasionally, Frequently, Constantly
- Additional Mobility Requirements - Free-form text

**Data Structure:**

```javascript
{
    climbing: 'occasionally',
    balancing: 'never',
    kneeling: 'frequently',
    reaching: 'constantly',
    additional: 'Additional mobility requirements...'
}
```

### 6. Physical Demands (`physical-demands.js`)

Uses the reusable Table component to capture frequency of specific physical activities.

**Activities Tracked:**

- Awkward position
- Bending over
- Carrying
- Driving
- Fine motor tasks
- Gripping or grasping
- Handling
- Kneeling
- Lifting
- Lifting overhead
- Pulling
- Pushing
- Reaching
- Sitting
- Squatting or crouching
- Standing
- Talking and hearing
- Twisting or turning
- Walking

**Frequency Options:**

- Not Applicable
- Occasional
- Frequent
- Constant

**Data Structure:**

```javascript
{
    'Awkward position': { 'Not Applicable': true, 'Occasional': false, ... },
    'Bending over': { 'Not Applicable': false, 'Occasional': true, ... },
    // ... more activities
}
```

## Common Interface

All modules follow a consistent interface:

### Methods

- `render()` - Returns HTML string for the section
- `getData()` - Returns object with current form data
- `setData(data)` - Populates form with provided data
- `validate()` - Validates the section (returns boolean)

### Usage Pattern

```javascript
// Create instance
const section = new ClassificationOfWork();

// Render to DOM
container.innerHTML = section.render();

// Get data
const data = section.getData();

// Set data
section.setData(savedData);

// Validate
if (section.validate()) {
    // Process data
}
```

## Integration with Jobs Tab

These modules are used within the Jobs tab to build a comprehensive job analysis form. They are typically:

1. Instantiated when the Jobs tab is loaded
2. Rendered into the appropriate container
3. Populated with existing data if available
4. Validated before allowing tab navigation
5. Collected and saved as part of the overall job record

## Data Persistence

All demand data is managed through the application's storage system and can be:

- Saved to cookies/localStorage
- Exported to Word documents
- Included in PDF reports
- Loaded from previous sessions

## Validation

Each module includes a `validate()` method that can be enhanced with specific business rules. Currently, most modules have placeholder validation that returns `true`. Custom validation can be added as needed for:

- Required field checking
- Value range validation
- Logical consistency checks
- Cross-field validation

## Styling

All modules use consistent styling through:

- `.demands-section` - Main section container
- `.demand-item` - Individual form field wrapper
- `.section-description` - Descriptive text
- Standard form controls (select, textarea)

Styling is inherited from the main application CSS and respects the color system and dark mode settings.

## Future Enhancements

Potential improvements to this module:

- Add custom validation rules per section
- Implement conditional field visibility
- Add field-level help tooltips
- Create summary/comparison views
- Add template-based defaults
- Implement field dependencies
