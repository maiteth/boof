import './boof-home.scss';

const app = angular.module('boof-home', []); // les [] pour initialiser un module, sinon on le recupere

app.component('boofHeader', {
    templateUrl: './boof-home/tmpl/boof-header.html' // lien du fichier a partir duquel on recupere
});

// app.component('boofBody', {
//     templateUrl: './boof-layout/tmpl/boof-body.html' // lien du fichier a partir duquel on recupere
// });

app.component('boofFooter', {
    templateUrl: './boof-home/tmpl/boof-footer.html' // lien du fichier a partir duquel on recupere
});
