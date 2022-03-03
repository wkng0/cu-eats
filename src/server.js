// react: http://localhost:3000
// express: http://localhost:4747
// mongoDB: mongodb://localhost:27017/userDB


const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 4747;
const DB_URI = "mongodb://localhost:27017/"
const DB = "userDB" // save user name and corresponding password

connect(DB_URI + DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    connectTimeoutMS: 10000
});

const db = connection;

// Create user schema
let UserSchema = new Schema(
    {
        username: String,
        pw: String  
    },
    { collection: "user"}
);