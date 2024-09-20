'use client'

import React from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { getImgUrl } from '@/lib/utils'
import { Button } from '../ui/button'
import ClashCardmenu from './ClashCardmenu'
  

export default function ClashCard({kalesh, token} : {kalesh: KaleshType, token:string}) {
  return (
    <Card>
    <CardHeader className='flex justify-between items-center flex-row'>
        <CardTitle>{kalesh.title}</CardTitle>
        <ClashCardmenu kalesh={kalesh} token={token}/>
    </CardHeader>
    <CardContent className='h-[300px] overflow-hidden'>
        {kalesh?.image && <Image 
        src={getImgUrl(kalesh.image)}
        width={500}
        height={500}
        alt={kalesh.title}
        className='rounded-md w-full h-[220px] object-contain' />}
        <p>{kalesh.decsription}</p>
        <p>
            <strong>Expires at:</strong>
            {new Date(kalesh.expire_at).toDateString()}
        </p>
    </CardContent>
    <CardFooter>
        <Button>Items</Button>
    </CardFooter>
    </Card>

  )
}
