"use client";
import { supabase } from "@/supabase";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";

type Props = {};

export default function GoogleLoginButton({}: Props) {
  return (
    <div onClick={() => signIn("google")} className="cursor-pointer">
      <Image
        src="/google-login-button.png"
        alt="google-login-button"
        width={350 / 2}
        height={80 / 2}
      />
    </div>
  );
}
