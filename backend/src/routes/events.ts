import { Router } from "express";
import prisma from "../prismaClient";

const router = Router();

// GET /events/:id — fetch one event with signups
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        signups: {
          include: {
            user: true, // we need user name + voice part
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
