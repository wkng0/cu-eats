import express from "express"
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import multer from "multer";
import path from 'path'
const __dirname=path.resolve();

const router = express.Router();

const url="mongodb+srv://admin:admin_d2@groupd2.d3lwk.mongodb.net/sample_users?retryWrites=true&w=majority";
const client=new MongoClient(url);
const dbName="Receipt";

router.get("/", function(req, res) {
    res.send("API is working properly");
});

router.use(bodyParser.urlencoded({extended: false}));

router.post("/user",function(req,res){
    submitOrder(req,res);
})

async function submitOrder(req,res){
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection("User");
    const insertResult = await collection.insertOne({ 
        receiptID: req.body['receiptId'],
        userID: req.body['userID'],
        ctName: req.body['name'],
        email: req.body['email'],
        phone: req.body['phone'],
        address: req.body['address'],
        cutlery: req.body['cutlery'],
        item: req.body['items'],
        subtotal: req.body['subtotal'],
        discount: req.body['discount'],
        total: req.body['total'],
        point: req.body['pointEarn']
    });
    res.send("Order submitted")
}

export default router;