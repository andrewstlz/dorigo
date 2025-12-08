"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";

export default function CreateEventPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [setList, setSetList] = useState("");
  const [description, setDescription] = useState("");

  // quotas = array of { voicePart, required }
  const [quotas, setQuotas] = useState([
    { voicePart: "S1", required: 0 },
    { voicePart: "S2", required: 0 },
    { voicePart: "A1", required: 0 },
    { voicePart: "A2", required: 0 },
    { voicePart: "T1", required: 0 },
    { voicePart: "T2", required: 0 },
    { voicePart: "B1", required: 0 },
    { voicePart: "B2", required: 0 },
  ]);

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      await api.post("/events", {
        title,
        date,
        location,
        setList,
        description,
        quotas,
      });

      alert("Event created!");
      router.push("/dashboard");
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to create event.");
    }
  }

  function updateQuota(index: number, value: number) {
    const newQuotas = [...quotas];
    newQuotas[index].required = value;
    setQuotas(newQuotas);
  }

  return (
    <div className="mt-6 p-6 max-w-2xl mx-auto">
      <BackButton />

      <h1 className="mt-10 text-3xl font-bold mb-6">Create Event</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 rounded w-full"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="border p-2 rounded w-full"
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          className="border p-2 rounded w-full"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          className="border p-2 rounded w-full"
          placeholder="Set List"
          value={setList}
          onChange={(e) => setSetList(e.target.value)}
        />

        <textarea
          className="border p-2 rounded w-full"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <h2 className="text-xl font-semibold mt-6">Voice Part Quotas</h2>

        {quotas.map((q, i) => (
          <div key={q.voicePart} className="flex items-center gap-4">
            <label className="w-12">{q.voicePart}</label>
            <input
              type="number"
              min="0"
              className="border p-1 rounded w-20"
              value={q.required}
              onChange={(e) => updateQuota(i, Number(e.target.value))}
            />
          </div>
        ))}

        <button
          className="bg-blue-950 text-white p-3 rounded w-full mt-6"
          type="submit"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}
