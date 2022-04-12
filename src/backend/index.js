import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config()
const MongoClient = mongodb.MongoClient

const corsOptions ={
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