# Cookie Policy

**Last Updated:** October 12, 2025  
**Effective Date:** October 11, 2025

---

## 📋 Table of Contents

1. [What Are Cookies?](#-what-are-cookies)
2. [How We Use Cookies](#-how-we-use-cookies)
3. [Cookie Categories](#-cookie-categories)
4. [Detailed Cookie Information](#-detailed-cookie-information)
5. [Security & Encryption](#️-security--encryption)
6. [User Risks & Responsibilities](#️-user-risks--responsibilities)
7. [Managing Your Cookie Preferences](#️-managing-your-cookie-preferences)
8. [Contact Information](#-contact-information)

---

## 🍪 What Are Cookies?

Cookies are small text files that websites store on your device (computer, tablet, or mobile phone) to remember information about your visit. They help websites provide a better user experience by remembering your preferences and actions.

In our application, cookies serve **one primary purpose**: to allow you to safely close your browser without losing your progress on forms and data entry.

---

## 🎯 How We Use Cookies

**Our cookie usage is 100% user-controlled and privacy-focused:**

- ✅ **User-Initiated Only**: Cookies are created ONLY when you explicitly click the "Save for Later" button then enter the encryption phrase.
- ✅ **Client-Side Encryption**: All data is encrypted on your device before being stored
- ✅ **No Server Transmission**: Your data never leaves your device or gets sent to our servers
- ✅ **User-Controlled Access**: Only you have the encryption key (your chosen phrase)
- ✅ **Temporary Storage**: Cookies automatically expire after 30 days
- ❌ **No Tracking**: We do not track your behavior, analytics, or personal information
- ❌ **No Marketing**: We do not use cookies for advertising or marketing purposes
- ❌ **No Third-Party Sharing**: Your data is never shared with third parties

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

### ❌ We Do NOT Use

- **Performance/Analytics Cookies**: No tracking or analytics
- **Marketing Cookies**: No advertising or personalization
- **Third-Party Cookies**: No external services or tracking

---

## 🔍 Detailed Cookie Information

| Cookie Name | Provider | Purpose | Duration | Security |
|-------------|----------|---------|----------|----------|
| `userFormData` | This Website | Stores your encrypted form data | 30 days | AES-GCM 256-bit encryption |
| `hasStoredData` | This Website | Indicates if you have saved data (for UI) | 30 days | Boolean flag only |
| `dataExpiration` | This Website | Tracks when your saved data expires | 30 days | Timestamp only |

### 🔐 Encryption Details

- **Algorithm**: AES-GCM with 256-bit keys
- **Key Derivation**: PBKDF2 with 100,000 iterations and SHA-256
- **Salt**: Randomly generated 16-byte salt per save operation
- **IV**: Randomly generated 12-byte initialization vector per save operation

---

## 🛡️ Security & Encryption

### How Your Data Is Protected

1. **Client-Side Encryption**: Your data is encrypted on your device using industry-standard AES-GCM encryption
2. **User-Controlled Keys**: Only you know the encryption phrase - we cannot access your data
3. **No Server Storage**: Encrypted data stays in your browser's cookies only
4. **Secure Transmission**: Cookies use `Secure` and `SameSite=Strict` flags when possible

### What This Means

- ✅ **Privacy**: Your actual form data is unreadable without your phrase
- ✅ **Control**: You have complete control over your data
- ✅ **Transparency**: All encryption happens in your browser (client-side)

---

## ⚠️ User Risks & Responsibilities

### 🚨 IMPORTANT: You Accept Full Responsibility

By using the "Save for Later" feature, you acknowledge and accept that:

#### **Security Risks You Assume:**

1. **Phrase Security**: If you choose a weak phrase, your data may be vulnerable
2. **Device Security**: If your device is compromised, your saved data may be at risk
3. **Browser Security**: If your browser is compromised, cookies may be accessible
4. **Shared Devices**: Anyone with access to your device/browser may attempt to access your data
5. **Data Loss**: We cannot recover your data if you forget your phrase
6. **No Backup**: There is no way to recover lost or corrupted cookie data

#### **Your Responsibilities:**

- ✅ Choose a strong, memorable encryption phrase (minimum 4 characters recommended)
- ✅ Keep your encryption phrase secure and private
- ✅ Use this feature only on trusted devices
- ✅ Clear saved data when using shared or public computers
- ✅ Understand that data expires after 30 days
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

- **Save Data**: Click "Save for Later" button (creates cookies)
- **Load Data**: Click "Load Saved Data" and enter your phrase
- **Clear Data**: Click "Clear Saved Data" (removes all cookies)

#### **Option 2: Browser Settings**

You can also manage cookies through your browser:

- **Chrome**: Settings → Privacy and Security → Cookies and other site data
- **Firefox**: Settings → Privacy & Security → Cookies and Site Data
- **Safari**: Preferences → Privacy → Manage Website Data
- **Edge**: Settings → Cookies and site permissions → Cookies and site data

#### **Option 3: Automatic Expiration**

All cookies automatically expire after **30 days** - no action needed.

### 📅 Data Expiration Tracking

When you save data, you'll see messages like:
> "Saved data will expire in 30 days"

You can check remaining time by attempting to load your data.

---

## 📞 Contact Information

If you have questions about this Cookie Policy or our data practices:

**Developer**: Austin Steil  
**Project**: Document Generator  
**Policy Version**: 1.0.0

---

## 📋 Policy Updates

This policy may be updated to reflect changes in our cookie usage. When updates occur:

- The "Last Updated" date at the top will change
- Significant changes will be highlighted in the application
- Continued use after updates constitutes acceptance of new terms

---

## 🔗 Related Information

- **Privacy by Design**: This application is built with privacy as the primary concern
- **Open Source**: The encryption implementation is transparent and auditable
- **No External Dependencies**: No third-party tracking or analytics services

---

*This cookie policy is designed to be comprehensive and transparent about our minimal cookie usage. Your privacy and control over your data are our top priorities.*
