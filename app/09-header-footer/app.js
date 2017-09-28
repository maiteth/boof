import './style.scss';

import './boof-layout/boof-layout.js';
import './boof-table/boof-table.module.js';

const app = angular.module('main', ['ngSanitize', 'boof-layout', 'boof-table']); // les [] pour initialiser un module, sinon on le recupere
