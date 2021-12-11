import React from 'react'

export default function NoteItem(props) {
    return (
        <div className='col-md-3 my-3'>
            <div class="card mx-1">
            <div class="card-body">
                <h5 class="card-title">{props.note.title}</h5>
                <p class="card-text">{props.note.description} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est aliquid exercitationem magni quo vel. Quia facere vel earum, incidunt reiciendis cupiditate architecto praesentium perspiciatis itaque sapiente quidem adipisci, dolorem, fuga qui odit in quas?</p>
            </div>
            </div>
        </div>
    )
}
