const express = require('express') ;
const server = express() ;
server.use(express.json())
const cors = require('cors');
server.use(cors())
require('dotenv').config();
const axios = require('axios');
const PORT=process.env.PORT;

server.listen(PORT,()=>{
    console.log(`Port ${PORT}`);
})
const MONGO=process.env.MONGO;
const mongoose = require('mongoose');
mongoose.connect(MONGO, {useNewUrlParser: true, useUnifiedTopology: true});

server.get('/', // our endpoint name
function (req, res) { 
 res.send('Hello World') 
})


const DrinksSchema = new mongoose.Schema({
    strDrink: String,
    strDrinkThumb: String,
  });

const drink = mongoose.model('Drink', DrinksSchema);

// Routes
server.post('/addtofav',addtofav)
server.get('/getFavDrinks',getFavDrinks)
server.delete('/deletFav',deletfavDrinks)
server.put('/updateFav',updateFav)
// http://localhost:3002/addtofav
// http://localhost:3002/getFavDrinks
// http://localhost:3002/deletFav?id=${id}
// http://localhost:3002/updateFav


// Functions 


function addtofav(req,res){

let {strDrink,strDrinkThumb}=req.body

    let newdrink= new drink({
        strDrink:strDrink,
        strDrinkThumb:strDrinkThumb,
    })
    newdrink.save()
}

function getFavDrinks(req,res){
    drink.find({},(err,data)=>{
        res.send(data)
        
    })

}

function deletfavDrinks(req,res){
 let id=req.query.id
 drink.findOneAndDelete({_id:id},(err,data)=>{})
 .then(()=>{
    drink.find({},(err,data)=>{
        res.send(data)
    })
 })

}



function updateFav(req,res){
let {strDrink,strDrinkThumb,_id}=req.body;
drink.findOne({_id:_id},(err,data)=>{
    data.strDrink=strDrink
    data.strDrinkThumb=strDrinkThumb
    data.save()
})
.then(()=>{
    drink.find({},(err,data)=>{
        res.send(data)
    })
})

}