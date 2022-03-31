import express from "express"
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import multer from "multer";
import path from 'path'
const __dirname=path.resolve();
const router = express.Router();

const url="mongodb+srv://admin:admin_d2@groupd2.d3lwk.mongodb.net/sample_users?retryWrites=true&w=majority";
const client=new MongoClient(url);

router.use(bodyParser.urlencoded({extended: false}));

const dbName="Menu";

router.get("/", function(req, res) {
    res.send("API is working properly");
});

router.get("/getMenu", function(req, res) {
    fetchMenu(res)
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
});


async function fetchMenu(res){
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection("NaMenu");
    let MenuList = await collection.find({}).toArray();
    //console.log('Found documents =>', commentList);
    res.send(MenuList);
    return "NA Menu fetched";
};



export default router;
