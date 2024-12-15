const fs = require('fs');



const main =(fileName) =>{
    fs.readFile(fileName, 'utf8', (err,data)=>{
        if (err){
            console.log(err)
        }else{
            const dataarray = data.split('\n')
            console.log(dataarray.length)
        }
    })
}

main("textfile.txt")