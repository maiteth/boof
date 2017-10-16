'use strict';

const express = require('express');
const serveIndex = require('serve-index');
const fs = require('fs');

const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();

webpackConfig.output.path = '/';
const compiler = webpack(webpackConfig);
app.use('/app/wpk/', webpackDevMiddleware(compiler, {}));

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

const array = fs.readdirSync('./app').filter(n => n.match(/^\d\d-/)).map(n => `/app/${n}/*`);
console.log('array', array);

app.all(array, function (req, res, next) {
	console.log('req.url', req.url);
	const dir = req.url.replace(/^\/[^/]*\/([^/]*?)\/.*$/, '$1');
	res.sendFile(`app/${dir}/index.html`, {
		root: '.'
	});
});


app.use(function (req, res, next) {
	console.log('Not Found', req.url);
	// res.status(404).sendFile('404.html', {root: '.'});
	res.status(404).send('<code>Cannot GET ' + req.url + '</code>');
	// next();
});

app.listen(8000, function () {
	console.log('Example app listening on port 8000!');
});