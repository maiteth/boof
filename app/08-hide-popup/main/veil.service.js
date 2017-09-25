(function () {
    'use strict';

    const app = angular.module('main');

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