'use strict';

const express = require('express');
const serveIndex = require('serve-index');

const app = express();

// renvoie un fichier s'il existe
app.use(express.static('.'));

// renvoie un repertoire s'il existe
// app.use(dir('.'));
app.use(serveIndex('.', {icons: true}));

app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});