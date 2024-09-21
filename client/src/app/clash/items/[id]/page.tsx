import { authOptions, CustomSession } from '@/app/api/auth/[...nextauth]/options';
import { fetchKalesh } from '@/app/fetch/kaleshFetch'
import Navbar from '@/components/base/Navbar'
import AddClashItems from '@/components/clash/AddClashItems';
import ViewClashItems from '@/components/clash/ViewClashItems';
import { getServerSession } from 'next-auth';
import React from 'react'

export default async function clashItems({params} : {params : {id : number}}) {

    const kalesh:KaleshType|null = await fetchKalesh(params.id);
    const session:CustomSession|null =await getServerSession(authOptions)
    
  return (
    <div className='min-h-screen w-full px-6'>
        <Navbar/>
        <div className='mt-4 lg:mt-6 flex justify-center items-center flex-col'>
            <h1 className='text-2xl lg:text-4xl font-bold'>{kalesh?.title}</h1>
            <p className='text-lg'>{kalesh?.decsription}</p>
        </div>

        {kalesh?.KaleshItem && kalesh.KaleshItem.length > 0 ?
        (
            <div>
                <ViewClashItems kalesh={kalesh}/>
            </div>
        ) :
        (
        <AddClashItems token={session?.user?.token!} kaleshId={params.id}/>
        )}
        
    </div>
  )
}
