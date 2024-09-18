'use client';

import React,{useEffect} from 'react';
import { Input } from '@/components/ui/input'
import { resetPasswordAction } from '@/app/actions/authActions';
import {useFormState} from "react-dom"
import {SubmitButton} from "../commons/SubmitBtn"
import { toast } from 'sonner';
import {useRouter, useSearchParams} from "next/navigation"

function ResetPassword() {

    const initState = {
        status: 0,
        message: "",
        errors: {},
    };

    const [state, formAction] = useFormState(resetPasswordAction, initState);
    const sParams = useSearchParams();
    const router = useRouter();
    
    useEffect(() => {
        if(state.status === 500){
            toast.error(state.message)
        }
        else if(state.status === 200){
            toast.success(state.message);
            setTimeout(() =>{
                router.replace("/login")
            }, 1000 )
        }
       
    }, [state])

  return (
    <form action={formAction} className='mt-5 md:mt-14 w-full h-full space-y-4'>
        <input type="hidden" name='token' value={sParams.get("token") ?? ""} />
                <div>
                    <label className='text-slate-900' htmlFor="email">Email</label>
                    <Input 
                     id='email'
                     readOnly 
                     name='email' 
                     type='email' 
                     value={sParams.get("email") ?? ""}
                     className='bg-slate-800'/>
                    <span className='text-red-600'>{state.errors?.email}</span>
                </div>
                <div className=''>
                    <label className='text-slate-900' htmlFor="password">Password</label>
                    <Input name='password' type='password' className='bg-slate-800'/>
                    <span className='text-red-600'>{state.errors?.password}</span>
                </div>
                <div className=''>
                    <label className='text-slate-900' htmlFor="cpassword">Conform Password</label>
                    <Input name='conform_password' type='password' className='bg-slate-800'/>
                    <span className='text-red-600'>{state.errors?.conform_password}</span>
                </div>
                <SubmitButton/>
            </form>
  )
}

export default ResetPassword