"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Button } from "../ui/button";

type Props = {};

export default function Header({}: Props) {
  const { data: session } = useSession();

  return (
    <div className="flex justify-end items-center p-3 gap-2">
      {session && (
        <>
          <h1>안녕하세요, {session.user?.name}님</h1>
          <Button onClick={() => signOut()} className="">
            로그아웃
          </Button>
        </>
      )}
    </div>
  );
}
