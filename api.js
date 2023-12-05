var express = require('express');
var bp = require('body-parser');
var app = express();
app.use(bp.urlencoded({extended:true}));
app.use(bp.json())
app.use(express.static('public'));
let quotes = [
    {
        id : 1,
        quote : "Time and Tide waits for none",
        author : "John",
        date : "September"
    },
    {
        id : 2,
        quote : "Time and Tide waits for none",
        author : "John",
        date : "September"
    },
    {
        id : 3,
        quote : "Time and Tide waits for none",
        author : "John",
        date : "September"
    },
    {
        id : 4,
        quote : "Time and Tide waits for none",
        author : "John",
        date : "September"
    }
];
let next_id = 5;
app.get("/quote",(req,res)=>{
    console.log(quotes);
    res.json(quotes);
});

app.post("/newquote",(req,res)=>{
    const new_quote = {
     id : next_id,
     quote : req.body.quotation,
     author : req.body.author,
     date : new Date()
    } 
    next_id+=1;
    quotes.push(new_quote);
    res.json(new_quote);
});
app.get("/quotes/:id",(req,res)=>{
    const quote = quotes.find((q)=> q.id === parseInt(req.params.id) )
    res.json(quote);
}) 
app.patch("/edited/:id",(req,res)=>{
    const quot = quotes.find((q)=>q.id === parseInt(req.params.id));
    if(req.body.quotation) quot.quote = req.body.quotation;
    if(req.body.author) quot.author = req.body.author;
    // console.log("data:",quot);
    res.json(quot);
});
app.delete("/deleted/:id",(req,res)=>{
    const quote = quotes.findIndex((q)=> q.id === parseInt(req.params.id));
    quotes.splice(quote,1);
    res.json(quotes)

})
app.listen(5000,()=>{
    console.log("API running successfully on port 5000");
})