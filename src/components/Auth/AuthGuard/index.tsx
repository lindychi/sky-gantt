"use client";
import { signOut, useSession } from "next-auth/react";
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

  if (!session.user?.email?.endsWith("tosky.co.kr")) {
    return (
      <div className="min-h-screen min-w-screen flex items-center justify-center text-2xl flex-col gap-1">
        투스카이 소속의 계정만 사용할 수 있습니다.
        <button
          onClick={() => {
            signOut();
          }}
          className="mt-4 p-2 bg-red-500 text-white rounded-md"
        >
          로그아웃
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
