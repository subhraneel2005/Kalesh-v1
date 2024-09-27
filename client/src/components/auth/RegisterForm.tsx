'use client';

import React,{useEffect} from 'react';
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { registerAction } from '@/app/actions/authActions';
import {useFormState} from "react-dom"
import {SubmitButton} from "../commons/SubmitBtn"
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

function RegisterForm() {

    const router = useRouter();
  const initialState = {
    message: "",
    status: 0,
    errors: {},
  };
  const [state, formAction] = useFormState(registerAction, initialState);

  useEffect(() => {
    if (state.status === 404) {
      toast.error(state.message);
    } else if (state.status === 200) {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className='mt-5 md:mt-14 w-full h-full space-y-4'>
                <div>
                    <label className='text-slate-900' htmlFor="name">Username</label>
                    <Input name='name' type='text' className='bg-slate-800'/>
                    <span className='text-red-600'>{state.errors?.name}</span>
                </div>
                <div>
                    <label className='text-slate-900' htmlFor="email">Email</label>
                    <Input name='email' type='email' className='bg-slate-800'/>
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

export default RegisterForm