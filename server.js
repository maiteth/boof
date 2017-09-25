'use strict';

const express = require('express');
const serveIndex = require('serve-index');

const app = express();

// renvoie un fichier s'il existe
app.use(express.static('.'));

// renvoie un repertoire s'il existe
app.use(serveIndex('.', {
	icons: true,
	filter: function (filename) {
		if (filename === 'node_modules') {
			return false;
		}
		return true;
	},
	hidden: true,
	stylesheet: 'server.css',
	view: 'details',
}));

app.use(function (req, res, next) {
	console.log('Not Found', req.url);
	// res.status(404).sendFile('404.html', {root: '.'});
	res.status(404).send('<code>Cannot GET ' + req.url + '</code>');
	// next();
});

app.listen(8000, function () {
	console.log('Example app listening on port 8000!');
});
