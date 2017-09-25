(function () {
    'use strict';

    const app = angular.module('main', []);

    app.component('popupable', {

        controller: function Popupable($element, $transclude) {
            'ngInject';

            console.log('$element', $element.html());
        },

       templateUrl: 'popupable.html', 
       transclude: true
    });
})();