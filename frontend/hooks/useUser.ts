"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "OFFICER" | "MEMBER";
  voicePart?: string;
}

interface MeResponse {
  user: User | null;
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMe() {
      try {
        const res = await api.get<MeResponse>("/auth/me");
        setUser(res.data.user);
      } catch {
        setUser(null);
      }
      setLoading(false);
    }

    fetchMe();
  }, []);

  return { user, loading };
}
