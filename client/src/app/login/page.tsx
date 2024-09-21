import Login from "@/components/base/Login";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";


export default async function Auth(){
    
  const session = await getServerSession(authOptions);
  if(session){
    redirect("/dashboard")
  }
    return(
        <Login/>
    )
}