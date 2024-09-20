import Navbar from '@/components/base/Navbar'
import AddClash from '@/components/clash/AddClash'
import React from 'react'
import { authOptions, CustomSession } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'

export default async function dashboard() {
  const session:CustomSession | null = await getServerSession(authOptions)
  return (
    <div className='min-h-screen w-full px-7 py-4' >
        <Navbar/>
        <div className='text-end mt-10 '>
          <AddClash user={session?.user!}/>
        </div>
    </div>
  )
}
