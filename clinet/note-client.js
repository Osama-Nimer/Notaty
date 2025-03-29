const url = "http://localhost:3000";

async function addNote(noteData) {
    const response = await fetch(`${url}/notes`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(noteData)
    });
    return response;
}


async function updateNote(note){
    const res = await fetch(`${url}/notes`,
    {
        method:"PUT",
        headers:{"Content-Type" : "application/json"},
        body : JSON.stringify(note)
    });
    return (res);
}


async function deleteNote(noteId) {
    const response = await fetch(`${url}/notes/${noteId}`, {
        method: "DELETE"
    });
    return response;
}
async function getNoteById(id){
    const res = await fetch(`${url}/notes/${id}`);
    return (res.json());
}

async function getNotes(title) {
    let nUrl = `${url}/notes`;
    if (title) { 
        nUrl += `/?title=${encodeURIComponent(title)}`;
    }
    const res = await fetch(nUrl);
    return res.json();
}