import express from "express"
import { MongoClient, ObjectId } from "mongodb";
import bodyParser from "body-parser";
import multer from "multer";
import path from 'path'
const __dirname=path.resolve();


const upload=multer({dest:"comment/photo/"})
const router = express.Router();
const cors=require('cors');
router.use(cors());
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

router.post("/report",function(req,res){
    submitReport(req,res);

})


router.post("/photo/post",upload.single("file"),function(req,res){
    let data={
        "filename":req.file.filename,
        "filetype":req.file.mimetype
    }
    res.send(data)
});

router.get("/photo/get/:id",function(req,res){
    res.sendFile(__dirname+"/comment/photo/"+req.params.id)
});
router.use(bodyParser.json());
router.delete("/delete/comment",function(req,res){
    deleteComment(req,res)
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
})

router.delete("/delete/report",function(req,res){
    deleteReport(req,res)
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
})



const canteenDBList=["NA","SC","UC"]

async function deleteReport(req,res){
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("Report");
    for(let j=0;j<req.body["id"].length;j++){
        const deleteResult = await collection.deleteMany({ postid: req.body["id"][j]});
    }
    res.send("finish");
}

async function deleteComment(req,res){
    await client.connect();
    const db = client.db(dbName);
    for(let i=0;i<canteenDBList.length;i++){
        const collection = db.collection(canteenDBList[i]);
        for(let j=0;j<req.body["id"].length;j++){
            const deleteResult = await collection.deleteMany({ _id: ObjectId(req.body["id"][j])});
            console.log('Deleted documents =>', deleteResult.deletedCount);
            if(deleteResult.deletedCount!=0)break;
        }
        
    }
    const collection = db.collection("Report");
    for(let j=0;j<req.body["id"].length;j++){
        const deleteResult = await collection.deleteMany({ postid: req.body["id"][j]});
        if(deleteResult.deletedCount!=0)break;
    }
    res.send("finish");
}

async function submitReport(req,res){
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection("Report");
    const insertResult = await collection.insertOne({ 
        postid: req.body['postid'],
        reason: req.body['reason'],
        canteen:req.body['canteen'],
    });
    res.send("Report submitted")
}

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
    if(canteen=="Report"){
        let data=[];
        const collection = db.collection("Report");
        const reportList = await collection.find({}).toArray();

        for (let i=0;i<reportList.length;i++){
            for(let j=0;j<canteenDBList.length;j++ ){
                const collection = db.collection(canteenDBList[j]);
                const findReportedComment = await collection.findOne({_id:ObjectId(reportList[i]["postid"])});
                if (findReportedComment!=null){
                    findReportedComment["reason"]=reportList[i].reason;
                    findReportedComment["canteen"]=reportList[i].canteen;
                    data.push(findReportedComment);
                    break;
                }
            }
        }
        console.log(data);
        res.send(data);
    }else{
        const collection = db.collection(canteen);
        const commentList = await collection.find({}).sort({datetime: -1}).toArray();
        //console.log('Found documents =>', commentList);
        res.send(commentList);
        return "comments fetched";
    }
    
    
};



export default router;