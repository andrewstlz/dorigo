"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState, useEffect } from "react";
import BackButton from "@/components/BackButton";
import api from "@/lib/api";

interface EventItem {
  id: string;
  title: string;
  date: string;
}

interface EventsResponse {
  events: EventItem[];
}

export default function CalendarPage() {
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      const res = await api.get<EventsResponse>("/events");
      setEvents(
        res.data.events.map((e: any) => ({
          id: e.id,
          title: e.title,
          date: e.date,
        }))
      );
    }
    fetchEvents();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Performance Calendar</h1>
      <div className="mb-6">
        <BackButton />
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height="auto"
        events={events}
        eventClick={(info) => {
          window.location.href = `/events/${info.event.id}`;
        }}
      />
    </div>
  );
}
