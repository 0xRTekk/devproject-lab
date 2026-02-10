"use client";

import useAuth from "@/hooks/useAuth";

export function LogoutButton() {
  const { signOut } = useAuth();
  return (
    <button onClick={() => signOut()} aria-label="Logout">
      Logout
    </button>
  );
}

export default LogoutButton;
