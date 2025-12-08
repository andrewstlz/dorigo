import { Router } from "express";
import prisma from "../prismaClient";

const router = Router();

// ------------------------------
// Middleware: ensure logged in
function requireAuth(req, res, next) {
  if (!req.user) return res.status(401).json({ error: "Not logged in" });
  next();
}

// POST /signups
// Create a signup for an event
// ------------------------------
router.post("/", async (req: any, res) => {
  try {
    // 1. Must be logged in
    if (!req.user) {
      return res.status(401).json({ error: "Not logged in" });
    }

    const { eventId, remarks } = req.body;

    if (!eventId) {
      return res.status(400).json({ error: "Missing eventId" });
    }

    // 2. Check event exists
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: { quotas: true },
    });

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // 3. Prevent duplicate signups
    const existing = await prisma.signup.findFirst({
      where: {
        eventId,
        userId: req.user.id,
      },
    });

    if (existing) {
      return res.status(400).json({ error: "Already signed up" });
    }

    // 4. Determine user's voice part to update quotas
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // 5. Create signup
    const signup = await prisma.signup.create({
      data: {
        userId: req.user.id,
        eventId,
        remarks: remarks || "",
      },
      include: { user: true },
    });

    // 6. Update quota (increment filled)
    await prisma.quota.updateMany({
      where: {
        eventId,
        voicePart: user.voicePart,
      },
      data: {
        filled: { increment: 1 },
      },
    });

    return res.json({
      message: "Signed up successfully",
      signup,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Signup failed" });
  }
});

// ------------------------------------------------------
// GET /signups/my
// Return all signups for the logged-in user
// ------------------------------------------------------
router.get("/my", async (req: any, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Not logged in" });
    }

    const signups = await prisma.signup.findMany({
      where: { userId: req.user.id },
      include: {
        event: true, // include event details for the frontend
      },
      orderBy: { createdAt: "desc" },
    });

    return res.json({ signups });
  } catch (err) {
    console.error("Fetch signups error:", err);
    return res.status(500).json({ error: "Failed to fetch signups" });
  }
});

export default router;
