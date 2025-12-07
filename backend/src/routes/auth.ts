import { Router } from "express";
import bcrypt from "bcryptjs";
import passport from "passport";
import prisma from "../prismaClient";

const router = Router();

// Officer registration using a secret URL
router.post("/register-officer", async (req, res) => {
  const { email, password, name, voicePart, secret } = req.body;

  if (secret !== process.env.OFFICER_SECRET) {
    return res.status(403).json({ error: "Invalid secret key" });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      name,
      voicePart,
      role: "OFFICER",
    },
  });

  res.json({ user });
});

// Member registration
router.post("/register", async (req, res) => {
  const { email, password, name, voicePart } = req.body;

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      name,
      voicePart,
      role: "MEMBER",
    },
  });

  res.json({ user });
});

// Login route
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ message: "Logged in", user: req.user });
});

// Check logged-in user
router.get("/me", (req, res) => {
  if (!req.user) return res.status(401).json({ user: null });
  res.json({ user: req.user });
});

// Logout
router.post("/logout", (req, res) => {
  req.logout(() => {
    res.json({ message: "Logged out" });
  });
});

export default router;
