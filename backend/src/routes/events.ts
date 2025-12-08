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

export default router;
