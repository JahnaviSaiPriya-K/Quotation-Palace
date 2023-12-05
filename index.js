//server code
var express = require('express');
var bp = require('body-parser');
var axios = require('axios');
var app = express();
app.use(bp.urlencoded({extended:true}));
app.use(bp.json());
app.use(express.static("public"));
app.set('view engine','ejs');
API_URL = "http://localhost:5000";
app.get("/", async (req,res)=>{
    try{
        const response = await axios.get(`${API_URL}/quote`);
        // console.log(response.data);
        res.render("index.ejs",{quotes:response.data});
    }
    catch(error){
        console.log(error);
    } 
});
app.get("/new",(req,res)=>{
    res.render('modify.ejs',{heading : 'New Quote' , submit: 'Submit Quote'});
});
app.get("/edit:id", async (req,res)=>{
    try{
    const response = await axios.get(`${API_URL}/quotes/${req.params.id}`)
    res.render('modify.ejs',{heading : 'Edit Quote' , submit : 'Edit Quote' , quote:response.data});
    }
    catch(error){
        console.log(error);
    }
})
app.post("/create", async (req,res)=>{
    try{
        const response = await axios.post(`${API_URL}/newquote`,req.body);
        res.redirect("/");
    }catch(error){
        console.log(error);
    }
});
app.post("/editing:id", async (req,res)=>{
    try{
        const response = await axios.patch(`${API_URL}/edited/${req.params.id}`,req.body);
        // console.log(response.data);
        res.redirect("/");
    }catch(error){
        console.log(error);
    }
})
app.get("/delete:id", async (req,res)=>{
    try{
    const response = await axios.delete(`${API_URL}/deleted/${req.params.id}`);
    res.redirect("/");
    }catch(error){
        console.log(error);
    }
})













app.listen(4000,()=>{
    console.log("Server running successfully on port 4000");
})