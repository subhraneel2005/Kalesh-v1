
import ResetPassword from "@/components/auth/ResetPassword";
import React from "react";

export default function resetPassword(){
    return(
        <div className='min-h-screen w-full flex flex-col justify-center items-center'>
        <div className='md:py-7 md:px-8 py-7 px-4 flex justify-center items-center flex-col space-y-4 login'>
            <h2 className='text-center text-3xl md:text-5xl text-slate-900'>Kalesh -v1</h2>
            <p className='text-[16px] text-slate-700'>Reset your password ⚙</p>


            <ResetPassword/>
        </div>
    </div>
    )
}