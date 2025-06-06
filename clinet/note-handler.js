function    updateNotesTable(id,serch)
{
    var tbl = document.getElementById("notes-table");
    var count  = tbl.rows.length;
    while (--count)
    {
        tbl.deleteRow(count);
    }
    getNotes(serch)
    .then(data => {
        data.forEach(note => {
            var row = tbl.insertRow(1);// 0 For table Header
            var idAt = document.createAttribute("id");
            idAt.value = note["_id"];
            row.setAttributeNode(idAt);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            
            cell1.innerHTML = note["title"];
            cell2.innerHTML = note["content"];
            cell3.innerHTML = note["updatedDate"];

            cell4.innerHTML = `<a onclick="confirmDeleteNote('${note["_id"]}')" href="#">
                                <img src="./images/delete.png" style="width:22px;"></a>
                               <a onclick="openUpdateModal('${note["_id"]}')" href="#">
                                <img src="./images/edit.png" style="width:22px;">
                               </a>`
        });
    }).then(()=>{
        if(id)
        {
            var _row = document.getElementById(id);
            _row.setAttribute("style","animation: new-row 5s;");
        }
    });
}


function    searchNotes()
{
    const serch  = document.getElementById("searchInput").value;
    updateNotesTable(undefined,serch);
}

function    confirmDeleteNote(id)
{
    var     action;
    action = confirm ("are you sure to delete this note ??");
    if (action == true)
    {
        deleteNote (id).then ( () => 
        {
            updateNotesTable ();
        });
    }
}



