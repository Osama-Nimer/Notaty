const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const Database = require("./Database");
const db = new Database();
const port = process.env.PORT || 3000;
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


app.get('/notes', (req, res) => {
    const { title } = req.query;
    if(title) {
        db.getNotesByTitle(title)
            .then(data => {
                res.send(data);
            })
            .catch(error => {
                res.status(500).send(error);
            });

    } else {
        db.getNotes()
            .then(data => {
                res.send(data);
            })
            .catch(error => {
                res.status(500).send(error);
            })
    }
});


app.get('/notes/:id',(req,res)=>{
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


app.delete('/notes/:id', (req, res) => {
    const { id } = req.params;
    db.deleteNote(id)
    .then(data => {
        res.send(data);
    })
    .catch(error => {
        res.status(500).send(error);
    })
});

app.listen(port, () => {
    console.log("server has started on port 3000...");
    db.connect();
});