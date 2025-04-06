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
                updateNotesTable();
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


function openUpdateModal(){
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
}