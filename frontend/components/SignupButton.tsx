"use client";

import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SignupButtonProps {
  eventId: string;
  alreadySignedUp: boolean;
}

export default function SignupButton({
  eventId,
  alreadySignedUp,
}: SignupButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [signedUp, setSignedUp] = useState(alreadySignedUp);

  async function handleSignup() {
    if (signedUp || loading) return;

    setLoading(true);
    try {
      interface MeResponse {
        user: {
          id: string;
          email: string;
          name: string;
          role: string;
          voicePart?: string;
        } | null;
      }

      const me = await api.get<MeResponse>("/auth/me");

      if (!me.data.user) {
        alert("You must be logged in.");
        return;
      }
      const userId = me.data.user.id;

      // 2. Create signup
      await api.post("/signups", {
        eventId,
        userId,
        remarks: "",
      });

      setSignedUp(true);
      router.refresh();
    } catch (err: any) {
      alert(err.response?.data?.error || "Signup failed.");
    } finally {
      setLoading(false);
    }
  }

  if (signedUp) {
    return (
      <p className="mt-4 text-green-600 font-semibold">
        You are already signed up!
      </p>
    );
  }

  return (
    <button
      onClick={handleSignup}
      disabled={loading}
      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
    >
      {loading ? "Signing up..." : "Sign Up"}
    </button>
  );
}
