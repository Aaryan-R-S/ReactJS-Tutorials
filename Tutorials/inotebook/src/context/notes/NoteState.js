import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
    const notesInitial = [
        {
          "_id": "61b307fd941885677025c832",
          "user": "61b300e4fbff1e3235939fd5",
          "title": "Hello, world! updated",
          "description": "Yo hope it works updated",
          "tag": "updated",
          "date": "2021-12-10T07:55:41.648Z",
          "__v": 0
        },
        {
          "_id": "61b30be44da1b7b8353ba100",
          "user": "61b300e4fbff1e3235939fd5",
          "title": "Hello, world!",
          "description": "Yo hope it works",
          "tag": "General",
          "date": "2021-12-10T08:12:20.635Z",
          "__v": 0
        },
        {
          "_id": "61b30c0f4da1b7b8353ba106",
          "user": "61b300e4fbff1e3235939fd5",
          "title": "Hello, world!",
          "description": "Yo hope it works",
          "tag": "General",
          "date": "2021-12-10T08:13:03.942Z",
          "__v": 0
        },
        {
          "_id": "61b307fd941885677025c832",
          "user": "61b300e4fbff1e3235939fd5",
          "title": "Hello, world! updated",
          "description": "Yo hope it works updated",
          "tag": "updated",
          "date": "2021-12-10T07:55:41.648Z",
          "__v": 0
        },
        {
          "_id": "61b30be44da1b7b8353ba100",
          "user": "61b300e4fbff1e3235939fd5",
          "title": "Hello, world!",
          "description": "Yo hope it works",
          "tag": "General",
          "date": "2021-12-10T08:12:20.635Z",
          "__v": 0
        },
        {
          "_id": "61b30c0f4da1b7b8353ba106",
          "user": "61b300e4fbff1e3235939fd5",
          "title": "Hello, world!",
          "description": "Yo hope it works",
          "tag": "General",
          "date": "2021-12-10T08:13:03.942Z",
          "__v": 0
        }
    ]
    const [notes, setNotes] = useState(notesInitial);
    return(
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;