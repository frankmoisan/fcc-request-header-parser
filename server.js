'use strict';

var express = require('express');
var os = require('os');
var path = require('path');
var accepts = require('accepts');
var uaparser = require('ua-parser-js');
var app = express();
app.enable('trust proxy');
var result = {ipaddress: null, locale: null, environment: null};


app.get('/whoami', function(req, res) {
	var ua = uaparser(req.headers['user-agent']);
	
	result.ipaddress = req.ip || req.connection.remoteAddress;
	result.locale = accepts(req).languages()[0];
	result.environment = ua.os.name + ' ' + ua.os.version + ' ' + ua.cpu.architecture;
	
	res.writeHead(200, { 'Content-Type': 'application/json'});
	res.end(JSON.stringify(result));
});

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(process.env.PORT || 8080 || 5000);