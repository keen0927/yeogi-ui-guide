/**
 * @description Express server
 */
const express = require('express');
const path = require('path');

const app = express();
const logger = require('morgan');

const http = require('http');
const server = http.createServer(app);

app.use(logger('common', {
    skip (req, res) {
        const isResource = req.originalUrl.indexOf('/static/');
        return isResource > -1;
    },
}));

/**
 * @description env settings
 */
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';
const isLocal = process.env.NODE_ENV === 'local';
const port = 3000;

const fs = require('fs');
app.use(express.static('dist'));

if (isLocal) {
    /**
     * @description webpack HMR module
     */
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const webpackConfig = require('../build/dev.server.config.js');
    const compiler = webpack(webpackConfig);

    const middleware = webpackDevMiddleware(compiler, {
        noInfo: true,
        hot: true,
        publicPath: '/dist/',
        filename: 'bundle.js',
        quiet: false,
        lazy: false,
        watchOptions: {
            aggregateTimeout: 300,
            poll: true
        },
        stats: {
            colors: true,
        },
        historyApiFallback: true,
    });

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000,
    }));
    app.get('*', function(req, res) {
        res.send('<body><div id="app"></div><script src=\'/dist/bundle.js\'></script></body>');
    });
} else {
    const template = path.join(__dirname, '../dist', 'index.html');
    app.get('*', function(req, res) {
        res.sendFile(template);
    });
}

server.listen(port, function() {
    const host = server.address().address;
    const port = server.address().port;

    console.log(`Express server has started on port:${host}:${port}`);
});
