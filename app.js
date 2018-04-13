const winston = require('winston');
log = new winston.Logger();
log.add(winston.transports.Console, {
    colorize: false,
    timestamp: true,
    level: 'debug'
});

var hostname = '127.0.0.1';
var port = '8545';

var Q = require('q');
var client = require('./promised-http.js')(hostname,port,false);
var service = require('./service.js')(client);

//https://etherscan.io/token/EOS
//var addr = "0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0";
//var addr = "0x06451c2a002fee52e118aadd373174cb7868cc36";
//service.getSyncStatus();
//service.getLatestBalance(addr);

//var contractAddr = '0xdc558b433aad0cd7e241013b9f43fa6699e71365';
service.getEventsByAddress();