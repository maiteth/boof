(function () {
    'use strict';

    const app = angular.module('boof-table'); // les [] pour initialiser un module, sinon on le recupere

    app.component('myCellHeader', {
        bindings: {
            h: '=',
        },
        controller: function ($element, boofTable) {
            'ngInject';
            const ctrl = this;
            ctrl.boofTable = boofTable;

            ctrl.orderBy = function (col, reverse) {
                console.log('orderBy', arguments);
                ctrl.boofTable.column = 'object[\'' + col + '\']';
                ctrl.boofTable.reverse = reverse;
                ctrl.isPopupVisible = false;
            };

            ctrl.popup = function (header) {
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
        templateUrl: './boof-table/tmpl/my-cell-header.html' // lien du fichier a partir duquel on recupere
    });

})();