import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
import { ConnectDB } from "./lib/db.js";
import cors from "cors";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";

const app = express();

// Middleware
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(express.json());

// Inngest endpoint
app.use("/api/inngest", serve({ client: inngest, functions }));

// Because backend is started from root (via --prefix backend),
// path.resolve() will point to project root
const __dirname = path.resolve();

// Test routes
app.get("/book", (req, res) => {
  res.send("Book");
});

app.get("/files", (req, res) => {
  res.send("Files");
});

// 🔥 Production static serving (for Render)
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  // Wildcard route MUST be "*"
  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "frontend/dist/index.html")
    );
  });
}

// Start server
const startServer = async () => {
  try {
    await ConnectDB();

    const PORT = process.env.PORT || ENV.PORT || 5000;

    app.listen(PORT, () => {
      console.log("Server running on Port: " + PORT);
    });

  } catch (error) {
    console.log("Error starting server:", error.message);
  }
};

startServer();
