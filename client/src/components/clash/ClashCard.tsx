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
  

export default function ClashCard({kalesh} : {kalesh: KaleshType}) {
  return (
    <Card>
    <CardHeader>
        <CardTitle>Card Title</CardTitle>
    </CardHeader>
    <CardContent className='h-[300px]'>
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
