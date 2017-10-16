import '@uirouter/angularjs';

import '../boof-image/boof-image.js';

import './scss/home.scss';

import homeHtml from './tmpl/home.html';
import tableHtml from './tmpl/table.html';
import infoHtml from './tmpl/info.html';
import contactHtml from './tmpl/contact.html';

const app = angular.module('boof-route', ['ui.router', 'boof-image']); // les [] pour initialiser un module, sinon on le recupere

app.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
	$locationProvider.html5Mode(true);

	$stateProvider.state({
		name: 'home',
		url: '/',
		template: homeHtml,
		controller: function HomeCtrl(jlgCss) {
			'ngInject';
			const img = 'http://ocpforum.org/maite/boof/img/fruits-82524.jpg';
			console.log('onload');
			jlgCss.onload(img);
		}
	});
	$stateProvider.state({
		name: 'table',
		url: '/table',
		template: tableHtml,
		controller: function TableCtrl(boofCsv) {
			'ngInject';
			this.boofCsv = boofCsv;
		},
		controllerAs: '$ctrl'
	});
	$stateProvider.state({
		name: 'info',
		url: '/info',
		template: infoHtml,
		controller: function TableCtrl(boofCsv) {
			'ngInject';
			this.boofCsv = boofCsv;
		},
		controllerAs: '$ctrl'
	});
	$stateProvider.state({
		name: 'contact',
		url: '/contact',
		template: contactHtml
	});

	$urlRouterProvider.otherwise('/');
});
