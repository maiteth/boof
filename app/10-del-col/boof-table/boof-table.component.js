(function () {
    'use strict';

    const app = angular.module('boof-table'); // les [] pour initialiser un module, sinon on le recupere

     app.component('boofTable', {

        controller: function BoofTableCtrl($scope, $window, boofTable) {
            'ngInject';
            const ctrl = this;

            ctrl.boofTable = boofTable;

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

                    console.log('elt.scrollTop', elt.scrollTop);
                    console.log('elt.clientHeight', elt.clientHeight);
                    console.log('elt.scrollHeight', elt.scrollHeight);
                    const tolerance = 2;
                    if (elt.scrollTop + elt.clientHeight >= elt.scrollHeight - tolerance) {
                        console.log('bottom reached');
                        boofTable.limit += 15;
                        $scope.$apply();
                    }

                    if (elt.scrollTop <= 0) {
                        console.log('top reached');
                    }
                });
            };

            ctrl.order = function getCol(matrix, col) {
                const column = [];
                console.log('column', column);

                for (let i = 0; i < matrix.length; i++) {
                    column.push(matrix[i][col]);
                }
                return column;
                console.log('column', column);

                column.sort();

                // var array = [new Array(20), new Array(20), new Array(20)]; //..your 3x20 array
                // getCol(array, 0); //Get first column
            };

            // initialisation angular
            ctrl.$onInit = function () {
                ctrl.configScroll();

                // reprise du code d3 pour recuperer le fichier csv
                d3.text(ctrl.csv, function (err, str) {
                    const dsv = d3.dsvFormat(';');
                    const csvData = dsv.parse(str, function (row) {
                        for (let p in row) {
                            if (p in window.headers) {
                                const header = window.headers[p];
                                if (!header.type) {
                                    row[p] = +row[p] || '-';
                                }
                            }
                        }
                        return row;
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
                        header.column = p;
                        ctrl.headers.push(header);
                    }
                    console.log('headers', ctrl.headers);

                    // recuperation des lignes
                    ctrl.rows = csvData.map(function (row) {
                        const result = {};
                        result.array = [];
                        result.object = row;
                        for (let p in row) {
                            const cell = {
                                value: row[p],
                                header: {},
                            };
                            if (p in window.headers) {
                                const header = window.headers[p];
                                cell.header = header;
                            }
                            result.array.push(cell); // push : push dans le dernier index du tableau
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