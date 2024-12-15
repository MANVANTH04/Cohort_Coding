const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));



const todos = [];
let id = 0  

app.get('/', (req, res)=>{
    res.write(" <h1> create, edit and delete the todo  <h1/>")
    res.write(`
    <a href="/todo"> click here to create a new todo</a>
    `)

    res.write(`<form action="/todo" method="POST">
        <input type="text" placeholder="enter the title " name= "inputtitle"/>
        <input type= "text" placeholder= "enter the description" name= "inputdesc"/>
        <button type="submit"> submit</button>
    </form>`)

    res.write(`
  ${todos.map(todo => `
    <div>
      <h1>${todo.title}</h1>
      <h3>${todo.id}</h3>
      <p>${todo.description}</p>
    </div>
  `).join('')}
`);
res.end();

    res.send();

})

app.post('/todo', (req,res)=>{
    const title = req.body.inputtitle;
    const description = req.body.inputdesc;
    const todoo ={
        id: id,
        title: title,
        description:description
    }
    todos.push(todoo)
    console.log(todos)
    id+=1;
    res.redirect('/')
})

app.get('/about', (req,res)=>{

})


app.listen(3000)

