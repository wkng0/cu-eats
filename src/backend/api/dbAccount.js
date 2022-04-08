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
let uid = "";
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

router.get("/get/:uid",function(req,res){
    uid=req.params.uid;
    fetchAccount(res)
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
});

router.post("/updateAccount/:uid",function(req,res){
    uid = req.params.uid;
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

router.post("/changePic/:uid",function(req,res){
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

//admin area

router.get("/getAll",function(req,res){
    fetchAll(res)
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
});

router.get("/getUnverify", function(req,res){
    fetchUnverify(res)
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
});

router.post("/delete",function(req,res){
    deleteUser(req,res)
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
})

async function deleteUser(req,res){
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection("Info");
    const deleteResult = await collection.deleteOne(
        {"email":req.body['email']}
    );
    return deleteResult;
}

async function fetchUnverify(res){
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection("Info");
    let result = await collection.find({"verify":0}).sort({_id:-1}).toArray();
    res.send(result);
    return result;
};

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

async function fetchAll(res){
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection("Info");
    let result = await collection.find({}).sort({_id:-1}).toArray();
    res.send(result);
    return result;
};

async function fetchAccount(res){
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection("Info");
    let result = await collection.find({"uid":uid}).toArray();
    res.send(result);
    return result;
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
        verify:0,
        uid: req.body['uid'],
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
        {"uid":uid},
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
        {"uid":uid},
        {
            $set:
            {
            pic: req.body['pic']}
        }
    );
    return insertResult;
}

// for address
router.get("/getAddress/:uid",function(req,res){
    uid=req.params.uid;
    fetchAddress(res)
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
});

router.post("/addAddress/:uid",function(req,res){
    uid = req.params.uid;
    addAddress(req,res)
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
})

async function fetchAddress(res){
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection("Address");
    let result = await collection.find({"uid":uid}).toArray();
    let address = [];
    for(let i = 0; i < result.length; i++){
        if(result[i].room!=""){
            address[i] = result[i].room 
            if(result[i].building!=""){
            address[i] += ", " + result[i].building
        }
        }else if(result[i].building!=""){
            address[i] = result[i].building
        }
        if(result[i].college != "None" || result[i].college != "None"){
            address[i] += ", " + result[i].college
        }
    }
    res.send(address);
    return "address";
    
};

async function addAddress(req,res){
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection("Address");
    const insertResult = await collection.insertOne({ 
        uid: req.body['uid'],
        room: req.body['room'],
        building: req.body['building'],
        college: req.body['college'],
    });
    return"insertResult";
};
export default router;