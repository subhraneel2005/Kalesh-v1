'use client'

import React, { Suspense, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { EllipsisVertical } from 'lucide-react';
import dynamic from "next/dynamic";
import EditClash from './EditClash';

const editKalesh = dynamic(() => import("./EditClash"))
  

export default function ClashCardmenu({kalesh, token} : {kalesh:KaleshType, token:string}) {

    const [open, setOpen] = useState(false);

  return (
    <>

        {open && (
            <Suspense fallback={<p>...Loading</p>}>
                <EditClash open={open} setOpen={setOpen} kalesh={kalesh} token={token} />
            </Suspense>
        )}

        <DropdownMenu>
        <DropdownMenuTrigger>
            <EllipsisVertical/>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setOpen(true)}>Edit</DropdownMenuItem>
            <DropdownMenuItem>Copy Link</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>

    </>
  )
}
