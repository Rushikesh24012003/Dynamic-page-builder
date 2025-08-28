import { useState } from "react";
import client from "../api/client";

export default function AdminPageBuilder() {
  const [pageName, setPageName] = useState("");
  const [table, setTable] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [fields, setFields] = useState([]);

  const addField = () => {
    if (!fieldName) return;
    setFields([...fields, { name: fieldName, type: "VARCHAR(100)" }]);
    setFieldName("");
  };

  const savePage = async () => {
    await client.post("/admin/pages", {
      page_name: pageName,
      table_name: table,
      fields,
    });
    alert("Page created!");
    setPageName("");
    setTable("");
    setFields([]);

    // ✅ Refresh Sidebar after adding new page
    window.location.reload();
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Admin Page Builder</h1>

      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Page Name"
          value={pageName}
          onChange={(e) => setPageName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Table Name"
          value={table}
          onChange={(e) => setTable(e.target.value)}
        />
      </div>

      <div className="input-group mb-3">
        <input
          className="form-control"
          placeholder="Field Name"
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addField}>
          Add
        </button>
      </div>

      <ul className="list-group mb-3">
        {fields.map((f, i) => (
          <li className="list-group-item" key={i}>
            {f.name} <span className="text-muted">({f.type})</span>
          </li>
        ))}
      </ul>

      <button className="btn btn-success" onClick={savePage}>
        Save Page
      </button>
    </div>
  );
}
