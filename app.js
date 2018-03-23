const winston = require('winston');
log = new winston.Logger();
log.add(winston.transports.Console, {
    colorize: false,
    timestamp: true,
    level: 'debug'
});

var hostname = '127.0.0.1';
var port = '7545';

var client = require('./promised-http.js')(hostname,port);
var service = require('./service.js')(client);

var addr = "0xc3f72Dd3aB9c29D099015465CB9F3441a1e70796";
//client.call(ETH_RPC_API.eth_getBalance(addr,"latest"))
service.getSyncStatus();
