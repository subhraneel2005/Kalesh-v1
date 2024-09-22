'use client'

import { getImgUrl } from '@/lib/utils'
import CountUp from "react-countup"
import Image from 'next/image'
import React, { Fragment, useState, useEffect } from 'react'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { ThumbsUp } from 'lucide-react'
import socket from '@/lib/socket'

export default function Clashing({kalesh} :{kalesh: KaleshType}) {

    const [kaleshComments, setKaleshComments] = useState(kalesh.KaleshComments);
    const [kaleshItems, setKaleshItems] = useState(kalesh.KaleshItem);
    const [comment, setComment] = useState("");
    const [hideVote, setHideVote] = useState(false);

    const handleVote = (id:number) => {
        if(kaleshItems && kaleshItems.length > 0){
            setHideVote(true);
            updateCounter(id);

            //socket litsen
            socket.emit(`clashing-${kalesh.id}`, {
                kaleshId: kalesh.id,
                kaleshItemId: id
            })
        }
    }

    const updateCounter = (id:number) => {
        const items = [...kaleshItems];
        const findIndex = kaleshItems.findIndex((item) => item.id === id);
        if(findIndex !== -1){
            items[findIndex].count += 1;
        }
        setKaleshItems(items);
    };

    useEffect(() => {
        socket.on(`clashing-${kalesh.id}`, (data) => {
            updateCounter(data?.kaleshItemId)
        })
    },[])

  return (
    <div className='mt-10'>
        <div className='flex flex-wrap lg:flex-nowrap justify-between items-center'>
            {kaleshItems && kaleshItems.length > 0 && kaleshItems.map((item, index) => {
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

                        {hideVote ?
                        <CountUp
                        start={0}
                        end={item.count}
                        duration={1.5}
                        className='text-5xl font-extrabold text-gray-200'/> :
                        <Button
                        onClick={() => handleVote(item.id)} className='mt-4'>
                            <span className='mr-2 text-lg'>Vote</span>
                            <ThumbsUp/>
                        </Button> }
                            
                    </div>

                    {/*VS block*/}
                    {index%2 === 0 && (<div className='w-full lg:w-auto flex justify-center items-center'>
                    <h1 className='md:text-[3.4rem] lg:text-[5rem] text-[1.8rem] text-center mb-12'>VS</h1>
                    </div>)}
                    </Fragment>
                )
            } )}
        </div>

        <form className='mt-6 w-full'>
            <Textarea className='bg-black' placeholder='type your suggestion 😃' value={comment} onChange={(e) => setComment(e.target.value)}/>
                <Button className='w-full mt-2'>Submit Comment</Button>
        </form>

        {/* Kalesh Comments Box */}
        <div className='mt-4'>
            {kaleshComments && kaleshComments.length > 0 && kaleshComments.map((item, index) => (
                <div key={index} className='w-full md:w-[600px] rounded-lg p-4 bg-muted mb-4'>
                    <p className='font-bold'>{item.comment}</p>
                    <p>{new Date(item.created_at).toDateString()}</p>
                </div>
            ))}
        </div>
    </div>
  )
}


// Props are unchangable