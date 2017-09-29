import { TableData } from './TableData.js';

export function BoofStats() {
	'ngInject';

	this.generateStats = function(dataSample) {
		console.log('generateStats', dataSample);
		const result = new TableData();
		result.headers = dataSample.headers;
		result.rows = [];

		const median = dataSample.rows.reduce((acc, n) => {

			if (!acc) {
				acc = {};
				acc.array = n.array;
				acc.object = {};
				for (let p in n.object) {
					acc.object[p] = [];
				}
			}
			for (let p in n.object) {
				const num = +n.object[p];
				if (!isNaN(num)) {
					acc.object[p].push(n.object[p]);
				}
			}
			return acc;
		}, undefined);
		for (let p in median.object) {
			median.object[p] = d3.quantile(median.object[p], 0.5);
		}
		result.rows.push(median);
		result.rows.push(median);
		console.log('median', median);
		console.log('result', result);
		return result;
	}
};
