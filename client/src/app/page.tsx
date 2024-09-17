import Image from "next/image";
import Hero from "@/components/base/Hero"
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";

export default async function Home() {

  const session = await getServerSession(authOptions);

  return (
   <div>
    {/* <p>{JSON.stringify(session)}</p> */}
    <Hero/>
   </div>
  );
}
