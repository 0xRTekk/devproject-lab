"use client";

import { useEffect, useState } from "react";

export default function GitHubRepos() {
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        fetch("/api/github/repos")
            .then((res) => res.json())
            .then(setRepos);
    }, []);

    return (
        <ul>
            {repos.map((r: any) => (
                <li key={r.id}>{r.name}</li>
            ))}
        </ul>
    );
}
