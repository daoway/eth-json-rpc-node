module.exports = {
    net_version :  {"jsonrpc":"2.0","method":"net_version","params":[],"id":67},
    eth_hashrate : {"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":71},
    eth_gasPrice : {"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73},
    eth_coinbase : {"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64},
    net_peerCount : {"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74},
    eth_getBalance : function (address, tag) {
        return {"jsonrpc":"2.0","method":"eth_getBalance","params":[address, tag],"id":1}
    },
    eth_syncing : {"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1},
    eth_mining : {"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71},
    eth_accounts : {"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1},
    eth_blockNumber : {"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}
};