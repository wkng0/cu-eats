import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config()
const MongoClient = mongodb.MongoClient

// PROGRAM INDEX - Program to connect MongoDB database
// PROGRAMMER: Tam Lee Yau
// CALLING SEQUENCE: CALL app.use(cors(corsOptions)) 
//  Where corsOptions is the object to be used in cors() function
//  then CALL MongoClient.connect function to connect database
// VERSION 1: written 8-3-2022
// REVISION 1.1: 10-3-2022 add cors protection
// PURPOSE: To connect backend server to MongoDB database and catch errors if the connection has problems
// DATA STRUCTURES:
//  Variable USERSINFO_DB_URI - STRING
//  Variable PORT - INTEGER
//  Variable corsOptions - CONSTANT OBJECT
//  Variable origin - STRING
//  Variable credentials - BOOLEAN
//  Variable optionSuccessStatus - NUMBER
// ALGORITHM: 
//  Load 'corsOptions' to allow port 3000 to get permission to load and access resources;
//  If error is caught, it will be printed on console and the process will be terminated;
//  else the message 'Listening on the port' + port variable will be printed 

const corsOptions = {
    origin:'http://localhost:3000', 
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.USERSINFO_DB_URI,
    {
        wtimeoutMS: 2500,
        useNewUrlParser: true
    }
)
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })

    .then(async client => {
        app.listen(port, () => {
            console.log('Listening on the port ' + port);
        })
    })