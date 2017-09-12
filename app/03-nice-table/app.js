(function () {
    'use strict';

    const app = angular.module('main', ['ngSanitize']); // les [] pour initialiser un module, sinon on le recupere
    const ciqual = "../resources/ciqual.csv";

    app.component('boofTable', {

        controller: function BoofTableCtrl($scope, $window) {
            'ngInject';
            const ctrl = this;
            console.log('this.csv', this.csv);

            ctrl.showLink = function(header) {
                console.log('showLink', arguments);
                if (header.href) {
                    $window.open(header.href);
                }
            };

            ctrl.getClass = function(header) {
                console.log('getClass', arguments);
                const result = {};
                if (header.class) {
                    result[header.class] = true;
                }
                return result;
            };

            // initialisation angular
            ctrl.$onInit = function () {

                // reprise du code d3 pour recuperer le fichier csv
                d3.text(ctrl.csv, function (err, str) {
                    const dsv = d3.dsvFormat(';');
                    const csvData = dsv.parse(str, function (d) {
                        return d;
                        // return {
                        //     id: d['ORIGFDNM'],
                        //     value: +d['Phosphore (mg/100g)']
                        // };
                    });
                    console.log('csvData', csvData);

                    // recuperation des en-tetes
                    ctrl.headers = [];
                    for (let p in csvData[0]) {
                        let header;
                        if (p in window.headers) {
                            header = window.headers[p];
                        } else {
                            header = {
                                short: p,
                                long: p,
                            };
                        }
                        ctrl.headers.push(header);
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