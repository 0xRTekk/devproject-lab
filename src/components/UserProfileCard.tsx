"use client";

import React from "react";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import type { User } from "@/types/user";

export function PureUserProfileCard({ user }: { user?: User | null }) {
    const avatar = user?.user_metadata?.avatar_url || user?.user_metadata?.avatar || user?.avatar_url || null;

    const name =
        user?.user_metadata?.full_name ||
        user?.user_metadata?.name ||
        user?.user_metadata?.preferred_username ||
        user?.email ||
        user?.id ||
        "Unknown";

    const username =
        user?.user_metadata?.preferred_username ||
        user?.user_metadata?.user_name ||
        user?.user_metadata?.username ||
        (user?.email ? user.email.split("@")[0] : "");

    const email = user?.user_metadata?.email || user?.email || "";

    return (
        <div className="max-w-sm w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm p-4 text-center">
            <div className="flex flex-col items-center gap-3">
                {user ? (
                    <>
                        {avatar ? (
                            <div className="w-20 h-20 rounded-full overflow-hidden">
                                <Image
                                    src={String(avatar)}
                                    alt={name + " avatar"}
                                    width={80}
                                    height={80}
                                    className="rounded-full object-cover"
                                />
                            </div>
                        ) : (
                            <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600">
                                <span className="text-xl">👤</span>
                            </div>
                        )}

                        <div className="text-center">
                            <div className="font-semibold text-lg text-slate-900 dark:text-slate-100">
                                {name}
                            </div>
                            {username ? (
                                <div className="text-sm text-slate-500 dark:text-slate-400">
                                    @{username}
                                </div>
                            ) : null}
                            {email ? (
                                <div className="mt-2 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700 px-3 py-1 rounded-md font-mono">
                                    {email}
                                </div>
                            ) : null}
                        </div>

                        <LogoutButton />
                    </>
                ) : (
                    <LoginButton />
                )}
            </div>
        </div>
    );
}

export default function UserProfileCard() {
    const { user, loading } = useAuth();

    if (loading) return <div role="status" aria-busy="true">Loading…</div>;

    return <PureUserProfileCard user={user} />;
}
