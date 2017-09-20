const express = require('express');
const serveIndex = require('serve-index');
const port = 8000;

const app = express();

app.use(function(req, res, next) {
	console.log('404: Page not Found', req.url);
	next();
});

app.listen(port, function() {
	console.log('server started on port ' + port);
});
