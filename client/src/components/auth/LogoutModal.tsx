'use client'

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
import { Dispatch, SetStateAction } from "react"
import {signOut} from "next-auth/react"
  

export default function LogoutModal({open, setOpen}: 
  {open:boolean, setOpen:Dispatch<SetStateAction<boolean>>}) {

  const logoutHandler = () => {
    signOut({
      callbackUrl: "/login",
      redirect: true
    });
  } 

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
       You will be logged out and have to re-login to access your account.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={logoutHandler}>Yes Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

  )
}
