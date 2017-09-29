import { BoofCsv } from './boofCsv.service.js';
import { BoofStats } from './boofStats.service.js';
import { boofTableComponent } from './boof-table.component.js';
import { myCellHeader } from './my-cell-header.component.js';

const app = angular.module('boof-table', []); // les [] pour initialiser un module, sinon on le recupere

app.service('boofCsv', BoofCsv);
app.service('boofStats', BoofStats);

app.component('boofTable', boofTableComponent); // composant importer pour etre certain que le module boofTable soit trouvé (ordre d'import incertain)
app.component('myCellHeader', myCellHeader);

// cette fonction ne fait rien sauf que pour la jouer angular est oblige d'instancier boofCsv.
// comme ca le constructeur de boofCsv est appele des le chargement de l'application
app.run(function(boofCsv) {});
