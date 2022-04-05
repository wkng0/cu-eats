import express from "express"
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import multer from "multer";
import path from 'path'
const __dirname=path.resolve();
const router = express.Router();

const url="mongodb+srv://admin:admin_d2@groupd2.d3lwk.mongodb.net/sample_users?retryWrites=true&w=majority";
const client=new MongoClient(url);

router.use(bodyParser.urlencoded({extended: false}));

const dbName="Menu";

let canteenname = "";
let dishid = "";

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


// router.post("/AddMenu/:canteenname", function(req, res) {
//     canteenname = req.params.canteenname;
//     postMenu(req, res)
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => client.close());
// });


// router.delete("/DeleteMenu/:dishesID", function(req, res) {
//     // canteenname = req.params.canteenname;
//     dishesID = req.params.dishesID;
//     deleteMenu(req, res)
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => client.close());
//     res.send(dishesID);
// })


router.get("/getDishes/:canteenname/:dishid", function(req, res) {
    dishid = req.params.dishid;
    canteenname = req.params.canteenname;
    getDishes(req, res)
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
    // res.send(dishid);    // will have error
});

router.delete("/deleteDishes/:canteenname/:dishid", function(req, res) {
    dishid = req.params.dishid;
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



// async function postMenu(req,res){
//     await client.connect();
//     console.log('Connected successfully to server');
//     const db = client.db(dbName);
//     const collection = db.collection(canteenname);
//     const insertResult = await collection.insertOne({ 
//         dishesID: req.body['dishesID'],
//         name: req.body['name'],
//         // varients: req.body[],
//         // prices: req.body[],
//         category: req.body['category'],
//         image:req.body['image']
//     });
//     return "Menu Added!";
// };


async function deleteDishes(req, res) {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection(canteenname);
    let deleteResult = await collection.findOneAndDelete({"dishesID": dishid});
    res.send(deleteResult);
}


async function getDishes(req, res) {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection(canteenname);
    let result = await collection.findOne({"dishesID": dishid});
    res.send(result);
}



export default router;
