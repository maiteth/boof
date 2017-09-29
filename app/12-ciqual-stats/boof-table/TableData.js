export class TableData {
	initFromCsv(csv, next) {
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
		if (next) {
			next();
		}
	}
}
