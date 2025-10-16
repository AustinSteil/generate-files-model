# Save Data System

Client-side encrypted data storage system for securely saving and loading form data with user-controlled encryption.

## Overview

The Save Data system provides a complete solution for users to save their form progress locally on their device with high-grade encryption. All data is encrypted client-side using the user's chosen passphrase, ensuring that only the user can decrypt and access their information. The system uses localStorage for storage (with fallback to cookies for backward compatibility) and includes a floating UI button for easy access to save/load/clear operations.

## Key Features

- **Client-Side Encryption**: AES-GCM 256-bit encryption with PBKDF2 key derivation
- **User-Controlled**: Only users can encrypt/decrypt their data with their passphrase
- **No Server Storage**: Data never leaves the user's device
- **Automatic Expiration**: Saved data expires after 30 days
- **State-Aware UI**: Floating button adapts based on whether data is saved and unlocked
- **Session Passphrase Caching**: Passphrase stored in memory during session for quick updates
- **Backward Compatible**: Automatic migration from cookies to localStorage
- **Dynamic Field Support**: Automatically adapts to changes in `src/fields/vars.json`

## Files

### Core Modules

- **`secure-storage.js`** - Encryption/decryption engine and storage operations
- **`storage-data-manager.js`** - Form data collection, save/load/clear operations
- **`storage-ui-manager.js`** - UI initialization and state management
- **`floating-storage-button.js`** - Floating button component with split-button dropdown
- **`phrase-modal.js`** - Modal for securely collecting user passphrases

### Documentation

- **`STORAGE-POLICY.md`** - Comprehensive data storage and privacy policy
- **`COOKIE-POLICY.md`** - Cookie usage and third-party tracking disclosure
- **`STORAGE-POLICY.pdf`** - PDF version of storage policy
- **`COOKIE-POLICY.pdf`** - PDF version of cookie policy

## Architecture

### Data Flow

```text
User Action (Save/Load/Clear)
    ↓
FloatingStorageButton (UI)
    ↓
StorageUIManager (State Management)
    ↓
StorageDataManager (Data Operations)
    ↓
SecureStorage (Encryption/Decryption)
    ↓
localStorage / Cookies (Persistent Storage)
```

### Encryption Process

1. **Passphrase Collection** - User enters passphrase via PhraseModal
2. **Key Derivation** - PBKDF2 derives 256-bit key from passphrase (100,000 iterations)
3. **Data Encryption** - AES-GCM encrypts form data with random IV
4. **Storage** - Salt + IV + Encrypted Data stored as Base64 in localStorage
5. **Expiration** - Timestamp stored for automatic 30-day expiration

### Decryption Process

1. **Passphrase Collection** - User enters passphrase via PhraseModal
2. **Data Retrieval** - Encrypted data loaded from localStorage
3. **Component Extraction** - Salt and IV extracted from stored data
4. **Key Derivation** - Same PBKDF2 process with extracted salt
5. **Data Decryption** - AES-GCM decrypts data with extracted IV
6. **Form Population** - Decrypted data populates form fields

## Module Documentation

### SecureStorage (`secure-storage.js`)

Handles all encryption, decryption, and storage operations.

**Key Methods:**

- `deriveKey(userPhrase, salt)` - Derives encryption key from passphrase
- `encryptData(data, userPhrase)` - Encrypts form data
- `decryptData(encryptedBase64, userPhrase)` - Decrypts form data
- `saveFormData(formData, userPhrase)` - Saves encrypted data to localStorage
- `loadFormData(userPhrase)` - Loads and decrypts data from localStorage
- `hasStoredData()` - Checks if data exists
- `clearStoredData()` - Deletes all stored data
- `getRemainingDays()` - Returns days until expiration
- `getExpirationDays()` - Returns default expiration period

**Storage Details:**

- **Storage Method**: localStorage (primary), cookies (fallback)
- **Encryption**: AES-GCM 256-bit
- **Key Derivation**: PBKDF2 with 100,000 iterations
- **Salt**: 16 bytes (random)
- **IV**: 12 bytes (random)
- **Expiration**: 30 days

### StorageDataManager (`storage-data-manager.js`)

Manages form data operations and user interactions.

