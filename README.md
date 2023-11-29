# Veralidity_WalletBridge for Adobe Commerce Magento 2 OpenSource

## Introduction

Welcome to the **Veralidity_WalletBridge**, a dynamic extension for Adobe Commerce Magento 2 OpenSource. This innovative Proof of Concept seamlessly integrates various wallets for the Cardano blockchain into Magento 2. It's designed to leverage the best practices of Magento, utilizing LESS, JavaScript, `requirejs`, and `data-mage-init`.

## PoC

This is a Proof of Concept, and is not finalized, nor does it incorporate everything that the original authors had implemented. This version does not take into acount mobile wallets yet, and therefore you should hide the wallet icon on mobile via CSS or build upon what we've started and make it better. If you encounter issues we're more than happy to help to an extent, but this is provided as-is, and without gaurantees or warantees. Use at your own risk. With that, have fun, cheers.

## Key Features and Customization Advantages

- **Enhanced UI Integration**: 
  - Utilizes Magento's `.lib-dropdown();` method, as outlined in [Adobe's developer guide](https://developer.adobe.com/commerce/frontend-core/javascript/jquery-widgets/dropdown/), ensuring the wallet dropdown is consistent with Magento's native UI elements like the currency switcher.
  - Streamlines the dropdown menu creation, focusing on generating simple list items (`<li>`) in the script for a cleaner and more maintainable approach.

- **Custom Styling for Wallet Icons**: 
  - Custom styling is a significant enhancement in the `cardano-connect.js` script. This approach delegates the rendering of wallet icons to the CSS, making the dropdown much easier to customize and maintain. 
  - Each wallet is assigned a unique CSS class within the `_less` file. This method allows for straightforward customization of wallet icons without altering the JavaScript logic. Examples include:
    ```css
    .yoroi-logo {
        background-image: url("../Veralidity_WalletBridge/images/wallets/yoroi-logo.png");
    }

    .lace-logo {
        background-image: url("../Veralidity_WalletBridge/images/wallets/lace-logo.png");
    }
    ```
  - By separating the visual styling from the JavaScript, this design choice significantly simplifies the process of updating or changing wallet icons, providing a flexible and user-friendly way to customize the appearance of the dropdown.

## Frontend Features

- **Wallet Icon in Header**: Adds a visually appealing wallet icon next to the shopping cart and currency switcher in the Magento 2 frontend header.
- **Interactive Dropdown Menu**: A user-friendly dropdown menu, activated by the wallet icon, displays all available wallets, simplifying the process of connecting or disconnecting to browser-based wallets.
- **Currency Switching Logic**: Automatically switches the shopping currency to ₳ ADA (Cardano) when a Cardano-supported wallet is connected.

## Ongoing Development and Future Enhancements

- **Currency Precision**: Integrates additional Magento extensions for accurate ₳ ADA currency handling.
- **Although the UI works on mobile, we need to handle the mobile wallet integration itself, so if integrating this into your project you will want to build upon this or hide the wallet icon via CSS for mobile only so you don't confuse people as to why they can't connect to a wallet.
- **Continuous Improvement**: Committed to continuous enhancements and feature additions, including expanding wallet functionalities.

---

**Note**: Veralidity_WalletBridge is a part of our initiative to blend blockchain technology with e-commerce. Your feedback and contributions are invaluable to us as we continue to develop and enhance this extension.

Stay tuned for exciting updates and new features from Veralidity_WalletBridge!
