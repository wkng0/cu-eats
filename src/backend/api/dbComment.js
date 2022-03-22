import express from "express"
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import multer from "multer";
import path from 'path'
const __dirname=path.resolve();

const upload=multer({dest:"comment/photo/"})
const router = express.Router();

const url="mongodb+srv://admin:admin_d2@groupd2.d3lwk.mongodb.net/sample_users?retryWrites=true&w=majority";
const client=new MongoClient(url);
const dbName="Comment";
let canteen="";

router.get("/", function(req, res) {
    res.send("API is working properly");
});


let result="";
router.get("/get/:id", function(req, res) {
    canteen=req.params.id;
    fetchComment(res)
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
});

router.use(bodyParser.urlencoded({extended: false}));
router.post("/post/:id",function(req,res){
    canteen=req.params.id;
    postComment(req,res)
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
});


router.post("/photo/post",upload.single("file"),function(req,res){
    let data={
        "filename":req.file.filename,
        "filetype":req.file.mimetype
    }
    res.send(data)
});

router.get("/photo/get/:id",function(req,res){
    console.log(__dirname)
    res.sendFile(__dirname+"/comment/photo/"+req.params.id)
});





async function postComment(req,res){
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection(canteen);
    const insertResult = await collection.insertOne({ 
        userid: req.body['userid'],
        title: req.body['title'],
        description:req.body['description'],
        type: req.body['type'],
        datetime:new Date(),
        image:req.body['image']
    });
    return "comment posted";
};

async function fetchComment(res){
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection(canteen);
    const commentList = await collection.find({}).sort({datetime: -1}).toArray();
    //console.log('Found documents =>', commentList);
    res.send(commentList);
    return "comments fetched";
};

export default router;