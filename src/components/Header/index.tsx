"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

export default function Header({}: Props) {
  const { data: session } = useSession();

  return (
    <div>
      {session && (
        <>
          <h1>안녕하세요, {session.user?.name}님</h1>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </div>
  );
}
