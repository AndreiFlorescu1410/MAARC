const mysql = require('mysql');
// Database Connection for Development

function handleDisconnect() { //HANDLE HEROKU TIMEOUT DISCONNECT
  let connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS
  });
  
  //LOCAL USE ONLY
  //NOT WORKING WITH HEROKU
  // connection.connect(function(err) {
  //   if (err) {
  //     console.error('Error connecting: ' + err.stack);
  //     return;
  //   }
  //   console.log('Connected as thread id: ' + connection.threadId);
  // });

  connection.on('error', function (err) {
    console.log('db error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });

  module.exports = connection;
}

handleDisconnect();  