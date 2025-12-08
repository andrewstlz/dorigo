import { Router } from "express";
import prisma from "../prismaClient";

const router = Router();

// -----------------
// GET /events — list all events
// -----------------
router.get("/", async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: "asc" },
      select: {
        id: true,
        title: true,
        date: true,
        location: true,
        setList: true,
      },
    });

    res.json({ events });
  } catch (err) {
    console.error("Events fetch error:", err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// -----------------
// GET /events/:id — single event with signups + quotas
// -----------------
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        signups: {
          include: {
            user: true, // user info for display
          },
        },
        quotas: true,
      },
    });

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json({ event });
  } catch (err) {
    console.error("Event fetch error:", err);
    res.status(500).json({ error: "Failed to fetch event" });
  }
});

function requireOfficer(req: any, res: any, next: any) {
  if (!req.user || req.user.role !== "OFFICER") {
    return res.status(403).json({ error: "Officers only" });
  }
  next();
}

// ----------------------------
// POST /events  (CREATE EVENT)
// ----------------------------
router.post("/", requireOfficer, async (req: any, res) => {
  try {
    const { title, description, date, location, setList, quotas } = req.body;

    if (!title || !date) {
      return res.status(400).json({ error: "Missing title or date" });
    }

    // First create event
    const newEvent = await prisma.event.create({
      data: { title, description, date: new Date(date), location, setList },
    });

    // Add quotas (array of { voicePart, required })

    if (quotas && Array.isArray(quotas)) {
      for (const q of quotas) {
        await prisma.quota.create({
          data: {
            eventId: newEvent.id,
            voicePart: q.voicePart,
            required: q.required,
          },
        });
      }
    }

    return res.json({ event: newEvent });
  } catch (err) {
    console.error("Create event error:", err);
    res.status(500).json({ error: "Failed to create event" });
  }
});

export default router;
