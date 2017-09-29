export class BoofCsv {
	/* @ngInject */

	constructor($http) {
		this.$http = $http;

		this.$http.get('../resources/ciqual.csv').then((response) => {
			console.log('csv loaded');
			this.ciqual = new TableData(response.data);
		}).catch((error) => {
			console.error('Error', error);
		});

		this.$http.get('../resources/toto.csv').then((response) => {
			this.toto = new TableData(response.data);
		}).catch((error) => {
			console.error('Error', error);
		});
	}

};

// export function BoofCsv($http) {
// 	'ngInject';

// 	this.init = function() {
// 		$http.get('../resources/ciqual.csv').then((response) => {
// 			console.log('csv loaded');
// 			this.ciqual = response.data;
// 		}).catch((error) => {
// 			console.error('Error', error);
// 		});

// 		$http.get('../resources/toto.csv').then((response) => {
// 			this.toto = response.data;
// 		}).catch((error) => {
// 			console.error('Error', error);
// 		});
// 	}

// };

class TableData {
	constructor(csv) {
		// reprise du code d3 pour recuperer le fichier csv
		const dsv = d3.dsvFormat(';');
		const csvData = dsv.parse(csv, function(row) {
			for (let p in row) {
				if (p in window.headers) {
					const header = window.headers[p];
					if (!header.type) {
						row[p] = +row[p] || '-';
					}
				}
			}
			return row;
		});

		this.headers = [];
		for (let p in csvData[0]) {
			let header;
			if (p in window.headers) {
				header = window.headers[p];
			} else {
				header = {
					short: p,
					long: p,
				};
			}
			header.column = p;
			this.headers.push(header);
		}
		console.log('headers', this.headers);

		this.rows = csvData.map(function(row) {
			const result = {};
			result.array = [];
			result.object = row;
			for (let p in row) {
				const cell = {
					value: row[p],
					header: {},
				};
				if (p in window.headers) {
					const header = window.headers[p];
					cell.header = header;
				}
				result.array.push(cell); // push : push dans le dernier index du tableau
			}
			return result;
		});
	}
}

class Chien {
	constructor(couleur) {
		console.log('je nais');
		this.couleur = couleur || 'rouge';
	}
	speak() {
		var couleur = 'rouge';
		console.log('wouf wouf je suis de couleur', this.couleur);
	}

}

var toutou = new Chien();
toutou.speak();
console.log('couleur de toutou', toutou.couleur);
