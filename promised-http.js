module.exports = function(hostname, port, enableDebug){
    var httpRequest = require('request');
    require('request').debug = enableDebug;

    var Q = require('q');
    var request = {};
    request.call = function(payload) {
        var headers = {
            'Host' : hostname,
            'Content-Type': 'application/json'
        };
        var deffered = Q.defer();
        httpRequest({
            headers:headers,
            uri: {
                protocol: "http:",
                hostname: hostname,
                port: port,
                path: '/'
            },
            body: payload ? JSON.stringify(payload) : "",
            method: 'POST'
        }, function (error, response, body) {
            if(error){
                deffered.reject(error)
            }else{
                try{
                    var responseObject  = JSON.parse(response.body);
                    if(responseObject["error"]){
                        deffered.reject(responseObject);
                    }else{
                        deffered.resolve(responseObject);
                    }
                }catch(err){
                    deffered.reject(response.body);
                }
            }
        });
        return deffered.promise;
    };
    return request;
};
