var http = require('http');

// make the POST data a JSON object and stringify it:
var postData =JSON.stringify({
  //'sensorValue':23
});

/*
 set up the options for the request.
 the full URL in this case is:
 http://example.com:443/login
*/

var options = {
  host: 'api.sunrise-sunset.org/',
  //port: 443,
  path: 'json?lat=40.7127837&lng=-74.0059413',
	method: 'POST',
	headers: {
    'Content-Type': 'application/json',
    'Content-Length': postData.length
  }
};

/*
	the callback function to be run when the response comes in.
	this callback assumes a chunked response, with several 'data'
	events and one final 'end' response.
*/
function callback(response) {
  var result = '';		// string to hold the response

  // as each chunk comes in, add it to the result string:
  response.on('data', function (data) {
    result += data;
  });

  // when the final chunk comes in, print it out:
  response.on('end', function () {
    console.log(result);
  });
}

// make the actual request:
var request = http.request(options, callback);	// start it
request.write(postData);							// send the data
request.end();					