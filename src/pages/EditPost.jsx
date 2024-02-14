import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import dbservice from '../appwrite/DBservice'
import Postform from '../components/EditPage'

function EditPost() {
    const [posts,setposts]=useState(null)
    const {slug}=useParams()
    const navigate=useNavigate()
    useEffect(()=>{
        if(slug){
            dbservice.getPosts([]).then((posts)=>{
                if(posts){
                    setposts(posts)
                }
            })
        }
        else{
            navigate('/')
        }
    },[slug,navigate])
  return posts?(
    <div className='py-8'>
       
           <Postform post={posts}/>
        
    </div>
  ):null
}

export default EditPost