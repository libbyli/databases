CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  userID int,
  name varchar(50),
  PRIMARY KEY (userID)
);

CREATE TABLE messages (
  ID int,
  userID int,
  message varchar(300),
  room varchar(50),
  PRIMARY KEY (ID)
  FOREIGN KEY (userID) REFERENCES users(userID)
);

CREATE TABLE friends (
  name varchar(50),
  userID int,
  FOREIGN KEY (userID) REFERENCES users(userID)
);





/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

