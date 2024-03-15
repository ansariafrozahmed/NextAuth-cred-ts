"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { data: session, status } = useSession();
  return (
    <div className="h-[12svh] flex shadow-sm items-center justify-between px-20">
      <div>
        <Link href={"/"}>
          <h2 className="text-2xl font-medium">Ansari Afroz</h2>
        </Link>
      </div>
      <div>
        <nav>
          <ul className="flex gap-10">
            <li>Home</li>
            <li>About</li>
            <li>FAQs</li>
            <li>Contact</li>
          </ul>
        </nav>
      </div>
      <div>
        {session ? (
          <>
            <div className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 transition-all ease-in-out duration-300 cursor-pointer p-2 pr-5 rounded-full">
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <img
                  src={`https://api.dicebear.com/7.x/micah/svg?seed=${session?.user?.name}`}
                  alt=""
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="">
                <h2 className="text-sm font-medium">{session?.user?.name}</h2>
                <h3 className="text-xs">{session?.user?.email}</h3>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link
              href={"/auth/signin"}
              className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 transition-all ease-in-out duration-300 cursor-pointer p-2 pr-5 rounded-full"
            >
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <img
                  src="https://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png"
                  alt=""
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="">
                <h2 className="text-gray-700 font-medium">Sign in</h2>
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
