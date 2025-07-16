const express = require("express");

const app = express();
const jwt = require("jsonwebtoken");

// to parse data from the request of the body to json format
app.use(express.json());

const jwtsecret = "yoyohoneysingheeeee";


let users = [{username: "manu", password : "1234", token:"1"},
            {username: "john", password : "12345", token:"2"},
            {username: "doe", password : "12343", token:"3"},
            {username: "jane", password : "12341", token:"4"}
            ];




app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/public/index.html")
})

app.post("/signup", (req,res)=>{

    // PENDING :- Do the input validation using zod
    const username = req.body.username;
    const password = req.body.password;
   

    users.push({
        username: username,
        password: password,
    })
    res.send({
        message : "user created succcesfully for" +username,

    })

 

})


app.post("/signin", (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const token = jwt.sign({username:username},jwtsecret);
    console.log(username,password);

    const isUserValid =  users.find(user=> user.username === username && user.password === password)
          
    if(isUserValid){
        isUserValid.token = token.toString();
        console.log(users);
            res.send({
                message: "logged in successfully",
                token: token.toString()
            });
        }
    else{
        res.status(401).send("not user found, please signup first");
    }
}

)

const auth = (req, res, next)=>{

    const auth = req.headers.token;
    const decodedinfo = jwt.verify(auth, jwtsecret);
    const verifyUser1 = users.find(user => user.username === decodedinfo.username);

    if (!verifyUser1){
        res.status(401).send("you are not an authorized user, please login first");
    }else{

            req.username = decodedinfo.username;

            next();
    }
}

// app.use(auth);

app.get("/me", auth, (req,res)=>{



    
        res.json({
         message: "welcome " + req.username, 
     
         
        })
 
})

app.listen(3000, ()=>{
    console.log("server is running at port 3000");
})



// i am getting the TypeError: Cannot read properties of undefined (reading &#39;username&#39;) while testing in postman what is teh reason?
