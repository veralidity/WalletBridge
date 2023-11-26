
define([
    'jquery',
    'domReady!',
    'CardanoConnectWithWalletCore',
    'cardanoConnectWallet'
], function ($, dom, CardanoConnectWithWalletCore, cardanoConnectWallet) {
    'use strict';

    cardanoConnectWallet = {
        cardanoConnectWallet: function () {
            var config = {
                label: 'Connect Wallet',
                showEnabledWalletIcon: true,
                showUnavailableWallets: false,
                supportedWallets: [
                    'eternl',
                    'exodus',
                    'flint',
                    'gerowallet',
                    'lace',
                    'nautilus',
                    'nami',
                    'nufi',
                    'typhon',
                    'yoroi'
                ],
                alwaysVisibleWallets: [],
                message: undefined,
            };

            var that = this;
            this.parent = document.getElementsByClassName('cardano-connect-container');

            this.showEnabledWalletIcon = config.showEnabledWalletIcon;
            this.message = config.message;
            this.supportedWallets = config.supportedWallets;
            this.showUnavailableWallets =
                config.showUnavailableWallets ||
                CardanoConnectWithWalletCore.UnavailableWalletVisibility.SHOW_UNAVAILABLE_ON_MOBILE;
            this.alwaysVisibleWallets = config.alwaysVisibleWallets;

            this.wallet = CardanoConnectWithWalletCore.Wallet;

            this.isEnabled = false;
            this.isConnected = false;
            this.isConnecting = false;
            this.stakeAddress = null;
            this.enabledWallet = null;
            this.usedAddresses = null;
            this.unusedAddresses = null;
            this.installedExtensions = [];
            this.accountBalance = null;
            this.lastConnectedWallet = null;
            this.meerkatAddress = null;
            this.label = config.label;

            // for (let i = 0; i < this.parent.length; i++) {
            //     let walletList = document.createElement('li');
            //     walletList.className = 'switcher-option connect-wallet-menu-item';
            //     this.parent[i].appendChild(walletList);
            // }

            this.wallet.addEventListener('enabledWallet', (enabledWallet) => {
                this.enabledWallet = enabledWallet;
                this.updateDropdownMenu();
            });

            this.wallet.addEventListener('installedWalletExtensions', (installedExtensions) => {
                this.installedExtensions = installedExtensions;
                this.updateDropdownMenu();
            });

            this.wallet.addEventListener('stakeAddress', (stakeAddress) => {
                this.stakeAddress = stakeAddress;
                this.updateDropdownMenu();
            });

            this.wallet.addEventListener('connected', (isConnected) => {
                this.isConnected = isConnected;
                this.updateDropdownMenu();
                this.changeCurrency();
            });

            this.wallet.startInjectWalletListener();
            this.updateDropdownMenu();


        },
        createMenuItem: function (label, onClick, id = null, walletClass = null) {

            let walletList = document.createElement('li');
            walletList.className = 'switcher-option connect-wallet-menu-item' + walletClass;

            if (typeof onClick === 'function') {
                walletList.onclick = onClick;
            }

            if (typeof id === 'string') {
                walletList.id = id;
            }

            walletList.appendChild(document.createTextNode(label));
            return walletList;
        },

        updateDropdownMenu: function () {
            const isMobile = CardanoConnectWithWalletCore.checkIsMobile();
            const availableWallets = CardanoConnectWithWalletCore.estimateAvailableWallets(
                this.supportedWallets,
                this.showUnavailableWallets,
                this.alwaysVisibleWallets,
                this.installedExtensions
            );

            //const buttonTitle = this.stakeAddress && this.isConnected ? this.getStakeAddressTitle() : this.label;

            for (let i = 0; i < this.parent.length; i++) {
                this.parent[i].innerHTML = '';

                this.parent[i].appendChild(
                    this.createMenuItem(
                        'nautilus',
                        () => { this.wallet.connectToWallet('nautilus'); },
                        null,
                        this.getWalletClass('nautilus')
                    )
                );

                if (availableWallets.length === 0) {
                    const label = `Please install a wallet browser extension (${CardanoConnectWithWalletCore.formatSupportedWallets(
                        this.supportedWallets
                    )} are supported)`;

                    this.parent[i].appendChild(
                        this.createMenuItem(label, null, 'connect-wallet-hint')
                    );
                } else if (this.stakeAddress !== null) {
                    if (typeof this.message === 'string') {
                        this.parent[i].appendChild(
                            this.createMenuItem(
                                'Sign Message',
                                () => { this.wallet.signMessage(this.message); }
                            )
                        );
                    }

                    if (this.showEnabledWalletIcon && this.isConnected && this.enabledWallet) {
                        this.parent[i].appendChild(
                            this.createMenuItem(
                                'Disconnect ' + this.enabledWallet,
                                () => { this.wallet.disconnect(); },
                                null,
                                this.getWalletClass(this.enabledWallet)
                            )
                        );

                    } else if (!this.showEnabledWalletIcon && this.isConnected && this.enabledWallet) {
                        this.parent[i].appendChild(
                            this.createMenuItem(
                                'Disconnect ' + this.enabledWallet,
                                () => { this.wallet.disconnect(); },
                                null,
                                this.getWalletClass(this.enabledWallet)
                            )
                        );
                    }

                } else {
                    for (const extension of availableWallets) {
                        console.log(extension);
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

        changeCurrency: function () {
            // Define the target currency code
            var targetCurrencyCode = 'ADA';

            // Get the currently selected currency code
            var currentCurrencyCode = $('#switcher-currency-trigger strong').attr('class').split('-')[1];

            // Check if the current currency is not the target currency
            if (currentCurrencyCode !== targetCurrencyCode) {
                // Find the anchor tag for the target currency
                var targetCurrencyLink = $('li.currency-' + targetCurrencyCode + ' a');

                // Check if the target currency link exists and is not already selected
                if (targetCurrencyLink.length && !targetCurrencyLink.parent().hasClass('selected')) {
                    // Trigger a click event on the target currency link
                    targetCurrencyLink.trigger('click');
                }
            }
        },

        getWalletClass: function (wallet) {
            return ' ' + wallet + '-logo';
        },

        getStakeAddressTitle: function () {
            return `${this.stakeAddress.slice(0, 12)}...`;
        },

        addCss: function (element, style) {
            for (const property in style)
                element.style[property] = style[property];
        }

    };

    return cardanoConnectWallet;
});