import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link
          href="/dashboard"
          className="text-3xl font-bold flex items-center gap-2"
        >
          <span className="text-black">DoriGo</span>
          <span className="text-purple-600 text-2xl">🎶</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-8 text-lg font-semibold">
          <Link
            href="/dashboard"
            className="hover:bg-blue-950 hover:text-white px-3 py-1 rounded-md transition"
          >
            Dashboard
          </Link>

          <Link
            href="/calendar"
            className="hover:bg-red-800 hover:text-white px-3 py-1 rounded-md transition"
          >
            Calendar
          </Link>

          <Link
            href="/my-signups"
            className="hover:bg-green-900 hover:text-white px-3 py-1 rounded-md transition"
          >
            My Signups
          </Link>

          {/* LOGOUT BUTTON */}
          <LogoutButton />
        </nav>
      </div>
    </header>
  );
}
