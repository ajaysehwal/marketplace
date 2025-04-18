"use client";
import { createClient } from "@/supabase/client";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useAuth = () => {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
  }, [supabase.auth]);

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      window.location.reload();
    } catch (error) {
      toast.error(`Error signing out: ${(error as Error).message}`, {
        description: "Please try again later",
      });
    }
  };

  return { user, logout, role: user?.user_metadata?.role };
};
