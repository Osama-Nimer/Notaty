function    clearAddWin(){
    document.getElementById('addTitle').value = "";
    document.getElementById('addContent').value= "";
    document.getElementById('addError').innerText = "";
}


function    clearEditWin(){
    document.getElementById('editTitle').value = "";
    document.getElementById('editContent').value= "";
    document.getElementById('editError').innerText = "";
}

function    openAddModal()
{
    const modal = document.getElementById("addNoteModal");
    var closeAdd = document.getElementById("closeAdd");
    var cancelBtn = document.getElementById("cancelAddNoteBtn");
    
    clearAddWin();

    modal.style.display = "block";
    closeAdd.onclick = () => {
        modal.style.display = "none";
    }
    cancelBtn.onclick = () => {
        modal.style.display = "none";
    }
}

function saveNewNote() {
    const titleStr = document.getElementById("addTitle").value;
    const contentStr = document.getElementById("addContent").value;
    const noteData = { title: titleStr, content: contentStr};
    addNote(noteData)
    .then(response => {
        if (response.ok) {
            var modal = document.getElementById("addNoteModal");
            modal.style.display = "none";
            response.json().then(json => {
                var newNoteId = json["_id"];
                updateNotesTable(newNoteId);
            });
        } else {
            response.text().then(error => {
                document.getElementById("addError").innerHTML = error;
            })
        }
    })
    .catch(error => {
        console.log(error);
        document.getElementById("addError").innerHTML = error;
    })
}


function openUpdateModal(noteId){
    const modal = document.getElementById("editNoteModal");
    var closeEdit = document.getElementById("closeEdit");
    var cancelBtn = document.getElementById("cancelEditNoteBtn");
    
    clearEditWin();

    modal.style.display = "block";
    closeEdit.onclick = () => {
        modal.style.display = "none";
    }
    cancelBtn.onclick = () => {
        modal.style.display = "none";
    }

    loadNoteData(noteId);
}


var id ;
function    loadNoteData(noteId)
{
    id = noteId;
    getNoteById(noteId)
    .then(note => {
        document.getElementById('editTitle').value = note["title"];
        document.getElementById('editContent').value = note["content"];
    }).catch(err => {
        document.getElementById('editError').innerText = err;
    });
}

function    saveEditNote()
{
    
    const titleStr = document.getElementById("editTitle").value;
    const contentStr = document.getElementById("editContent").value;
    const noteData = { _id : id ,title: titleStr, content: contentStr};
    updateNote(noteData)
    .then(response => {
        if (response.ok) {
            var modal = document.getElementById("editNoteModal");
            modal.style.display = "none";
                 updateNotesTable(id);
            } else {
            response.text().then(error => {
                document.getElementById("editError").innerHTML = error;
            })
        }
        clearEditWin();
    })
    .catch(error => {
        console.log(error);
        document.getElementById("editError").innerHTML = error;
    })

}