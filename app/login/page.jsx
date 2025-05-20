"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const { supabaseClient, session } = useSessionContext();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.replace("/main/dashboard");
    }
  }, [session, router]);

  const handleGoogleLogin = async () => {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/main/dashboard`,
      },
    });

    if (data?.url) {
      window.location.href = data.url;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Button onClick={handleGoogleLogin} className="mb-4">
        Sign in with Google
      </Button>
    </div>
  );
}
