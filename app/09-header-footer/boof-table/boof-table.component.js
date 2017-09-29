export const boofTable = {

	controller: function BoofTableCtrl($scope, $window, boofTable, boofCsv) {
		'ngInject';
		const ctrl = this;

		ctrl.boofTable = boofTable;

		// inserer une classe dans le DOM
		ctrl.getClass = function(header) {
			const result = {}; //  pour que retourner un objet
			if (header.class) {
				result[header.class] = true; // recupere la classe
			}
			return result;
		};

		ctrl.configScroll = function() {
			let lastScrollTop;
			// detecte le scroll
			const scrollElt = angular.element(document.body).find('my-table');
			scrollElt.bind('scroll', function() {

				const elt = scrollElt[0];
				// console.log('elt %O', elt);

				// position sur la page
				const currentScrollTop = elt.scrollTop;
				// console.log('currentScrollTop', currentScrollTop);

				if (lastScrollTop !== undefined) {
					if (currentScrollTop > lastScrollTop) {
						// console.log('scrolling down');
					} else {
						// console.log('scrolling up');
					}
				}
				lastScrollTop = currentScrollTop;

				console.log('elt.scrollTop', elt.scrollTop);
				console.log('elt.clientHeight', elt.clientHeight);
				console.log('elt.scrollHeight', elt.scrollHeight);
				const tolerance = 2;
				if (elt.scrollTop + elt.clientHeight >= elt.scrollHeight - tolerance) {
					console.log('bottom reached');
					boofTable.limit += 15;
					$scope.$apply();
				}

				if (elt.scrollTop <= 0) {
					console.log('top reached');
				}
			});
		};

		ctrl.order = function getCol(matrix, col) {
			const column = [];
			console.log('column', column);

			for (let i = 0; i < matrix.length; i++) {
				column.push(matrix[i][col]);
			}
			return column;
			console.log('column', column);

			column.sort();

			// var array = [new Array(20), new Array(20), new Array(20)]; //..your 3x20 array
			// getCol(array, 0); //Get first column
		};

		// initialisation angular
		ctrl.$onInit = function() {
			ctrl.configScroll();
		};

	},

	// recupere les donnees d'un fichier
	bindings: {
		csv: '=' // @ : recupere sous forme de chaine de caracteres, < : recupere une variable du modele
	},
	templateUrl: './boof-table/tmpl/boof-table.html' // lien du fichier a partir duquel on recupere
};
