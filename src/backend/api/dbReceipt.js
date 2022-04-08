import express from "express"
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import path from 'path'

const __dirname=path.resolve();
const router = express.Router();

const url="mongodb+srv://admin:admin_d2@groupd2.d3lwk.mongodb.net/sample_users?retryWrites=true&w=majority";
const client=new MongoClient(url);
const dbName="Account";
let receiptID="";
let id='';

router.use(bodyParser.urlencoded({extended: false}));

router.get("/", function(req, res) {
    res.send("API is working properly");
});

router.get("/get/:id",function(req,res){
    id=req.params.id;
    fetchReceipt(res)
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
});

router.post("/user",async function(req,res){
    receiptID = await getReceiptId(req,res);
    await submitOrder(req,res,receiptID);
})

async function getReceiptId(req,res){
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection("Receipt");
    let result = await collection.find({rid: req.body['rid']}).sort({id: -1}).toArray();
    if (result[0] == null) return "#0001"
    else {
        let lastID = result[0].id;
        let num = (parseInt(lastID.slice(-4))+1) % 10000;
        let newID = '#' + JSON.stringify(num==0? 1:num).padStart(4,'0');
        //console.log("Latest receipt:", lastID);
        //console.log("New receipt:", newID);
        return newID;
    }
}

async function submitOrder(req,res,receiptID){
    await client.connect();
    console.log('Connected successfully to server Receipt');
    const db = client.db(dbName);
    const collection = db.collection("Receipt");
    const insertResult = await collection.insertOne({ 
        id: receiptID,
        irid: req.body['irid'],
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
        point: parseInt(req.body['pointEarn']),
        status: false,
        timestamp: parseInt(req.body['timestamp'])
    });
    res.send("Order submitted");
    console.log('Submitted successfully to server Receipt');
}

async function fetchReceipt(res){
    await client.connect();
    console.log('Connected successfully to server Receipt');
    const db = client.db(dbName);
    const collection = db.collection("Receipt");
    let result = await collection.find({"irid":id}).toArray();
    res.send(result);
    return result;
};


export default router;