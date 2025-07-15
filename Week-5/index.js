//  middleware for the authentication 

const express = require('express');

const app = express();

app.use(express.json());


app.get('/', (req,res)=>{
    const a = req.body.a;
    const b = req.body.b;

    res.json({
         sumsasdf : a+b
    })
})
// so, to get things done, we have to either implement the node.js processor. then also 