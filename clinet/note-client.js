const url = "http://localhost:3000/";

async function addNote(note){
    const res = await fetch(`${url}/notes`,
        {
            method:"POST",//default :: GET 
            headers:{"Content-Type" : "application/jspn"},
            body: JSON.stringify(note)
        });
        return (res);
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


async function deleteNote(id){
    const res = await fetch(`${url}/notes/${id}`,{
        method : "DELETE"
    });
    return (res); 
}

async function getNoteById(id){
    const res = await fetch(`${url}/notes/${id}`);
    return (res);
}

async function getAllNotes(title){
    let nUrl = `${url}/notes`;
    if(!title)
        nUrl += `/?title=${title}`;
    const res = await fetch(nUrl);
    return (res);
}