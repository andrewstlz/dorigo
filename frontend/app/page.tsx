import { redirect } from "next/navigation";
import api from "@/lib/api";

interface MeResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: "OFFICER" | "MEMBER";
    voicePart?: string;
  } | null;
}

export default async function HomePage() {
  try {
    // Attempt to fetch the logged-in user (server-side)
    const res = await api.get<MeResponse>("/auth/me");
    const user = res.data.user;

    if (user) {
      // If logged in → go to dashboard
      redirect("/dashboard");
    } else {
      // If not logged in → go to login
      redirect("/login");
    }
  } catch {
    // Any error → assume not logged in
    redirect("/login");
  }
}
