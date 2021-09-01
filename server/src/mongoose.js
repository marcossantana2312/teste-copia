require('dotenv').config();

const mongoose = require ('mongoose');

const connectDb = () => {
    console.log("DB", process.env.DATABASE_URL);
  return mongoose
    .connect (process.env.DATABASE_URL, { useNewUrlParser: true })
    .then (() => {
      return console.info (
        `Successfully connected to ${process.env.DATABASE_URL}`
      );
    })
    .catch (error => {
      console.error ('Error connecting to database: ', error);
      return process.exit (1);
    });
};

module.exports = connectDb;
