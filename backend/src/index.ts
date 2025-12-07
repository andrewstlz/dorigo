import express from "express";
import session from "express-session";
import passport from "./config/passport";
import authRoutes from "./routes/auth";
import eventRoutes from "./routes/events";
import signupRoutes from "./routes/signups";
import cors from "cors";

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Sessions
app.use(
  session({
    secret: "supersecret-key", // move to ENV later
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // secure: true only in production
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/signups", signupRoutes);

const PORT = 4000;
app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
