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
				acc.object = {};
				for (let p in n.object) {
					acc.object[p] = [];
				}

				acc.array = [];
				console.log('n.array.length', n.array.length);
				for (let i = 0; i < n.array.length; i++) {
					console.log('n.array[i].value', n.array[i].value);
					const obj = {};
					angular.copy(n.array[i], obj);
					obj.value = [];
					acc.array.push(obj);
				}

			}
			for (let p in n.object) {
				const num = +n.object[p];
				if (!isNaN(num)) {
					acc.object[p].push(n.object[p]);
				}
			}
			for (let i = 0; i < n.array.length; i++) {
				const num = +n.array[i].value;
				if (!isNaN(num)) {
					acc.array[i].value.push(n.array[i].value);
				}
			}

			return acc;
		}, undefined);
		for (let p in median.object) {
			median.object[p] = d3.quantile(median.object[p], 0.5);
		}
		for (let i = 0; i < median.array.length; i++) {
			median.array[i].value = d3.quantile(median.array[i].value, 0.5);
			if (!isNaN(median.array[i].value)) {
				median.array[i].value = +median.array[i].value.toFixed(4);
			}
		}
		result.rows.push(median);
		console.log('median', median);
		console.log('result', result);
		return result;
	}
};
