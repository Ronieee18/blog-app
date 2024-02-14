import React, { useEffect, useState } from 'react'
import { Link,useNavigate, useParams } from 'react-router-dom'
import dbservice from '../appwrite/DBservice'
import { useSelector } from 'react-redux'
import Button from '../components/Button'
import parse from 'html-react-parser'

function Post() {
    const [post,setpost]=useState(null)
    const {slug}=useParams()
    const userdata=useSelector((state)=>state.auth.userdata)
    const isauthor=post && userdata ? post.userID===userdata.$id : false
    const navigate=useNavigate()
    useEffect(()=>{
        if(slug){
            dbservice.getPost(slug).then((post)=>{
                if(post){
                    setpost(post)
                }else{
                    navigate('/')
                }
            })

        }else{
            navigate('/')
        }
    },[slug,navigate])

    const deletePost=()=>{
        dbservice.deletePost(post.$id).then((status)=>{
            if(status){
                dbservice.deleteFile(post.featuredImage);
                navigate('/')
            }
        })
    }
  return post?(
    <div className="py-8">
            
                <div className="w-5/12 block ml-auto mr-auto justify-center items-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={dbservice.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                        {isauthor &&(
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500 " className="mr-3 hover:bg-green-600">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" className='hover:bg-red-600' onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                       )};   
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            
        </div>
  ):null
}

export default Post