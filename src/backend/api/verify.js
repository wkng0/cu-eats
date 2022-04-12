import express from "express"
import bodyParser from "body-parser";
import {MongoClient} from "mongodb";

const router = express.Router();
import cors from 'cors';
router.use(cors());

const url="mongodb+srv://admin:admin_d2@groupd2.d3lwk.mongodb.net/sample_users?retryWrites=true&w=majority";
const client=new MongoClient(url);
const dbName="Account";

router.use(bodyParser.urlencoded({extended: false}));

router.get("/", function(req, res) {
    console.log("hello")
    if(req.query["token"]!==undefined){
        verifyAccount(req,res);
    }else if(req.query["token"]!==undefined){
        changePW(req,res);
    }else res.send("hello");
});

router.get("/verifyAccount/:code", function(req, res) {
    verifyAccount(req,res)
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
});

router.get("/changePassword/:code", function(req, res) {
    findAccount(req,res)
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
});

async function findAccount(req,res){
    await client.connect();
    console.log('Connected successfully to server');        
    const db = client.db(dbName);
    const collection = db.collection("Info");
    const filteredDocs = await collection.findOne({ pwToken: req.params.code });
    res.send(filteredDocs);
}

async function verifyAccount(req,res){
    await client.connect();
    console.log('Connected successfully to server');        
    const db = client.db(dbName);
    const collection = db.collection("Info");
    const filteredDocs = await collection.find({ token: req.params.code }).toArray();
    if(filteredDocs.length!=0){
        const updateResult = await collection.updateOne({ token: req.params.code }, { $set: { verify: 1} });
    }
    
    res.send(filteredDocs);
    
    
}


export default router;