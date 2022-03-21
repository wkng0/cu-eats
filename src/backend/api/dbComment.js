import express from "express"
import { MongoClient } from "mongodb";
const router = express.Router();

const url="mongodb+srv://admin:admin_d2@groupd2.d3lwk.mongodb.net/sample_users?retryWrites=true&w=majority";
const client=new MongoClient(url);
const dbName="Comment";
let canteen="";

router.get("/", function(req, res) {
    res.send("API is working properly");
});


let result="";
router.get("/get:id", function(req, res) {
    canteen=req.params.id;
    fetchComment(res)
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
});



async function fetchComment(res){
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection(canteen);
    const commentList = await collection.find({}).toArray();
    console.log('Found documents =>', commentList);
    res.send(commentList);
    return "done";
}



export default router