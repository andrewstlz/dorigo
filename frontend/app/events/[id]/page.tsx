"use client";

import { useEffect, useState } from "react";
import SignupButton from "@/components/SignupButton";
import api from "@/lib/api";

type EventData = {
  id: string;
  title: string;
  description?: string;
  date: string;
  location?: string;
  setList?: string;
  signups: {
    id: string;
    remarks?: string;
    user: { id: string; name: string; voicePart?: string };
  }[];
};

type Me = {
  id: string;
  name: string;
  role: "OFFICER" | "MEMBER";
  voicePart?: string;
} | null;

export default function EventPage({ params }: { params: { id: string } }) {
  const { id: eventId } = params;
  const [event, setEvent] = useState<EventData | null>(null);
  const [user, setUser] = useState<Me>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const [eventRes, meRes] = await Promise.allSettled([
          api.get<{ event: EventData }>(`/events/${eventId}`),
          api.get<{ user: Me }>("/auth/me"),
        ]);
        if (eventRes.status === "fulfilled")
          setEvent(eventRes.value.data.event);
        else setError("Failed to load event.");
        if (meRes.status === "fulfilled") setUser(meRes.value.data.user);
      } catch (err) {
        setError("Failed to load event.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [eventId]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error || !event)
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold text-red-600">
          {error || "Event not found."}
        </h1>
      </div>
    );

  const alreadySignedUp = !!(
    user && event.signups.some((s) => s.user.id === user.id)
  );

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
          <SignupButton eventId={event.id} alreadySignedUp={alreadySignedUp} />
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
