"use client";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    "https://vehxwptgzkfiqduxcvwu.supabase.co/",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlaHh3cHRnemtmaXFkdXhjdnd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNDc1ODIsImV4cCI6MjA3ODYyMzU4Mn0.6LUmgxlbtkPMMOmid9wUOFfN55vNZDUuTW_yFh597xE",
);

const signInWithGithub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
    });
};

export default function Login() {
    return (
        <>
            <button onClick={signInWithGithub}>Connect with GitHub</button>
        </>
    );
}
