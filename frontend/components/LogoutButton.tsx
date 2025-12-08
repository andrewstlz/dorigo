"use client";

import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await api.post("/auth/logout");
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={logout}
      className="px-4 py-2 bg-pennRed text-black rounded hover:bg-black hover:text-white cursor-pointer"
    >
      Sign Out
    </button>
  );
}
