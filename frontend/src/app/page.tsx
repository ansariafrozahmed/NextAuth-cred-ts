// import { getServerSession } from "next-auth";
// import { authOptions } from "./api/auth/[...nextauth]/route";
import Signout from "@/components/Signout";
import Link from "next/link";

export default async function Home() {
  // const data = await getServerSession(authOptions);
  return (
    <main>
      <Signout />
    </main>
  );
}
