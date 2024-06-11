"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";

import { Button } from "@/components/ui/button";

type Props = {};

export default function Header({}: Props) {
  const { data: session } = useSession();

  return (
    <div className="flex justify-between items-center p-3 gap-2">
      <h1 className="text-2xl pl-2">투스카이</h1>
      {session && (
        <div className="flex gap-2 items-center">
          <h1>안녕하세요, {session.user?.name}님</h1>
          <Button onClick={() => signOut()} className="">
            로그아웃
          </Button>
        </div>
      )}
    </div>
  );
}
