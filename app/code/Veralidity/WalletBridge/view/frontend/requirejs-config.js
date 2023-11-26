/**
 * Veralidity, LLC
 *
 * @package    Veralidity
 * @category   WalletBridge
 * @copyright  Copyright © 2023 Veralidity, LLC
 * @license    https://www.veralidity.com/license/
 * @author     Veralidity, LLC <veralidity@protonmail.com>
 *
 * @var \Veralidity\WalletBridge\Block\WalletConnect $block
 */

var config = {
    map: {
        '*': {
            'cardanoConnectWallet': 'Veralidity_WalletBridge/js/cardano-connect',
            'CardanoConnectWithWalletCore': 'Veralidity_WalletBridge/js/cf.cardano-connect-with-wallet.latest'
        }
    },
    shim:{
        'cardanoConnectWallet': {
            CardanoConnectWithWalletCore: ['CardanoConnectWithWalletCore']
        }
    }
};
