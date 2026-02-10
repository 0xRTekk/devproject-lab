"use client";

import useAuth from "@/hooks/useAuth";

export function LoginButton() {
  const { signIn } = useAuth();
  return (
    <button onClick={() => signIn()} aria-label="Login with GitHub">
      Login with GitHub
    </button>
  );
}

export default LoginButton;
