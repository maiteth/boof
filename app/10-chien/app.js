const app = angular.module('main', []); // les [] pour initialiser un module, sinon on le recupere

class Chien {
	constructor(couleur) {
		console.log('je nais');
		this.couleur = couleur || 'rouge';
	}
	speak() {
		console.log('wouf wouf ! Je suis de couleur', this.couleur);
	}

}

var toutou = new Chien();
toutou.speak();
console.log('couleur de toutou :', toutou.couleur);
