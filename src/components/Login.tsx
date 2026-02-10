"use client";

import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

const signInWithGithub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
    });
};

async function signOut() {
  const { error } = await supabase.auth.signOut()
}

export default function Login() {
    return (
        <>
            <a onClick={signInWithGithub}>Login with GitHub</a>
            <br />
            <a onClick={signOut}>Logout</a>
        </>
    );
}