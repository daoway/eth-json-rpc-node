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

var contractAddr = '0xc3ec0a63e400dcfc200e09d1d0a03610b4f7260d';
service.newFilter(contractAddr)
.then(function (filterIdJson) {
    console.log('new filter : '+JSON.stringify(filterIdJson,null,'\t'));
    return Q(filterIdJson.result);
}).then(function (filterId) {
    console.log('filterID : '+JSON.stringify(filterId,null,'\t'));
    console.log("Sleeping 10 sec....");
    return Q.all([Q.delay(10000),filterId])
}).spread(function(delayResult,filterId){
    console.log("grabbing events for filerID : "+filterId);
    return Q.all([service.getFilterLogs(filterId),filterId]);
}).spread(function (result, filterId) {
    console.log("filter changes (logs) : "+JSON.stringify(result,null,'\t'));
    return service.uninstallFilter(filterId);
}).then(function (value) {
    console.log("Filter uninstall response : "+JSON.stringify(value,null,'\t'));
}).done();