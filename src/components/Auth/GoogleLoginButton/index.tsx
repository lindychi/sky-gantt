"use client";
import { supabase } from "@/supabase";
import Image from "next/image";
import React from "react";

type Props = {};

export default function GoogleLoginButton({}: Props) {
  const handleGoogleLogin = async () => {
    let { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.error("Error logging in with Google", error.message);
    }

    console.log(data);
  };

  return (
    <div onClick={handleGoogleLogin} className="cursor-pointer">
      <Image
        src="/google-login-button.png"
        alt="google-login-button"
        width={350 / 2}
        height={80 / 2}
      />
    </div>
  );
}
