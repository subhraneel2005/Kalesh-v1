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
import DeleteClash from './DeleteClash';

const editKalesh = dynamic(() => import("./EditClash"))
  

export default function ClashCardmenu({kalesh, token} : {kalesh:KaleshType, token:string}) {

    const [open, setOpen] = useState(false);
    const [delOpen, setDelOpen] = useState(false);

  return (
    <>

        {open && (
            <Suspense fallback={<p>...Loading</p>}>
                <EditClash open={open} setOpen={setOpen} kalesh={kalesh} token={token} />
            </Suspense>
        )}

        {delOpen && (
            <Suspense fallback={<p>...Loading</p>}>
                <DeleteClash open={delOpen} setOpen={setDelOpen} id={kalesh.id} token={token} />
            </Suspense>
        )}

        <DropdownMenu>
        <DropdownMenuTrigger>
            <EllipsisVertical/>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setOpen(true)}>Edit</DropdownMenuItem>
            <DropdownMenuItem>Copy Link</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDelOpen(true)}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>

    </>
  )
}
