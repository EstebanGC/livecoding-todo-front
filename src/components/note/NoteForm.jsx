import React, { useContext, useState } from 'react'
import { postNote, putNote } from '../../actions/noteActions/noteActions'
import { Store } from '../../state/StoreProvider'

const NoteForm = ({id}) => {

  const {state, dispatch} = useContext(Store)

  const [message, setMessage] = useState('')

  const addingMessage = (e) => {
    setMessage(e.target.value)
  }

  const addNote =async (e) => {
    e.preventDefault()
    if(message){
      const note = {
        message,
        done: false,
        categoryId: id
      }
      const response = await postNote(note)
      const action = {
        type: 'add-note',
        payload: response
      }
      dispatch(action)
      setMessage('')
    }
  }

  const editNote = async (e) => {
    e.preventDefault()
    if(message){
      const noteToUpdate = {...state.note, message: message}
      const response = await putNote(noteToUpdate)
      const action = {
        type: 'update-note',
        payload: response
      }
      dispatch(action)
      setMessage('')
    }
  }

  return (
    <div>
      <form>
        <div className="input-group mb-3">
          <label htmlFor="note"></label>
          <input className="form-control mt-2 me-2" onChange={addingMessage} type="text" name="note" value={message} placeholder={id === state.note.categoryId ? state.note.message : ''} />
          {id === state.note.categoryId ?
            <button className="btn btn-success mt-2 me-3" onClick={editNote}>Edit note</button>
            : <button className="btn btn-success mt-2 me-3" onClick={addNote}>Add note</button>}
        </div>
      </form>
    </div>
  )
}

export default NoteForm