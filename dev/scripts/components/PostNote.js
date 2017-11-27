import React from 'react';

const PostNote = (props) => {
    return(
        <li className="noteItem">
            <h2>{props.note.title}</h2>
            <p>{props.note.comment}</p>
            <button onClick={() => props.delete(props.note.key)}><i className="fa fa-times-circle" aria-hidden="true"></i></button>
        </li>
    )
}

export default PostNote;