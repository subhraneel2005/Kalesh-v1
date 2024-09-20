'use client'

import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import UserAvatar from '../commons/UserAvatar'
import {useState} from 'react'
import LogoutModal from '../auth/LogoutModal'


export default function Navbar() {

    const [open , setOpen] = useState(false)
   
  return (

    <>
    <LogoutModal open={open} setOpen={setOpen}/>
    <nav className='flex justify-between items-center h-14 px-6 md:px-20 w-full'>
        <div>
        <h1 className='text-4xl'>KALESH --v1</h1>
        </div>

        <div>
        <DropdownMenu>
        <DropdownMenuTrigger>
            <UserAvatar/>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpen(true)}>Sign Out</DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
        </div>

    </nav>
    </>
  )
}
