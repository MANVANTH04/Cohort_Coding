const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const {UserModel, TodoModel} = require("./db");

mongoose.connect("mongodb+srv://manvanthme:cJzGzqDepL1V4Wf9@trail.1tdbcvn.mongodb.net/")

const app = express();

// for parsing the body data 
app.use(express.json());
jwtsecret = "yourlovelysecretkey";




app.post("/signup",async(req,res)=>{
    const email = req.body.email;
    const namee = req.body.namee;
    const password = req.body.password;

    const user = await UserModel.create({
        email: email, 
        namee: namee,
        password: password
    })
    console.log(user);

})

app.post("/login",async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const id = TodoModel.userid;


    const isauth = await UserModel.findOne({email: email, password : password})

    if(isauth){
        const token = jwt.sign({email, jwtsecret})
        res.status(200).json({
            message:"loggedin successfully",
            token: token
        })
    }

})


app.post("/todo", (req,res)=>{
    const title = req.body.title;
    const id = req.userid;

    TodoModel.create({
        title : title,
        id : id
    })

    res.json({
        message : "todos are created successfully"
    })




})

app.get("/todo",(req,res)=>{
    const token = req.headers.token;
    const decodedinfo = jwt.verify(token, jwtsecret);

    if (decodeinfo){
        email = decodedinfo.email;

        res.json({
            message: "user is athenticated",

        })

        
        
    }
    

})
