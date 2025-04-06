const mongoose = require("mongoose");
const Note = require("./schemas/note");

class Database {
    constructor() {
        // this.Url = "mongodb://127.0.0.1:27017/notaty";
        this.Url = process.env.MONGODB_URL || "mongodb+srv://asoomnimer123:_ykPix-6qAQhe7x@cluster0.pxphvw6.mongodb.net/notaty?retryWrites=true&w=majority&appName=Cluster0";
    }

    connect() {
        mongoose.connect(this.Url)
            .then(() => {
                console.log("Connected ...")
            }).catch((err) => {
                console.log("Error in Connecting to Database", err)
            })
    }

    addNote(note) {
        return new Promise((resolve, reject) => {
            note["createdDate"] = new Date();
            note["updatedDate"] = new Date();
            let newNot = new Note(note);
            newNot.save().then(doc => {
                resolve(doc);
            }).catch(err => {
                reject(err);
            })
        })

    }

    getNotes() {
        return new Promise((resolve, reject) => {
            Note.find({}).then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            });
        })
    }

    GetNoteById(id) {
        return new Promise((resolve, reject) => {
            Note.findById(id).then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            })
        })
    }

    updteNote(note) {
        return new Promise((resolve, reject) => {
            note["updatedDate"] = new Date();
            Note.findByIdAndUpdate(note["_id"], note)
                .then(data => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                });
        })
    }

    deleteNote(noteId) {
        return new Promise((resolve, reject) => {
          Note.findByIdAndDelete(noteId)
            .then((data) => {
              console.log("deleted document:", data);
              resolve(data);
            })
            .catch((error) => {
              reject(error);
            });
        });
      }


    getNotesByTitle(noteTitle) {
        return new Promise((resolve, reject) => {
            const query  = { title : {$regex : new RegExp(noteTitle , 'i')} };
            Note.find(query)
            .then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            });
        });
    }
}




module.exports = Database;