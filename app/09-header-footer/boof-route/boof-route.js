import '@uirouter/angularjs';

import homeHtml from './tmpl/home.html';
import tableHtml from './tmpl/table.html';
import infoHtml from './tmpl/info.html';
import contactHtml from './tmpl/contact.html';

const app = angular.module('boof-route', ['ui.router']); // les [] pour initialiser un module, sinon on le recupere

app.config(function ($stateProvider) {
    $stateProvider.state({
        name: 'home',
        url: '/',
        template: homeHtml
    });
    $stateProvider.state({
        name: 'table',
        url: '/table',
        template: tableHtml
    });
    $stateProvider.state({
        name: 'info',
        url: '/info',
        template: infoHtml
    });
    $stateProvider.state({
        name: 'contact',
        url: '/contact',
        template: contactHtml
    });
});
