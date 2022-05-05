import express from "express"
import cors from "cors"
import user from "./api/users.route.js"
import comment from "./api/dbComment.js"
import account from "./api/dbAccount.js"
import menu from "./api/dbMenu.js"
import newmenu from "./api/dbNewMenu.js"
import canteenInfo from "./api/dbcanteenInfo.js"
import receipt from "./api/dbReceipt.js"
import verify from "./api/verify.js"
import path from "path"

// PROGRAM SERVER - Program to build up server
// PROGRAMMER: ******
// CALLING SEQUENCE: CALL app.use()
//  Where the arguments are the request object and the response object
//  then CALL app.listen(port, ()=>{}) 
//  Where the port is the variable and second argument is a callback function
// VERSION 1: written 8-3-2022
// REVISION 1.1: 
// PURPOSE: To connect backend server to MongoDB database and catch errors if the connection has problems
// DATA STRUCTURES:
//  Variable __dirname - CONST STRING
//  Variable app - CONST 
//  Variable port - CONST NUMBER
// ALGORITHM: 
//  Enable cross-origin resource sharing by app.use(cors());
//  Parse the incoming JSON request and saved then into req.body by app.use(express.json());
//  Use the GET method to write api;
//  If the server is built successfully, the message 'Server is running on the port ' with port number is shown

const __dirname = path.resolve();

const app = express();
const port = process.env.PORT || 7000;

// Middleware
app.use(cors());
app.use(express.json()); 
app.use(express.static(path.join(__dirname, "../../build")));
app.use("/api/v1/users", user);
app.use("/dbAccount",account);
app.use("/dbComment",comment);
app.use("/dbMenu", menu);
app.use("/dbNewMenu", newmenu);
app.use("/dbcanteenInfo", canteenInfo);
app.use("/dbReceipt",receipt);
app.use("/verify",verify);
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname, "../../build/index.html"));
});

app.listen(port, () => {
    console.log('Server is running on the port ' + port);
});

export default app;
