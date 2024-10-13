"use client";
import React, { useEffect } from "react";
import { supabase } from "@/supabase";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {};

export default function GoogleLoginButton({}: Props) {
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          // 로그인 성공 시 메인 페이지로 리다이렉트
          router.push("/");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.error(error);
    }
  };

  return (
    <div
      onClick={() => {
        // signIn("google");
        handleGoogleLogin();
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
