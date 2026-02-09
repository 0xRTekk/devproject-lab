import { Octokit } from "@octokit/rest";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function getOctokit() {
    const supabase = createRouteHandlerClient({
        cookies: () => cookies(),
    });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session?.provider_token) {
        throw new Error("Not authenticated with GitHub");
    }

    return new Octokit({
        auth: session.provider_token,
    });
}
