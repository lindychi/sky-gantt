import Image from "next/image";
import React from "react";

import GoogleLoginButton from "@/components/Auth/GoogleLoginButton";
import GoogleLoginButtonImprove from "@/components/Auth/GoogleLoginButtonImprove";

type Props = {};

export default function AuthLoginPage({}: Props) {
  return (
    <div className="flex items-center justify-center min-w-screen min-h-screen">
      <div className="flex flex-col gap-1 items-center">
        <div className="flex gap-0.5 items-center">
          <Image
            src="/sky-gantt.png"
            width={100}
            height={100}
            alt="sky-gantt"
          />
          <h1 className="text-4xl font-bold text-center pt-2">Sky Gantt</h1>
        </div>

        <GoogleLoginButtonImprove />
        <GoogleLoginButton />
      </div>
    </div>
  );
}
