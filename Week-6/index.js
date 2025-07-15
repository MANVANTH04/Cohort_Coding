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





app.get("/me", (req,res)=>{
    const auth = req.headers.token;
    const decodedinfo = jwt.verify(auth, jwtsecret)
    const username = decodedinfo.username;
    // const isauth = users.find(user => user.token === auth);
    console.log(username);


    if (user) {
        // password = user.passwordl;
        res.send({
         message: "welcome " + username, 
         password: user.password,  
         
        })
    }else{
        res.status(401).send("unauthorized user, please login first");
    }
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

app.listen(3000, ()=>{
    console.log("server is running at port 3000");
})



// i am getting the TypeError: Cannot read properties of undefined (reading &#39;username&#39;) while testing in postman what is teh reason?
