import express from "express"
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import multer from "multer";
import path from 'path'
const __dirname=path.resolve();
const router = express.Router();

const url="mongodb+srv://admin:admin_d2@groupd2.d3lwk.mongodb.net/sample_users?retryWrites=true&w=majority";
const client=new MongoClient(url);
const dbName="Account";
const space=""
let user_email="";

router.get("/", function(req, res) {
    res.send("API is working properlyyyyyyyyyy");
});

router.get("/exist/:email", function(req, res) {
    user_email = req.params.email;
    console.log(user_email);
    // res.send(user_email);
    veriAcc(res)
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
});

// router.get("/get/:email", function(req, res) {
//     user_email = req._construct.params.email
//     veriAcc(user_email)
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => client.close());
// });

router.use(bodyParser.urlencoded({extended: false}));

router.get("/get/:id",function(req,res){
    user_email=req.params.id;
    fetchAccount(res)
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
});

async function veriAcc(res){
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection("Info");
    let result = await collection.countDocuments({"email":user_email});
    if(result == 0){
        res.json({"email":"false"});
    }else{
        res.json({"email":"true"});
    }
};

async function fetchAccount(res){
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection("Info");
    let result = await collection.find({"email":user_email}).toArray();
    res.send(result);
    
};

export default router;