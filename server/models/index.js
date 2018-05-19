var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.connection.query('SELECT * FROM messages', (err, rows) => {
        if (err) { throw err; }
        callback(JSON.stringify(rows));
      });
    }, // a function which produces all the messages
    post: function (request) {
      db.connection.query(`INSERT INTO messages (userID, message, roomID) VALUES (1, '${request.body.message}', 1)`, (err, result) => {
        if (err) { throw err; }
        console.log('request body --------> ', request.body);
      });
    } 
    // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      db.connection.query('SELECT * FROM users', (err, rows) => {
        if (err) { throw err; }
        callback(JSON.stringify(rows));
      });
    },
    post: function (request) {
      db.connection.query(`INSERT INTO users (name) VALUES ('${request.body.username})'`, (err, result) => {
        if (err) { throw err; }
      });
    }
  }
};

