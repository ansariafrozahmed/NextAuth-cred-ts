"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const ClientComponent = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
  };

  return (
    <div>
      {JSON.stringify(session)}
      <br />
      <br />
      <Link href={"auth/signin"}>Sign in</Link>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default ClientComponent;
