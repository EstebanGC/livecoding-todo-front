import React from 'react'
import { postTag } from '../../actions/tagActions/tagActions'
import { Store } from '../../state/StoreProvider'

const TagForm = () => {

    

    return (
        <input className="form-control mt-2 me-2" onChange={postTag} type="text" name="Tag" placeholder="Tag" />
    )
}

export default TagForm