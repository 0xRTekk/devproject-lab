"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { authService } from "@/services/authService";

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");

  return {
    user: ctx.user,
    loading: ctx.loading,
    signIn: authService.signInWithGithub,
    signOut: authService.signOut,
  };
}

export default useAuth;
