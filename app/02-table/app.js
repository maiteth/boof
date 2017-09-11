(function () {
    'use strict';

    const app = angular.module('main', []);
    const ciqual = "../resources/ciqual.csv";

    app.component('boofTable', {

        controller: function BoofTableCtrl($scope) {
            'ngInject';
            const ctrl = this;
            console.log('this.csv', this.csv);
            ctrl.$onInit = function () {
                d3.text(ctrl.csv, function (err, str) {
                    const dsv = d3.dsvFormat(';');
                    const csvData = dsv.parse(str, function (d) {
                        return d;
                    });
                    console.log('csvData', csvData);

                    ctrl.headers = [];

                    for (let p in csvData[0]) {
                        ctrl.headers.push(p);
                    }

                    console.log('headers', ctrl.headers);

                    ctrl.rows = csvData.map(function(row) {
                        const result = [];
                        for (let p in row) {
                            result.push(row[p]);
                        }
                        return result;
                    });
                    $scope.$apply();
                });
            }
        },
        bindings: {
            csv: '@'
        },
        templateUrl: 'boof-table.html'
    });
})();