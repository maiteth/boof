(function () {
    'use strict';

    const app = angular.module('main', ['ngSanitize']); // les [] pour initialiser un module, sinon on le recupere
    const ciqual = "../resources/ciqual.csv";

    app.component('boofTable', {

        controller: function BoofTableCtrl($scope) {
            'ngInject';
            const ctrl = this;
            console.log('this.csv', this.csv);

            // initialisation angular
            ctrl.$onInit = function () {

                d3.text(ctrl.csv, function (err, str) {
                    const dsv = d3.dsvFormat(';');
                    const csvData = dsv.parse(str, function (d) {
                        const result = {};
                        for (let p in d) {
                            if (p in window.headers) {
                                result[window.headers[p]] = d[p];
                            } else {
                                result[p] = d[p];
                            }
                        }
                        return result;
                        // return {
                        //     id: d['ORIGFDNM'],
                        //     value: +d['Phosphore (mg/100g)']
                        // };
                    });
                    console.log('csvData', csvData);

                    // recuperation des en-tetes
                    ctrl.headers = [];
                    for (let p in csvData[0]) {
                        ctrl.headers.push(p);
                    }
                    console.log('headers', ctrl.headers);

                    // recuperation des lignes
                    ctrl.rows = csvData.map(function (row) {
                        const result = [];
                        for (let p in row) {
                            result.push(row[p]); // push : push dans le dernier index du tableau
                        }
                        return result;
                    });

                    // n'etant pas dans une fonction angular lancement de la «digestion» manuel
                    $scope.$apply();
                });
            }
        },

        // recupere les donnees d'un fichier
        bindings: {
            csv: '@' // @ : recupere sous forme de chaine de caracteres
        },
        templateUrl: 'boof-table.html' // lien du fichier a partir duquel on recupere
    });
})();