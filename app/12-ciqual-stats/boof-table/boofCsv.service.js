import {TableData} from './TableData.js';

export class BoofCsv {
	/* @ngInject */

	constructor($http, boofStats) {
		this.$http = $http;

		this.$http.get('../resources/toto.csv').then(response => {
			this.ciqual = new TableData();
			this.ciqual.initFromCsv(response.data, () => {
				this.stats = boofStats.generateStats(this.ciqual);
				console.log('stats', this.stats);
			});

		}).catch(error => {
			console.error('Error', error);
		});

		// this.$http.get('../resources/toto.csv').then((response) => {
		// 	this.toto = new TableData();
		// 	this.toto.initFromCsv(response.data, () => {
		// 		this.stats = boofStats.generateStats(this.toto);
		// 	});
		// }).catch((error) => {
		// 	console.error('Error', error);
		// });
	}
};
