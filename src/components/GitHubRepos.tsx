"use client";

import { useEffect, useState } from "react";

type Repo = { id: string | number; name: string };

export default function GitHubRepos() {
    const [repos, setRepos] = useState<Repo[]>([]);

    useEffect(() => {
        async function load() {
            const res = await fetch("/api/github/repos");
            const data = (await res.json()) as Repo[];
            setRepos(data ?? []);
        }

        load();
    }, []);

    return (
        <ul>
            {repos.map((r) => (
                <li key={r.id}>{r.name}</li>
            ))}
        </ul>
    );
}
