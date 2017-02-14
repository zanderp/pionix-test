var soap = require('soap-server');

function MyTestService(){
}
MyTestService.prototype.test1 = function(myArg1, myArg2){
	return myArg1 + myArg2;
};

var soapServer = new soap.SoapServer();
var soapService = soapServer.addService('testService', new MyTestService());

soapServer.listen(8000);
