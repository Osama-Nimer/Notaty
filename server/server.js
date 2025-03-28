const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const Database = require("./Database");
const db = new Database();

app.use(cors()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended : false})); 



app.post('/notes' ,(req , res) => {
    const body = req.body;
    console.log("BODY: " , body);
    db.addNote(body).then(data =>{
        res.send(data);
    }).catch(err => {
        res.status(500).send(err);
    })
});


app.get('/notes',(req,res)=>{
    db.getNotes().then(data => {
        res.send(data);
    }).catch(err =>{
        res.status(500).send(err);
    })
});


app.get('/note/:id',(req,res)=>{
    var { id } = req.params;
    db.GetNoteById(id).then(data=>{
        if(!data){
            res.status(404).send(`ID Dose not exist ${id} !!`);
        }
        else{
           res.send(data); 
        }
    }).catch(err=>{
        res.status(500).send(err);
    });
});


app.put('/notes' , (req , res) => {
    db.updteNote(req.body)
    .then(data =>{
        if(!data)
            res.status(404).send(`Note Dose Not Exist !!`)
        else
            res.send(data);
    })
    .catch(err => {
        res.status(500).send(err);
    });
});


app.delete('/note/:id' ,(req,res) => {
    db.DeleteNote(req.body)
    .then(data => {
        if(!data)
            res.status(404).send("Note Already dose not exist !!");
        else
            res.send(data);
    })
    .catch(err =>{
        res.status(500).send(err);
    });
});

app.listen(3000, () => {
    console.log("server has started on port 3000...");
    db.connect();
});