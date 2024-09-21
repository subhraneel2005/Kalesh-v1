import Register from "@/components/base/Register";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function Authh(){
    const session = await getServerSession(authOptions);
  if(session){
    redirect("/dashboard")
  }
    return(
        <Register/>
    )
}