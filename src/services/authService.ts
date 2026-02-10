import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export const authService = {
  signInWithGithub: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    if (error) throw error;
    return data;
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
};

export default authService;
