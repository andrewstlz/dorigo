import { Router } from "express";
import prisma from "../prismaClient";

const router = Router();

// POST /signups — create signup
router.post("/", async (req, res) => {
  const user = req.user as any;

  if (!user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  const { eventId, remarks } = req.body;

  if (!eventId) {
    return res.status(400).json({ error: "eventId required" });
  }

  try {
    // Prevent duplicate signups
    const existing = await prisma.signup.findFirst({
      where: {
        eventId,
        userId: user.id,
      },
    });

    if (existing) {
      return res.status(400).json({ error: "Already signed up" });
    }

    // Create signup
    const signup = await prisma.signup.create({
      data: {
        eventId,
        userId: user.id,
        remarks: remarks || "",
      },
    });

    res.json({ signup });
  } catch (err) {
    console.error("Signup creation error:", err);
    res.status(500).json({ error: "Failed to create signup" });
  }
});

export default router;
