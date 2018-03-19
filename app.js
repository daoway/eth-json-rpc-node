const winston = require('winston');
log = new winston.Logger();
log.add(winston.transports.Console, {
    colorize: false,
    timestamp: true,
    level: 'debug'
});
//http://help.b9lab.com/eth-developer-course-technical-help/our-public-geth-nodes
var hostname = '52.208.46.161';
var port = '8549';

var jsonRpc = require('./promised-http.js')(hostname,port);
var ETH_RPC_API = require('./eth-rpc-api.js');

jsonRpc.call(ETH_RPC_API.net_version)
    .then(function (response) {
        log.info(JSON.stringify(response,null,'\t'));
    }).catch(function (reason) {
        log.error('Error : ' +JSON.stringify(reason));
    }).done();
