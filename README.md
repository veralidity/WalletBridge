
Veralidity_WalletBridge for Adobe Commerce Magento 2 OpenSource

This is an initial Proof of Concept Magento 2 extension that incorporates CIP-30 wallets for Cardano & Ergo blockchains using pure Javascript, and implemented the "Magento way".

This extension includes a heavily modified version of https://github.com/cardano-foundation/cardano-connect-with-wallet/blob/main/html/cardano-connect.js and a slightly modified version of https://cardano-foundation.github.io/cardano-connect-with-wallet/bundle-latest/index.js

- The changes to cardano-connect.js include gutting out the drop down menu functionality, simplifying the code, adds proper formatting, and is written to align with coding standards.
- The changes made to latest.js are unMinifying the code for human readability, adding in and changing various logos due to issues with the incorrect logos being displayed for wallets, and adding in new wallets.

This extension adds a wallet icon to the Magento 2 frontends header next to the shopping cart icon and currency switcher. When the wallet icon is clicked on a drop down menu appears using native Magento functionality similar to the currency switcher. The dropdown contains a list of all available wallets and it allows you to connect and disconnect to your preferred web-browser wallet. No other functionality is incorporated yet, other than connecting and disconnecting.

The wallet icon and dropdown are also aded to the "Settings" tab within the movile menu underneath the Currency Switcher options.

This is a work in progress and more features, and fixes are to be added later.
