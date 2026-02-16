import { NextResponse } from "next/server";
import { getOctokit } from "@/lib/github";

export async function GET() {
    try {
        const octokit = await getOctokit();

        const { data } = await octokit.rest.repos.listForAuthenticatedUser();

        return NextResponse.json(data);
    } catch {
        return NextResponse.json(
            { error: "Not authenticated" },
            { status: 401 },
        );
    }
}
