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
let user_email = "";
let user_name = "";

router.use(bodyParser.urlencoded({extended: false}));

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

router.post("/createAccount",function(req,res){
    addUser(req,res)
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
});

router.get("/userName/:name",function(req,res){
    user_name=req.params.name;
    veriUserName(res)
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
});

router.get("/get/:email",function(req,res){
    user_email=req.params.email;
    fetchAccount(res)
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
});

router.post("/updateAccount/:email",function(req,res){
    user_email = req.params.email;
    updateAcc(req,res)
    .then(console.log)
    .catch(console.error)
    .finally(()=>client.close());
})

async function veriUserName(res){
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection("Info");
    let result = await collection.countDocuments({"user_name":user_name});
    if(result == 0){
        res.json({"unique":"true"});
    }else{
        res.json({"unique":"false"});
    }
};

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

async function addUser(req,res){
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection("Info");
    const insertResult = await collection.insertOne({ 
        email: req.body['email'],
        password: req.body['password'],
        user_name:req.body['user_name'],
        first_name: req.body['first_name'],
        last_name: req.body['last_name'],
        point: 0,
        phone: req.body['phone'],
        college:req.body['college'],
        faculty:req.body['faculty'],
        gender: req.body['gender'],
        pic: "",
    });
    return "comment posted";
};

async function updateAcc(req,res){
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection("Info");
    const insertResult = await  collection.updateOne(
        {"email":user_email},
        {
            $set:
            {
            user_name:req.body['user_name'],
            first_name: req.body['first_name'],
            last_name: req.body['last_name'],
            phone: req.body['phone'],
            college:req.body['college'],
            faculty:req.body['faculty'],
            gender: req.body['gender']}
            
        }
    );
    return "";
}

export default router;