import React from 'react'
import Postform from '../components/EditPage'
import { useSelector } from 'react-redux'

function Edit() {
  const userdata=useSelector((state)=>state.auth.userdata);
  return (
    <div>
        <Postform/>
    </div>
  )
}

export default Edit