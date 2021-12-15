import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const url = "http://localhost:5000";
  const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiMzAwZTRmYmZmMWUzMjM1OTM5ZmQ1In0sImlhdCI6MTYzOTEyMTE4OX0.Ll5XcN_ThB5AuBfKaAqq-9N-W2S6A20ygQ2njenoBy0";

  const [notesCxt, setNotesCxt] = useState([]);

  const fetchNotesCxt = async ()=> {
    const response = await fetch(`${url}/api/notes/fetchNotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken
      }
    });
    const initialNotes = await response.json();
    console.log(initialNotes);
    setNotesCxt(initialNotes);
  }

  const addNoteCxt = async (title, description, tag) => {
    const response = await fetch(`${url}/api/notes/addNote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": authToken
      },
      body: JSON.stringify({title, description, tag})
    });
    const addedNote = await response.json();
    console.log(addedNote);
    // fetchNotesCxt();
    setNotesCxt(notesCxt.concat(addedNote));
  }

  const editNoteCxt = async (id, title, description, tag) => {
    const response = await fetch(`${url}/api/notes/updateNote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": authToken
      },
      body: JSON.stringify({title, description, tag})
    });
    const editedNote = await response.json();
    console.log(editedNote);
    // fetchNotesCxt();
    for (let index = 0; index < notesCxt.length; index++) {
      const element = notesCxt[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }

  const deleteNoteCxt = async (id) => {
    const response = await fetch(`${url}/api/notes/deleteNote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": authToken
      },
    });
    const deletedNote = await response.json();
    console.log(deletedNote);
    // fetchNotesCxt();
    let newNotes = notesCxt.filter((note) => { return note._id !== id });
    setNotesCxt(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notesCxt, fetchNotesCxt, addNoteCxt, editNoteCxt, deleteNoteCxt }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;