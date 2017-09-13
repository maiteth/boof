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

            ctrl.boofTable = boofTable;

            // inserer des lien dans les headers
            ctrl.showLink = function (header) {
                console.log('showLink', arguments);
                if (header.href) {
                    $window.open(header.href); // ouvre le lien (dans un nouvel onglet)
                }
            };

            // inserer une classe dans le DOM
            ctrl.getClass = function (header) {
                const result = {}; //  pour que retourner un objet
                if (header.class) {
                    result[header.class] = true; // recupere la classe
                }
                return result;
            };

            ctrl.configScroll = function () {
                let lastScrollTop;
                // detecte le scroll
                const scrollElt = angular.element(document.body).find('my-table');
                scrollElt.bind('scroll', function () {

                    const elt = scrollElt[0];
                    // console.log('elt %O', elt);

                    // position sur la page
                    const currentScrollTop = elt.scrollTop;
                    // console.log('currentScrollTop', currentScrollTop);

                    if (lastScrollTop !== undefined) {
                        if (currentScrollTop > lastScrollTop) {
                            // console.log('scrolling down');
                        } else {
                            // console.log('scrolling up');
                        }
                    }
                    lastScrollTop = currentScrollTop;

                    // console.log('elt.scrollTop', elt.scrollTop);
                    // console.log('elt.clientHeight', elt.clientHeight);
                    // console.log('elt.offsetHeight', elt.offsetHeight);

                    if (elt.scrollTop + elt.clientHeight >= elt.scrollHeight) {
                        console.log('bottom reached');
                        boofTable.limit += 15;
                        $scope.$apply();
                    }

                    if (elt.scrollTop <= 0) {
                        console.log('top reached');
                    }
                });
            };

            // initialisation angular
            ctrl.$onInit = function () {
                ctrl.configScroll();

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