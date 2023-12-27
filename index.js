let express = require("express");
let bodyParser = require('body-parser');
require("dotenv").config()
const port = process.env.PORT;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


let books = [
    {
        id:"1",
        name:"harry porter"
    },
    {
        id:'2',
        name:'mister bean'
    }
];


// get all books
app.get('/books',(req,res)=>{
    res.send(books)
})


// get books by id
app.get('/books/:id',(req,res)=>{
    let filter = books.filter((e)=>{return e.id == req.params.id});
    res.send(filter)
})

// add book
app.post('/books',(req,res)=>{
    books.push(req.body);
    res.send({message:'book added successfully !'})
})


app.patch('/books/:id',(req,res)=>{
    try {
        books.map((e)=>{
            if(e.id === req.params.id){
                e.name = req.body.name
            }
        })
        res.send({message:'book updated successfully !'})
    } catch (error) {
        res.send({message:'failed to update book !'})
    }
})

app.put('/books/:id',(req,res)=>{

})

app.delete('/books/:id',(req,res)=>{
    console.log(req.params.id);
    let newBooksList = books.filter((e)=> e.id !== req.params.id)
    books = newBooksList;
    res.send({message:'book deleted successfully !'})
})









app.listen(port,() => { console.log(`${port}server rinning...`) })