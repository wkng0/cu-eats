import express from "express"
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import multer from "multer";
import path from 'path';
import nodemailer from 'nodemailer'
const __dirname=path.resolve();
const router = express.Router();

const upload=multer({dest:"profile/photo/"})
const url="mongodb+srv://admin:admin_d2@groupd2.d3lwk.mongodb.net/sample_users?retryWrites=true&w=majority";
const client=new MongoClient(url);
const dbName="Account";
const space=""
let user_email = "";
let user_name = "";

let transporter=nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'csci3100.group.d2@gmail.com',
        pass: "qwerty12!A"
    }
})

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
    .finally(() => client.close());
})

router.post("/updatePw/:email",function(req,res){
    user_email = req.params.email;
    updatePw(req,res)
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
})

router.post("/changePic/:email",function(req,res){
    user_email = req.params.email;
    changePic(req,res)
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
})

router.post("/photo/post",upload.single("file"),function(req,res){
    let data={
        "filename":req.file.filename,
        "filetype":req.file.mimetype
    }
    res.send(data)
});

router.get("/photo/get/:id",function(req,res){
    console.log(__dirname)
    res.sendFile(__dirname+"/profile/photo/"+req.params.id)
});

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
    let token=Math.random().toString(36).substr(2);
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
        token:token,
        verify:0
    });
    let emailSender={
        name: "CUEats",
        address: "csci3100.group.d2@gmail.com"
    }
    let mailOptions={
        from: emailSender,
        to: req.body['email'],
        
        subject:"Code Confirmation",
        text:`Click this link to verify your account http://localhost:7000/verify?token=${token}`
    }
    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
        }else{
            console.log("Email sent: "+ info.response);
        }
    });
    res.send("Email sent: "+ info.response);

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
    return insertResult;
}

async function updatePw(req,res){
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection("Info");
    const insertResult = await collection.updateOne(
        {"email":user_email},
        {
            $set:
            {
            password: req.body['password']}
        }
    );
    return insertResult;
}

async function changePic(req,res){
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection("Info");
    const insertResult = await collection.updateOne(
        {"email":user_email},
        {
            $set:
            {
            pic: req.body['pic']}
        }
    );
    return insertResult;
}


export default router;