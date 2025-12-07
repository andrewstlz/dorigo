import { Router } from "express";

const router = Router();

// placeholder route
router.get("/", (req, res) => {
  res.json({ message: "Events routes working!" });
});

export default router;
