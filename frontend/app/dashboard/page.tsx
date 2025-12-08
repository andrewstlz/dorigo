"use client";

import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import LoadingScreen from "@/components/LoadingScreen";

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

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
      <LoadingScreen />
      <div className="relative h-56 w-full rounded-xl overflow-hidden shadow-lg">
        <Image
          src="/glee-banner.jpg"
          alt="Penn Glee Club"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute bottom-4 left-6 text-white drop-shadow-lg">
          <h1 className="font-sans text-4xl font-bold">Welcome to DoriGo</h1>
          <p className="text-lg">Your new performance scheduling assistant</p>
        </div>
      </div>

      <h1 className="text-3xl mt-10 font-bold mb-4">
        {" "}
        {getGreeting()}, {user.name}!
      </h1>

      <p className="text-gray-700 mb-6">
        Role: <span className="font-semibold">{user.role}</span>
      </p>

      <div className="flex flex-col gap-4">
        <Link className="bg-blue-950 text-white p-3 rounded" href="/calendar">
          View Calendar
        </Link>
        {/* 
        <Link className="bg-purple-600 text-white p-3 rounded" href="/events">
          Browse Events
        </Link> */}

        <Link className="bg-red-800 text-white p-3 rounded" href="/my-signups">
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