**Key Methods:**

- `handleSaveData(isUpdate)` - Saves current form data with encryption
- `handleLoadData()` - Loads and decrypts saved data
- `handleClearData()` - Clears all saved data with confirmation
- `promptForPhrase(action)` - Shows phrase modal for save/load
- `populateForm(formData)` - Populates form with loaded data
- `hasStoredData()` - Checks if data exists
- `getRemainingDays()` - Gets days until expiration

**Features:**

- Collects form data from all tabs
- Validates data before saving
- Caches passphrase in session for quick updates
- Handles both new saves and updates
- Supports both tab-based and legacy DOM-based form population
- Automatically adapts to `src/fields/vars.json` changes

### StorageUIManager (`storage-ui-manager.js`)

Manages UI state and user interactions.

**Key Methods:**

- `initialize()` - Initializes floating button and checks for saved data
- `initializeFloatingButton()` - Creates floating storage button
- `checkForSavedDataOnLoad()` - Prompts user if saved data exists
- `showSavedDataAlert()` - Shows modal about found saved data
- `handleStorageOperation(operation, success)` - Updates UI after operations
- `refreshStorageUI()` - Refreshes floating button state

**Features:**

- Detects saved data on page load
- Shows user-friendly alerts
- Manages floating button state transitions
- Handles unlocked/locked states
- Provides operation feedback

### FloatingStorageButton (`floating-storage-button.js`)

Floating button component for storage operations.

**Modes:**

- **Single Button Mode** - When no data saved: "Save for Later"
- **Dropdown Mode (Locked)** - When data saved but not unlocked: "Load Saved Data" + "Clear Saved Data"
- **Dropdown Mode (Unlocked)** - When data loaded: "Update Data" + "Clear Saved Data"

**Key Methods:**

- `updateButtonState()` - Updates button based on stored data
- `createSingleButtonMode()` - Creates save button
- `createDropdownMode()` - Creates dropdown with options
- `markAsUnlocked()` - Marks data as unlocked after successful load
- `resetUnlockedState()` - Resets unlocked state
- `refresh()` - Refreshes button state

**Features:**

- State-aware UI that adapts to data availability
- Split-button dropdown for multiple options
- Visual feedback with emoji icons
- Unlocked state indicator styling
- Responsive design

### PhraseModal (`phrase-modal.js`)

Modal component for securely collecting user passphrases.

**Key Methods:**

- `show(action)` - Shows modal for 'save' or 'load' action
- `createFormContent(action)` - Creates form HTML
- `setupInputListeners()` - Sets up input validation
- `validatePhrase()` - Real-time phrase validation
- `isValidPhrase(phrase)` - Checks if phrase meets requirements
- `showError(message)` - Displays error message
- `hideError()` - Hides error message

**Features:**

- Minimum 4-character passphrase requirement
- Real-time validation feedback
- Enter key support
- Auto-focus on input
- Error display with styling
- Expiration information display
- Uses centralized Modal component

## Usage

### Basic Setup

```javascript
// Initialize in main document generator
const secureStorage = new SecureStorage();
const storageDataManager = new StorageDataManager(documentGenerator);
const storageUIManager = new StorageUIManager(documentGenerator);

// Initialize UI
await storageUIManager.initialize();
```

### Saving Data

```javascript
// User clicks "Save for Later" button
// FloatingStorageButton triggers:
documentGenerator.handleSaveData();

// This:
// 1. Collects form data
// 2. Shows PhraseModal
// 3. Encrypts data with passphrase
// 4. Stores in localStorage
// 5. Updates UI to unlocked state
```

### Loading Data

```javascript
// User clicks "Load Saved Data" button
// FloatingStorageButton triggers:
documentGenerator.handleLoadData();

// This:
// 1. Shows PhraseModal
// 2. Retrieves encrypted data
// 3. Decrypts with passphrase
// 4. Populates form fields
// 5. Updates UI to unlocked state
```

### Updating Data

```javascript
// User clicks "Update Data" button (when unlocked)
// FloatingStorageButton triggers:
documentGenerator.handleSaveData(true);

// This:
// 1. Collects form data
// 2. Uses cached passphrase (no modal)
// 3. Encrypts and saves
// 4. Maintains unlocked state
```

