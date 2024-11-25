const deltodo = (index)=>{

console.log("deleted")
const element = document.getElementById(index);
element.parentNode.removeChild(element);
}

let ctr = 1
const addtodo = ()=>{
const inputel = document.querySelector("input")
const valuee = inputel.value



const newdevel = document.createElement("div");
const newspan = document.createElement("span");
const newbutton = document.createElement("button");
newspan.innerHTML=valuee;
newbutton.innerHTML= "delete";
newdevel.id=ctr
const currentId = ctr;
newbutton.onclick=()=>deltodo(currentId);

newdevel.appendChild(newspan);
newdevel.appendChild(newbutton);
newdevel.className="style1";
newbutton.className="style2";




document.querySelector("body").appendChild(newdevel);
ctr+=1
}


