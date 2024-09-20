'use client'

import React, {Dispatch, SetStateAction, useState} from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import axios, { AxiosError } from 'axios';
import { KALESH_URL } from '@/lib/apiEndPoints';
import { toast } from 'sonner';
import { clearCache } from '@/actions/commonActions';
  

export default function EditClash({token, kalesh,open, setOpen}:{token:string, kalesh:KaleshType, open:boolean, setOpen: Dispatch<SetStateAction<boolean>> }) {
    const [clashData, setClashData] = useState<KaleshFormType>({
        title: kalesh.title,
        decsription: kalesh.decsription
    });
    const [date, setDate] = useState<Date | null>(new Date(kalesh.expire_at));
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<KaleshFormTypeError>({})

    const imagerHandler = (e:React.ChangeEvent<HTMLInputElement> ) => {
        const file = e.target.files?.[0];
        if(file){
            setImage(file)
        }
    }

    const submitHandler = async(e: React.FormEvent) => {
        e.preventDefault();
       try {
        setLoading(true);
        const formData = new FormData();
        formData.append("title", clashData?.title ?? "");
        formData.append("decsription", clashData?.decsription ?? "");
        formData.append("expire_at", date?.toISOString() ?? "")
        if(image) formData.append("image", image);

        const {data} = await axios.put(`${KALESH_URL}/${kalesh.id}`, formData,{
            headers:{
                Authorization: token
            },
        });
        setLoading(false);
        if(data?.message){
            clearCache("dashboard")
            setClashData({});
            setDate(null);
            setImage(null);
            setErrors({});
            toast.success(data?.message);
            setOpen(false)
        }
       } catch (error) {
        setLoading(false)
        if(error instanceof AxiosError){
            if(error.response?.status === 422){
                setErrors(error.response?.data?.errors)
            }
        }
        else{
            toast.error("Something went wrong. Please try again")
        }
       }
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
        <DialogTitle>Edit this Kalesh</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
            <div className='mt-4'>
                <Label htmlFor='title'>Title</Label>
                <Input 
                id='title' 
                placeholder='Enter your title...' 
                value={clashData?.title ?? ""}
                onChange={(e) => 
                setClashData({...clashData, title: e.target.value})}/>
                <span className='text-red-600'>{errors?.title}</span>
            </div>
            <div className='mt-4'>
                <Label htmlFor='decsription'>Description</Label>
                <Textarea id='decsription' 
                placeholder='Your description goes here...'
                value={clashData?.decsription ?? ""}
                onChange={(e) => 
                setClashData({...clashData, decsription: e.target.value})}/>
                <span className='text-red-600'>{errors?.decsription}</span>
            </div>
            <div className='mt-4'>
                <Label htmlFor='image'>Image</Label>
                <Input 
                id='image' 
                type='file'
                onChange={imagerHandler}
                placeholder='Enter your title...' 
                />
                <span className='text-red-600'>{errors?.image}</span>
            </div>
            <div className='mt-4'>
                <Label 
                htmlFor='expire_at'
                className='block'
                >Expire at</Label>
                <Popover>
                <PopoverTrigger asChild>
                    <Button
                    variant={"outline"}
                    className={cn(
                        "w-full mt-2 justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                    >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? date.toDateString() : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                    mode="single"
                    selected={date ??  new Date()}
                    onSelect={(date) => setDate(date!)}
                    initialFocus
                    />
                </PopoverContent>
                </Popover>
                <span className='text-red-600'>{errors?.expire_at}</span>
            </div>
            <div className='mt-4'>
                <Button className='w-full' disabled={loading}>{loading ? 'Processing...'  : 'Submit'}</Button>

            </div>
        </form>
    </DialogContent>
    </Dialog>

  )
}
