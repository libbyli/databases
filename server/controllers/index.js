var models = require('../models');

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};

var sendResponse = function(response, data, statusCode) {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};

var dataObj = {
  results: []
};

module.exports = {
  messages: {
    // a function which handles a get request for all messages
    get: function (request, response) {
      models.messages.get(data => {
        var parsedData = JSON.parse(data);
        dataObj.results.push(parsedData[0]);
        sendResponse(response, dataObj);
      });
      // if (request.url !== "/classes/messages") {
      //   response.writeHead(404, headers);
      //   response.end();
      // } else {
      //   models.messages.get(function(data){
      //     // do something with data
      //   })
      //   response.writeHead(200, headers);
      //   response.end(JSON.stringify(dataObj));
      // }
    }, 
    // a function which handles posting a message to the database
    post: function (req, res) {
      // if (request.url === '/classes/messages') {
      //   let body = '';
      //   request.on('data', chunk => {
      //     body += chunk;
      //   }).on('end', () => {
      //     console.log(body);
      //     dataObj.results.push(JSON.parse(body));
      //     response.writeHead(201, headers);
      //     response.end();
      //   }).on('error', (error) => {
      //     response.writeHead(500, headers);
      //     response.end();
      //   });
      // } else {
      //   response.writeHead(404, headers);
      //   response.end();
      // } 
    },
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

