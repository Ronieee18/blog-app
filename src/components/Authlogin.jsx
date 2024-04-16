import {React,useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {useForm} from 'react-hook-form'
import authService from '../appwrite/authService'
import {login as storeLogin} from "../store/authSlice"
import Input from './Input'
import Button from './Button'
import Logo from './Logo'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser,faEnvelope,faLock,faEye} from '@fortawesome/free-solid-svg-icons'

function Authlogin() {
    const [error,setError]=useState("")
    const [showpass,setShowPass]=useState(false)
    const {register,handleSubmit}=useForm()
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const login = async (data) => {
        try {
            setError('');
            const session = await authService.login(data);
            console.log('Login response:', session); // Log the response
            if (session) {
                const userdata = await authService.getCurrent();
                if (userdata) {
                    dispatch(storeLogin(data));
                    navigate('/');
                    alert('Login successful');
                }
            }
        } catch (error) {
            console.error('Login error:', error); // Log the error
            alert('Invalid password');
        }
    };
    
  return (
    <div
    className='flex bg-black h-[500px] max-[600px]:ml-20  items-center justify-center w-full max-[600px]:mt-10 pt-7'
    >
        <div className={`mx-auto mb-5 w-full max-w-lg bg-gray-100   rounded-lg p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold  leading-tight">Log in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='relative space-y-5'>
                
                
                <Input
                label="Email: "
                placeholder="enter your email"
                {...register("email",{
                    required:true,
                    validate:{
                        pattern:(value)=>/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />

                <Input
                label="password: "
                type={showpass?"text":'password'}
                placeholder="enter password: "
                {...register("password",{
                    required:true
                })}
                
                />
                 <FontAwesomeIcon icon={faEye} className='absolute top-28 right-3 cursor-pointer'onClick={() => setShowPass((prev) => (!prev))}/>
               

                <Button
                type='submit'
                children="Log in"
                />
            </div>
            <p >
            Try these:
        </p>
        <p className='font-mono'><u> email:ronitparwani78@gmail.com</u></p>
        <p className='font-mono'><u> Password:demo@123</u></p>
        </form>
        </div>
        
    </div>
  )
}

export default Authlogin;