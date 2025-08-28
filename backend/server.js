import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import dataRoutes from "./routes/data.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ msg: "Backend is running" }));
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/data", dataRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
