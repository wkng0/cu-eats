import express from "express"
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import path from 'path'

const __dirname=path.resolve();
const router = express.Router();
import cors from 'cors';
router.use(cors());

const url="mongodb+srv://admin:admin_d2@groupd2.d3lwk.mongodb.net/sample_users?retryWrites=true&w=majority";
const client=new MongoClient(url);
const dbName="Account";
let receiptID="";
let rid="";
let uid="";
let name="";

router.use(bodyParser.urlencoded({extended: false}));

router.get("/", function(req, res) {
    res.send("API is working properly");
});

router.get("/get/:rid",function(req,res){
    rid=req.params.rid;
    fetchReceipt(res)
    //.then(console.log)
    .catch(console.error)
    .finally(() => client.close());
});

router.get("/getRecords/:uid",function(req,res){
    uid=req.params.uid;
    fetchRecord(res)
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
});

router.get("/getDashboard/:name",function(req,res){
    name=req.params.name;
    console.log("Restaurant name:", name);
    fetchDashboard(res)
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
});

router.post("/user",async function(req,res){
    receiptID = await getReceiptId(req);
    await submitOrder(req,res,receiptID);
    await updatePoint(req);
})

router.post("/updateStatus/:rid",function(req,res){
    updateStatus()
    //.then(console.log)
    .catch(console.error)
    .finally(() => client.close());
})

async function getReceiptId(req){
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection("Receipt");
    let result = await collection.find({rName: req.body['res']}).sort({id: -1}).toArray();
    if (result[0] == null) return "#0001"
    else {
        let lastID = result[0].id;
        let num = (parseInt(lastID.slice(-4))+1) % 10000;
        let newID = '#' + JSON.stringify(num==0? 1:num).padStart(4,'0');
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
        rid: req.body['irid'],
        uid: req.body['uid'],
        rName: req.body['res'],
        name: req.body['name'],
        phone: req.body['phone'],
        address: req.body['address'],
        cutlery: req.body['cutlery'],
        item: req.body['items'],
        subtotal: parseFloat(req.body['subtotal']),
        discount: parseFloat(req.body['discount']),
        total: parseFloat(req.body['total']),
        point: parseInt(req.body['point']),
        pointEarn: parseInt(req.body['pointEarn']),
        pointRemain: parseInt(req.body['pointRemain']),
        status: false,
        timestamp: parseInt(req.body['timestamp'])
    });
    res.send("Order submitted");
    console.log('Submitted successfully to server Receipt');
}

async function updatePoint(req){
    await client.connect();
    console.log('Connected successfully to server Info');
    const db = client.db(dbName);
    const collection = db.collection("Info");
    const insertResult = await collection.updateOne(
        {"uid": req.body['uid']},
        {
            $set: {point: parseInt(req.body['pointRemain'])}
        }
    );
    return insertResult;
}

async function updateStatus(){
    await client.connect();
    console.log('Connected successfully to server Receipt');
    const db = client.db(dbName);
    const collection = db.collection("Receipt");
    await collection.updateOne(
        {"rid":rid},
        {
            $set: { status: true },
            $unset: {name:"", phone:"", address:""}
        }
    );
}

async function fetchReceipt(res){
    await client.connect();
    console.log('Connected successfully to server Receipt');
    const db = client.db(dbName);
    const collection = db.collection("Receipt");
    let result = await collection.find({"rid":rid}).toArray();
    res.send(result);
    return result;
};

async function fetchRecord(res){
    await client.connect();
    console.log('Connected successfully to server Receipt');
    const db = client.db(dbName);
    const collection = db.collection("Receipt");
    let result = await collection.find({"uid":uid}).sort({timestamp: -1}).toArray();
    res.send(result);
    return result;
};

async function fetchDashboard(res){
    await client.connect();
    console.log('Connected successfully to server Receipt');
    const db = client.db(dbName);
    const collection = db.collection("Receipt");
    let result = await collection.find({"rName":name}).sort({timestamp: -1}).toArray();
    res.send(result);
    return result;
};

export default router;