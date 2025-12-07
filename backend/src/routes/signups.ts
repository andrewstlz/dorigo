import { Router } from "express";

const router = Router();

// placeholder route
router.get("/", (req, res) => {
  res.json({ message: "Signups routes working!" });
});

export default router;
