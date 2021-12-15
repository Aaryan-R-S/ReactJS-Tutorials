import React from 'react'
import noteContext from '../context/notes/noteContext';
import { useContext, useEffect } from 'react';
import NoteItem from './NoteItem';

export default function Notes() {
    const context = useContext(noteContext);
    const {notesCxt, fetchNotesCxt} = context;

    useEffect(() => {
        fetchNotesCxt();
    }, [])

    return (
        <div>
            <div className='row my-3'>
                <h1>Your Notes</h1>
                {notesCxt.map((note)=>{
                    return <NoteItem key={note._id} note={note}/>;
                })}
            </div>
        </div>
    )
}
