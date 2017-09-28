import './boof-layout.scss';

const app = angular.module('boof-layout', []); // les [] pour initialiser un module, sinon on le recupere

app.component('boofHeader', {
    templateUrl: './boof-layout/tmpl/boof-header.html' // lien du fichier a partir duquel on recupere
});

app.component('boofFooter', {
    templateUrl: './boof-layout/tmpl/boof-footer.html' // lien du fichier a partir duquel on recupere
});
