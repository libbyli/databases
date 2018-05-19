var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.connection.query('SELECT * FROM messages', (err, rows) => {
        if (err) { throw err; }
        console.log('rows--------> ', rows);
        callback(JSON.stringify(rows));
      });
    }, // a function which produces all the messages
    post: function () {} // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

