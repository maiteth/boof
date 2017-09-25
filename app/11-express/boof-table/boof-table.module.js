(function () {
    'use strict';

    const app = angular.module('boof-table', []); // les [] pour initialiser un module, sinon on le recupere

    app.service('boofTable', function BoofTable() {
        this.limit = 40;
        this.column = 'object[\'ORIGGPCD\'].value';
        this.reverse = false;
    });
})();