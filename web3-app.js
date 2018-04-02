var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

web3.eth.getBlock(10999900, function(error, result){
    if(!error)
        console.log(JSON.stringify(result,null,'\t'));
    else
        console.error(error);
})

var balance = web3.eth.getBalance("0xf794fB00f06FBD673cE3DB5EB0339c1e78dD0c3b")
.then(function (result){
    console.log("Balance = " + result);
});