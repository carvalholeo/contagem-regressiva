#!/usr/bin/env node
// deepcode ignore HttpToHttps: This app will be behind a reverse proxy, with a SSL/TLS certificate
const http = require('http');
const app = require('./index');

const PORT = process.env.PORT || 3000;
app.set('port', PORT);

const server = http.createServer(app);
server.listen(PORT);
