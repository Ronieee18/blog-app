import React, { useEffect, useState } from 'react'
import dbservice from '../appwrite/DBservice'
import PostCard from '../components/Postcard'

function AllPosts() {
    const [posts,setposts]=useState([])
    useEffect(()=>{
        dbservice.getPosts([])
            .then((posts)=>{
                if(posts){
                    setposts(posts.documents)
                }
            })
    },[])
  return (
    <div className='flex flex-col justify-center items-center w-full py-8 m-5 '>
    <h1 className='text-left mb-5  text-2xl font-serif font-medium'>Your posts :</h1>
        <div className='flex flex-wrap max-[600px]:flex-col max-[600px]:gap-5 '>
            {posts.map((post) => (
                <div key={post.$id} className='p-1 w-2/12 max-[600px]:w-44 mr-10 hover:w-[18%] transition-all ease-in	rounded-md border-2 border-gray-600 shadow- xl shadow-gray-900'>
                    <PostCard {...post}/>
                </div>
            ))}
        </div>
</div>
  )
}

export default AllPosts