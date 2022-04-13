import express from "express"
import { MongoClient,ObjectId } from "mongodb";
import bodyParser from "body-parser";
import multer from "multer";
import path from 'path'
// import { Menu } from "@mui/material";
const __dirname=path.resolve();
const router = express.Router();
import cors from 'cors';
router.use(cors());

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

router.get("/getMenu",function(req,res){
    fetchAllMenu(res)
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
})

router.get("/getOneMenu/:id",function(req,res){
    fetchOneMenu(req,res)
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
})


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
async function fetchOneMenu(req,res){
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    let result;
    let canteen=["NaMenu","ShawMenu","UcMenu"];
    for (let element of canteen){
        const collection = db.collection(element);
        let MenuList = await collection.findOne({"_id": ObjectId(req.params.id)});
        if(MenuList.length!=0){
            result=MenuList;
            break;
        }
    }
    
    //console.log('Found documents =>', commentList);
    console.log(result);
    res.send(result);
    return "Menu fetched";
}



async function fetchAllMenu(res){
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    let result=[];
    let canteen=["NaMenu","ShawMenu","UcMenu"];
    for (let element of canteen){
        
        const collection = db.collection(element);
        let MenuList = await collection.find({}).toArray();
        result=result.concat(MenuList)
        console.log(result)
    }
    
    //console.log('Found documents =>', commentList);
    res.send(result);
    return "Menu fetched";
}

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
    // await collection.find
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
