"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (status === "loading") return; // Do nothing while loading
      if (!session) router.push("/auth/login");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen min-w-screen flex items-center justify-center text-2xl">
        로딩중...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen min-w-screen flex items-center justify-center text-2xl">
        페이지 이동중...
      </div>
    ); // Optional: Show a message while redirecting
  }

  return <>{children}</>;
}
