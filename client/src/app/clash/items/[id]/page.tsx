import { fetchKalesh } from '@/app/fetch/kaleshFetch'
import Navbar from '@/components/base/Navbar'
import React from 'react'

export default async function clashItems({params} : {params : {id : number}}) {

    const kalesh:KaleshType|null = await fetchKalesh(params.id);
    
  return (
    <div className='container min-h-screen w-full'>
        <Navbar/>
        <div className='mt-4'>
            <h1 className='text-2xl lg:text-4xl font-bold'>{kalesh?.title}</h1>
            <p className='text-lg'>{kalesh?.decsription}</p>
        </div>
    </div>
  )
}
