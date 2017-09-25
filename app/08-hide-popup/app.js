(function () {
    'use strict';

    const app = angular.module('main', []);

    app.component('myCell', {
        controller: function MyCellCtrl($element) {
            'ngInject';
            const ctrl = this;

            ctrl.isPopupVisible = false;

            ctrl.popup = function () {
                console.log('popup', arguments);
                const popup = $element.find('boof-popup');
                console.log('popup', popup);
                if (ctrl.isPopupVisible) {
                    ctrl.isPopupVisible = false;
                    popup.css({
                        display: 'none',
                    });
                } else {
                    ctrl.isPopupVisible = true;
                    popup.css({
                        display: 'block',
                    });
                }
            };
        },
        templateUrl: 'my-cell.component.html',
    });



})();