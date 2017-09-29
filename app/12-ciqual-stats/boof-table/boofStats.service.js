import {TableData} from './TableData.js';

export function BoofStats() {
	'ngInject';

	this.generateStats = function(dataSample) {
		console.log('generateStats', dataSample);
		const result = new TableData();
		result.headers = dataSample.headers;
		result.rows = dataSample.rows.
		console.log('result', result);
		
		return result;
	}
};
