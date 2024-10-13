"use client";
import React, { useEffect, useState } from "react";

import { supabase } from "@/supabase";
import { Session } from "@supabase/supabase-js";

import { Button } from "@/components/ui/button";

type Props = {};

export default function Header({}: Props) {
  const [session, setSession] = useState<Session | null>(null);

  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error(error);
    } else {
      setSession(data.session);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    } else {
      setSession(null);
    }
  };

  useEffect(() => {
    getSession();
  });

  return (
    <div className="flex justify-between items-center p-3 gap-2">
      <h1 className="text-2xl pl-2">투스카이</h1>
      {session && (
        <div className="flex gap-2 items-center">
          <h1>안녕하세요, {session.user.email}님</h1>
          <Button onClick={() => handleLogout()} className="">
            로그아웃
          </Button>
        </div>
      )}
    </div>
  );
}
