"use client";
import { Button } from "antd";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";

const Signout = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const handleSignOut = async () => {
    setSubmitting(true);
    await signOut({
      redirect: false,
    });
    setTimeout(() => {
      setSubmitting(false);
      Swal.fire({
        title: "Success!",
        text: "Log out Successfully!",
        icon: "success",
      }).then(() => {
        router.push("/auth/signin");
      });
    }, 500);
  };
  return (
    <div className="flex items-center justify-center py-10">
      <Button
        onClick={handleSignOut}
        loading={submitting}
        className="bg-gray-800 text-white text-lg h-10 px-5"
      >
        Sign Out
      </Button>
    </div>
  );
};

export default Signout;
