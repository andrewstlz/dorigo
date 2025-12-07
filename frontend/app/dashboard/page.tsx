"use client";

import Link from "next/link";
import { useUser } from "@/hooks/useUser";

export default function DashboardPage() {
  const { user, loading } = useUser();

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  if (!user) {
    return (
      <div className="p-6">
        <p>You are not logged in.</p>
        <Link href="/login" className="text-blue-600 underline">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h1>

      <p className="text-gray-700 mb-6">
        Role: <span className="font-semibold">{user.role}</span>
      </p>

      <div className="flex flex-col gap-4">
        <Link className="bg-blue-600 text-white p-3 rounded" href="/calendar">
          View Calendar
        </Link>

        <Link className="bg-purple-600 text-white p-3 rounded" href="/events">
          Browse Events
        </Link>

        <Link className="bg-green-600 text-white p-3 rounded" href="/signups">
          My Signups
        </Link>

        {user.role === "OFFICER" && (
          <Link
            className="bg-red-600 text-white p-3 rounded"
            href="/events/create"
          >
            Create Event (Officer)
          </Link>
        )}
      </div>
    </div>
  );
}
