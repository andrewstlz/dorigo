"use client";

import Link from "next/link";

export default function BackButton() {
  return (
    <Link href="/dashboard">
      <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">
        ← Back to Dashboard
      </button>
    </Link>
  );
}
