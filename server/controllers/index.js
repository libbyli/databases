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
  messages: [],
};

var userObj = {
  users: []
};

var objectIdCounter = 1;

module.exports = {
  messages: {
    // a function which handles a get request for all messages
    get: function (request, response) {
      console.log('get worked');
      models.messages.get(data => {
        var parsedData = JSON.parse(data);
        dataObj.messages.push(parsedData[0]);
        sendResponse(response, dataObj);
      });
    }, 
    // a function which handles posting a message to the database
    post: function (request, response) {
      models.messages.post(request);
      console.log(request.body);
      sendResponse(response, request.body, 201);
    }
  },

  users: {
    // Ditto as above
    get: function (request, response) {
      models.users.get(data => {
        var parsedData = JSON.parse(data);
        userObj.users.push(parsedData[0]);
        sendResponse(respone, userObj);
      });
    },
    post: function (request, response) {
      models.users.post();
      sendResponse(response, request.body.username, 201);
    }
  }
};

