'use strict'
// Application Dependencies
const express = require('express');
const pg = require('pg');
const methodOverride = require('method-override');
const superagent = require('superagent');
const cors = require('cors');
const { render } = require('ejs');
//const { delete} = require('superagent');

// Environment variables
require('dotenv').config();

// Application Setup
const app = express();
const PORT = process.env.PORT || 3000;
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));

// Express middleware
// Utilize ExpressJS functionality to parse the body of the request

// Specify a directory for static resources

// define our method-override reference

// Set the view engine for server-side templating
app.set(' view engine','ejs');


// Use app cors


// Database Setup
const client = new pg.Client(process.env.DATABASE_URL);

// app routes here
// -- WRITE YOUR ROUTES HERE --
app.get('/',renderHome);
app.post('/fav',saveData);
app.get('/favorite-quotes',favpage);
app.get('/details/:id',detailsPage);
app.put('/details/:id',updata);
app.delete('/details/:id',deleteS);




function deleteS(req,res){
    const id=req.params.id;
  const sql= `DELETE FROM simpson WHERE id=$1;`
  client.query(sql,id).then(()=>{
    res.redirect(`/details/${id}`);
})


}


function updata(req,res){
    const id=req.params.id;
    const sql=`UPDATE simpson SET quote=$1, character=$2, image=$3, characterDirection=$4 WHERE id=$5; `;
    const{quote,character,image,characterDirection}=req.body;
    client.query(sql,id).then(()=>{
        res.redirect(`/details/${id}`);
    })

}

function detailsPage(req,res){
const id=req.params.id;
const sql=`SELECT * FROM simpson WHERE id=$1;`;
client.query(sql,id).then(data=>{
    res.render('details',{det:data.rows})
})



}


function favpage(req,res){
    const sql=`SELECT * FROM simpson;`;
    client.query(sql).then(data=>{
        res.render('favpage',{fav:data.body})
    })
}




function saveData(req,res){

const{quote,character,image,characterDirection}=req.body;
const sql=`INSERT INTO simpson(quote,character,image,characterDirection) VALUES($1,$2,$3,$4);`;
 const saveValues=[quote,character,image,characterDirection];
 client.query(sql,saveValues).then(()=>{
     res.redirect('/favorite-quotes',{data:req.rows})
 })

}


function renderHome(req,res){
const url=`https://thesimpsonsquoteapi.glitch.me/quotes?count=10`;

superagent.get(url).then(data=>{
    x=data.body.map(result=> new Simpson(result))
    res.render('index',{data:x})
})


}

function Simpson(data){
this.quote=data.quote;
this.character=data.character
this.image=data.image
this.characterDirection=data.characterDirection
}



// callback functions
// -- WRITE YOUR CALLBACK FUNCTIONS FOR THE ROUTES HERE --

// helper functions

// app start point
client.connect().then(() =>
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
);
