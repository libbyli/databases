var db = require('../db');
var Promise = require('bluebird');

module.exports = {
  messages: {
    get: function (callback) {
      db.connection.query('SELECT u.name, m.message from users u inner join messages m on u.userID=m.userID', (err, rows) => {
        if (err) { throw err; }
        callback(JSON.stringify(rows));
      });
    }, // a function which produces all the messages
    post: function (request) {
      let roomID;
      let userID;

      db.connection.query(`INSERT INTO rooms (name) values ('${request.body.roomname}')`, (err, result) => {
        if (err) { throw err; }
      });

      db.connection.query(`INSERT INTO users (name) values ('${request.body.username}')`, (err, result) => {
        if (err) { throw err; }
      });

      const promiseRoom = () => {
        return new Promise((resolve, reject) => {
          db.connection.query(`SELECT roomID from rooms where name='${request.body.roomname}'`, (err, rows) => {
            if (err) { 
              reject(err); 
            } else {
              roomID = JSON.parse(JSON.stringify(rows));
              roomID = roomID[0].roomID;
              resolve(roomID);
            }
          });
        });
      };

      const promiseUser = () => {
        return new Promise((resolve, reject) => {
          db.connection.query(`SELECT userID from users where name='${request.body.username}'`, (err, rows) => {
            if (err) { 
              reject(err); 
            } else {
              userID = JSON.parse(JSON.stringify(rows));
              userID = userID[0].userID;
              resolve(userID);
            }
          });
        });
      };

      Promise.all([promiseRoom(), promiseUser()]).then((array) => {
        db.connection.query(`INSERT INTO messages (message, userID, roomID) VALUES ('${request.body.text}', ${userID}, ${roomID})`, (err, result) => {
          if (err) { throw err; }
        });
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

