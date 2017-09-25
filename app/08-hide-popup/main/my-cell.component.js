(function () {
    'use strict';

    const app = angular.module('main');

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
        templateUrl: 'main/my-cell.component.html',
    });
})();