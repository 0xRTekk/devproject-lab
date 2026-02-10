"use client";

import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import useAuth from "@/hooks/useAuth";

export default function Login() {
    const { user, loading } = useAuth();

    if (loading) return <div aria-busy="true">Loading…</div>;

    return (
        <>
            {user ? (
                <div>
                    <div>
                        Connected as: {user.email ?? user.user_metadata?.name ?? user.id}
                    </div>
                    <pre style={{ whiteSpace: "pre-wrap", fontSize: 12 }}>
                        {JSON.stringify(user, null, 2)}
                    </pre>
                    <LogoutButton />
                </div>
            ) : (
                <div>
                    <div>Not signed in</div>
                    <LoginButton />
                </div>
            )}
        </>
    );
}