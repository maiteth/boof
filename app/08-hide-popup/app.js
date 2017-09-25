(function () {
    'use strict';

    const app = angular.module('main', []);

    app.component('myCell', {
        controller: function MyCellCtrl($element, veil) {
            'ngInject';
            const ctrl = this;

            ctrl.isPopupVisible = false;

            ctrl.switchPopup = function () {
                console.log('popup', arguments);
                const popup = $element.find('boof-popup');
                console.log('popup', popup);
                if (ctrl.isPopupVisible) {
                    ctrl.isPopupVisible = false;
                    veil.off();
                } else {
                    ctrl.isPopupVisible = true;
                    veil.on(ctrl);
                }
            };
        },
        templateUrl: 'my-cell.component.html',
    });

    app.service('veil', function Veil($document, $rootScope) {
        'ngInject';
        const veil = angular.element($document[0].body).find('my-veil');
        veil.on('click', () => {
            console.log('click');
            this.off();
            this.ctrl.switchPopup();
            $rootScope.$apply();
        });

        this.on = function (ctrl) {
            console.log('on');
            veil.css({
                display: 'block'
            })
            this.ctrl = ctrl;
        };
        this.off = function () {
            console.log('off');
            veil.css({
                display: 'none'
            })
        };
    });



})();