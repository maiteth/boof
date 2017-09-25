(function () {
    'use strict';

    const app = angular.module('main', []);

    app.component('myCell', {
        controller: function MyCellCtrl($scope, $element, veil) {
            'ngInject';
            const ctrl = this;

            ctrl.isPopupVisible = false;

            $scope.$watch('$ctrl.isPopupVisible', () => {
                if (ctrl.isPopupVisible) {
                    veil.start(function () {
                        ctrl.isPopupVisible = false;
                    });
                } else {
                    veil.stop();
                }
            });
        },
        templateUrl: 'my-cell.component.html',
    });

    app.service('veil', function Veil($document, $rootScope) {
        'ngInject';
        const veil = angular.element($document[0].body).find('my-veil');
        veil.on('click', () => {
            console.log('click');
            this.stop();
            this.onStop();
            $rootScope.$apply();
        });

        this.start = function (onStop) {
            console.log('on');
            veil.css({
                display: 'block'
            })
            this.onStop = onStop;
        };
        this.stop = function () {
            console.log('stop');
            veil.css({
                display: 'none'
            })
        };
    });



})();