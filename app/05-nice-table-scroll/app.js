(function () {
    'use strict';

    const app = angular.module('main', ['ngSanitize', 'boof-layout']); // les [] pour initialiser un module, sinon on le recupere
    const ciqual = "../resources/ciqual.csv";

    app.service('boofTable', function BoofTable() {
        this.limit = 40;
    });

    app.component('boofTable', {

        controller: function BoofTableCtrl($scope, $window, boofTable) {
            'ngInject';
            const ctrl = this;
            console.log('this.csv', this.csv);

            ctrl.boofTable = boofTable;

            // inserer des lien dans les headers
            ctrl.showLink = function(header) {
                console.log('showLink', arguments);
                if (header.href) {
                    $window.open(header.href); // ouvre le lien (dans un nouvel onglet)
                }
            };

            // inserer une classe dans le DOM
            ctrl.getClass = function(header) {
                console.log('getClass', arguments);
                const result = {}; //  pour que retourner un objet
                if (header.class) {
                    result[header.class] = true; // recupere la classe
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

    app.controller('ScrollEventCtrl', function ($scope, $window, boofTable) {
        'ngInject';
        console.log('ScrollEventCtrl');
        let lastScrollTop;
        // detecte le scroll
        angular.element($window).bind('scroll', function () {
            console.log('scrolling is cool!');

            // position sur la page
            const currentScrollTop = $window.pageYOffset || $window.document.documentElement.scrollTop;
            console.log('currentScrollTop', currentScrollTop);

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
                boofTable.limit += 15;
                $scope.$apply();
            }

            if (currentScrollTop <= 0) {
                console.log('top reached');
            }
        });
    });
})();