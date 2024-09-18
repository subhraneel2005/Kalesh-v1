import ForgetPassword from "@/components/auth/ForgetPassword";
import React from "react";

export default function forgetPassword(){
    return(
        <div className='min-h-screen w-full flex flex-col justify-center items-center'>
        <div className='md:py-7 md:px-8 py-7 px-4 flex justify-center items-center flex-col space-y-4 login'>
            <h2 className='text-center text-3xl md:text-5xl text-slate-900'>Kalesh -v1</h2>
            <p className='text-[16px] text-slate-700'>Reset your password ⚙</p>
            <p className="text-[14px] text-slate-700">Chill man! Just enter your email and you will get a password reset link into your email</p>

            <ForgetPassword/>
        </div>
    </div>
    )
}