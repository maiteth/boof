(function () {
    'use strict';
    const app = angular.module('main', []);

    app.controller('ScrollEventCtrl', function ($window) {
        'ngInject';
        console.log('ScrollEventCtrl');
        let lastScrollTop;
        // detecte le scroll
        angular.element($window).bind('scroll', function () {
            console.log('scrolling is cool!');

            // position sur la page
            const currentScrollTop = $window.pageYOffset || $window.document.documentElement.scrollTop;
            console.log('currentScrollTop', currentScrollTop);
            // 
            if (lastScrollTop !== undefined) {
                if (currentScrollTop > lastScrollTop) {
                    console.log('scrolling down');
                } else {
                    console.log('scrolling up');
                }
            }
            lastScrollTop = currentScrollTop;

            if (($window.innerHeight + $window.scrollY) >= $window.document.body.offsetHeight) {
                console.log('bottom reached');
            }

            if (currentScrollTop <= 0) {
                console.log('top reached');
            }
        });
    });
})();