import React from 'react'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import LoginForm from '../auth/LoginForm'

function Login() {
  return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center'>
        <div className='md:py-7 md:px-8 py-7 px-4 flex justify-center items-center flex-col space-y-4 login'>
            <h2 className='text-center text-3xl md:text-5xl text-slate-900'>Login</h2>
            <p className='text-[16px] text-slate-700'>Welcome back user👋</p>
            <LoginForm/>
            <Link href={'/forgetpassword'}><p className='text-[14px] text-blue-800 cursor-pointer hover:text-blue-900 duration-500 text-center'>Forgot Password?</p></Link>
                    <p className='text-[14px] text-center mt-4 text-black'>Dont have an account?<Link href={'/register'}><span className='text-lg text-blue-800 cursor-pointer hover:text-blue-900 duration-500'>Register</span></Link></p>    
        </div>
    </div>
  )
}

export default Login