"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";
import { Signup, User } from "@/types";
import BackButton from "@/components/BackButton";

export default function MySignups() {
  const [signups, setSignups] = useState<Signup[]>([]);

  useEffect(() => {
    async function load() {
      const me = await api.get<{ user: User | null }>("/auth/me");
      const user = me.data.user;
      if (!user) return;

      const res = await api.get<{ signups: Signup[] }>("/signups/my");
      setSignups(res.data.signups);
    }

    load();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">My Signups</h1>

      <BackButton />

      <div className="mt-6 space-y-4">
        {signups.length === 0 && <p>You haven't signed up for anything yet.</p>}

        {signups.map((s) => (
          <Link
            key={s.id}
            href={`/events/${s.event.id}`}
            className="block p-4 border rounded shadow-sm hover:bg-gray-50"
          >
            <h2 className="font-semibold">{s.event.title}</h2>
            <p>{new Date(s.event.date).toLocaleString()}</p>
            <p className="text-gray-600">{s.event.location}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
