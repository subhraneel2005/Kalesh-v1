import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Banner() {
  return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center'>
        <div className='w-full h-full md:flex block justify-center gap-10 px-4 items-center'>
          <Image src="/logo1.svg"  width={500} height={500} alt='bannerImage' className='-z-10 opacity-80 md:hidden flex justify-center items-center'/>
          <div className='flex justify-center items-center flex-col -mt-14 md:-mt-0'>
            <h1 className='md:text-[3.4rem] lg:text-[5rem] text-[1.8rem] text-center mb-12'>KALESH --v1</h1>
            <p className='md:text-[1.5rem] text-[0.8rem] text-center text-purple-300 -mt-12'>Choose the better choice together</p>
            <Link href={'/login'}>
              <button className='px-6 py-3 mt-6 btn text-black'>Get Started</button>
            </Link>
          </div>
          <Image src="/logo1.svg"  width={500} height={500} alt='bannerImage' className='-z-10 opacity-80 md:flex hidden justify-center items-center'/>
        </div>
    </div>
  )
}

export default Banner