import React, { useEffect, useState } from 'react'
import dbservice from '../appwrite/DBservice'
import PostCard from '../components/Postcard'
import '../App.css' 
import {useNavigate} from 'react-router-dom'
import authservice from '../appwrite/authService'
import authSlice from '../store/authSlice'
import { useSelector } from 'react-redux'
import TypingEffect from '../components/Type'

function Home() {
    const authStatus=useSelector((state)=>state.auth.status)
    const userdata =useSelector((state)=>state.auth.userdata)

    const navigate=useNavigate()
    const [posts,setposts]=useState([])
    useEffect(()=>{
        dbservice.getPosts().then((posts)=>{
            if(posts){
                setposts(posts.documents)
            }
        })
    },[])
    
  return (
    <>
    
    

            <div className=' max-[600px]:w-[550px] h-[100vh] bg-black  text-white p-4' >
                <div className='mt-[100px]'>
               <u> <TypingEffect text="Welcome to Blogger!" typingSpeed={50} className="font-mono text-xl "/></u>
                <h3 className='text-center font-mono   '><u></u></h3>
                <h1 className=' tracking-wider text-center w-[300px] m-auto	 text-2xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed laboriosam est facilis? Alias consequuntur</h1>
                </div>
            { !authStatus && <button onClick={()=>{navigate('/login')}} className='border-white border-2 bg-inherit w-52 text-xl font-mono tracking-wider p-2 m-4 hover:bg-white hover:text-black'>Login</button>
                }


            </div>
        </>
  )
}

export default Home