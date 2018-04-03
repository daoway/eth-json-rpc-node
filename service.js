const log = require('winston');
const ETH_RPC_API = require('./eth-rpc-api.js');
var Q = require('q');
module.exports = function (client) {
    var external = {};
    external.getSyncStatus = function () {
        client.call(ETH_RPC_API.eth_syncing)
            .then(function (response) {
                if (response.result == false) {
                    log.info("Sync completed");
                    return;
                }
                var stateDiff = parseInt(response.result.knownStates) - parseInt(response.result.pulledStates);
                log.info("state diff : " + stateDiff);

                log.info("current block : " + parseInt(response.result.currentBlock));
                log.info("highest block : " + parseInt(response.result.highestBlock));

                var blockDiff = parseInt(response.result.highestBlock) - parseInt(response.result.currentBlock);
                log.info("block diff : " + blockDiff);

                log.info(JSON.stringify(response, null, '\t'));
            }).catch(function (reason) {
            log.error('Error : ' + JSON.stringify(reason));
        }).done();
    };
    external.getLatestBalance = function (addr) {
        return client.call(ETH_RPC_API.eth_getBalance(addr, "0x0"))
            .then(function (balance) {
                log.info("Latest balance : " + JSON.stringify(balance, null, '\t'));
            }).done();
    };

    external.newFilter = function (address) {
        return client.call(ETH_RPC_API.eth_newFilter(address))
    };

    external.getFilterChanges = function (filterId) {
        return client.call(ETH_RPC_API.eth_getFilterChanges(filterId));
    };

    external.getFilterLogs = function (filterId) {
        return client.call(ETH_RPC_API.eth_getFilterLogs(filterId));
    };

    external.uninstallFilter = function (filterId) {
        return client.call(ETH_RPC_API.eth_uninstallFilter(filterId));
    };

    //don't care about logging level at this moment
    external.getEventsByAddress = function (addr) {
        external.newFilter(addr)
        .then(function (filterIdJson) {
                log.info('new filter : ' + JSON.stringify(filterIdJson, null, '\t'));
                return Q(filterIdJson.result);
            }).then(function (filterId) {
            log.info('filterID : ' + JSON.stringify(filterId, null, '\t'));
            log.info("Sleeping 10 sec....");
            return Q.all([Q.delay(10000), filterId])
        }).spread(function (delayResult, filterId) {
            log.info("grabbing events for filerID : " + filterId);
            return Q.all([external.getFilterLogs(filterId), filterId]);
        }).spread(function (result, filterId) {
            log.info("filter changes (logs) : " + JSON.stringify(result, null, '\t'));
            return external.uninstallFilter(filterId);
        }).then(function (value) {
            log.info("Filter uninstall response : " + JSON.stringify(value, null, '\t'));
        }).done();
    };
    return external;
};