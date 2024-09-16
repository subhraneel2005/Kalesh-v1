import React from 'react'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

function Register() {
  return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center'>
        <div className='py-7 px-8 flex justify-center items-center flex-col space-y-4 login'>
            <h2 className='text-center text-3xl md:text-5xl text-slate-900'>Register</h2>
            <p className='text-[16px] text-slate-700'>Hi new user👋</p>
            <form className='mt-5 md:mt-14 w-full h-full space-y-4'>
                <div>
                    <label className='text-slate-900' htmlFor="email">Username</label>
                    <Input name='username' id='username' type='text' className='bg-slate-800'/>
                </div>
                <div>
                    <label className='text-slate-900' htmlFor="email">Email</label>
                    <Input name='email' id='email' type='email' className='bg-slate-800'/>
                </div>
                <div className=''>
                    <label className='text-slate-900' htmlFor="password">Password</label>
                    <Input name='password' id='password' type='password' className='bg-slate-800'/>
                </div>
                <div className=''>
                    <label className='text-slate-900' htmlFor="password">Conform Password</label>
                    <Input name='cPassword' id='cPassword' type='password' className='bg-slate-800'/>
                </div>
                <div className='flex w-full justify-center items-center flex-col mt-6 md:mt-14'>
                    <Link href={'/forgetpassword'}><p className='text-[14px] text-blue-800 cursor-pointer hover:text-blue-900 duration-500 text-center'>Forgot Password?</p></Link>
                    <button className='px-6 py-4 mt-6 btn text-black w-full'>Register</button>
                    <p className='text-[14px] text-center mt-4 text-black'>Already have an account?<Link href={'/login'}><span className='text-lg text-blue-800 cursor-pointer hover:text-blue-900 duration-500'>Login</span></Link></p>         
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register;