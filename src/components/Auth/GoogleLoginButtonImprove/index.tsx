"use client";

import { loginWithGoogle } from "@/app/(auth)/auth/login/action";
import Image from "next/image";
import React from "react";

type Props = {};

export default function GoogleLoginButtonImprove({}: Props) {
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        loginWithGoogle();
      }}
      className="cursor-pointer"
    >
      <Image
        src="/google-login-button.png"
        alt="google-login-button"
        width={350 / 2}
        height={80 / 2}
      />
    </div>
  );
}
