import React from 'react'
import Tag from './Tag'
import TagForm from './TagForm'

const TagList = ({note}) => {
    return (
        <div>
            {note.map(note => <Tag key={note.id}tag={note.tag} />)}
        </div>
    )
}

export default TagList