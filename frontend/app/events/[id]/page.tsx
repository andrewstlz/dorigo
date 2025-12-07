"use client";

import SignupButton from "@/components/SignupButton";
import api from "@/lib/api";

interface EventPageProps {
  params: { id: string };
}

interface EventResponse {
  event: {
    id: string;
    title: string;
    description?: string;
    date: string;
    location?: string;
    setList?: string;
    signups: Array<{
      id: string;
      remarks?: string;
      user: { id: string; name: string; voicePart?: string };
    }>;
  };
}

interface MeResponse {
  user: {
    id: string;
    name: string;
    role: "OFFICER" | "MEMBER";
    voicePart?: string;
  } | null;
}

export default async function EventPage({ params }: EventPageProps) {
  const eventId = params.id;

  // --- Fetch Event ---
  let event: EventResponse["event"] | null = null;
  try {
    const res = await api.get<EventResponse>(`/events/${eventId}`);
    event = res.data.event;
  } catch (err) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold text-red-600">
          Failed to load event.
        </h1>
      </div>
    );
  }

  // --- Fetch Logged-in User ---
  let user: MeResponse["user"] = null;
  try {
    const me = await api.get<MeResponse>("/auth/me");
    user = me.data.user;
  } catch {}

  const alreadySignedUp =
    user && event.signups.some((s) => s.user.id === user.id);

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold">{event.title}</h1>
      <p className="text-gray-600 mt-2">{event.description}</p>

      <div className="mt-4">
        <p>
          <strong>Date:</strong> {new Date(event.date).toLocaleString()}
        </p>
        <p>
          <strong>Location:</strong> {event.location}
        </p>
      </div>

      <div className="mt-6">
        {user ? (
          <SignupButton
            eventId={event.id}
            alreadySignedUp={!!alreadySignedUp}
          />
        ) : (
          <a href="/login" className="text-blue-600 underline">
            Please log in to sign up
          </a>
        )}
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-2">Signups</h2>
        {event.signups.length === 0 ? (
          <p className="text-gray-500">No signups yet.</p>
        ) : (
          <ul className="space-y-2 mt-2">
            {event.signups.map((s) => (
              <li key={s.id} className="border p-3 rounded bg-gray-50">
                <strong>{s.user.name}</strong>{" "}
                <span className="text-gray-600">
                  ({s.user.voicePart ?? "?"})
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
