var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
/*
web3.eth.getBlock(1, function(error, result){
    if(!error)
        console.log(JSON.stringify(result,null,'\t'));
    else
        console.error(error);
})
*/

/*
web3.eth.subscribe('pendingTransactions', function(error, result){})
.on("data", function(trxData){
  web3.eth.getTransaction(trxData).then(console.log);
});
*/
/*
var balance = web3.eth.getBalance("0xf794fB00f06FBD673cE3DB5EB0339c1e78dD0c3b")
.then(function (result){
    console.log("Balance = " + result);
});
*/
var x = web3.utils.sha3('myLogEvent(string)');
console.log(x);

var str1 = web3.utils.toAscii('0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000008302e303534373930000000000000000000000000000000000000000000000000');
//console.log(str1);

var str2 = web3.utils.toAscii('0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000005f4f7261636c697a6520717565727920776173204e4f542073656e742c20706c656173652061646420736f6d652045544820746f20636f76657220666f7220746865207175657279206665652e2043757272656e742062616c616e6365203a2000');
//console.log(str2);

var str3 = web3.utils.hexToUtf8('0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000c48656c6c6f20576f726c64210000000000000000000000000000000000000000');
//console.log(str3);

//contractAddress = "0x00.."
web3.eth.filter({
  address: "",//contractAddress
  from: 1,
  to: 'latest'
}).get(function (err, result) {
  // callback code here
  console.log(result);
})