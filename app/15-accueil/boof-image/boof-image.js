const app = angular.module('boof-image', []);

app.service('jlgCss', function JlgCss($document) {
	'ngInject';
	this.onload = function(url) {
		var bodyElt = angular.element($document[0].body);
		bodyElt.addClass('is-loading');

		angular.element('<img/>').attr('src', url).on('load', function() {
			console.log('load');
			angular.element(this).remove();
			bodyElt.removeClass('is-loading');
		});
	};
});
