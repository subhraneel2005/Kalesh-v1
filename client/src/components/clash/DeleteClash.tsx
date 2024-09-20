'use client'

import { clearCache } from "@/app/actions/commonActions";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { KALESH_URL } from "@/lib/apiEndPoints";
import axios from "axios";
import { headers } from "next/headers";
import { Dispatch, SetStateAction, useState } from "react"
import { toast } from "sonner";
  

export default function DeleteClash({open, setOpen, id, token}: 
  {open:boolean, setOpen:Dispatch<SetStateAction<boolean>>, id:number, token:string}) {

const [loading, setLoading] = useState(false);

  const deleteKalesh = async() => {
    try {
        
        setLoading(true);
        const {data} = await axios.delete(`${KALESH_URL}/${id}`,{
            headers:{
                Authorization: token
            }
        })
        if(data?.message){
            setLoading(false);
            clearCache("dashboard");
            toast.success(data.message);
        }
          
    } catch (error) {
        setLoading(false);
        toast.error("Something went wrong. try again later!")
    }
  } 

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action will delete this Kalesh permanently!
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction 
      onClick={deleteKalesh}
      disabled={loading}
      >{loading ? "Processing..." : "Yes Continue"}</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

  )
}
