import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

// Generic CRUD for dynamic pages
router.get("/:table", async (req, res) => {
  const [rows] = await pool.query(`SELECT * FROM ${req.params.table}`);
  res.json(rows);
});

router.post("/:table", async (req, res) => {
  const data = req.body;
  const fields = Object.keys(data).join(",");
  const values = Object.values(data);
  const placeholders = values.map(() => "?").join(",");
  const sql = `INSERT INTO ${req.params.table} (${fields}) VALUES (${placeholders})`;
  await pool.query(sql, values);
  res.json({ message: "Record added!" });
});

router.put("/:table/:id", async (req, res) => {
  const data = req.body;
  const updates = Object.keys(data).map(k => `${k}=?`).join(",");
  const values = [...Object.values(data), req.params.id];
  const sql = `UPDATE ${req.params.table} SET ${updates} WHERE id=?`;
  await pool.query(sql, values);
  res.json({ message: "Record updated!" });
});

router.delete("/:table/:id", async (req, res) => {
  await pool.query(`DELETE FROM ${req.params.table} WHERE id=?`, [req.params.id]);
  res.json({ message: "Record deleted!" });
});

export default router;
