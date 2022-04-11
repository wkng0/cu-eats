import express from "express"
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import multer from "multer";
import path from 'path'
import { ObjectId } from "mongodb";
const __dirname=path.resolve();
const router = express.Router();
import cors from 'cors';
router.use(cors());

const url="mongodb+srv://admin:admin_d2@groupd2.d3lwk.mongodb.net/sample_users?retryWrites=true&w=majority";
const client=new MongoClient(url);

router.use(bodyParser.urlencoded({extended: false}));

const dbName="Menu";
// const MenuModel= require("./models/menu.models.js")

let canteenname = "";
let id = "";

router.get("/", function(req, res) {
    res.send("API is working properly");
});

router.get("/getMenu/:canteenname", function(req, res) {
    canteenname = req.params.canteenname;
    fetchMenu(res)
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());

});


router.post("/AddMenu/:canteenname", function(req, res) {
    canteenname = req.params.canteenname;
    postMenu(req, res)
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
});


// router.post('/AddMenu', async (req, res) => {
//     const name = req.body.name;
//     const age = req.body.age;


//     const friend = new MenuModel({
//         name: name, 
//         age: age
//     });

//     await friend.save();
//     res.send(friend);
// });



router.get("/getDishes/:canteenname/:dishid", function(req, res) {
    id = req.params.dishid;
    canteenname = req.params.canteenname;
    getDishes(req, res)
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
    // res.send(dishid);    // will have error
});

router.delete("/deleteDishes/:canteenname/:id", function(req, res) {
    id = req.params.id;
    canteenname = req.params.canteenname;
    deleteDishes(req, res)
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
    // res.send(dishid);    // will have error
});


// --------------------------------------------------------------------------------------------------------------

async function fetchMenu(res){
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection(canteenname);
    let MenuList = await collection.find({}).toArray();
    //console.log('Found documents =>', commentList);
    res.send(MenuList);
    return "Menu fetched";
};



async function postMenu(req,res){
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection(canteenname);
    const insertResult = await collection.insertOne({ 
        name: req.body['name'],
        variants: req.body['variants'],
        category: req.body['category'],
        image:req.body['image'],
        tag: req.body['tag']
    });
    return "Menu Added!";
};


// async function deleteDishes(req, res) {
//     await client.connect();
//     console.log('Connected successfully to server');
//     const db = client.db(dbName);
//     const collection = db.collection(canteenname);
//     await collection.findByIdAndRemove(id).exec();
//     // res.send(deleteResult);
//     // await collection.find
// }


async function getDishes(req, res) {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection(canteenname);
    let result = await collection.findOne({"_id": id});
    res.send(result);
}

async function deleteDishes(req, res) {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection(canteenname);
    let deletelist = await collection.findOneAndDelete({_id: ObjectId(id)});
    res.send(deletelist);
    // await collection.find
}



export default router;
