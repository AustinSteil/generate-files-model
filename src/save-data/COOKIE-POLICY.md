# Cookie Policy

**Last Updated:** October 16, 2025
**Effective Date:** October 16, 2025

---

## About

Author: Austin Steil  
Version: 1.0.0
Created October 18, 2025
Updated October 18, 2025

## License & Copyright

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
Live License Page Link: <https://raw.githubusercontent.com/AustinSteil/generate-files-model/refs/heads/main/LICENSE>
Copyright 2025 Austin Steil

## 📋 Table of Contents

1. [What Are Cookies?](#-what-are-cookies)
2. [How We Use Cookies](#-how-we-use-cookies)
3. [Cookie Categories](#-cookie-categories)
4. [Detailed Cookie Information](#-detailed-cookie-information)
5. [Data Storage (localStorage)](#localstorage-items-current-storage-method)
6. [Security & Encryption](#️-security--encryption)
7. [User Risks & Responsibilities](#️-user-risks--responsibilities)
8. [Managing Your Cookie Preferences](#️-managing-your-cookie-preferences)

---

## 🍪 What Are Cookies?

Cookies are small text files that websites store on your device (computer, tablet, or mobile phone) to remember information about your visit. They help websites provide a better user experience by remembering your preferences and actions.

**Important Update (October 2025):** This application **no longer uses cookies** for storing your form data. We now use **localStorage** (browser local storage) which provides better capacity and reliability. However, third-party cookies from the QuillJS library CDN are still used for library usage analytics.

---

## 🎯 How We Use Cookies

**Our cookie usage is 100% user-controlled and privacy-focused:**

- ✅ **User-Initiated Only**: Our cookies are created ONLY when you explicitly click the "Save for Later" button then enter the encryption phrase.
- ✅ **Client-Side Encryption**: All data is encrypted on your device before being stored
- ✅ **No Server Transmission**: Your data never leaves your device or gets sent to our servers
- ✅ **User-Controlled Access**: Only you have the encryption key (your chosen phrase)
- ✅ **Temporary Storage**: Our cookies automatically expire after 30 days
- ❌ **No Tracking**: We do not track your behavior, analytics, or personal information
- ❌ **No Marketing**: We do not use cookies for advertising or marketing purposes
- ❌ **No Third-Party Sharing**: Your data is never shared with third parties (QuillJS analytics track library usage only, not your data)

### Third-Party CDN Cookies

**Note:** This application loads the QuillJS rich text editor library from a CDN (`cdn.quilljs.com`). The QuillJS CDN sets Google Analytics cookies to track library usage statistics. These cookies:

- Are set by QuillJS/Google Analytics (not by us)
- Track QuillJS library usage across websites (not your personal form data)
- Are used by QuillJS developers to understand library adoption
- Do **NOT** have access to your encrypted form data
- Expire after approximately 2 years
- Are subject to [Google's Privacy Policy](https://policies.google.com/privacy) and [QuillJS's practices](https://quilljs.com/)

---

## 📊 Cookie Categories

### Strictly Necessary Cookies ⚠️

These cookies are essential for the basic functionality you've requested:

| **Purpose** | **User Control** | **Can Opt Out?** |
|-------------|------------------|------------------|
| Form data preservation | User-initiated only | ✅ Yes - don't use "Save for Later" |
| Session state management | Automatic when saving | ✅ Yes - clear saved data anytime |

### Functional Cookies 🔧

| **Purpose** | **User Control** | **Can Opt Out?** |
|-------------|------------------|------------------|
| Remember if you have saved data | Automatic when saving | ✅ Yes - clear saved data |
| Track data expiration dates | Automatic when saving | ✅ Yes - clear saved data |

### ⚠️ Third-Party Analytics (QuillJS Library)

| **Purpose** | **Source** | **Can Opt Out?** |
|-------------|------------|------------------|
| QuillJS library usage tracking | Google Analytics via QuillJS CDN | ✅ Yes - block third-party cookies |

**Note:** These analytics track how many websites use QuillJS, not your personal data or form content.

### ❌ We Do NOT Use

- **First-Party Analytics Cookies**: We do not track your behavior or usage
- **Marketing Cookies**: No advertising or personalization
- **Social Media Cookies**: No social media tracking or sharing buttons

---

## 🔍 Detailed Cookie Information

### First-Party Cookies (This Website)

**We no longer use first-party cookies for storing form data.** As of October 16, 2025, all form data is stored in **localStorage** instead of cookies.

**Why the change?**

- Cookies have a 4 KB size limit, which was insufficient for complex forms with table data
- localStorage provides 5-10 MB capacity, allowing us to store larger, more complex forms
- Same security: We use the exact same AES-GCM 256-bit encryption

**Legacy cookie cleanup:** If you have old cookie-based data, it will be automatically migrated to localStorage when you load it.

### localStorage Items (Current Storage Method)

| Item Name | Purpose | Encrypted | Size |
|-----------|---------|-----------|------|
| `userFormData` | Your encrypted form data | ✅ Yes (AES-GCM 256-bit) | Variable (10-500 KB typical) |
| `hasStoredData` | Flag indicating data exists | ❌ No | ~10 bytes |
| `dataExpiration` | Timestamp for expiration | ❌ No | ~20 bytes |

**For full details on localStorage security, see [STORAGE-POLICY.md](./STORAGE-POLICY.md)**

### Third-Party Cookies (QuillJS CDN)

| Cookie Name | Provider | Purpose | Duration | Domain |
|-------------|----------|---------|----------|--------|
| `_ga` | Google Analytics (via QuillJS) | Track QuillJS library usage statistics | ~2 years | `.quilljs.com` |
| `_ga_B37E2WMSPW` | Google Analytics (via QuillJS) | Enhanced analytics for QuillJS usage | ~2 years | `.quilljs.com` |

**Important:** These cookies are set by the QuillJS CDN to track how many websites use their library. They track library usage patterns, **NOT your personal form data or information**. Your encrypted form data is stored in localStorage and is completely inaccessible to these analytics cookies.

### 🔐 Encryption Details (localStorage)

Our localStorage data uses the same military-grade encryption previously used for cookies:

- **Algorithm**: AES-GCM with 256-bit keys
- **Key Derivation**: PBKDF2 with 100,000 iterations and SHA-256
- **Salt**: Randomly generated 16-byte salt per save operation
- **IV**: Randomly generated 12-byte initialization vector per save operation

**For complete security details, see [STORAGE-POLICY.md](./STORAGE-POLICY.md)**

---

## 🛡️ Security & Encryption

### How Your Data Is Protected

1. **Client-Side Encryption**: Your data is encrypted on your device using industry-standard AES-GCM encryption
2. **User-Controlled Keys**: Only you know the encryption phrase - we cannot access your data
3. **No Server Storage**: Encrypted data stays in your browser's localStorage only
4. **Local Storage Only**: Data never leaves your device

### What This Means

- ✅ **Privacy**: Your actual form data is unreadable without your phrase
- ✅ **Control**: You have complete control over your data
- ✅ **Transparency**: All encryption happens in your browser (client-side)
- ✅ **Capacity**: localStorage can handle large, complex forms without size limits

---

## ⚠️ User Risks & Responsibilities

### 🚨 IMPORTANT: You Accept Full Responsibility

By using the "Save for Later" feature, you acknowledge and accept that:

#### **Security Risks You Assume:**

1. **Phrase Security**: If you choose a weak phrase, your data may be vulnerable
2. **Device Security**: If your device is compromised, your saved data may be at risk
3. **Browser Security**: If your browser is compromised, localStorage may be accessible
4. **Shared Devices**: Anyone with access to your device/browser may attempt to access your data
5. **Data Loss**: We cannot recover your data if you forget your phrase
6. **No Backup**: There is no way to recover lost or corrupted localStorage data

#### **Your Responsibilities:**

- ✅ Choose a strong, memorable encryption phrase (minimum 4 characters recommended)
- ✅ Keep your encryption phrase secure and private
- ✅ Use this feature only on trusted devices
- ✅ Clear saved data when using shared or public computers
- ✅ Understand that our saved data expires after 30 days
- ✅ Accept that data recovery is impossible without your phrase

#### **Limitations of Our Security:**

- 🔒 We cannot access your data (even to help recover it)
- 🔒 We cannot reset or recover forgotten phrases
- 🔒 We cannot guarantee protection against all attack vectors
- 🔒 We cannot protect against device-level compromises

### ⚖️ Legal Disclaimer

**THE RISK IS 100% ON YOU.** By using the save functionality, you agree that:

- You use this feature at your own risk
- We are not liable for any data loss, theft, or compromise
- You will not hold us responsible for security breaches on your device
- You understand the technical limitations and accept them

---

## 🎛️ Managing Your Cookie Preferences

### How to Control Cookies

#### **Option 1: Use Our Built-In Controls**

- **Save Data**: Click "Save for Later" button (stores encrypted data in localStorage)
- **Load Data**: Click "Load Saved Data" and enter your phrase
- **Clear Data**: Click "Clear Saved Data" (removes localStorage data, not QuillJS cookies)

#### **Option 2: Browser Settings - localStorage**

You can also manage localStorage through your browser:

- **Chrome/Edge**: Press F12 → Application tab → Local Storage → your site URL → Right-click → Clear
- **Firefox**: Press F12 → Storage tab → Local Storage → your site URL → Right-click → Delete All
- **Safari**: Preferences → Privacy → Manage Website Data → Find your site → Remove

#### **Option 3: Browser Settings - Cookies (QuillJS only)**

To manage third-party QuillJS cookies:

- **Chrome**: Settings → Privacy and Security → Cookies and other site data
- **Firefox**: Settings → Privacy & Security → Cookies and Site Data
- **Safari**: Preferences → Privacy → Manage Website Data
- **Edge**: Settings → Cookies and site permissions → Cookies and site data

#### **Option 4: Automatic Expiration**

**Our localStorage data** is marked to expire after **30 days** and will be automatically cleared on next visit.

**Third-party QuillJS cookies** expire after approximately **2 years**.

#### **Option 5: Managing Third-Party Analytics Cookies**

QuillJS sets Google Analytics cookies that expire after approximately 2 years. To manage these:

- **Block Third-Party Cookies**: Use browser settings to block third-party cookies
  - Chrome: Settings → Privacy and Security → Third-party cookies → Block third-party cookies
  - Firefox: Settings → Privacy & Security → Enhanced Tracking Protection → Strict
  - Safari: Preferences → Privacy → Prevent cross-site tracking (enabled by default)
- **Clear Existing Cookies**: Manually delete `.quilljs.com` cookies from your browser
- **Privacy Mode**: Use incognito/private browsing mode for automatic cookie deletion
- **Ad Blockers**: Many ad blockers automatically block Google Analytics cookies

**Important:** Blocking these analytics cookies will **NOT** affect the rich text editor functionality. The QuillJS library will still work normally; only the usage tracking will be blocked.

### 📅 Data Expiration Tracking

When you save data, you'll see messages like:
> "Saved data will expire in 30 days"

You can check remaining time by attempting to load your data.

---

## 📋 Policy Updates

This policy may be updated to reflect changes in our cookie and storage usage. When updates occur:

- The "Last Updated" date at the top will change
- Significant changes will be highlighted in the application
- Continued use after updates constitutes acceptance of new terms

### Recent Updates

- **v1.0.0 (October 18, 2025)**: Initial cookie policy

---

## 🔗 Related Information

- **Privacy by Design**: This application is built with privacy as the primary concern
- **Full Storage Details**: See [STORAGE-POLICY.md](./STORAGE-POLICY.md) for complete information on localStorage security
- **Open Source**: The encryption implementation is transparent and auditable
- **Minimal External Dependencies**: Only CDN-hosted libraries (QuillJS) for rich text editing functionality
- **No User Tracking**: We do not track users; QuillJS CDN tracks library usage only (not user behavior)

---

*This cookie policy is designed to be comprehensive and transparent about our minimal cookie usage. Your privacy and control over your data are our top priorities.*
