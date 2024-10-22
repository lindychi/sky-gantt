"use client";
import { ReactNode, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase";
import { useState } from "react";

import { User } from "@supabase/supabase-js";
import { AuthContextType, AuthGuardProps } from "@/types/common";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthGuardProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const checkAuth = async () => {
    // 인증 상태 변경 시 처리
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setUser(session.user);
          setIsAuthenticated(true);
        } else {
          setUser(null);
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

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuth, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useAuth();

  // 인증 상태가 결정될 때까지 아무것도 렌더링하지 않음
  if (isAuthenticated === null) {
    return <div>로딩 중...</div>;
  }

  // 인증된 경우 children 렌더링
  return <>{isAuthenticated && children}</>;
}
