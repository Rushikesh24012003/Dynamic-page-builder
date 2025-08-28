import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../api/client";

export default function DynamicPage() {
  const { table } = useParams();
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({});
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    fetchData();
  }, [table]);

  const fetchData = async () => {
    const res = await client.get(`/data/${table}`);
    setRows(res.data);

    if (res.data.length > 0) {
      setColumns(Object.keys(res.data[0]).filter((k) => k !== "id"));
    }
  };

  const handleSave = async () => {
    if (form.id) {
      await client.put(`/data/${table}/${form.id}`, form);
    } else {
      await client.post(`/data/${table}`, form);
    }
    setForm({});
    fetchData();
  };

  const handleDelete = async (id) => {
    await client.delete(`/data/${table}/${id}`);
    fetchData();
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-capitalize">{table} Records</h1>

      {/* Add/Edit Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        className="card card-body mb-4 shadow-sm"
      >
        {columns.map((col) => (
          <input
            key={col}
            className="form-control mb-2"
            placeholder={col}
            value={form[col] || ""}
            onChange={(e) => setForm({ ...form, [col]: e.target.value })}
          />
        ))}

        <div>
          <button type="submit" className="btn btn-primary me-2">
            {form.id ? "Update" : "Add"}
          </button>
          {form.id && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setForm({})}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Records Table */}
      <table className="table table-bordered table-striped shadow-sm">
        <thead className="table-dark">
          <tr>
            {rows.length > 0 &&
              Object.keys(rows[0]).map((k) => <th key={k}>{k}</th>)}
            {rows.length > 0 && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              {Object.values(r).map((val, i) => (
                <td key={i}>{val}</td>
              ))}
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => setForm(r)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(r.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length + 1} className="text-center">
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
