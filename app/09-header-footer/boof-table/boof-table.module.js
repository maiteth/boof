import {boofTable} from './boof-table.component.js';
import {myCellHeader} from './my-cell-header.component.js';

const app = angular.module('boof-table', []); // les [] pour initialiser un module, sinon on le recupere

app.component('boofTable', boofTable); // composant importer pour etre certain que le module boofTable soit trouvé (ordre d'import incertain)
app.component('myCellHeader', myCellHeader);

app.service('boofTable', function BoofTable() {
    this.limit = 40;
    this.column = 'object[\'ORIGGPCD\'].value';
    this.reverse = false;
});
