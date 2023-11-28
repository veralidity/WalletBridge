# Veralidity_WalletBridge for Adobe Commerce Magento 2 OpenSource

## Introduction

Welcome to the **Veralidity_WalletBridge**, a cutting-edge extension for Adobe Commerce Magento 2 OpenSource. This extension represents an innovative Proof of Concept that seamlessly integrates CIP-30 wallets for the Cardano blockchains into Magento 2, leveraging the power of JavaScript. It's crafted meticulously to align with Magento's best practices, utilizing `requirejs` and `data-mage-init`.

## Key Features and Modifications

- **Cardano Connect Integration**: Incorporates a heavily adapted version of the script from the [Cardano Foundation's cardano-connect-with-wallet](https://github.com/cardano-foundation/cardano-connect-with-wallet/blob/main/html/cardano-connect.js).
- **UI Enhancement**: Overhauls the original dropdown menu functionality, streamlining it to produce list items (`<li>`) directly within the script, thereby simplifying the code and enhancing readability.
- **Magento Native Dropdown**: Implements the new dropdown feature using Magento's `data-mage-init` functionality, as detailed in [Adobe's developer guide](https://developer.adobe.com/commerce/frontend-core/javascript/init/).
- **Bundle Update**: Refines `bundle-latest/index.js` from the [Cardano Foundation](https://cardano-foundation.github.io/cardano-connect-with-wallet/bundle-latest/index.js), which includes improvements like unminifying the code for enhanced clarity, updating wallet logos for accuracy, and extending wallet support.

## Frontend Integration

- **Wallet Icon in Header**: Adds a stylish wallet icon to the Magento 2 frontend header, adjacent to the shopping cart and currency switcher icons.
- **Interactive Dropdown Menu**: Features an interactive dropdown menu, triggered by the wallet icon, which lists all available wallets, enabling users to effortlessly connect or disconnect to their browser-based wallets.
- **Currency Switching Logic**: Integrates JavaScript logic to switch the shopping currency to ₳ ADA (Cardano) upon connecting to a Cardano-supported wallet, offering a seamless shopping experience in ₳ ADA.
- **Mobile Menu Compatibility**: Ensures a cohesive user experience by adding the wallet icon and dropdown to the "Settings" tab in the mobile menu, positioned below the Currency Switcher options.

## Additional Extensions

- **₳ ADA Currency Precision**: Leverages additional Magento extensions developed by our team to enable currency precision for ₳ ADA. These extensions will be released to the public soon.

## Current Status and Future Plans

This extension is an ongoing project with continuous enhancements and feature additions planned. Future updates will introduce more wallet functionalities and improvements.

---

**Note**: This extension is part of a series of contributions aiming to bridge the gap between e-commerce and blockchain technologies. We welcome feedback, suggestions, and contributions from the community to further enhance this project.

Stay tuned for more updates and features!

---

Thank you for exploring Veralidity_WalletBridge. We're excited to be at the forefront of integrating blockchain technology into the e-commerce space, and we look forward to your support and feedback!
