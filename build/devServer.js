const path = require('path');
const express = require('express');
const webpack = require('webpack');
const proxy = require('http-proxy-middleware');
const config = require('./webpack.config.dev.js');

const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.entry.publicPath,
    quiet: true
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static(path.join(__dirname, '../', 'dist')));

// app.use('/api', proxy({target: 'http://http://172.29.20.24/', changeOrigin: true}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.get('/hello', (req, res) => {
    res.send({
        hello: 'world'
    })
});

// app.get('/registry/tree', (req, res) => {
//     // console.log('---req---', req);
//     // console.log('---res---', res);
// });

app.listen(8081);
