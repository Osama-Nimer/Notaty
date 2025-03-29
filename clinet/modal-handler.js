function    openAddModal()
{
    const modal = document.getElementById("addNoteModal");
    var closeAdd = document.getElementById("closeAdd");
    var cancelBtn = document.getElementById("cancelAddNoteBtn");
    
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