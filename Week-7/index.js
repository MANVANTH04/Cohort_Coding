const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const {UserModel, TodoModel} = require("./db");
const bcrypt = require("bcrypt");
const {z} = require("zod");

mongoose.connect("mongodb+srv://manvanthme:cJzGzqDepL1V4Wf9@trail.1tdbcvn.mongodb.net/")

const app = express();

// for parsing the body data 
app.use(express.json());
jwtsecret = "yourlovelysecretkey";




app.post("/signup",async(req,res)=>{

    const requiredcheck = z.object({
        email: z.string().includes("@").email(),
        namee : z.string().min(6).max(30),
        password: z.string().min(5).max(20)

    })


    const result = requiredcheck.safeParse(req.body);

    if (!result.success){
        res.send({
            message: "invalid format, please check the data you have entered",
            error: result.error});
        return;
    }

    const email = req.body.email;
    const namee = req.body.namee;
    const password = req.body.password;

    let handleerror = flase

    try{
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
        email: email, 
        namee: namee,
        password: hashedpassword
    })
    console.log(user);

    }catch (err){
        console.log(err);
        res.send({
            message: "user already exists, login first"
        })
        handleerror = true;
    }
    if(!handleerror){
    res.status(200).send({
        message: "user created successfully",
    })}

})

app.post("/login",async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const id = TodoModel.userid;


    const isauth = await UserModel.findOne({email: email})

    // if(isauth){
    //     const token = jwt.sign({email, jwtsecret})
    //     res.status(200).json({
    //         message:"loggedin successfully",
    //         token: token
    //     })
    // }
    const hashedpassword = isauth.password;
    const compare = await bcrypt.compare(password, hashedpassword);

    if (compare){
        res.status(200).json({
            "message": "logged in successfully",
            token: jwt.sign({email, jwtsecret})
        })
    }else{
        res.send({
            "message": "login failed, please check your credentials"
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
