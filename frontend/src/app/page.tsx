import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function Home() {
  const data = await getServerSession(authOptions);
  return (
    <main>
      {JSON.stringify(data)}

      <br />
      <br />
      <Link href={"/about-us"}>About us</Link>
    </main>
  );
}
