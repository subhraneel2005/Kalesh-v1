"use client"

import { Upload } from 'lucide-react'
import React, {useState, useRef, ChangeEvent} from 'react'
import { Button } from '../ui/button'
import Image from 'next/image';

export default function AddClashItems({token, kaleshId}: {token: string, kaleshId: number}) {

    const [items, setItems] = useState<Array<KaleshItemForm>>([
        {image: null},
        {image: null},
    ]);
    const [urls, setUrls] = useState(["", ""])

    const imgRef1 = useRef<HTMLInputElement | null>(null);
    const imgRef2 = useRef<HTMLInputElement | null>(null);

    const handleImgChange = (e: ChangeEvent<HTMLInputElement>, index:number) => {
        const file = e.target.files?.[0]

        if(file) {
            const updatedItems = [...items];
            updatedItems[index].image = file;
            setItems(updatedItems);
            const imageURL = URL.createObjectURL(file);
            const updatedURLs = [...urls]
            updatedURLs[index] = imageURL;
            setUrls(updatedURLs);
        }
    }

  return (
    <div className='mt-10'>
        <div className='flex flex-wrap lg:flex-nowrap justify-between items-center'>
            {/*First block*/}
            <div className='w-full lg:w-[500px] flex justify-center items-center flex-col'>
                <input 
                type="file" 
                className='hidden' 
                ref={imgRef1} 
                onChange={(e) => handleImgChange(e,0)}
                />
                <div className='w-full flex justify-center items-center rounded-md border-2 border-dashed p-2 h-[300px] cursor-pointer' onClick={() => imgRef1?.current?.click()}>
                    {urls.length > 0 && urls?.[0] !== "" ? 
                    <Image 
                    src={urls?.[0]} 
                    width={500} 
                    height={500} 
                    alt='prev1'
                    className='w-full h-[300px] object-contain'/> : 
                    <h1 className=' flex items-center space-x-2 text-xl'>
                        <Upload/>
                        <span>
                            Upload file
                        </span>
                    </h1>}
                </div>
            </div>

            {/*VS block*/}
            <div className='w-full lg:w-auto flex justify-center items-center'>
            <h1 className='md:text-[3.4rem] lg:text-[5rem] text-[1.8rem] text-center mb-12'>VS</h1>
            </div>


            {/*Second block*/}
            <div className='w-full lg:w-[500px] flex justify-center items-center flex-col'>
            <input 
            type="file" 
            className='hidden' 
            ref={imgRef2} 
            onChange={(e) => handleImgChange(e,1)}
            />
                <div className='w-full flex justify-center items-center rounded-md border-2 border-dashed p-2 h-[300px] cursor-pointer' onClick={() => imgRef2?.current?.click()}>
                {urls.length > 0 && urls?.[1] !== "" ? 
                    <Image 
                    src={urls?.[1]} 
                    width={500} 
                    height={500} 
                    alt='prev2'
                    className='w-full h-[300px] object-contain'/> : 
                    <h1 className=' flex items-center space-x-2 text-xl'>
                        <Upload/>
                        <span>
                            Upload file
                        </span>
                    </h1>}
                </div>
            </div>
        </div>

        <div className='text-center'>
            <Button className='w-52 mt-4'>Submit</Button>
        </div>
    </div>
  )
}
