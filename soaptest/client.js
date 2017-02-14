 var soap = require('soap');
  var url = 'http://localhost:8000/testService?wsdl';
  var args = {title: 'value'};
  soap.createClient(url, function(err, client) {
      client.MyTestService(args, function(err, result) {
          console.log(result);
      });
  });
