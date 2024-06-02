console.log("CardanoConnect module loaded");

define([
    'domReady!',
    'CardanoConnectWithWalletCore',
    'cardanoConnectWallet'
], function (dom, CardanoConnectWithWalletCore, cardanoConnectWallet) {
    'use strict';

    var cardanoConnectWallet = {
        init: function () {
            return new Promise((resolve, reject) => {
                this.config = {
                    label: 'Connect Wallet',
                    showAccountBalance: true,
                    showEnabledWalletIcon: true,
                    peerConnectEnabled: false,
                    showUnavailableWallets: undefined || CardanoConnectWithWalletCore.UnavailableWalletVisibility.SHOW_UNAVAILABLE_ON_MOBILE,
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
                    message: 'Confirm Wallet',
                    dAppName: 'Veralidity Digital Commerce Innovations',
                    dAppUrl: 'https://demo.veralidity.lcl',
                };

                this.state = {
                    isEnabled: true,
                    isConnected: window.localStorage.getItem("cf-wallet-connected"),
                    isConnecting: false,
                    stakeAddress: null,
                    enabledWallet: window.localStorage.getItem("cf-last-connected-wallet"),
                    usedAddresses: null,
                    unusedAddresses: null,
                    installedExtensions: [],
                    accountBalance: null,
                    lastConnectedWallet: window.localStorage.getItem("cf-last-connected-wallet"),
                    meerkatAddress: null,
                    label: this.config.label
                };
                //console.log('wallet connected', window.localStorage.getItem("cf-wallet-connected"));
                //console.log('last wallet', window.localStorage.getItem("cf-last-connected-wallet"));

                this.wallet = CardanoConnectWithWalletCore.Wallet;
                this.parent = document.getElementsByClassName('cardano-connect-container');
                
                this.addEventListeners();

                if (this.state.isConnected && this.state.enabledWallet) {
                    try {
                        this.wallet.connectToWallet(this.state.enabledWallet);
                    } catch (error) {
                        console.log(error);
                        this.updateDropdownMenu();
                    }
                    
                } else {
                    this.updateDropdownMenu();
                }
            });
        },

        addEventListeners: function () {
            this.wallet.addEventListener('enabledWallet', this.handleEnabledWallet.bind(this));
            this.wallet.addEventListener('installedWalletExtensions', this.handleInstalledWalletExtensions.bind(this));
            this.wallet.addEventListener('stakeAddress', this.handleStakeAddress.bind(this));
            this.wallet.addEventListener('connected', this.handleConnected.bind(this));
            this.wallet.addEventListener('accountBalance', this.handleAccountBalance.bind(this));
            this.wallet.startInjectWalletListener();            
        },

        updateDropdownMenu: function () {
            //console.log("Updating dropdown menu");
            const isMobile = CardanoConnectWithWalletCore.checkIsMobile();
            //console.log(isMobile);
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

                    if (this.state.isConnected && this.state.enabledWallet) {
                        if (typeof this.config.message === 'string') {
                            this.parent[i].appendChild(
                                this.createMenuItem(
                                    'Sign Message',
                                    //() => { this.wallet.signMessage(this.config.message); },
                                    () => { 
                                        this.wallet.signMessage(this.config.message)
                                            .then((signData) => {
                                                console.log(signData);
                                                // Extract key and signature from signData
                                                //const key = signData.signedData.key;
                                                //const signature = signData.signedData.signature;

                                                // Now you can use key and signature as needed
                                                //console.log('Key:', key);
                                                //console.log('Signature:', signature);

                                                // You can also pass this data to another function if needed
                                                //this.handleSignedData(key, signature);
                                            })
                                            .catch(error => {
                                                console.error('Error signing message:', error);
                                            });
                                    },
                                    null,
                                    null,
                                    this.handleSignedData
                                )
                            );
                        }
                    }

                } else {
                    for (const extension of availableWallets) {
                        //console.log('extension', extension)
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
            this.createTimestamp('handleEnabledWallet');
            if (enabledWallet !== null) {
                this.state.enabledWallet = enabledWallet;
                try {
                    var walletApi = window.cardano[enabledWallet].enable();
                    //console.log("Wallet connected:", walletApi);
                    var cardanoWalletApi;
                    walletApi.then((result) => {
                        cardanoWalletApi = result;
                        console.log('Cardano Wallet API is now available:', cardanoWalletApi);
                        cardanoWalletApi.getNetworkId()
                            .then((networkId) => {
                                console.log('Your network is:', networkId);
                        });
                    });
                } catch(err) {
                    console.log('Wallet Enable Error: ', err.message);
                }
            }

            this.updateDropdownMenu();
        },

        handleInstalledWalletExtensions: function (installedExtensions) {
            //console.log("handleInstalledWalletExtensions called", installedExtensions);
            this.state.installedExtensions = installedExtensions;
            this.updateDropdownMenu();
        },

        handleSignedData: function(signedData) {
            // Handle the signed data here
            console.log('Signed Data:', signedData);
            // Set the signed data as a variable or use its contents as needed
            // For example:
            // var signingKey = signedData.signingKey;
        },

        handleStakeAddress: function (stakeAddress) {
            //console.log("handleStakeAddress called", stakeAddress);
            this.state.stakeAddress = stakeAddress;
            this.updateDropdownMenu();
        },

        handleConnected: function (isConnected) {
            //this.createTimestamp('handleConnected');
            //console.log("enabledWallet", this.state.enabledWallet);
            this.state.isConnected = isConnected;
            if (isConnected) {
                //this.updateDropdownMenu();
                //this.changeCurrency();
                //console.log(this.wallet);
                //const balance = this.wallet.getBalance();
                //const balanceInAda = balance.lovelace / 1000000;
                //console.log(`Wallet balance: ${balanceInAda} ADA`);
            }
            this.updateDropdownMenu();
        },

        handleAccountBalance: function (accountBalance) {
            //console.log("accountBalance called", accountBalance);
            this.state.accountBalance = accountBalance;
            this.updateDropdownMenu();
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
                //walletListItem.onclick = onClick;
                walletListItem.onclick = () => {
                    // Call the onClick function
                    onClick();

                    // Call the handleSignedData function if provided
                    if (typeof handleSignedData === 'function') {
                        console.log('handleSignedData');
                        this.handleSignedData = handleSignedData;
                    }
                };
            }

            // Append the text label
            walletListItem.appendChild(document.createTextNode(label));

            return walletListItem;
        },

        createTimestamp: function(methodName) {
            var isPerformanceSupported = (
                window.performance &&
                window.performance.now &&
                window.performance.timing &&
                window.performance.timing.navigationStart
            );

            var timeStampInMs = (
                isPerformanceSupported ?
                window.performance.now() +
                window.performance.timing.navigationStart :
                Date.now()
            );

            console.log(methodName, timeStampInMs);
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

        getWalletApi: function (veralidityWalletInit, connectedWallet) {
            console.log(connectedWallet);
            veralidityWalletInit.then(veralidityWalletApi => {
                let wallet = connectedWallet;
                // Handle the veralidityWalletApi if it's connected successfully
                const walletApi = window.cardano[wallet].enable();
                console.log("Wallet connected:", walletApi);

                let cardanoWalletApi;
                walletApi.then((result) => {
                    cardanoWalletApi = result;
                    console.log('Cardano Wallet API is now available 2:', cardanoWalletApi);
                    return cardanoWalletAPi;
                    
                });
            }).catch(error => {
                // Handle any errors that occur during initialization
                console.error('Error during initialization:', error);
                return error;
            });
        },

        getWalletClass: function (wallet) {
            // This method returns a CSS class based on the wallet name
            // The class is used for styling the wallet icon or representation in the UI
            return ' ' + wallet + '-logo';
        },

        getAccountBalance: function () {
            // This method formats the stake address for display
            if (this.state.accountBalance) {
                return `₳ ${this.state.accountBalance}`;
            }
            return 'No ₳';
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
        var initWallet = cardanoConnectWallet.init();

        // initWallet.then(veralidityWalletApi => {
        //     // Handle the veralidityWalletApi if it's connected successfully
        //     const walletApi = window.cardano["eternl"].enable();
        //     console.log("Wallet connected:", walletApi);

        //     let cardanoWalletApi;
        //     walletApi.then((result) => {
        //         cardanoWalletApi = result;
        //         console.log('Cardano Wallet API is now available 2:', cardanoWalletApi);
        //         cardanoWalletApi.getBalance()
        //             .then((balance) => {
        //                 console.log('Your balance is:', balance);
        //         });
        //     });
        // }).catch(error => {
        //     // Handle any errors that occur during initialization
        //     console.error('Error during initialization:', error);
        // });

        //console.log(walletApi);
        // Any additional logic for component initialization
    };
});