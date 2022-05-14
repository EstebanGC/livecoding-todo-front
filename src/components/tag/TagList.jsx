import React from 'react'
import Tag from './Tag'
import TagForm from './TagForm'

const TagList = ({note}) => {
    return (
        <div>
            {/* <Tag id={notes} /> */}
            {console.log("notes tagList")}
            {console.log(note)}
            {note.map(not => <Tag tag={not.tag} />)}
        </div>
    )
}

export default TagList