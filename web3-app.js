var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

web3.eth.getBlock(3150, function(error, result){
    if(!error)
        console.log(JSON.stringify(result,null,'\t'));
    else
        console.error(error);
})
