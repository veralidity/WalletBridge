define([], function () {
    'use strict';

    return function () {
        var targetElement = document.getElementById('switcher-wallet-trigger-nav');

        targetElement.addEventListener('click', toggleElements);
        targetElement.addEventListener('touchstart', toggleElements);

        function toggleElements() {
            this.classList.toggle('active');
            var walletSwitcherOptions = document.querySelectorAll('.wallet-switcher-options');
            walletSwitcherOptions.forEach(function(elem) {
                elem.classList.toggle('active');
            });

            // Toggle aria-expanded attribute
            var ariaExpanded = this.getAttribute('aria-expanded') === 'false';
            this.setAttribute('aria-expanded', ariaExpanded.toString());

            var walletDropdowns = document.querySelectorAll('.wallet-dropdown');
            walletDropdowns.forEach(function(dropdown) {
                var ariaHidden = dropdown.getAttribute('aria-hidden') === 'true';
                dropdown.setAttribute('aria-hidden', !ariaHidden);
            });
        }
    };
});
