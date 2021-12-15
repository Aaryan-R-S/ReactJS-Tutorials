import React from 'react'
import noteContext from '../context/notes/noteContext';
import { useContext, useState } from 'react';

export default function AddNote() {
    const context = useContext(noteContext);
    const {addNoteCxt} = context;

    const [note, setNote] = useState({title:"", description:"", tag:"General"});

    const clickedAddNoteBtn = (e)=>{
        e.preventDefault();
        document.getElementById('myform').reset();
        addNoteCxt(note.title, note.description, note.tag);
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value});
    }

    return (
        <div>
            <div className='container my-3'>
                <h1>Add Note</h1>
                <form id="myform">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={clickedAddNoteBtn}>Add</button>
                </form>
            </div>
        </div>
    )
}
