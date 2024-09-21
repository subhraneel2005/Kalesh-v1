import Navbar from '@/components/base/Navbar'
import AddClash from '@/components/clash/AddClash'
import React from 'react'
import { authOptions, CustomSession } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'

import ClashCard from '@/components/clash/ClashCard'
import { fetchKaleshes } from '@/fetch/kaleshFetch'

export default async function dashboard() {
  const session:CustomSession | null = await getServerSession(authOptions);
  const allKaleshs:Array<KaleshType> | [] = await fetchKaleshes(session?.user?.token!);
  // console.log("The Kaleshes of this user are: ", allKaleshs);
  
  return (
    <div className='min-h-screen w-full px-7 py-4' >
        <Navbar/>
        <div className='text-end mt-10 '>
          <AddClash user={session?.user!}/>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10'>
          {allKaleshs.length > 0 && allKaleshs.map((item, index) => <ClashCard token={session?.user?.token!}kalesh={item} key={index}/>)}
        </div>
    </div>
  )
}
