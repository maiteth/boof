import { TableData } from './TableData.js';

export function BoofStats() {
	'ngInject';

	this.generateStats = function(dataSample) {
		console.log('generateStats', dataSample);
		const result = new TableData();
		result.headers = dataSample.headers;
		result.rows = [];

		const sampleRow = dataSample.rows.reduce((acc, n) => {

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
		for (let indice of [0.25, 0.5, 0.75]) {
			const row = {};
			angular.copy(sampleRow, row);
			for (let p in row.object) {
				row.object[p] = d3.quantile(row.object[p], indice);
			}
			for (let i = 0; i < row.array.length; i++) {
				row.array[i].value = d3.quantile(row.array[i].value, indice);
				if (!isNaN(row.array[i].value)) {
					row.array[i].value = +row.array[i].value.toFixed(4);
				}
			}
			result.rows.push(row);
			console.log('row', row);
		}
		console.log('result', result);
		return result;
	}
};
