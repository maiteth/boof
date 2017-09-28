export const boofCsv = function BoofCsv($rootScope) {
	'ngInject';
	const service = this;

	d3.text('../resources/ciqual.csv', function(err, str) {
		$rootScope.ciqual = str;
        console.log('fileloaded');
        $rootScope.$apply();
	});

	d3.text('../resources/toto.csv', function(err, str) {
		$rootScope.toto = str;
	});
};
