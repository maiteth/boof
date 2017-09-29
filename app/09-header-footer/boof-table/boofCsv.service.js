export const BoofCsv = function ($http) {
	'ngInject';

	this.init = function() {
		$http.get('../resources/ciqual.csv').then((response) => {
			console.log('csv loaded');
			this.ciqual = response.data;
		}).catch((error) => {
			console.error('Error', error);
		});

		$http.get('../resources/toto.csv').then((response) => {
			this.toto = response.data;
		}).catch((error) => {
			console.error('Error', error);
		});
	}

};
