"use strict"

const path = require('path');
const dotenv = require('dotenv').config({ path: path.join(__dirname, `.env.${process.env.NODE_ENV}`) }).parsed;

if (dotenv.error) {
    throw dotenv.error
}

function config() {

    this.endUrl = process.env.END_URL;
    this.port = process.env.PORT;
    this.nodeEnv = process.env.NODE_ENV;
    this.secret = process.env.SECRET;
    this.fcm = {
        key: process.env.FCM_KEY
    }

    this.databaseConfig = {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    }

}

module.exports = new config();
