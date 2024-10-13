"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase";
import { useState } from "react";

type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const checkAuth = async () => {
    // Supabase 인증 상태 확인
    // const session = await supabase.auth.getSession();
    // if (session) {
    //   setIsAuthenticated(true); // 사용자가 인증된 경우
    // } else {
    //   setIsAuthenticated(false); // 사용자가 인증되지 않은 경우
    //   router.push("/login"); // 로그인 페이지로 리다이렉트
    // }

    // 인증 상태 변경 시 처리
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.push("/auth/login");
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  };

  useEffect(() => {
    checkAuth();
  }, [router]);

  // 인증 상태가 결정될 때까지 아무것도 렌더링하지 않음
  if (isAuthenticated === null) {
    return <div>로딩 중...</div>;
  }

  // 인증된 경우 children 렌더링
  return <>{isAuthenticated && children}</>;
}