### Clearing Data

```javascript
// User clicks "Clear Saved Data" button
// FloatingStorageButton triggers:
documentGenerator.handleClearData();

// This:
// 1. Shows confirmation dialog
// 2. Deletes all stored data
// 3. Clears session passphrase
// 4. Resets UI to single button mode
```

## Security

### Encryption Details

- **Algorithm**: AES-GCM (Authenticated Encryption with Associated Data)
- **Key Size**: 256-bit
- **Key Derivation**: PBKDF2 with SHA-256
- **Iterations**: 100,000 (OWASP recommended minimum)
- **Salt**: 16 bytes (cryptographically random)
- **IV**: 12 bytes (cryptographically random per encryption)

### Security Guarantees

- ✅ **Confidentiality**: AES-GCM encryption ensures data cannot be read without passphrase
- ✅ **Integrity**: GCM mode provides authentication tag to detect tampering
- ✅ **No Server Access**: Data never transmitted to servers
- ✅ **User Control**: Only user knows the passphrase
- ⚠️ **Passphrase Strength**: Security depends on passphrase quality
- ⚠️ **Device Security**: Data is only as secure as the device it's stored on

### User Responsibilities

- Choose a strong, memorable passphrase (minimum 4 characters, longer is better)
- Never share your passphrase with others
- Remember your passphrase - if forgotten, data is unrecoverable
- Ensure your device is secure and not compromised
- Clear data if you no longer need it

## Data Expiration

- **Default Expiration**: 30 days from save date
- **Automatic Cleanup**: Expired data is not automatically deleted but becomes inaccessible
- **Manual Clearing**: Users can manually clear data at any time
- **Expiration Display**: Users see remaining days in alerts and modals

## Browser Compatibility

- **localStorage**: All modern browsers (IE 8+)
- **Web Crypto API**: All modern browsers (IE not supported)
- **Fallback**: Automatic migration from cookies to localStorage

## Policies

### Storage Policy

See `STORAGE-POLICY.md` for comprehensive information about:

- What data is stored
- How data is encrypted
- User privacy and control
- Data retention and expiration
- User risks and responsibilities

### Cookie Policy

See `COOKIE-POLICY.md` for information about:

- Cookie usage (legacy)
- Third-party cookies (QuillJS CDN)
- User tracking (none)
- Cookie management

## Integration with vars.json

The storage system automatically adapts to changes in `src/fields/vars.json`:

- **No Code Changes Required**: Adding/removing fields in vars.json automatically updates storage
- **Dynamic Field Mapping**: All fields defined in vars.json are automatically saved/loaded
- **Tab Distribution**: Fields are automatically mapped to appropriate tabs based on field names

## Troubleshooting

### Data Won't Save

- Check browser console for errors
- Verify localStorage is not disabled
- Check if localStorage quota is exceeded
- Ensure passphrase is at least 4 characters

### Data Won't Load

- Verify you're using the correct passphrase
- Check if data has expired (30 days)
- Try clearing browser cache
- Check browser console for decryption errors

### Passphrase Forgotten

- **Data is unrecoverable** - AES-GCM encryption means data cannot be accessed without the correct passphrase
- Clear the data and start fresh
- Use a more memorable passphrase next time

### localStorage Quota Exceeded

- Clear some saved data
- Reduce form data size
- Use a different browser (different quota limits)

## Future Enhancements

Potential improvements:

- Multiple save slots (save different versions)
- Cloud backup option (with end-to-end encryption)
- Passphrase recovery questions
- Biometric unlock support
- Automatic save intervals
- Data compression before encryption
- Export/import encrypted backups
- Sync across devices (with user control)

## Dependencies

- **Modal Component** (`src/components/modal/`) - For phrase and alert modals
- **Dropdown Component** (`src/components/dropdown/`) - For floating button dropdown
- **Web Crypto API** - For encryption/decryption
- **localStorage API** - For data persistence

## Related Files

- Form data collection: `main.js`
- Tab management: `src/tabs/`
- Field definitions: `src/fields/vars.json`
- Modal component: `src/components/modal/`
- Dropdown component: `src/components/dropdown/`
