import React, { useContext,useState } from 'react'
import { deleteNote, putNote } from '../../actions/noteActions/noteActions';
import { Store } from '../../state/StoreProvider';
import TagList from '../tag/TagList';
import { postTag } from '../../actions/tagActions/tagActions';

const Note = ({ note }) => {

  const { dispatch } = useContext(Store)

  const onCheckbox = async (e) => {
    const checked = e.currentTarget.checked;
    const noteWithCheckbox = { ...note, done: checked }
    const response = await putNote(noteWithCheckbox)
    const action = {
      type: 'update-note',
      payload: response
    }
    dispatch(action)
  }

  const onDeleteNote = async (id) => {
    const response = await deleteNote(id);
    if (response.status === 200) {
      const action = {
        type: 'delete-note',
        payload: note
      }
      dispatch(action)
    }
  }

  const editNote = () => {
    const action = {
      type: 'add-note-to-be-updated',
      payload: note
    }
    dispatch(action)
  }

  const [title, setTitle] = useState('')

  const addTag = async (e)=>{
    e.preventDefault()
    // console.log("note Note")
    // console.log(note.id)
    // console.log(title)
    if(title){
      const category = {
        tag:title,
        noteId:note.id
      }
      //console.log(category)
      const response = await postTag(category)
      const action = {
        type: 'create-Tag',
        payload: response
      }
      dispatch(action)
      setTitle('')
    }
  }

  const addingTitle = (e)=>{
    setTitle(e.target.value)
  }
  
  return (
    <div>

      <div className="card  ">
        <div className='col-6'>

          <h3 style={note.done ? { 'textDecoration': 'line-through' } : {}}>{note.message}</h3>
          <input onChange={onCheckbox} type="checkbox" checked={note.done} />
        </div>
        <div className='col-4'>
          <input className="col-6" onChange={addingTitle} type="text" name="Tag" placeholder="Tag" />
          <button className="btn btn-dark" onClick={addTag}>Add Tag</button>
          <div className='btn btn-dark'><TagList note={note.tags  }></TagList></div>
        </div>

          <button className="btn btn-dark" onClick={() => onDeleteNote(note.id)}>delete note</button>
          <button className="btn btn-dark" onClick={editNote}>edit note</button>

          

      </div>
    </div>
  )
}

export default Note