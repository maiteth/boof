'use strict';

const express = require('express');
const serveIndex = require('serve-index');

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

app.use('/app/09-header-footer', function (req, res, next) {
	res.sendFile('app/09-header-footer/index.html', {
		root: '.'
	});
});

app.use('/app/12-ciqual-stats', function (req, res, next) {
	res.sendFile('app/12-ciqual-stats/index.html', {
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