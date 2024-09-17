import React from 'react'
import RegisterForm from '@/components/auth/RegisterForm';
import Link from 'next/link';

function Register() {
  return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center'>
        <div className='py-7 px-8 flex justify-center items-center flex-col space-y-4 login'>
            <h2 className='text-center text-3xl md:text-5xl text-slate-900'>Register</h2>
            <p className='text-[16px] text-slate-700'>Hi new user👋</p>
            <RegisterForm/>
            <div className='flex w-full justify-center items-center flex-col mt-6 md:mt-14'>
                    <Link href={'/forgetpassword'}><p className='text-[14px] text-blue-800 cursor-pointer hover:text-blue-900 duration-500 text-center'>Forgot Password?</p></Link>
                    <p className='text-[14px] text-center mt-4 text-black'>Already have an account?<Link href={'/login'}><span className='text-lg text-blue-800 cursor-pointer hover:text-blue-900 duration-500'>Login</span></Link></p>         
            </div>
        </div>
    </div>
  )
}

export default Register;