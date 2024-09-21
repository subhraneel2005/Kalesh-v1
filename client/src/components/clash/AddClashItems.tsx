"use client"

import { Upload } from 'lucide-react'
import React, {useState, useRef, ChangeEvent} from 'react'
import { Button } from '../ui/button'
import Image from 'next/image';
import axios, { AxiosError } from 'axios';
import { KALESH_ITEMS_URL } from '@/lib/apiEndPoints';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


export default function AddClashItems({token, kaleshId}: {token: string, kaleshId: number}) {

    const router = useRouter();

    const [items, setItems] = useState<Array<KaleshItemForm>>([
        {image: null},
        {image: null},
    ]);
    const [urls, setUrls] = useState(["", ""])

    const imgRef1 = useRef<HTMLInputElement | null>(null);
    const imgRef2 = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState(false);

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

    const handleSubmit  = async() => {
        try {
            const formData = new FormData();
            formData.append('id', kaleshId.toString())
            items.map((item) =>  {
                if(item.image) {
                    formData.append(`images[]`, item.image)
                }
            })

            if(formData.get("images[]")){
                setLoading(true);
                const {data} = await axios.post(KALESH_ITEMS_URL, formData, {
                    headers:{
                        Authorization: token
                    }
                });

                if(data?.message){
                    toast.success(data.message);
                    setTimeout(() => {
                        router.push("/dashboard")
                    }, 1000)
                }
                setLoading(false);
            }else{
                toast.warning("Please upload both the images 😠!");
            }

        } catch (error) {
            setLoading(false);
            if(error instanceof AxiosError){
                if(error.response?.status === 422){
                    if(error.response?.data?.errors){
                        error.response?.data?.errors?.map((err: string) => toast.error(err))
                    }
                }
            }
            else{
                toast.error("Something went wrong");
            }
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
            <Button 
            onClick={handleSubmit} disabled={loading}
            className='w-52 mt-4'>{loading ? "Processing..." : "Submit"}</Button>
        </div>
    </div>
  )
}
