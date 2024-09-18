'use client';

import React,{useEffect} from 'react';
import { Input } from '@/components/ui/input'
import { forgetPasswordAction  } from '@/app/actions/authActions';
import {useFormState} from "react-dom"
import {SubmitButton} from "../commons/SubmitBtn"
import { toast } from 'sonner';

function ForgetPassword() {
    const initState = {
        status: 0,
        message: "",
        errors: {},
        data:{}
    };

    const [state, formAction] = useFormState(forgetPasswordAction, initState);

    useEffect(() => {
        if(state.status === 500){
            toast.error(state.message)
        }
        else if(state.status === 200){
            toast.success(state.message)
        }
       
    }, [state])
  return (
    <form action={formAction} className='mt-5 md:mt-14 w-full h-full space-y-4'>
        <div>
            <label className='text-slate-900' htmlFor="email">Email</label>
            <Input name='email' id='email' type='email' className='bg-slate-800'/>
            <span className='text-red-600'>{state.errors?.email}</span>
        </div>
        
        <div className='flex w-full justify-center items-center flex-col mt-6 md:mt-14'>
            <SubmitButton/>         
        </div>
            </form>
  )
}

export default ForgetPassword