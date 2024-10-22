import { User } from "@supabase/supabase-js";
import { ReactNode } from "react";

export interface MenuItem {
  name: string;
  icon: React.ReactNode;
  active: boolean;
  id?: string;
  user_id?: string;
  created_at?: string;
}

export interface LNBProps {
  menuList: MenuItem[];
}

export type AuthGuardProps = {
  children: ReactNode;
};

export type AuthContextType = {
  isAuthenticated: boolean | null;
  checkAuth: () => void;
  user: User | null;
};
