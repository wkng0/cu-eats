import express from "express"
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import path from 'path'

const __dirname=path.resolve();
const router = express.Router();

const url="mongodb+srv://admin:admin_d2@groupd2.d3lwk.mongodb.net/sample_users?retryWrites=true&w=majority";
const client=new MongoClient(url);
const dbName="Receipt";
let receiptID="";

router.use(bodyParser.urlencoded({extended: false}));

router.get("/", function(req, res) {
    res.send("API is working properly");
});

router.post("/user",async function(req,res){
    receiptID = await getReceiptId(req,res);
    await submitOrder(req,res,receiptID);
})

async function getReceiptId(req,res){
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection("User");
    let result = await collection.find({rid: req.body['rid']}).sort({receiptID: -1}).toArray();
    let lastID = result[0].receiptID;
    let newID = '#' + JSON.stringify(((parseInt(lastID.slice(-4))+1)%10000)).padStart(4,'0');
    console.log("Latest receipt:", lastID);
    console.log("New receipt:", newID);
    return newID;
}

async function submitOrder(req,res,receiptID){
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection("User");
    const insertResult = await collection.insertOne({ 
        receiptID: receiptID,
        uid: req.body['uid'],
        rid: req.body['rid'],
        ctName: req.body['name'],
        email: req.body['email'],
        phone: req.body['phone'],
        address: req.body['address'],
        cutlery: req.body['cutlery'],
        item: req.body['items'],
        subtotal: parseInt(req.body['subtotal']),
        discount: parseInt(req.body['discount']),
        total: parseInt(req.body['total']),
        point: parseInt(req.body['pointEarn'])
    });
    res.send("Order submitted");
    console.log('Submitted successfully to server');
}

export default router;