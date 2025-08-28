import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

// Create page (Admin only)
router.post("/pages", async (req, res) => {
  const { page_name, table_name, fields } = req.body;

  // Save page info
  await pool.query("INSERT INTO pages (page_name, table_name) VALUES (?, ?)", [page_name, table_name]);

  // Build CREATE TABLE
  const columns = fields.map(f => `${f.name} ${f.type}`).join(", ");
  const sql = `CREATE TABLE IF NOT EXISTS ${table_name} (id INT AUTO_INCREMENT PRIMARY KEY, ${columns})`;
  await pool.query(sql);

  res.json({ message: "Page created!" });
});

// List all pages
router.get("/pages", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM pages");
  res.json(rows);
});

export default router;
