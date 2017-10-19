class Voiture {
	constructor(couleur, prix) {
		console.log('je nais');
		this.couleur = couleur;
		this.prix = prix;
	}
	demarre() {
        console.log('vroum vroum');
        return this;
    }
    accelere() {
        console.log('je vais plus vite');
        return this;
    }
    freine() {
        console.log('je vais moins vite');
        return this;
	}
}

var deuxCv = new Voiture('bleue', 15000);

console.log('deuxCv', deuxCv.couleur, deuxCv.prix);

deuxCv.demarre();
deuxCv.accelere();


deuxCv.demarre().accelere().freine();
