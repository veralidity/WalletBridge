define([
    'jquery'
], function ($) {
    'use strict';

    return function () {
        var targetElement = $('#switcher-wallet-trigger-nav'); // Replace with your element's selector

        targetElement.on('click touchstart', function () {
            $(this).toggleClass('active');
            $('.wallet-switcher-options').toggleClass('active');
            // Toggle aria-expanded attribute
            var ariaExpanded = $(this).attr('aria-expanded') === 'false';
            $(this).attr('aria-expanded', !ariaExpanded);
            var ariaHidden = $('.wallet-dropdown').attr('aria-hidden') === 'true';
            $('.wallet-dropdown').attr('aria-hidden', !ariaHidden);
        });
    };
});
