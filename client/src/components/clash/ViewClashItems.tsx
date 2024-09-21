'use client'

import { getImgUrl } from '@/lib/utils'
import Image from 'next/image'
import React, { Fragment } from 'react'

export default function ViewClashItems({kalesh} :{kalesh: KaleshType}) {
  return (
    <div className='mt-10'>
        <div className='flex flex-wrap lg:flex-nowrap justify-between items-center'>
            {kalesh.KaleshItem && kalesh.KaleshItem.length > 0 && kalesh.KaleshItem.map((item, index) => {
                return(
                    <Fragment key={index}>
                        <div className='w-full lg:w-[500px] flex justify-center items-center flex-col'>
                        <div className='w-full flex justify-center items-center rounded-md p-2 h-[300px] cursor-pointer'>
                           
                            <Image
                            src={getImgUrl(item.image)} 
                            width={500} 
                            height={500} 
                            alt='prev1'
                            className='w-full h-[300px] object-contain'/> 
                        </div>
                    </div>

                    {/*VS block*/}
                    {index%2 === 0 && (<div className='w-full lg:w-auto flex justify-center items-center'>
                    <h1 className='md:text-[3.4rem] lg:text-[5rem] text-[1.8rem] text-center mb-12'>VS</h1>
                    </div>)}
                    </Fragment>
                )
            } )}
        </div>
    </div>
  )
}
