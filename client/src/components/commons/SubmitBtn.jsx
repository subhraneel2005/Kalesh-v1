'use client';
 
import { useFormStatus } from 'react-dom'
 
export function SubmitButton() {
  const { pending } = useFormStatus();
 
  return (
    <button className='px-6 py-4 mt-6 btn text-black w-full' disabled={pending}>
        {pending ? "Processing..." : "Submit"} 
    </button>
  )
}