//console.log("CardanoConnect module loaded");

define([
    'domReady!',
    'CardanoConnectWithWalletCore',
    'cardanoConnectWallet'
], function (dom, CardanoConnectWithWalletCore, cardanoConnectWallet) {
    'use strict';

    var cardanoConnectWallet = {
        init: function () {
            this.config = {
                label: 'Connect Wallet',
                showEnabledWalletIcon: true,
                showUnavailableWallets: false,
                supportedWallets: [
                    'eternl',
                    'exodus',
                    'flint',
                    'gerowallet',
                    'lace',
                    'nami',
                    'nufi',
                    'typhon',
                    'yoroi'
                ],
                alwaysVisibleWallets: [],
                message: undefined,
            };

            this.state = {
                isEnabled: false,
                isConnected: false,
                isConnecting: false,
                stakeAddress: null,
                enabledWallet: null,
                usedAddresses: null,
                unusedAddresses: null,
                installedExtensions: [],
                accountBalance: null,
                lastConnectedWallet: null,
                meerkatAddress: null
            };

            this.wallet = CardanoConnectWithWalletCore.Wallet;
            this.parent = document.getElementsByClassName('cardano-connect-container');
            this.addEventListeners();
            this.updateDropdownMenu();
        },

        addEventListeners: function () {
            this.wallet.addEventListener('enabledWallet', this.handleEnabledWallet.bind(this));
            this.wallet.addEventListener('installedWalletExtensions', this.handleInstalledWalletExtensions.bind(this));
            this.wallet.addEventListener('stakeAddress', this.handleStakeAddress.bind(this));
            this.wallet.addEventListener('connected', this.handleConnected.bind(this));
            this.wallet.startInjectWalletListener();
        },

        updateDropdownMenu: function () {
            //console.log("Updating dropdown menu");
            //const isMobile = CardanoConnectWithWalletCore.checkIsMobile();
            const availableWallets = CardanoConnectWithWalletCore.estimateAvailableWallets(
                this.config.supportedWallets,
                this.config.showUnavailableWallets,
                this.config.alwaysVisibleWallets,
                this.state.installedExtensions
            );

            for (let i = 0; i < this.parent.length; i++) {
                this.parent[i].innerHTML = '';

                if (availableWallets.length === 0) {
                    const label = `Please install a wallet browser extension (${CardanoConnectWithWalletCore.formatSupportedWallets(
                        this.config.supportedWallets
                    )} are supported)`;

                    this.parent[i].appendChild(
                        this.createMenuItem(label, null, 'connect-wallet-hint')
                    );
                } else if (this.state.stakeAddress !== null) {
                    if (typeof this.config.message === 'string') {
                        this.parent[i].appendChild(
                            this.createMenuItem(
                                'Sign Message',
                                () => { this.wallet.signMessage(this.config.message); }
                            )
                        );
                    }

                    if (this.config.showEnabledWalletIcon && this.state.isConnected && this.state.enabledWallet) {
                        this.parent[i].appendChild(
                            this.createMenuItem(
                                'Disconnect ' + this.state.enabledWallet,
                                () => { this.wallet.disconnect(); },
                                null,
                                this.getWalletClass(this.state.enabledWallet)
                            )
                        );

                    } else if (!this.config.showEnabledWalletIcon && this.state.isConnected && this.state.enabledWallet) {
                        this.parent[i].appendChild(
                            this.createMenuItem(
                                'Disconnect ' + this.state.enabledWallet,
                                () => { this.wallet.disconnect(); },
                                null,
                                this.getWalletClass(this.state.enabledWallet)
                            )
                        );
                    }

                } else {
                    for (const extension of availableWallets) {
                        this.parent[i].appendChild(
                            this.createMenuItem(
                                extension,
                                () => { this.wallet.connectToWallet(extension); },
                                null,
                                this.getWalletClass(extension)
                            )
                        );
                    }
                }
            }
        },

        handleEnabledWallet: function (enabledWallet) {
            //console.log("handleEnabledWallet called", enabledWallet);
            this.state.enabledWallet = enabledWallet;
            this.updateDropdownMenu();
        },

        handleInstalledWalletExtensions: function (installedExtensions) {
            //console.log("handleInstalledWalletExtensions called", installedExtensions);
            this.state.installedExtensions = installedExtensions;
            this.updateDropdownMenu();
        },

        handleStakeAddress: function (stakeAddress) {
            //console.log("handleStakeAddress called", stakeAddress);
            this.state.stakeAddress = stakeAddress;
            this.updateDropdownMenu();
        },

        handleConnected: function (isConnected) {
            //console.log("handleConnected called", isConnected);
            this.state.isConnected = isConnected;
            if (isConnected) {
                this.updateDropdownMenu();
                //this.changeCurrency();
            }
        },

        createMenuItem: function (label, onClick, id, walletClass) {
            let walletListItem = document.createElement('li');
            walletListItem.className = 'switcher-option connect-wallet-menu-item';

            // Append additional class if provided
            if (walletClass) {
                walletListItem.className += ' ' + walletClass;
            }

            // Set the ID if provided
            if (typeof id === 'string') {
                walletListItem.id = id;
            }

            // Attach the click event handler if provided
            if (typeof onClick === 'function') {
                walletListItem.onclick = onClick;
            }

            // Append the text label
            walletListItem.appendChild(document.createTextNode(label));

            return walletListItem;
        },

        changeCurrency: function () {
            // Define the target currency code
            var targetCurrencyCode = 'ADA';

            // Get the currently selected currency code
            var switcherCurrencyTrigger = document.querySelector('#switcher-currency-trigger strong');
            var currentCurrencyCode = switcherCurrencyTrigger ? switcherCurrencyTrigger.className.split('-')[1] : null;

            // Check if the current currency is not the target currency
            if (currentCurrencyCode && currentCurrencyCode !== targetCurrencyCode) {
                // Find the anchor tag for the target currency
                var targetCurrencyLink = document.querySelector('li.currency-' + targetCurrencyCode + ' a');

                // Check if the target currency link exists and is not already selected
                if (targetCurrencyLink && !targetCurrencyLink.parentNode.classList.contains('selected')) {
                    // Trigger a click event on the target currency link
                    targetCurrencyLink.click();
                }
            }
        },

        getWalletClass: function (wallet) {
            // This method returns a CSS class based on the wallet name
            // The class is used for styling the wallet icon or representation in the UI
            return ' ' + wallet + '-logo';
        },

        getStakeAddressTitle: function () {
            // This method formats the stake address for display
            if (this.state.stakeAddress) {
                // Returns a shortened version of the stake address
                return `${this.state.stakeAddress.slice(0, 12)}...`;
            }
            return 'No Stake Address';
        },

        addCss: function (element, style) {
            for (const property in style) {
                if (style.hasOwnProperty(property)) {
                    element.style[property] = style[property];
                }
            }
        }
    };

    //console.log("CardanoConnect module setup complete");
    return function(config, element) {
        cardanoConnectWallet.init();
        // Any additional logic for component initialization
    };
});